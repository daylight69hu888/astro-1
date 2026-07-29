(function () {
  const categoryList = document.getElementById('categoryList');
  const categoryDetail = document.getElementById('categoryDetail');
  const refSelect = document.getElementById('refSelect');
  const refHint = document.getElementById('refHint');

  let refSignIndex = null;
  let refLabel = '';
  let activeCategoryId = null;
  let currentSnapshot = null; // cached today's transit, fetched once

  // ---------- Live clock ----------
  function pad(n) { return String(n).padStart(2, '0'); }
  function updateClock() {
    const now = new Date();
    document.getElementById('clockUTC').textContent = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
    const J2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
    const daysSinceJ2000 = (now.getTime() - J2000) / 86400000;
    const H = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600;
    let gmst = 6.697374558 + 0.06570982441908 * daysSinceJ2000 + 1.00273790935 * H;
    gmst = ((gmst % 24) + 24) % 24;
    const gh = Math.floor(gmst), gm = Math.floor((gmst - gh) * 60), gs = Math.floor((((gmst - gh) * 60) - gm) * 60);
    document.getElementById('clockGAST').textContent = `${pad(gh)}:${pad(gm)}:${pad(gs)}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // ---------- Reference selector ----------
  refSelect.addEventListener('change', () => {
    const v = refSelect.value;
    if (v === '') { refSignIndex = null; refLabel = ''; refHint.textContent = 'Pick a reference to see which house each significator is transiting.'; }
    else {
      try {
        const raw = localStorage.getItem('chitraYantra.lastBirthChart');
        if (!raw) { refHint.textContent = 'No saved birth chart found — generate one in Birth Chart first.'; refSelect.value = ''; return; }
        const saved = JSON.parse(raw);
        if (v === 'natal-moon') {
          const moon = saved.chart.planets.find((p) => p.name === 'Moon');
          refSignIndex = moon.signIndex;
          refLabel = `Moon (${moon.sign})`;
        } else if (v === 'natal-asc') {
          refSignIndex = saved.chart.ascendant.signIndex;
          refLabel = `Ascendant (${saved.chart.ascendant.sign})`;
        }
        refHint.textContent = `Houses counted from: ${refLabel}`;
      } catch (e) {
        refHint.textContent = 'Could not read saved birth chart.';
        refSelect.value = '';
      }
    }
    if (activeCategoryId) renderCategoryDetail(activeCategoryId);
  });

  // ---------- Category list ----------
  function renderCategoryList() {
    categoryList.innerHTML = '';
    window.CHITRA_SIGNIFICATORS.forEach((cat) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'country-card';
      btn.innerHTML = `<span class="country-card__name">${cat.label}</span><span class="country-card__meta">${cat.planets.join(', ')}</span>`;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.country-card').forEach((el) => el.classList.remove('country-card--active'));
        btn.classList.add('country-card--active');
        activeCategoryId = cat.id;
        renderCategoryDetail(cat.id);
      });
      categoryList.appendChild(btn);
    });
  }
  renderCategoryList();

  // ---------- Fetch today's transit once, reuse across categories ----------
  async function getSnapshot() {
    if (currentSnapshot) return currentSnapshot;
    const res = await fetch('/.netlify/functions/transit', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Could not load current transit.');
    currentSnapshot = data;
    return data;
  }

  function fmtDeg(d) {
    const whole = Math.floor(d);
    const min = Math.floor((d - whole) * 60);
    return `${whole}°${String(min).padStart(2, '0')}'`;
  }

  // ---------- Research notes (localStorage, per category) ----------
  function notesKey(catId) { return `chitraYantra.notes.${catId}`; }
  function loadNotes(catId) {
    try { return JSON.parse(localStorage.getItem(notesKey(catId)) || '[]'); } catch (e) { return []; }
  }
  function saveNotes(catId, notes) {
    try { localStorage.setItem(notesKey(catId), JSON.stringify(notes)); } catch (e) { /* non-fatal */ }
  }

  async function renderCategoryDetail(catId) {
    const cat = window.CHITRA_SIGNIFICATORS.find((c) => c.id === catId);
    categoryDetail.innerHTML = `<p class="panel__note">Loading current transits…</p>`;

    let snapshot;
    try {
      snapshot = await getSnapshot();
    } catch (e) {
      categoryDetail.innerHTML = `<p class="form__error" style="display:block;">${e.message}</p>`;
      return;
    }

    const relevantPlanets = snapshot.planets.filter((p) => cat.planets.includes(p.name));

    const rows = relevantPlanets.map((p) => {
      const house = refSignIndex !== null ? ((p.signIndex - refSignIndex + 12) % 12) + 1 : null;
      const dignityClass = p.dignity === 'Exalted' ? 'dignity-exalted' : p.dignity === 'Debilitated' ? 'dignity-debilitated' : p.dignity === 'Own Sign' ? 'dignity-own' : '';
      return `
        <tr>
          <td>${p.name}</td>
          <td>${p.sign}</td>
          <td>${fmtDeg(p.degreeInSign)}</td>
          <td>${house !== null ? 'H' + house : '—'}</td>
          <td>${p.nakshatra} (pada ${p.nakshatraPada}, lord ${p.nakshatraLord})</td>
          <td class="${dignityClass}">${p.dignity || '—'}</td>
          <td>${p.retrograde ? '<span class="status-tag status-tag--retro">R</span>' : ''}${p.combust ? '<span class="status-tag status-tag--combust">Combust</span>' : ''}${!p.retrograde && !p.combust ? '—' : ''}</td>
        </tr>`;
    }).join('');

    const notes = loadNotes(catId);
    const notesHtml = notes.length
      ? notes.map((n, i) => `
          <div class="note-item">
            <span class="note-item__date">${n.date}</span>
            <p>${n.text.replace(/</g, '&lt;')}</p>
            <button type="button" class="note-item__delete" data-idx="${i}">Delete</button>
          </div>`).join('')
      : '<p class="panel__note">No notes yet for this category.</p>';

    const reading = window.ChitraInterpretation.generateReading(cat.label, relevantPlanets);
    const toneClass = reading.tone.label.startsWith('Supportive') ? 'tone-supportive' : reading.tone.label.startsWith('Strained') ? 'tone-strained' : 'tone-mixed';
    const readingHtml = `
      <div class="reading-box">
        <div class="reading-box__header">
          <span class="reading-box__title">Classical Reading</span>
          <span class="reading-box__tone ${toneClass}">${reading.tone.label}</span>
        </div>
        <p class="reading-box__disclaimer">Rule-based, from named classical principles (dignity, retrograde, combustion, nakṣatra Gana) — not a forecast of real-world events. ${reading.tone.text}.</p>
        <ul class="reading-box__list">${reading.lines.map((l) => `<li>${l}</li>`).join('')}</ul>
      </div>`;

    categoryDetail.innerHTML = `
      <div class="country-header">
        <span class="country-header__name">${cat.label}</span>
        <span class="country-header__note">${cat.note}</span>
      </div>
      ${readingHtml}
      <h2 class="table__title">Current Positions <span class="table__title-sub">as of ${snapshot.utcInstant.replace('T', ' ').replace('Z', ' Z')}</span></h2>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Graha</th><th>Rāśi</th><th>Degree</th><th>House</th><th>Nakṣatra</th><th>Dignity</th><th>Status</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>

      <h2 class="table__title" style="margin-top:24px;">Research Notes</h2>
      <textarea id="noteInput" class="note-input" placeholder="Write your own observations for this category…"></textarea>
      <button type="button" class="btn-secondary" id="addNoteBtn">Add Note</button>
      <div class="notes-list" id="notesList">${notesHtml}</div>
    `;

    document.getElementById('addNoteBtn').addEventListener('click', () => {
      const input = document.getElementById('noteInput');
      const text = input.value.trim();
      if (!text) return;
      const list = loadNotes(catId);
      list.unshift({ date: new Date().toISOString().slice(0, 16).replace('T', ' '), text });
      saveNotes(catId, list);
      renderCategoryDetail(catId);
    });
    categoryDetail.querySelectorAll('.note-item__delete').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const list = loadNotes(catId);
        list.splice(idx, 1);
        saveNotes(catId, list);
        renderCategoryDetail(catId);
      });
    });
  }

  categoryDetail.innerHTML = '<div class="result__empty"><div class="empty__ring"></div><p>Select a research category to view current significator positions.</p></div>';
})();

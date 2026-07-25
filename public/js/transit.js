(function () {
  const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
  const PLANET_ABBR = { Sun: 'Su', Moon: 'Mo', Mars: 'Ma', Mercury: 'Me', Jupiter: 'Ju', Venus: 'Ve', Saturn: 'Sa', Rahu: 'Ra', Ketu: 'Ke' };

  const natalEmpty = document.getElementById('natalEmpty');
  const natalLoaded = document.getElementById('natalLoaded');
  const natalMoonValue = document.getElementById('natalMoonValue');
  const manualSelect = document.getElementById('manualMoonSign');
  const clearNatalBtn = document.getElementById('clearNatal');

  const dateInput = document.getElementById('transitDate');
  const timeInput = document.getElementById('transitTime');
  const useNowBtn = document.getElementById('useNowBtn');
  const calcBtn = document.getElementById('calcBtn');
  const formError = document.getElementById('formError');
  const styleToggle = document.getElementById('styleToggle');

  const resultEmpty = document.getElementById('resultEmpty');
  const resultContent = document.getElementById('resultContent');
  const summaryBar = document.getElementById('summaryBar');
  const chartSvg = document.getElementById('chartSvg');
  const metaStrip = document.getElementById('metaStrip');

  let currentChartStyle = 'north';
  let moonSignIndex = null; // 0-11, the Chandra Lagna this dashboard is built around
  let moonLabel = '';
  let lastTransitPlanets = null;

  // ---------- Populate manual sign selector ----------
  SIGNS.forEach((s, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = s;
    manualSelect.appendChild(opt);
  });

  // ---------- Load natal Moon from the Birth Chart module, if saved ----------
  function loadNatal() {
    try {
      const raw = localStorage.getItem('chitraYantra.lastBirthChart');
      if (!raw) { showManualPicker(); return; }
      const saved = JSON.parse(raw);
      const moon = saved.chart.planets.find((p) => p.name === 'Moon');
      if (!moon) { showManualPicker(); return; }
      moonSignIndex = moon.signIndex;
      moonLabel = `${moon.sign} ${Math.floor(moon.degreeInSign)}°${String(Math.floor((moon.degreeInSign % 1) * 60)).padStart(2, '0')}' · ${moon.nakshatra} pada ${moon.nakshatraPada}`;
      natalEmpty.hidden = true;
      natalLoaded.hidden = false;
      natalMoonValue.textContent = moonLabel;
    } catch (e) {
      showManualPicker();
    }
  }
  function showManualPicker() {
    natalLoaded.hidden = true;
    natalEmpty.hidden = false;
  }
  clearNatalBtn.addEventListener('click', () => {
    moonSignIndex = null;
    showManualPicker();
  });
  manualSelect.addEventListener('change', () => {
    if (manualSelect.value !== '') {
      moonSignIndex = parseInt(manualSelect.value, 10);
      moonLabel = `${SIGNS[moonSignIndex]} (manually set)`;
    }
  });
  loadNatal();

  // ---------- Live UTC / GAST clock (same formula as the Birth Chart page) ----------
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

  // ---------- Date/time controls ----------
  function setInputsToNow() {
    const now = new Date();
    dateInput.value = now.toISOString().slice(0, 10);
    timeInput.value = now.toISOString().slice(11, 19);
  }
  setInputsToNow();
  useNowBtn.addEventListener('click', setInputsToNow);

  // ---------- Chart style toggle ----------
  styleToggle.addEventListener('click', (e) => {
    const btn = e.target.closest('.toggle__opt');
    if (!btn) return;
    document.querySelectorAll('.toggle__opt').forEach((b) => b.classList.remove('toggle__opt--active'));
    btn.classList.add('toggle__opt--active');
    currentChartStyle = btn.dataset.style;
    if (lastTransitPlanets) redraw();
  });

  function fmtDeg(d) {
    const whole = Math.floor(d);
    const min = Math.floor((d - whole) * 60);
    return `${whole}°${String(min).padStart(2, '0')}'`;
  }

  function redraw() {
    // Build a chart-shaped object chart-render.js already knows how to draw,
    // substituting the Chandra Lagna (natal Moon sign) in place of an Ascendant.
    const fakeChart = {
      ascendant: { signIndex: moonSignIndex, navamsaSignIndex: moonSignIndex },
      planets: lastTransitPlanets.map((p) => ({
        ...p,
        house: (((p.signIndex - moonSignIndex + 12) % 12) + 1),
      })),
    };
    window.VedicChartRender.renderChart(chartSvg, fakeChart, currentChartStyle, false);
  }

  calcBtn.addEventListener('click', async () => {
    formError.hidden = true;
    if (moonSignIndex === null) {
      formError.textContent = 'Set a natal Moon sign first — load a saved birth chart, or pick one manually.';
      formError.hidden = false;
      return;
    }
    const date = dateInput.value;
    let time = timeInput.value;
    if (!date || !time) {
      formError.textContent = 'Choose a date and time.';
      formError.hidden = false;
      return;
    }
    if (time.length === 5) time += ':00';
    const utcISO = `${date}T${time}.000Z`;

    calcBtn.disabled = true;
    calcBtn.querySelector('span').textContent = 'Calculating…';
    try {
      const res = await fetch('/.netlify/functions/transit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ utcISO }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Calculation failed.');

      lastTransitPlanets = data.planets;
      renderResult(data);
    } catch (err) {
      formError.textContent = err.message;
      formError.hidden = false;
    } finally {
      calcBtn.disabled = false;
      calcBtn.querySelector('span').textContent = 'Show Transit';
    }
  });

  function renderResult(data) {
    resultEmpty.hidden = true;
    resultContent.hidden = false;

    summaryBar.innerHTML = '';
    const items = [
      ['Chandra Lagna', moonLabel],
      ['Moment shown', data.utcInstant.replace('T', ' ').replace('Z', ' Z')],
      ['Ayanāṁśa', `${data.meta.ayanamsa.toFixed(4)}°`],
    ];
    items.forEach(([label, value]) => {
      const div = document.createElement('div');
      div.className = 'summary__item';
      div.innerHTML = `<span class="summary__label">${label}</span><span class="summary__value">${value}</span>`;
      summaryBar.appendChild(div);
    });

    redraw();

    const tbody = document.querySelector('#planetTable tbody');
    tbody.innerHTML = '';
    data.planets.forEach((p) => {
      const house = ((p.signIndex - moonSignIndex + 12) % 12) + 1;
      const tr = document.createElement('tr');
      const statusTags = [
        p.retrograde ? '<span class="status-tag status-tag--retro">R</span>' : '',
        p.combust ? '<span class="status-tag status-tag--combust">Combust</span>' : '',
      ].join('');
      tr.innerHTML = `
        <td>${p.name}</td>
        <td>${p.sign}</td>
        <td>${fmtDeg(p.degreeInSign)}</td>
        <td>H${house}</td>
        <td>${p.nakshatra}</td>
        <td>${p.nakshatraPada}</td>
        <td>${statusTags || '—'}</td>
      `;
      tbody.appendChild(tr);
    });

    metaStrip.innerHTML = `
      <span>Obliquity: ${data.meta.obliquity.toFixed(4)}°</span>
      <span>JD (TT): ${data.meta.julianDayTT.toFixed(5)}</span>
    `;
  }
})();

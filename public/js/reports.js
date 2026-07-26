(function () {
  const rangePreset = document.getElementById('rangePreset');
  const yearField = document.getElementById('yearField');
  const reportYear = document.getElementById('reportYear');
  const customRangeFields = document.getElementById('customRangeFields');
  const customStart = document.getElementById('customStart');
  const customEnd = document.getElementById('customEnd');
  const refSelect = document.getElementById('refSelect');
  const filterText = document.getElementById('filterText');
  const generateBtn = document.getElementById('generateBtn');
  const printBtn = document.getElementById('printBtn');
  const formError = document.getElementById('formError');
  const resultEmpty = document.getElementById('resultEmpty');
  const reportContent = document.getElementById('reportContent');

  let lastEvents = null;
  let lastRangeLabel = '';
  let refSignIndex = null;

  // ---------- Live clock ----------
  function pad(n) { return String(n).padStart(2, '0'); }
  function updateClock() {
    const now = new Date();
    const utcEl = document.getElementById('clockUTC');
    if (!utcEl) return;
    utcEl.textContent = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
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

  rangePreset.addEventListener('change', () => {
    const v = rangePreset.value;
    yearField.hidden = v === 'custom';
    customRangeFields.hidden = v !== 'custom';
  });

  refSelect.addEventListener('change', () => {
    const v = refSelect.value;
    if (v === '') { refSignIndex = null; return; }
    try {
      const raw = localStorage.getItem('chitraYantra.lastBirthChart');
      if (!raw) { alert('No saved birth chart found — generate one in Birth Chart first.'); refSelect.value = ''; return; }
      const saved = JSON.parse(raw);
      refSignIndex = v === 'natal-moon'
        ? saved.chart.planets.find((p) => p.name === 'Moon').signIndex
        : saved.chart.ascendant.signIndex;
    } catch (e) {
      alert('Could not read saved birth chart.');
      refSelect.value = '';
    }
  });

  function houseFrom(signIndex) {
    if (refSignIndex === null || signIndex === undefined) return null;
    return ((signIndex - refSignIndex + 12) % 12) + 1;
  }

  function computeRange() {
    const v = rangePreset.value;
    const year = parseInt(reportYear.value, 10) || new Date().getFullYear();
    if (v === 'h1') return { start: `${year}-01-01`, end: `${year}-06-30`, label: `Half-Year Report: Jan \u2013 Jun ${year}` };
    if (v === 'h2') return { start: `${year}-07-01`, end: `${year}-12-31`, label: `Half-Year Report: Jul \u2013 Dec ${year}` };
    if (v === 'year') return { start: `${year}-01-01`, end: `${year}-12-31`, label: `Yearly Report: ${year}` };
    return { start: customStart.value, end: customEnd.value, label: `Report: ${customStart.value} to ${customEnd.value}` };
  }

  function activeTypes() {
    const types = new Set();
    document.querySelectorAll('.checkbox-list input[type="checkbox"]').forEach((cb) => {
      if (cb.checked) cb.dataset.type.split(',').forEach((t) => types.add(t));
    });
    return types;
  }

  const EVENT_LABEL = {
    ingress: (e) => `${e.planet} moves from ${e.fromSign} into ${e.toSign}`,
    nakshatraIngress: (e) => `${e.planet} enters ${e.toNakshatra} (pada ${e.pada}, lord ${e.nakshatraLord})`,
    stationRetrograde: (e) => `${e.planet} turns retrograde in ${e.sign}`,
    stationDirect: (e) => `${e.planet} turns direct in ${e.sign}`,
    conjunction: (e) => `${e.planetA} conjunct ${e.planetB} in ${e.sign} (orb ${e.orb}\u00b0) \u2014 ${e.nakshatra} nakṣatra`,
    combustionBegins: (e) => `${e.planet} becomes combust in ${e.sign}`,
    combustionEnds: (e) => `${e.planet} clears combustion in ${e.sign}`,
    lunarEclipse: (e) => `Lunar eclipse (${e.kind})`,
    solarEclipse: (e) => `Solar eclipse (${e.kind})`,
  };

  function eventSignIndex(e) {
    if (e.type === 'ingress') return e.toSignIndex;
    if (e.type === 'conjunction') return e.signIndex;
    if (e.type === 'stationRetrograde' || e.type === 'stationDirect') return e.signIndex;
    if (e.type === 'combustionBegins' || e.type === 'combustionEnds') return e.signIndex;
    return undefined;
  }

  function renderReport() {
    const types = activeTypes();
    const filterQ = filterText.value.trim().toLowerCase();
    const filtered = lastEvents.filter((e) => {
      if (!types.has(e.type)) return false;
      if (!filterQ) return true;
      const hay = JSON.stringify(e).toLowerCase();
      return hay.includes(filterQ);
    });

    const byDate = {};
    filtered.forEach((e) => { (byDate[e.date] = byDate[e.date] || []).push(e); });
    const dates = Object.keys(byDate).sort();

    if (!dates.length) {
      reportContent.innerHTML = `<h1 class="report-title">${lastRangeLabel}</h1><p class="panel__note">No events matched the selected filters.</p>`;
      return;
    }

    const rows = dates.map((d) => {
      const items = byDate[d].map((e) => {
        const house = houseFrom(eventSignIndex(e));
        const labelFn = EVENT_LABEL[e.type];
        const text = labelFn ? labelFn(e) : e.type;
        return `<li>${text}${house !== null ? ` <span class="report-house">(H${house})</span>` : ''}</li>`;
      }).join('');
      return `<div class="report-day"><span class="report-day__date">${d}</span><ul>${items}</ul></div>`;
    }).join('');

    reportContent.innerHTML = `
      <h1 class="report-title">${lastRangeLabel}</h1>
      <p class="report-meta">${filtered.length} event(s) shown · Sidereal · Lahiri Ayanāṁśa · ${refSignIndex !== null ? 'Houses counted from your selected reference' : 'No house reference selected'}</p>
      ${rows}
    `;
  }

  generateBtn.addEventListener('click', async () => {
    formError.hidden = true;
    const { start, end, label } = computeRange();
    if (!start || !end) {
      formError.textContent = 'Choose a valid date range.';
      formError.hidden = false;
      return;
    }
    lastRangeLabel = label;

    generateBtn.disabled = true;
    generateBtn.querySelector('span').textContent = 'Scanning…';
    try {
      const res = await fetch('/.netlify/functions/scan', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate: start, endDate: end }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Scan failed.');
      lastEvents = data.events;
      resultEmpty.hidden = true;
      printBtn.hidden = false;
      renderReport();
    } catch (err) {
      formError.textContent = err.message;
      formError.hidden = false;
    } finally {
      generateBtn.disabled = false;
      generateBtn.querySelector('span').textContent = 'Generate Report';
    }
  });

  document.querySelectorAll('.checkbox-list input[type="checkbox"]').forEach((cb) => {
    cb.addEventListener('change', () => { if (lastEvents) renderReport(); });
  });
  filterText.addEventListener('input', () => { if (lastEvents) renderReport(); });
  printBtn.addEventListener('click', () => window.print());
})();

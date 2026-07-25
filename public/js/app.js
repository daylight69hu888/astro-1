(function () {
  const form = document.getElementById('chartForm');
  const placeInput = document.getElementById('place');
  const placeMatches = document.getElementById('placeMatches');
  const placeHint = document.getElementById('placeHint');
  const latInput = document.getElementById('lat');
  const lonInput = document.getElementById('lon');
  const tzInput = document.getElementById('timezone');
  const calcBtn = document.getElementById('calcBtn');
  const formError = document.getElementById('formError');

  const resultEmpty = document.getElementById('resultEmpty');
  const resultContent = document.getElementById('resultContent');
  const summaryBar = document.getElementById('summaryBar');
  const chartSvg = document.getElementById('chartSvg');
  const metaStrip = document.getElementById('metaStrip');
  const styleToggle = document.getElementById('styleToggle');
  const chartTabs = document.querySelectorAll('.chart-tab');

  let currentChartStyle = 'north';
  let currentDivision = 'rasi'; // 'rasi' | 'navamsa'
  let lastChart = null;
  let geocodeTimer = null;

  // ---------- Live UTC / GAST clock ----------
  function pad(n) { return String(n).padStart(2, '0'); }
  function updateClock() {
    const now = new Date();
    document.getElementById('clockUTC').textContent =
      `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
    // Rough GAST readout (not astronomical-precision, purely a terminal-flavor display):
    // GMST ≈ 6.697374558 + 0.06570982441908*D0 + 1.00273790935*H (hours), D0 = days since J2000 at 0h UT
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

  // ---------- Place autocomplete (debounced geocode) ----------
  placeInput.addEventListener('input', () => {
    clearTimeout(geocodeTimer);
    const q = placeInput.value.trim();
    if (q.length < 3) { placeMatches.hidden = true; return; }
    geocodeTimer = setTimeout(() => doGeocode(q), 500);
  });

  async function doGeocode(q) {
    placeHint.textContent = 'Searching…';
    try {
      const res = await fetch(`/.netlify/functions/geocode?place=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (!res.ok || !data.matches || !data.matches.length) {
        placeMatches.hidden = true;
        placeHint.textContent = data.error || 'No matches found — you can also enter lat/lon/timezone manually.';
        return;
      }
      placeMatches.innerHTML = '';
      data.matches.forEach((m) => {
        const div = document.createElement('div');
        div.className = 'matches__item';
        div.textContent = m.displayName;
        div.addEventListener('click', () => {
          placeInput.value = m.displayName;
          latInput.value = m.lat.toFixed(6);
          lonInput.value = m.lon.toFixed(6);
          tzInput.value = m.timezone;
          placeMatches.hidden = true;
          placeHint.textContent = `Resolved: ${m.timezone}`;
        });
        placeMatches.appendChild(div);
      });
      placeMatches.hidden = false;
      placeHint.textContent = 'Choose the closest match.';
    } catch (e) {
      placeHint.textContent = 'Lookup failed — enter lat/lon/timezone manually.';
    }
  }

  document.addEventListener('click', (e) => {
    if (!placeMatches.contains(e.target) && e.target !== placeInput) placeMatches.hidden = true;
  });

  // ---------- Chart style toggle ----------
  styleToggle.addEventListener('click', (e) => {
    const btn = e.target.closest('.toggle__opt');
    if (!btn) return;
    document.querySelectorAll('.toggle__opt').forEach((b) => b.classList.remove('toggle__opt--active'));
    btn.classList.add('toggle__opt--active');
    currentChartStyle = btn.dataset.style;
    if (lastChart) redraw();
  });

  chartTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      chartTabs.forEach((t) => t.classList.remove('chart-tab--active'));
      tab.classList.add('chart-tab--active');
      currentDivision = tab.dataset.chart;
      if (lastChart) redraw();
    });
  });

  function redraw() {
    const useNavamsa = currentDivision === 'navamsa';
    window.VedicChartRender.renderChart(chartSvg, lastChart, currentChartStyle, useNavamsa);
    const lagnaNote = document.getElementById('lagnaNote');
    if (lagnaNote) {
      lagnaNote.textContent = useNavamsa
        ? `Built around the Navāṁśa Lagna: ${lastChart.ascendant.navamsaSign}`
        : `Built around the Rāśi Ascendant: ${lastChart.ascendant.sign} ${fmtDeg(lastChart.ascendant.degreeInSign)}`;
    }
  }

  // ---------- Submit ----------
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formError.hidden = true;
    const date = document.getElementById('dob').value;
    let time = document.getElementById('tob').value;
    if (time && time.length === 5) time += ':00';
    const lat = latInput.value, lon = lonInput.value, timezone = tzInput.value.trim();

    if (!date || !time || !lat || !lon || !timezone) {
      formError.textContent = 'Please fill in date, time, latitude, longitude and timezone (use the place search to auto-fill).';
      formError.hidden = false;
      return;
    }

    calcBtn.disabled = true;
    calcBtn.querySelector('span').textContent = 'Calculating…';

    try {
      const res = await fetch('/.netlify/functions/birth-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, time, lat, lon, timezone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Calculation failed.');

      lastChart = data.chart;
      renderResult(data);
      try {
        localStorage.setItem('chitraYantra.lastBirthChart', JSON.stringify({
          savedAt: new Date().toISOString(),
          input: data.input,
          utcInstant: data.utcInstant,
          chart: data.chart,
        }));
      } catch (e) { /* storage unavailable — non-fatal, chart still renders here */ }
    } catch (err) {
      formError.textContent = err.message;
      formError.hidden = false;
    } finally {
      calcBtn.disabled = false;
      calcBtn.querySelector('span').textContent = 'Calculate Chart';
    }
  });

  function fmtDeg(d) {
    const whole = Math.floor(d);
    const min = Math.floor((d - whole) * 60);
    return `${whole}°${String(min).padStart(2, '0')}'`;
  }

  function renderResult(data) {
    resultEmpty.hidden = true;
    resultContent.hidden = false;

    const asc = data.chart.ascendant;
    summaryBar.innerHTML = '';
    const items = [
      ['Ascendant', `${asc.sign} ${fmtDeg(asc.degreeInSign)}`],
      ['Asc. Nakṣatra', `${asc.nakshatra} · Pada ${asc.nakshatraPada}`],
      ['UTC Instant', data.utcInstant.replace('T', ' ').replace('Z', ' Z')],
      ['Ayanāṁśa', `${data.chart.meta.ayanamsa.toFixed(4)}°`],
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
    data.chart.planets.forEach((p) => {
      const tr = document.createElement('tr');
      const statusTags = [
        p.retrograde ? '<span class="status-tag status-tag--retro">R</span>' : '',
        p.combust ? '<span class="status-tag status-tag--combust">Combust</span>' : '',
      ].join('');
      tr.innerHTML = `
        <td>${p.name}</td>
        <td>${p.sign}</td>
        <td>${fmtDeg(p.degreeInSign)}</td>
        <td>H${p.house}</td>
        <td>${p.nakshatra}</td>
        <td>${p.nakshatraPada}</td>
        <td>${p.navamsaSign}</td>
        <td>${statusTags || '—'}</td>
      `;
      tbody.appendChild(tr);
    });

    metaStrip.innerHTML = `
      <span>Obliquity: ${data.chart.meta.obliquity.toFixed(4)}°</span>
      <span>RAMC: ${data.chart.meta.ramc.toFixed(3)}°</span>
      <span>GAST at birth: ${data.chart.meta.gastHours.toFixed(4)}h</span>
      <span>JD (TT): ${data.chart.meta.julianDayTT.toFixed(5)}</span>
    `;
  }
})();

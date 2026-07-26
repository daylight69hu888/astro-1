(function () {
  const CUSTOM_KEY = 'chitraYantra.customCountries';

  const countryList = document.getElementById('countryList');
  const addToggle = document.getElementById('addCountryToggle');
  const addForm = document.getElementById('addCountryForm');
  const ccPlace = document.getElementById('ccPlace');
  const ccPlaceHint = document.getElementById('ccPlaceHint');
  const ccPlaceMatches = document.getElementById('ccPlaceMatches');
  const ccLat = document.getElementById('ccLat');
  const ccLon = document.getElementById('ccLon');
  const ccTz = document.getElementById('ccTz');
  const ccError = document.getElementById('ccError');

  const styleToggle = document.getElementById('styleToggle');
  const resultEmpty = document.getElementById('resultEmpty');
  const resultContent = document.getElementById('resultContent');
  const countryHeader = document.getElementById('countryHeader');
  const summaryBar = document.getElementById('summaryBar');
  const chartSvg = document.getElementById('chartSvg');
  const metaStrip = document.getElementById('metaStrip');

  let currentChartStyle = 'north';
  let lastChart = null;
  let geocodeTimer = null;

  function loadCustomCountries() {
    try { return JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]'); } catch (e) { return []; }
  }
  function saveCustomCountries(list) {
    try { localStorage.setItem(CUSTOM_KEY, JSON.stringify(list)); } catch (e) { /* non-fatal */ }
  }

  function allCountries() {
    return [...window.CHITRA_DEFAULT_COUNTRIES, ...loadCustomCountries()];
  }

  function renderCountryList() {
    countryList.innerHTML = '';
    allCountries().forEach((c) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'country-card';
      card.innerHTML = `
        <span class="country-card__name">${c.name}</span>
        <span class="country-card__meta">${c.date} · ${c.place}</span>
      `;
      card.addEventListener('click', () => selectCountry(c));
      countryList.appendChild(card);
    });
  }
  renderCountryList();

  // ---------- Live clock (same as other pages) ----------
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

  // ---------- Style toggle ----------
  styleToggle.addEventListener('click', (e) => {
    const btn = e.target.closest('.toggle__opt');
    if (!btn) return;
    document.querySelectorAll('.toggle__opt').forEach((b) => b.classList.remove('toggle__opt--active'));
    btn.classList.add('toggle__opt--active');
    currentChartStyle = btn.dataset.style;
    if (lastChart) window.VedicChartRender.renderChart(chartSvg, lastChart, currentChartStyle, false);
  });

  // ---------- Add-country form toggle + geocode autocomplete (same pattern as Birth Chart) ----------
  addToggle.addEventListener('click', () => {
    addForm.hidden = !addForm.hidden;
    addToggle.textContent = addForm.hidden ? '+ Add another country' : '– Hide form';
  });

  ccPlace.addEventListener('input', () => {
    clearTimeout(geocodeTimer);
    const q = ccPlace.value.trim();
    if (q.length < 3) { ccPlaceMatches.hidden = true; return; }
    geocodeTimer = setTimeout(() => doGeocode(q), 500);
  });
  async function doGeocode(q) {
    ccPlaceHint.textContent = 'Searching…';
    try {
      const res = await fetch(`/.netlify/functions/geocode?place=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (!res.ok || !data.matches || !data.matches.length) {
        ccPlaceMatches.hidden = true;
        ccPlaceHint.textContent = data.error || 'No matches — enter lat/lon/timezone manually.';
        return;
      }
      ccPlaceMatches.innerHTML = '';
      data.matches.forEach((m) => {
        const div = document.createElement('div');
        div.className = 'matches__item';
        div.textContent = m.displayName;
        div.addEventListener('click', () => {
          ccPlace.value = m.displayName;
          ccLat.value = m.lat.toFixed(6);
          ccLon.value = m.lon.toFixed(6);
          ccTz.value = m.timezone;
          ccPlaceMatches.hidden = true;
          ccPlaceHint.textContent = `Resolved: ${m.timezone}`;
        });
        ccPlaceMatches.appendChild(div);
      });
      ccPlaceMatches.hidden = false;
      ccPlaceHint.textContent = 'Choose the closest match.';
    } catch (e) {
      ccPlaceHint.textContent = 'Lookup failed — enter lat/lon/timezone manually.';
    }
  }
  document.addEventListener('click', (e) => {
    if (!ccPlaceMatches.contains(e.target) && e.target !== ccPlace) ccPlaceMatches.hidden = true;
  });

  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    ccError.hidden = true;
    const name = document.getElementById('ccName').value.trim();
    const place = ccPlace.value.trim();
    const date = document.getElementById('ccDate').value;
    let time = document.getElementById('ccTime').value;
    if (time.length === 5) time += ':00';
    const lat = ccLat.value, lon = ccLon.value, timezone = ccTz.value.trim();

    if (!name || !place || !date || !time || !lat || !lon || !timezone) {
      ccError.textContent = 'Fill in every field (use the place search to auto-fill lat/lon/timezone).';
      ccError.hidden = false;
      return;
    }

    const entry = { id: 'custom-' + Date.now(), name, place, date, time, lat: parseFloat(lat), lon: parseFloat(lon), timezone };
    const list = loadCustomCountries();
    list.push(entry);
    saveCustomCountries(list);
    renderCountryList();
    addForm.reset();
    addForm.hidden = true;
    addToggle.textContent = '+ Add another country';
    selectCountry(entry);
  });

  // ---------- Selecting & calculating a country's chart ----------
  function fmtDeg(d) {
    const whole = Math.floor(d);
    const min = Math.floor((d - whole) * 60);
    return `${whole}°${String(min).padStart(2, '0')}'`;
  }

  async function selectCountry(c) {
    document.querySelectorAll('.country-card').forEach((el) => el.classList.remove('country-card--active'));
    resultEmpty.hidden = true;
    resultContent.hidden = true;
    countryHeader.innerHTML = `<span class="country-header__name">${c.name}</span><span class="country-header__loading">Calculating…</span>`;
    resultContent.hidden = false;

    try {
      const res = await fetch('/.netlify/functions/birth-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: c.date, time: c.time, lat: c.lat, lon: c.lon, timezone: c.timezone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Calculation failed.');
      lastChart = data.chart;
      renderResult(c, data);
    } catch (err) {
      countryHeader.innerHTML = `<span class="country-header__name">${c.name}</span><span class="country-header__loading">Error: ${err.message}</span>`;
    }
  }

  function renderResult(c, data) {
    countryHeader.innerHTML = `
      <span class="country-header__name">${c.name}</span>
      <span class="country-header__date">${c.date} ${c.time} · ${c.place}</span>
      ${c.note ? `<span class="country-header__note">${c.note}</span>` : ''}
      ${c.altNote ? `<span class="country-header__altnote">⚠ ${c.altNote}</span>` : ''}
    `;

    const asc = data.chart.ascendant;
    summaryBar.innerHTML = '';
    [
      ['Ascendant', `${asc.sign} ${fmtDeg(asc.degreeInSign)}`],
      ['Asc. Nakṣatra', `${asc.nakshatra} · Pada ${asc.nakshatraPada}`],
      ['UTC Instant', data.utcInstant.replace('T', ' ').replace('Z', ' Z')],
      ['Ayanāṁśa', `${data.chart.meta.ayanamsa.toFixed(4)}°`],
    ].forEach(([label, value]) => {
      const div = document.createElement('div');
      div.className = 'summary__item';
      div.innerHTML = `<span class="summary__label">${label}</span><span class="summary__value">${value}</span>`;
      summaryBar.appendChild(div);
    });

    window.VedicChartRender.renderChart(chartSvg, data.chart, currentChartStyle, false);

    const tbody = document.querySelector('#planetTable tbody');
    tbody.innerHTML = '';
    data.chart.planets.forEach((p) => {
      const statusTags = [
        p.retrograde ? '<span class="status-tag status-tag--retro">R</span>' : '',
        p.combust ? '<span class="status-tag status-tag--combust">Combust</span>' : '',
      ].join('');
      const dignityClass = p.dignity === 'Exalted' ? 'dignity-exalted' : p.dignity === 'Debilitated' ? 'dignity-debilitated' : p.dignity === 'Own Sign' ? 'dignity-own' : '';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.name}</td><td>${p.sign}</td><td>${fmtDeg(p.degreeInSign)}</td><td>H${p.house}</td>
        <td>${p.nakshatra}</td><td>${p.nakshatraPada}</td><td class="${dignityClass}">${p.dignity || '—'}</td><td>${statusTags || '—'}</td>
      `;
      tbody.appendChild(tr);
    });

    metaStrip.innerHTML = `
      <span>Obliquity: ${data.chart.meta.obliquity.toFixed(4)}°</span>
      <span>RAMC: ${data.chart.meta.ramc.toFixed(3)}°</span>
      <span>JD (TT): ${data.chart.meta.julianDayTT.toFixed(5)}</span>
    `;
  }
})();

// reports-narrative.js — builds the "Narrative Prediction" report as ONE continuous,
// chronological read — no section headers, no separate "Big Picture" box. Every date/
// sign/nakṣatra used to pick the right paragraph is real, scanned ephemeris data; the
// paragraph text itself comes straight from the user's own planet-content.js library.
(function () {
  const FW = window.ChitraPredictionFramework;
  const PC = window.ChitraPlanetContent;
  const dignityAt = window.ChitraInterpretation.dignityAt;

  function fmtDate(iso) {
    return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  }
  function fmtRange(start, end) { return `${fmtDate(start)} \u2013 ${fmtDate(end)}`; }
  function overlaps(aStart, aEnd, bStart, bEnd) { return aStart < bEnd && bStart < aEnd; }
  function clip(val, lo, hi) { return val < lo ? lo : (val > hi ? hi : val); }

  // Jupiter, Saturn, Rāhu and Ketu move slowly enough that each nakṣatra sub-window is
  // its own genuinely distinct, report-worthy stretch — these get nakṣatra-level detail.
  // Sun, Mercury, Venus and Mars move fast enough that nakṣatra-level would flood a
  // report with near-daily entries, so they're reported at sign level.
  const NAKSHATRA_LEVEL_PLANETS = ['Jupiter', 'Saturn', 'Rahu', 'Ketu'];

  function buildWindows(changePoints, initialValue, rangeStart, rangeEnd, valueKey) {
    const windows = [];
    let current = initialValue;
    let windowStart = rangeStart;
    changePoints.forEach((cp) => {
      windows.push({ value: current, start: windowStart, end: cp.date });
      current = cp[valueKey];
      windowStart = cp.date;
    });
    windows.push({ value: current, start: windowStart, end: rangeEnd });
    return windows;
  }

  // ---------- Build one block per contiguous sign-stay, per tracked planet ----------
  function buildTransitBlocks(events, initialPlanets, rangeStart, rangeEnd) {
    const blocks = [];
    FW.MAJOR_PLANETS.forEach((planet) => {
      const initial = initialPlanets.find((p) => p.name === planet);
      if (!initial) return;

      const ingressCPs = events.filter((e) => e.type === 'ingress' && e.planet === planet)
        .map((e) => ({ date: e.date, toSign: e.toSign }));
      const nakshatraCPs = events.filter((e) => e.type === 'nakshatraIngress' && e.planet === planet)
        .map((e) => ({ date: e.date, toNakshatra: e.toNakshatra }));

      const signWindows = buildWindows(ingressCPs, initial.sign, rangeStart, rangeEnd, 'toSign');
      const nakWindows = buildWindows(nakshatraCPs, initial.nakshatra, rangeStart, rangeEnd, 'toNakshatra');

      signWindows.forEach((sw) => {
        if (sw.start >= sw.end) return;
        const nakshatraSub = nakWindows
          .filter((nw) => overlaps(sw.start, sw.end, nw.start, nw.end))
          .map((nw) => ({ nakshatra: nw.value, start: clip(nw.start, sw.start, sw.end), end: clip(nw.end, sw.start, sw.end) }));
        blocks.push({ planet, sign: sw.value, dignity: dignityAt(planet, sw.value), start: sw.start, end: sw.end, nakshatraSub });
      });
    });
    blocks.sort((a, b) => a.start.localeCompare(b.start) || a.planet.localeCompare(b.planet));
    return blocks;
  }

  // ---------- Turn blocks into dated prediction entries, pulling real text from planet-content.js ----------
  function buildEntries(blocks) {
    const entries = [];
    blocks.forEach((b) => {
      const useNakshatra = NAKSHATRA_LEVEL_PLANETS.includes(b.planet) && PC.byNakshatra[b.planet];
      if (useNakshatra) {
        b.nakshatraSub.forEach((n) => {
          if (n.start >= n.end) return;
          const text = PC.byNakshatra[b.planet][n.nakshatra];
          if (!text) return;
          entries.push({ start: n.start, end: n.end, planet: b.planet, sign: b.sign, nakshatra: n.nakshatra, text });
        });
      } else {
        const text = PC.bySign[b.planet] && PC.bySign[b.planet][b.sign];
        if (!text) return;
        entries.push({ start: b.start, end: b.end, planet: b.planet, sign: b.sign, nakshatra: null, text });
      }
    });
    entries.sort((a, b) => a.start.localeCompare(b.start) || a.planet.localeCompare(b.planet));
    return entries;
  }

  // ---------- Entry point ----------
  function generate(events, initialPlanets, rangeStart, rangeEnd, rangeLabel) {
    const blocks = buildTransitBlocks(events, initialPlanets, rangeStart, rangeEnd);
    const entries = buildEntries(blocks);

    const paragraphs = entries.map((e) => {
      const where = e.nakshatra ? `${e.sign}, moving through the ${e.nakshatra} nak\u1E63atra` : e.sign;
      return `<p class="narrative-flow__p"><strong>${fmtRange(e.start, e.end)} \u2014 ${e.planet} in ${where}.</strong> ${e.text}</p>`;
    }).join('');

    return `
      <h1 class="report-title">${rangeLabel}</h1>
      <p class="report-meta">${entries.length} dated window(s) \u00B7 Sidereal \u00B7 Lahiri Ay\u0101n\u0101\u1E43\u015Ba \u00B7 Sun, Mercury, Venus and Mars at sign level; Jupiter, Saturn, R\u0101hu and Ketu at nak\u1E63atra level</p>
      <p class="panel__note" style="margin-bottom:20px;">A chronological read of what each real transit in this range is classically associated with \u2014 genuine possibilities worth watching for, not certainties or guarantees.</p>
      <div class="narrative-flow">${paragraphs}</div>
    `;
  }

  window.ChitraNarrativeReport = { generate, buildTransitBlocks };
})();

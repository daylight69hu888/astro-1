// reports-narrative.js — builds the "Narrative Prediction" report as real-world
// predictions grouped by domain (geopolitics, markets, metals, crypto, macro,
// disasters, society) — not a mechanical "planet in sign" listing. Every date/sign/
// nakṣatra used to COMPUTE the prediction is real, scanned ephemeris data;
// prediction-framework.js data + the EFFECT_PHRASES below decide what it MEANS.
(function () {
  const FW = window.ChitraPredictionFramework;
  const dignityAt = window.ChitraInterpretation.dignityAt;

  function fmtDate(iso) {
    return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  }
  function fmtRange(start, end) { return `${fmtDate(start)} \u2013 ${fmtDate(end)}`; }
  function overlaps(aStart, aEnd, bStart, bEnd) { return aStart < bEnd && bStart < aEnd; }
  function clip(val, lo, hi) { return val < lo ? lo : (val > hi ? hi : val); }

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

  // ---------- Build one block per contiguous sign-stay, per major planet ----------
  // (Internal computation only now — these are never shown to the reader as a list.)
  function buildTransitBlocks(events, initialPlanets, rangeStart, rangeEnd) {
    const blocks = [];
    FW.MAJOR_PLANETS.forEach((planet) => {
      const initial = initialPlanets.find((p) => p.name === planet);
      if (!initial) return;

      const ingressCPs = events.filter((e) => e.type === 'ingress' && e.planet === planet)
        .map((e) => ({ date: e.date, toSign: e.toSign }));
      const nakshatraCPs = events.filter((e) => e.type === 'nakshatraIngress' && e.planet === planet)
        .map((e) => ({ date: e.date, toNakshatra: e.toNakshatra }));
      const stationCPs = events.filter((e) => (e.type === 'stationRetrograde' || e.type === 'stationDirect') && e.planet === planet)
        .map((e) => ({ date: e.date, toRetro: e.type === 'stationRetrograde' }));

      const signWindows = buildWindows(ingressCPs, initial.sign, rangeStart, rangeEnd, 'toSign');
      const nakWindows = buildWindows(nakshatraCPs, initial.nakshatra, rangeStart, rangeEnd, 'toNakshatra');
      const retroWindows = buildWindows(stationCPs, !!initial.retrograde, rangeStart, rangeEnd, 'toRetro');

      signWindows.forEach((sw) => {
        if (sw.start >= sw.end) return;
        const retroDuring = retroWindows.some((rw) => rw.value && overlaps(sw.start, sw.end, rw.start, rw.end));
        const nakshatraSub = nakWindows
          .filter((nw) => overlaps(sw.start, sw.end, nw.start, nw.end))
          .map((nw) => ({ nakshatra: nw.value, lord: FW.lordOfNakshatra(nw.value), start: clip(nw.start, sw.start, sw.end), end: clip(nw.end, sw.start, sw.end) }));
        blocks.push({ planet, sign: sw.value, dignity: dignityAt(planet, sw.value), start: sw.start, end: sw.end, retro: retroDuring, nakshatraSub });
      });
    });
    blocks.sort((a, b) => a.start.localeCompare(b.start) || a.planet.localeCompare(b.planet));
    return blocks;
  }

  function scoreOf(block) {
    if (block.dignity === 'Exalted') return 2;
    if (block.dignity === 'Own Sign') return 1;
    if (block.dignity === 'Debilitated') return -2;
    return 0;
  }

  // ---------- Real-world prediction phrase banks, by domain and overall lean ----------
  const EFFECT_PHRASES = {
    geopolitics: {
      favorable: 'International relations have a relatively calmer backdrop here \u2014 more room for diplomacy and negotiated settlements than for fresh conflict.',
      challenging: 'Elevated risk of friction between nations through this window \u2014 border tensions, sudden policy shocks, sanctions or military posturing are more likely to make headlines.',
      mixed: 'A two-sided stretch for geopolitics \u2014 expect occasional flare-ups alongside genuine diplomatic movement, without anything fully resolving either way.',
    },
    stockMarket: {
      favorable: 'Broad equity markets, including Nifty and global indices, have a supportive backdrop here \u2014 conditions favor rallies and institutional buying over sustained selling, particularly in banking and growth-linked sectors.',
      challenging: 'A tougher stretch for stock markets \u2014 expect choppy, range-bound or corrective trade, with defensive sectors more likely to hold up better than high-beta ones.',
      mixed: 'Markets are more likely to stay volatile and headline-driven than to trend cleanly in either direction through this window.',
    },
    metals: {
      favorable: 'Gold and silver have a constructive backdrop \u2014 continued safe-haven and institutional buying interest is plausible, with any dips likely to stay shallow.',
      challenging: 'Precious metals could see a corrective phase here \u2014 profit-booking and a stronger case for risk assets may cap further upside.',
      mixed: 'Expect sideways, two-way trade in gold and silver rather than a clean directional move.',
    },
    crypto: {
      favorable: 'A speculative, high-energy backdrop for Bitcoin and altcoins \u2014 sharp rallies and a surge in retail interest are plausible, alongside equally sharp pullbacks.',
      challenging: 'Crypto markets face a more fragile stretch here \u2014 regulatory pressure, exchange stress or a sharp risk-off move are more likely than a clean breakout.',
      mixed: 'This reads more like a basing/accumulation phase for crypto than a breakout one \u2014 sudden sharp moves are possible, but the bigger structural bottom-building likely continues.',
    },
    macro: {
      favorable: 'The macro backdrop \u2014 currency strength, bond yields and the banking system \u2014 leans supportive, with policy more likely to stay accommodative than restrictive.',
      challenging: 'Expect pressure on the macro side \u2014 firmer bond yields, currency stress or tighter credit conditions are more likely through this window.',
      mixed: 'Macro signals are mixed here \u2014 inflation, currency and bond-yield trends are more likely to stay choppy than settle into a clear direction.',
    },
    disasters: {
      favorable: 'A relatively quieter stretch for major seismic, climate or structural events \u2014 nothing in this pattern strongly elevates the risk.',
      challenging: 'Some elevated risk of a seismic, structural or extreme-weather event through this window \u2014 it\u2019s worth staying a little more alert than usual if you\u2019re in a vulnerable area.',
      mixed: 'Risk of a disruptive natural event is present but not dominant here \u2014 worth being prepared without expecting anything major.',
    },
    society: {
      favorable: 'Public mood is likely to stay relatively settled through this window \u2014 more cooperation, optimism and stability in daily life than disruption.',
      challenging: 'Expect higher collective anxiety, more disputes or unrest, and a generally more strained public mood through this window.',
      mixed: 'Public mood is likely to swing between optimism and anxiety here rather than settle in either direction.',
    },
  };

  // Varying phrasing for the "sharpest window" callout, so when the same major
  // transit legitimately drives several linked domains (e.g. a big Jupiter move
  // affecting markets, metals, macro and society all at once), each section still
  // reads differently rather than repeating the identical sentence.
  // One template per CATEGORY_DEF entry (7) so that even when the same transit
  // legitimately drives several categories at once, no two sections read identically.
  const NOTABLE_TEMPLATES = [
    (planet, reason, sign, range) => `This reads sharpest around ${range}, when ${planet} is ${reason} in ${sign}.`,
    (planet, reason, sign, range) => `Expect this to be most pronounced around ${range}, with ${planet} ${reason} in ${sign} during that stretch.`,
    (planet, reason, sign, range) => `Watch the window around ${range} especially \u2014 ${planet}'s ${reason} placement in ${sign} falls right there.`,
    (planet, reason, sign, range) => `The clearest stretch for this is ${range}, as ${planet} sits ${reason} in ${sign}.`,
    (planet, reason, sign, range) => `Look especially at ${range}, when ${planet}'s placement in ${sign} (${reason}) is most active.`,
    (planet, reason, sign, range) => `${planet} in ${sign} (${reason}) is the key driver here, most active ${range}.`,
    (planet, reason, sign, range) => `The effect peaks around ${range}, tied to ${planet} being ${reason} in ${sign}.`,
  ];

  function buildCategoryParagraph(catDef, blocks, templateIndex) {
    // Only planets this domain is DIRECTLY ruled by decide both the tone and the
    // "sharpest window" citation \u2014 a nakshatra-lord match alone (e.g. Jupiter merely
    // passing through a Saturn-ruled nakshatra) isn't enough to call Jupiter a driver
    // of Natural Disasters, even though Jupiter might dominate elsewhere in the chart.
    const primary = blocks.filter((b) => catDef.planets.includes(b.planet));
    if (!primary.length) return null;
    const score = primary.reduce((sum, b) => sum + scoreOf(b), 0);
    const bucket = score > 0 ? 'favorable' : score < 0 ? 'challenging' : 'mixed';
    let text = EFFECT_PHRASES[catDef.key][bucket];

    const notable = primary.filter((b) => scoreOf(b) !== 0).sort((a, b) => Math.abs(scoreOf(b)) - Math.abs(scoreOf(a)))[0];
    if (notable) {
      const reason = notable.dignity === 'Exalted' ? 'at its strongest' : notable.dignity === 'Own Sign' ? 'well placed' : 'in a weaker spot';
      const tmpl = NOTABLE_TEMPLATES[templateIndex % NOTABLE_TEMPLATES.length];
      text += ` ${tmpl(notable.planet, reason, notable.sign, fmtRange(notable.start, notable.end))}`;
    }
    return text;
  }

  // ---------- Short opening context (no planet-by-planet listing) ----------
  function buildOverview(blocks, rangeLabel) {
    const marsBlocks = blocks.filter((b) => b.planet === 'Mars');
    const score = blocks.reduce((sum, b) => sum + scoreOf(b), 0);
    const overallTxt = score > 2
      ? 'the period overall leans favorable, with more windows of support than strain'
      : score < -2
        ? 'the period overall leans challenging \u2014 it\u2019s worth moving a little more carefully and avoiding big new commitments where you can'
        : 'the period is a genuinely mixed one \u2014 some stretches easier than others, without one clear overall direction';
    const marsTxt = marsBlocks.length > 1
      ? ` Mars moves fast through this window, changing sign ${marsBlocks.length} times \u2014 each shift tends to bring a short, sharp burst of urgency, sudden news or friction rather than a lasting trend, so expect the mood to swing in bursts rather than move smoothly.`
      : '';
    return `Taken together, ${overallTxt}.${marsTxt} The sections below break down what that's likely to mean across world events, markets, metals, crypto, the broader economy, natural-event risk, and daily life.`;
  }

  // ---------- Entry point ----------
  function generate(events, initialPlanets, rangeStart, rangeEnd, rangeLabel) {
    const blocks = buildTransitBlocks(events, initialPlanets, rangeStart, rangeEnd);
    const overview = buildOverview(blocks, rangeLabel);

    const sections = FW.CATEGORY_DEF.map((catDef, i) => {
      const text = buildCategoryParagraph(catDef, blocks, i);
      if (!text) return '';
      return `
        <div class="narrative-section">
          <h3 class="narrative-section__title">${catDef.label}</h3>
          <p class="narrative-section__text">${text}</p>
        </div>`;
    }).join('');

    return `
      <h1 class="report-title">${rangeLabel}</h1>
      <p class="report-meta">Sidereal \u00B7 Lahiri Ay\u0101n\u0101\u1E43\u015Ba \u00B7 Based on real scanned transits of Mars, Jupiter, Saturn, R\u0101hu and Ketu across this range</p>
      <div class="narrative-overview">
        <h2 class="table__title">The Big Picture</h2>
        <p class="narrative-overview__text">${overview}</p>
      </div>
      ${sections}
      <p class="panel__note" style="margin-top:18px;">A read of what the real transits in this range tend to bring \u2014 not financial advice, and not a guarantee.</p>
    `;
  }

  window.ChitraNarrativeReport = { generate, buildTransitBlocks };
})();

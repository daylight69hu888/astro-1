// reports-narrative.js — builds the "Narrative Prediction" report. Every date, sign,
// nakṣatra, dignity and retrograde flag used here is real, scanned ephemeris data
// (from /.netlify/functions/scan and the range-start snapshot) — nothing is invented.
// The prediction-framework.js data decides what each real transit MEANS; this file
// does the date-range bookkeeping and assembles the text.
(function () {
  const FW = window.ChitraPredictionFramework;
  const dignityAt = window.ChitraInterpretation.dignityAt;

  function fmtDate(iso) {
    return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  }
  function fmtRange(start, end) { return `${fmtDate(start)} \u2013 ${fmtDate(end)}`; }
  function dignityClass(d) {
    if (d === 'Exalted') return 'dignity-exalted';
    if (d === 'Debilitated') return 'dignity-debilitated';
    if (d === 'Own Sign') return 'dignity-own';
    return '';
  }

  // Two date ranges (ISO strings, lexically comparable) overlap if each starts before
  // the other ends.
  function overlaps(aStart, aEnd, bStart, bEnd) { return aStart < bEnd && bStart < aEnd; }
  function clip(val, lo, hi) { return val < lo ? lo : (val > hi ? hi : val); }

  // Turn a sorted list of {date, value} change-points plus an initial value into
  // contiguous windows covering [rangeStart, rangeEnd].
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
        if (sw.start >= sw.end) return; // zero-length edge window, skip
        const retroDuring = retroWindows.some((rw) => rw.value && overlaps(sw.start, sw.end, rw.start, rw.end));
        const nakshatraSub = nakWindows
          .filter((nw) => overlaps(sw.start, sw.end, nw.start, nw.end))
          .map((nw) => ({
            nakshatra: nw.value,
            lord: FW.lordOfNakshatra(nw.value),
            start: clip(nw.start, sw.start, sw.end),
            end: clip(nw.end, sw.start, sw.end),
          }));
        blocks.push({
          planet,
          sign: sw.value,
          dignity: dignityAt(planet, sw.value), // null for Rahu/Ketu — no classical exaltation/debilitation assigned
          start: sw.start,
          end: sw.end,
          retro: retroDuring,
          nakshatraSub,
        });
      });
    });
    blocks.sort((a, b) => a.start.localeCompare(b.start) || a.planet.localeCompare(b.planet));
    return blocks;
  }

  // ---------- Directional tag for one category within one block ----------
  function directionTag(block, catDef, nakHits) {
    const ketuTouch = block.planet === 'Ketu' || nakHits.some((n) => n.lord === 'Ketu');
    if (catDef.key === 'crypto' && ketuTouch) return { label: 'Bottoming / Accumulation', cls: '' };
    if (block.dignity === 'Exalted' || block.dignity === 'Own Sign') {
      return block.retro ? { label: 'Volatile \u2014 Bullish lean', cls: 'view-bullish' } : { label: 'Bullish', cls: 'view-bullish' };
    }
    if (block.dignity === 'Debilitated') {
      return block.retro ? { label: 'Volatile \u2014 Bearish lean', cls: 'view-bearish' } : { label: 'Bearish', cls: 'view-bearish' };
    }
    if (block.retro) return { label: 'Volatile / Reversal risk', cls: '' };
    return { label: 'Mixed / Neutral', cls: '' };
  }

  // ---------- One category paragraph for one block (null if not relevant) ----------
  function categoryParagraph(block, catDef) {
    const relevantByPlanet = catDef.planets.includes(block.planet);
    const nakHits = block.nakshatraSub.filter((n) => n.lord && catDef.planets.includes(n.lord));
    if (!relevantByPlanet && nakHits.length === 0) return null;

    const planetInfo = FW.PLANET_INFO[block.planet];
    const signNote = FW.SIGN_INFO[block.sign];
    const parts = [];
    if (relevantByPlanet) {
      parts.push(`${block.planet} transiting ${block.sign} brings its rulership over ${planetInfo.karaka} to bear here; read against the sign's own domain \u2014 ${signNote} \u2014 this tilts ${catDef.angle}.`);
    } else {
      parts.push(`${block.planet}'s own transit through ${block.sign} isn't a direct driver of ${catDef.angle}, but the nak\u1E63atra sub-window below still carries real weight here.`);
    }
    nakHits.forEach((n) => {
      parts.push(`${fmtRange(n.start, n.end)} \u2014 moving through ${n.nakshatra} (${n.lord}-ruled): ${FW.NAKSHATRA_TRIGGER[n.lord]}.`);
    });
    const tag = directionTag(block, catDef, nakHits);
    return { tag, html: parts.join(' ') };
  }

  // ---------- Render one block as an HTML card ----------
  function renderBlock(block, index) {
    const dignityTxt = block.dignity ? ` (${block.dignity})` : '';
    const retroTxt = block.retro ? ' \u2014 retrograde for some or all of this window' : '';
    const header = `${block.planet} in ${block.sign}${dignityTxt}`;
    const nakList = block.nakshatraSub.map((n) => `${n.nakshatra} (${n.lord}-ruled, ${fmtRange(n.start, n.end)})`).join(' \u2192 ');

    const sections = FW.CATEGORY_DEF.map((catDef) => {
      const para = categoryParagraph(block, catDef);
      if (!para) return '';
      return `
        <div class="transit-block__section">
          <div class="transit-block__section-head">
            <span class="transit-block__section-label">${catDef.label}</span>
            <span class="strategy-box__tag ${para.tag.cls}">${para.tag.label}</span>
          </div>
          <p class="transit-block__section-text">${para.html}</p>
        </div>`;
    }).join('');

    return `
      <article class="transit-block" id="block-${index}">
        <div class="transit-block__header">
          <h2 class="transit-block__title">${header}</h2>
          <span class="transit-block__range">${fmtRange(block.start, block.end)}${retroTxt}</span>
        </div>
        <p class="transit-block__nak-path">Nak\u1E63atra path: ${nakList}</p>
        ${sections}
      </article>`;
  }

  // ---------- Timeline overview (quick-reference list at the top) ----------
  function renderTimeline(blocks) {
    const rows = blocks.map((b, i) => {
      const dignityTxt = b.dignity ? ` <span class="${dignityClass(b.dignity)}">(${b.dignity})</span>` : '';
      return `<li><a href="#block-${i}">${fmtRange(b.start, b.end)} \u2014 <strong>${b.planet}</strong> in ${b.sign}${dignityTxt}${b.retro ? ' <span class="view-bearish">[R]</span>' : ''}</a></li>`;
    }).join('');
    return `<div class="timeline-overview"><h2 class="table__title">Transit Timeline</h2><ul class="timeline-overview__list">${rows}</ul></div>`;
  }

  // ---------- Entry point ----------
  function generate(events, initialPlanets, rangeStart, rangeEnd, rangeLabel) {
    const blocks = buildTransitBlocks(events, initialPlanets, rangeStart, rangeEnd);
    const blockHtml = blocks.map((b, i) => renderBlock(b, i)).join('');
    return `
      <h1 class="report-title">${rangeLabel} \u2014 Narrative Prediction Report</h1>
      <p class="report-meta">${blocks.length} major transit window(s) \u00B7 Sidereal \u00B7 Lahiri Ay\u0101n\u0101\u1E43\u015Ba \u00B7 Sun, Mars, Jupiter, Saturn, R\u0101hu, Ketu tracked at sign level with nak\u1E63atra sub-detail</p>
      <p class="panel__note" style="margin-bottom:20px;">Every date, sign and nak\u1E63atra below is from the real scanned ephemeris for this range. Directional tags are derived from classical dignity (exaltation/own-sign/debilitation) and retrograde status \u2014 not financial advice.</p>
      ${renderTimeline(blocks)}
      ${blockHtml}
    `;
  }

  window.ChitraNarrativeReport = { generate, buildTransitBlocks };
})();

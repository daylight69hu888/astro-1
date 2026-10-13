// reports-narrative.js — builds the short "Narrative Prediction" report as ONE
// cohesive read: a short "Big Picture" paragraph, then a single compact chronological
// timeline (not separate boxed reports per planet). Every date/sign/nakṣatra used is
// real, scanned ephemeris data; prediction-framework.js data decides what it MEANS.
(function () {
  const FW = window.ChitraPredictionFramework;
  const dignityAt = window.ChitraInterpretation.dignityAt;

  function fmtDate(iso) {
    return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  }
  function fmtRange(start, end) { return `${fmtDate(start)} \u2013 ${fmtDate(end)}`; }
  function overlaps(aStart, aEnd, bStart, bEnd) { return aStart < bEnd && bStart < aEnd; }
  function clip(val, lo, hi) { return val < lo ? lo : (val > hi ? hi : val); }
  function ordinalSuffix(n) {
    const s = ['th', 'st', 'nd', 'rd'], v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  }

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

  // ---------- Plain-language tone (works outside market contexts too) ----------
  function toneFor(block) {
    const d = block.dignity;
    if (d === 'Exalted' || d === 'Own Sign') return block.retro ? { word: 'favorable, a little bumpy', cls: 'view-bullish' } : { word: 'favorable', cls: 'view-bullish' };
    if (d === 'Debilitated') return block.retro ? { word: 'challenging and volatile', cls: 'view-bearish' } : { word: 'challenging', cls: 'view-bearish' };
    if (block.retro) return { word: 'mixed, expect reversals', cls: '' };
    return { word: 'neutral', cls: '' };
  }
  function reasonFor(block) {
    if (block.dignity === 'Exalted') return 'at its strongest here';
    if (block.dignity === 'Own Sign') return 'comfortable, in its own sign';
    if (block.dignity === 'Debilitated') return 'weakened \u2014 friction and delay are more likely';
    return 'an ordinary stretch for it';
  }

  function houseForSign(sign, signOrder, refInfo) {
    if (!refInfo || !signOrder) return null;
    const signIdx = signOrder.indexOf(sign);
    if (signIdx === -1) return null;
    return ((signIdx - refInfo.signIndex + 12) % 12) + 1;
  }

  function joinWithAnd(arr) {
    if (arr.length <= 1) return arr.join('');
    if (arr.length === 2) return arr.join(' and ');
    return arr.slice(0, -1).join(', ') + ', and ' + arr[arr.length - 1];
  }

  // ---------- "Big Picture" overview: the one paragraph most people will actually read ----------
  function buildOverview(blocks, signOrder, refInfo) {
    const anchors = blocks.filter((b) => b.planet !== 'Mars');
    const marsBlocks = blocks.filter((b) => b.planet === 'Mars');

    const anchorPhrases = anchors.map((b) => {
      const h = houseForSign(b.sign, signOrder, refInfo);
      const houseTxt = h ? `, your ${h}${ordinalSuffix(h)} house` : '';
      return `${b.planet} in ${b.sign}${houseTxt} (${toneFor(b).word})`;
    });
    const backdropSentence = anchorPhrases.length
      ? `The backdrop for this period is ${joinWithAnd(anchorPhrases)}.`
      : '';

    let marsSentence = '';
    if (marsBlocks.length) {
      const notable = marsBlocks.filter((b) => b.dignity && b.dignity !== 'Neutral');
      marsSentence = marsBlocks.length > 1
        ? `Mars moves much faster and shifts sign several times across this period, each shift bringing a short burst of urgency, tension or sudden news`
        : `Mars holds one sign for this whole period`;
      if (notable.length) {
        const list = notable.map((b) => `${b.sign} (${fmtRange(b.start, b.end)})`).join(', ');
        marsSentence += ` \u2014 its sharpest stretch(es): ${list}`;
      }
      marsSentence += '.';
    }

    let score = 0;
    blocks.forEach((b) => { const t = toneFor(b); if (t.cls === 'view-bullish') score += 1; else if (t.cls === 'view-bearish') score -= 1; });
    const overallTxt = score > 0 ? 'Overall, this leans favorable.' : score < 0 ? 'Overall, this leans challenging \u2014 move carefully and avoid big new commitments where you can.' : 'Overall it\u2019s a mixed period \u2014 some stretches easier than others.';

    return `${backdropSentence} ${marsSentence} ${overallTxt}`.trim();
  }

  // ---------- One compact line per transit (not a separate "report") ----------
  function buildLine(block, signOrder, refInfo) {
    const h = houseForSign(block.sign, signOrder, refInfo);
    const houseTxt = h ? `, your ${h}${ordinalSuffix(h)} house` : '';
    const tone = toneFor(block);
    const toneSpan = tone.cls ? `<span class="${tone.cls}">${tone.word}</span>` : tone.word;
    const retroTxt = block.retro ? ' (retrograde for part of this)' : '';
    return `<strong>${block.planet} in ${block.sign}${houseTxt}</strong>${retroTxt} \u2014 ${toneSpan}, ${reasonFor(block)}.`;
  }

  // ---------- Entry point ----------
  // refInfo (optional): { signIndex, label } from a selected birth-chart House Reference.
  function generate(events, initialPlanets, rangeStart, rangeEnd, rangeLabel, signOrder, refInfo) {
    const blocks = buildTransitBlocks(events, initialPlanets, rangeStart, rangeEnd);
    const overview = buildOverview(blocks, signOrder, refInfo);

    const timelineRows = blocks.map((b) => `<li><span class="timeline-row__date">${fmtRange(b.start, b.end)}</span><span class="timeline-row__text">${buildLine(b, signOrder, refInfo)}</span></li>`).join('');

    const refNote = refInfo ? `Houses shown relative to ${refInfo.label}.` : 'No house reference selected \u2014 showing signs only.';

    return `
      <h1 class="report-title">${rangeLabel}</h1>
      <p class="report-meta">${blocks.length} transit window(s) tracked (Mars, Jupiter, Saturn, R\u0101hu, Ketu) \u00B7 Sidereal \u00B7 Lahiri Ay\u0101n\u0101\u1E43\u015Ba \u00B7 ${refNote}</p>
      <div class="narrative-overview">
        <h2 class="table__title">The Big Picture</h2>
        <p class="narrative-overview__text">${overview}</p>
      </div>
      <div class="narrative-timeline">
        <h2 class="table__title">Timeline</h2>
        <ul class="timeline-row-list">${timelineRows}</ul>
      </div>
      <p class="panel__note" style="margin-top:18px;">A plain read of the real transits in this range \u2014 what each period tends to bring, not financial advice.</p>
    `;
  }

  window.ChitraNarrativeReport = { generate, buildTransitBlocks };
})();

// mundane-strategy.js — turns the live snapshot + real upcoming dates into a plain
// tactical read: positioning (Overweight/Underweight/Neutral), a volatility flag,
// and Accumulation Window / Risk Period lines. Nothing here is a fixed/invented
// date — every line traces to an actual computed dignity or an actual scanned date.
(function () {
  const NAKSHATRA_GANA = window.ChitraInterpretation.NAKSHATRA_GANA;
  const { dignityAt, viewHintForDignity } = window.ChitraInterpretation;

  function fmtDate(iso) {
    const d = new Date(iso + 'T00:00:00Z');
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  }

  // ---------- Volatility flag ----------
  // Elevated volatility = any significator retrograde, combust, or transiting a
  // Rakshasa-gana nakshatra right now.
  function volatilitySignal(planets) {
    const reasons = [];
    planets.forEach((p) => {
      if (p.retrograde) reasons.push(`${p.name} retrograde`);
      if (p.combust) reasons.push(`${p.name} combust`);
      if (p.nakshatra && NAKSHATRA_GANA[p.nakshatra] === 'Rakshasa') reasons.push(`${p.name} in ${p.nakshatra} (Rakshasa nakṣatra)`);
    });
    return { flag: reasons.length > 0, reasons };
  }

  // ---------- Positioning line from the tone label ----------
  function positioningLine(toneLabel) {
    if (toneLabel === 'Bullish') {
      return { tag: 'Overweight / Accumulate', cls: 'view-bullish', text: 'Classical strength indicators lean supportive for this theme right now — dips read more as accumulation opportunities than trend breaks, until the dignity picture changes.' };
    }
    if (toneLabel === 'Bearish') {
      return { tag: 'Underweight / Defensive', cls: 'view-bearish', text: 'Classical strain indicators dominate right now — treat rallies with caution and prioritize capital preservation until dignity improves.' };
    }
    return { tag: 'Neutral / Selective', cls: '', text: 'No strong classical lean either way at the moment — sizing and timing matter more than direction here.' };
  }

  // ---------- Accumulation Windows & Risk Periods from real upcoming ingress dates ----------
  // For each significator with a scanned upcoming ingress, compare its dignity now vs.
  // its dignity in the sign it's about to enter. An improvement (e.g. Debilitated/Neutral
  // -> Exalted/Own) is flagged as an Accumulation Window; a decline (-> Debilitated) is
  // flagged as a Risk Period. Both carry the real scanned date.
  function accumulationRiskWindows(planets, upcomingByPlanet) {
    const windows = [];
    planets.forEach((p) => {
      const ev = upcomingByPlanet[p.name];
      if (!ev || ev.type !== 'ingress') return;
      const nowDignity = p.dignity || 'Neutral';
      const nextDignity = dignityAt(p.name, ev.toSign) || 'Neutral';
      const nowHint = viewHintForDignity(nowDignity);
      const nextHint = viewHintForDignity(nextDignity);
      const nowScore = nowHint ? (nowHint.label === 'Bullish' ? 1 : -1) : 0;
      const nextScore = nextHint ? (nextHint.label === 'Bullish' ? 1 : -1) : 0;
      if (nextScore > nowScore) {
        windows.push({ type: 'Accumulation Window', cls: 'view-bullish', planet: p.name, rawDate: ev.date, date: fmtDate(ev.date), sign: ev.toSign, note: `${p.name} enters ${ev.toSign} (${nextDignity}) around ${fmtDate(ev.date)} — dignity improves from here.` });
      } else if (nextScore < nowScore) {
        windows.push({ type: 'Risk Period', cls: 'view-bearish', planet: p.name, rawDate: ev.date, date: fmtDate(ev.date), sign: ev.toSign, note: `${p.name} enters ${ev.toSign} (${nextDignity}) around ${fmtDate(ev.date)} — dignity weakens from here.` });
      }
    });
    // Nearest-first
    windows.sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate));
    return windows;
  }

  function buildStrategyBox(planets, upcomingByPlanet, toneLabel) {
    const positioning = positioningLine(toneLabel);
    const volatility = volatilitySignal(planets);
    const windows = accumulationRiskWindows(planets, upcomingByPlanet);
    return { positioning, volatility, windows };
  }

  window.ChitraStrategy = { buildStrategyBox, volatilitySignal, accumulationRiskWindows };
})();

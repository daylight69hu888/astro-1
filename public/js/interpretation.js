// interpretation.js — rule-based classical readings, built entirely from real Vedic
// astrology principles (dignity, retrograde, combustion, nakshatra Gana) plus real
// upcoming ingress/nakshatra/station dates pulled from the scanner. No AI call, no
// invented content — every line traces back to a named classical rule or an actual
// computed date. Deliberately avoids trading directives ("buy/sell/hold") — it
// describes classical associations and real upcoming dates; the call stays with you.
// Also deliberately does NOT assign countries/regions to signs — classical geographic
// rulership tables (Kalapurusha/Bhu-mandala schemes) vary significantly between
// source texts and eras, and asserting one as authoritative would be misleading.
(function () {
  const NAKSHATRA_GANA = {
    Ashwini: 'Deva', Mrigashira: 'Deva', Punarvasu: 'Deva', Pushya: 'Deva', Hasta: 'Deva',
    Swati: 'Deva', Anuradha: 'Deva', Shravana: 'Deva', Revati: 'Deva',
    Bharani: 'Manushya', Rohini: 'Manushya', Ardra: 'Manushya', 'Purva Phalguni': 'Manushya',
    'Uttara Phalguni': 'Manushya', 'Purva Ashadha': 'Manushya', 'Uttara Ashadha': 'Manushya',
    'Purva Bhadrapada': 'Manushya', 'Uttara Bhadrapada': 'Manushya',
    Krittika: 'Rakshasa', Ashlesha: 'Rakshasa', Magha: 'Rakshasa', Chitra: 'Rakshasa',
    Vishakha: 'Rakshasa', Jyeshtha: 'Rakshasa', Mula: 'Rakshasa', Dhanishta: 'Rakshasa', Shatabhisha: 'Rakshasa',
  };
  const GANA_TEXT = {
    Deva: 'a Deva (benefic-natured) nakṣatra — classically smoother, more constructive expression',
    Manushya: 'a Manushya (human-natured) nakṣatra — classically mixed, situation-dependent expression',
    Rakshasa: 'a Rakshasa (intense-natured) nakṣatra — classically sharper, more disruptive or transformative expression',
  };
  const GANA_SCORE = { Deva: 0.5, Manushya: 0, Rakshasa: -0.5 };
  const DIGNITY_SCORE = { Exalted: 2, 'Own Sign': 1, Neutral: 0, Debilitated: -2 };

  const DIGNITY_TEXT = {
    Exalted: (p) => `${p} is exalted — classically at full strength, expressing its significations most directly`,
    Debilitated: (p) => `${p} is debilitated — classically under strain, with its significations often delayed or expressed with difficulty`,
    'Own Sign': (p) => `${p} is in its own sign — stable, self-assured strength`,
    Neutral: (p) => `${p} is in a neutral placement — neither notably strengthened nor weakened by sign alone`,
  };
  const DIGNITY_PHRASE = {
    Exalted: (p) => `${p} is exalted here — classically at full strength`,
    Debilitated: (p) => `${p} is debilitated here — classically under strain, often delayed`,
    'Own Sign': (p) => `${p} is in its own sign — stable, self-assured`,
    Neutral: (p) => `${p} is in a neutral placement here`,
  };

  function planetScore(p) {
    let s = (p.dignity && DIGNITY_SCORE[p.dignity] !== undefined) ? DIGNITY_SCORE[p.dignity] : 0;
    if (p.combust) s -= 1;
    if (p.retrograde) s -= 0.5;
    if (p.nakshatra && NAKSHATRA_GANA[p.nakshatra]) s += GANA_SCORE[NAKSHATRA_GANA[p.nakshatra]];
    return s;
  }
  function toneFromScore(total, count) {
    const avg = count ? total / count : 0;
    if (avg >= 1) return { label: 'Supportive lean', text: 'the classical strength indicators lean supportive for this theme right now' };
    if (avg <= -1) return { label: 'Strained lean', text: 'the classical strength indicators lean strained/cautious for this theme right now' };
    return { label: 'Mixed / neutral', text: 'the classical strength indicators are mixed, with no strong lean either way' };
  }

  // ---------- Original bullet-style reading (kept for anywhere it's still used) ----------
  function planetReading(p) {
    const parts = [];
    if (p.dignity && DIGNITY_TEXT[p.dignity]) parts.push(DIGNITY_TEXT[p.dignity](p.name));
    if (p.retrograde) parts.push(`${p.name}'s retrograde motion is classically read as a period of review, reversal, or delay in what it governs`);
    if (p.combust) parts.push(`${p.name} is combust — traditionally weakened, its significations subdued or acting through others rather than independently`);
    if (p.nakshatra && NAKSHATRA_GANA[p.nakshatra]) {
      parts.push(`transiting ${p.nakshatra}, ${GANA_TEXT[NAKSHATRA_GANA[p.nakshatra]]}`);
    }
    return parts.join('; ') + '.';
  }
  function generateReading(categoryLabel, planets) {
    const lines = planets.map(planetReading);
    let total = 0;
    planets.forEach((p) => { total += planetScore(p); });
    const tone = toneFromScore(total, planets.length);
    return { tone, lines };
  }

  // ---------- Narrative version — flowing prose + real upcoming dates ----------
  function fmtDate(iso) {
    const d = new Date(iso + 'T00:00:00Z');
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  }

  function nextEventPhrase(ev, refSignIndex) {
    if (!ev) return `No sign, nakṣatra, or station change is expected within the lookahead window.`;
    const when = fmtDate(ev.date);
    if (ev.type === 'ingress') {
      let houseNote = '';
      if (refSignIndex !== null && ev.toSignIndex !== undefined) {
        const house = ((ev.toSignIndex - refSignIndex + 12) % 12) + 1;
        houseNote = `, moving into house ${house} from your reference`;
      }
      return `It stays in ${ev.fromSign} until around ${when}, then crosses into ${ev.toSign}${houseNote} — worth watching around that date.`;
    }
    if (ev.type === 'nakshatraIngress') {
      return `It shifts nakṣatra around ${when}, moving into ${ev.toNakshatra} (lord ${ev.nakshatraLord}, pada ${ev.pada}).`;
    }
    if (ev.type === 'stationRetrograde') {
      return `It's due to turn retrograde around ${when}, while in ${ev.sign} — classically a signal to slow down and review rather than initiate, for matters it governs.`;
    }
    if (ev.type === 'stationDirect') {
      return `It's due to turn direct around ${when}, while in ${ev.sign} — classically when stalled matters it governs start moving again.`;
    }
    return '';
  }

  /**
   * @param {Array} planets - current snapshot for the category's significators
   * @param {Object} upcomingByPlanet - { planetName: nextEvent|null }, nearest event per planet from the scanner
   * @param {number|null} refSignIndex
   */
  function generateNarrative(planets, upcomingByPlanet, refSignIndex) {
    const paragraphs = planets.map((p) => {
      const bits = [];
      if (p.dignity && DIGNITY_PHRASE[p.dignity]) bits.push(DIGNITY_PHRASE[p.dignity](p.name));
      if (p.retrograde) bits.push('currently retrograde — a review/delay phase for what it governs');
      if (p.combust) bits.push('currently combust, so acting in a subdued or dependent way rather than independently');
      const ganaTxt = p.nakshatra && NAKSHATRA_GANA[p.nakshatra] ? `, moving through ${p.nakshatra} nakṣatra (${GANA_TEXT[NAKSHATRA_GANA[p.nakshatra]]})` : '';
      const now = `${bits.join(', ')}${ganaTxt}.`;
      const next = nextEventPhrase(upcomingByPlanet[p.name], refSignIndex);
      return `<strong>${p.name}</strong> \u2014 ${now} ${next}`;
    });
    let total = 0;
    planets.forEach((p) => { total += planetScore(p); });
    const tone = toneFromScore(total, planets.length);
    return { tone, paragraphs };
  }

  window.ChitraInterpretation = { generateReading, generateNarrative, NAKSHATRA_GANA, GANA_TEXT };
})();

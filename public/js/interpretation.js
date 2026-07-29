// interpretation.js — rule-based classical readings, built entirely from real Vedic
// astrology principles (dignity, retrograde, combustion, nakshatra Gana). No AI call,
// no invented content — every line traces back to a named classical rule, listed in
// generateReading()'s output so the person can see exactly why it says what it says.
// Deliberately does NOT assign countries/regions to signs — classical geographic
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

  /**
   * @param {string} categoryLabel
   * @param {Array} planets - snapshot objects (name, sign, dignity, retrograde, combust, nakshatra) for the category's significators
   * @returns {{ tone: object, lines: string[] }}
   */
  function generateReading(categoryLabel, planets) {
    const lines = planets.map(planetReading);
    let total = 0;
    planets.forEach((p) => { total += planetScore(p); });
    const tone = toneFromScore(total, planets.length);
    return { tone, lines };
  }

  window.ChitraInterpretation = { generateReading, NAKSHATRA_GANA, GANA_TEXT };
})();

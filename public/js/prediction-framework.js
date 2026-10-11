// prediction-framework.js — structured data for the Reports "Narrative Prediction"
// engine. Encodes the three-layer synthesis the report is built on:
//   PLANET (the "what")  +  SIGN (the "where")  +  NAKSHATRA LORD (the "trigger/how")
// This is reference data only — no computation here. reports-narrative.js combines
// this with the real scanned transit dates to build each report block.
(function () {
  // ---------- 1. Planetary karakatwas (the "what") ----------
  // Only the six "major" transit-tracked planets drive top-level report blocks
  // (Sun, Mars, Jupiter, Saturn, Rahu, Ketu) — Moon/Mercury/Venus move too fast for a
  // year-scale report to track sign-by-sign, but they still matter as NAKSHATRA LORDS
  // (see NAKSHATRA_TRIGGER below), so they're defined here too.
  const PLANET_INFO = {
    Sun: { karaka: 'gold, national governments, heads of state, central banks and sovereign bonds' },
    Moon: { karaka: 'public sentiment and mass psychology, fast-moving liquidity, FMCG and agricultural demand' },
    Mars: { karaka: 'the trigger for sudden events — military action, conflict, crude oil, real estate stress and sharp volatility' },
    Mercury: { karaka: 'trade, communication, banking transactions and IT/technology activity' },
    Jupiter: { karaka: 'wealth creation, fiat currency strength, silver, inflation trends, the banking sector and broad bullish sentiment' },
    Venus: { karaka: 'currency valuation, luxury and auto demand, and consumption-led capital flow' },
    Saturn: { karaka: 'debt, bond yields, heavy industry, real estate, the working class and supply chains — the classical bear-market/restriction factor' },
    Rahu: { karaka: 'tech and crypto bubbles, artificial intelligence, foreign affairs, speculation, and sudden chaotic spikes or crashes' },
    Ketu: { karaka: 'decentralization, cryptocurrencies, bankruptcies, and sudden resets or market bottoms' },
  };
  const MAJOR_PLANETS = ['Sun', 'Mars', 'Jupiter', 'Saturn', 'Rahu', 'Ketu'];

  // ---------- 2. The 12 signs & sectors (the "where") ----------
  const SIGN_INFO = {
    Aries: 'military, defense, metals and manufacturing, raw materials, leadership transitions',
    Taurus: 'banking, wealth management, agriculture, FMCG and currency valuation',
    Gemini: 'telecom, IT, media, trade agreements and short-distance logistics',
    Cancer: 'real estate, homeland security, public sentiment, shipping and water resources',
    Leo: 'government bonds, gold, centralized authority, central banks and headline stock indices',
    Virgo: 'healthcare, labor markets, data/analytics and service-sector activity',
    Libra: 'international trade, treaties, luxury goods and foreign relations',
    Scorpio: 'crude oil, mining, hidden/off-book debt, taxation and intelligence-linked events',
    Sagittarius: 'global shipping, international law, higher education and foreign investment flows',
    Capricorn: 'corporate governance, sovereign structures, debt markets and infrastructure',
    Aquarius: 'tech innovation, cryptocurrency, aviation, decentralization and mass movements',
    Pisces: 'global liquidity, sea trade, hidden inflation, chemicals and pharmaceuticals',
  };

  // ---------- 3. Nakshatra lord -> micro-trigger (the "how"/timing) ----------
  // Whichever planet is transiting, the LORD of the nakṣatra it's passing through
  // colors the mechanism/trigger — this is what gives each sub-window its own flavor
  // independent of which major planet is actually moving.
  const NAKSHATRA_TRIGGER = {
    Sun: 'sharpens focus on government policy and gold — sovereign/fiscal headlines are more likely here',
    Moon: 'raises emotional volatility — public mood swings feed through fastest into FMCG and agri-commodity prices',
    Mars: 'the sharpest trigger window of the nine — raises the odds of an actual flashpoint: a conflict escalation, a real-estate shock, or a sudden sell-off',
    Rahu: 'heavy speculation — the widest swings in tech and crypto land here, with elevated manipulation/fake-news risk',
    Jupiter: 'a constructive window — banking-regulation news and rate moves tend to land supportive, feeding optimistic rallies',
    Saturn: 'a consolidating, defensive window — bond yields firm up, heavy industry feels pressure, markets favor patience over momentum',
    Mercury: 'a choppy window for banking, IT/tech and trade/logistics names — headline-driven, two-way swings',
    Ketu: 'the classic black-swan window — sudden, hard-to-predict breaks, but also where crypto most often bottoms and accumulates',
    Venus: 'impacts currency strength, auto and luxury demand, and consumption-led capital flow',
  };

  // Standard 27-nakṣatra order and the repeating 9-lord Vimśottarī cycle — used to
  // derive a nakṣatra's lord without hand-maintaining a 27-row table.
  const NAKSHATRA_ORDER = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha',
    'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
  ];
  const LORD_CYCLE = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
  function lordOfNakshatra(name) {
    const i = NAKSHATRA_ORDER.indexOf(name);
    return i === -1 ? null : LORD_CYCLE[i % 9];
  }

  // ---------- 4. Timing rules ----------
  // Gandanta: 0-3deg of a fire sign immediately after a water sign, or 27-30deg of a
  // water sign immediately before a fire sign (Pisces->Aries, Cancer->Leo, Scorpio->Sagittarius).
  const GANDANTA_FIRE_STARTS = ['Aries', 'Leo', 'Sagittarius']; // 0-3deg here
  const GANDANTA_WATER_ENDS = ['Pisces', 'Cancer', 'Scorpio'];  // 27-30deg here
  function inGandanta(degreeInSign, sign) {
    if (GANDANTA_FIRE_STARTS.includes(sign) && degreeInSign <= 3) return true;
    if (GANDANTA_WATER_ENDS.includes(sign) && degreeInSign >= 27) return true;
    return false;
  }

  // ---------- 5. Report categories & which planets (as transiter OR nakṣatra lord) drive them ----------
  const CATEGORY_DEF = [
    { key: 'geopolitics', label: 'World Events & Geopolitics', planets: ['Mars', 'Rahu', 'Ketu', 'Sun', 'Saturn'], angle: 'the odds of friction, policy shifts, or an outright flashpoint in this window' },
    { key: 'stockMarket', label: 'Financial & Stock Markets', planets: ['Jupiter', 'Mercury', 'Venus', 'Saturn', 'Mars', 'Moon'], angle: 'the prevailing trend for broad equity indices through this window' },
    { key: 'metals', label: 'Precious Metals — Gold & Silver', planets: ['Sun', 'Jupiter', 'Moon', 'Venus'], angle: "gold and silver's price trajectory through this window" },
    { key: 'crypto', label: 'Cryptocurrency — Bitcoin & Altcoins', planets: ['Rahu', 'Ketu', 'Mercury'], angle: 'Bitcoin and altcoin risk appetite through this window' },
    { key: 'macro', label: 'Banking, Currency & Macro-Economy', planets: ['Saturn', 'Jupiter', 'Mercury', 'Sun', 'Venus'], angle: 'bond yields, currency strength and the broader credit cycle' },
    { key: 'disasters', label: 'Natural Disasters & Earth Changes', planets: ['Saturn', 'Mars', 'Rahu', 'Ketu'], angle: 'the odds of a seismic, climate or structural shock landing in this window' },
    { key: 'society', label: 'Human Life & Society', planets: ['Moon', 'Rahu', 'Jupiter', 'Saturn', 'Ketu'], angle: 'public mood and the tenor of daily life through this window' },
  ];

  window.ChitraPredictionFramework = {
    PLANET_INFO, MAJOR_PLANETS, SIGN_INFO, NAKSHATRA_TRIGGER, NAKSHATRA_ORDER, LORD_CYCLE,
    lordOfNakshatra, inGandanta, CATEGORY_DEF,
  };
})();

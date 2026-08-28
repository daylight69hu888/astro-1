// significators-data.js — traditional mundane-astrology significators per research
// category. This is reference material (what classical mundane texts, e.g. B.V. Raman's
// "Mundane Astrology", associate with each theme) — not a prediction engine. The page
// shows where these specific planets currently sit; the person draws their own conclusions.
//
// `sectors` and `historicalPrecedents` are static reference content (same idea as a
// textbook table) — they don't move with the live ephemeris. The live Bullish/Bearish
// view, and the Accumulation Window / Risk Period dates in the Strategy box, are the
// only parts computed from the real current/upcoming transit data.
window.CHITRA_SIGNIFICATORS = [
  {
    id: 'economy',
    label: 'Economy & Financial Markets',
    planets: ['Jupiter', 'Mercury', 'Venus'],
    houses: [2, 11],
    note: 'Jupiter — expansion, banking, credit. Mercury — trade, commerce, communication. Venus — currency, luxury goods, capital markets. 2nd house — national wealth/reserves; 11th — gains, income.',
    sectors: [
      { name: 'Banking & Financials', ruler: 'Jupiter', note: 'Credit growth, lending, institutional liquidity. Tracks Jupiter\'s dignity most directly.' },
      { name: 'Trade, IT & Communication', ruler: 'Mercury', note: 'Corporate earnings, information flow, day-to-day trading activity. Retrograde Mercury tends to coincide with confused, choppy tape.' },
      { name: 'Consumer & Capital Flow', ruler: 'Venus', note: 'Consumer spending, forex, capital inflows. Dignified Venus historically lines up with consumption booms.' },
    ],
    historicalPrecedents: [
      { era: '2003–2007 global bull run', note: 'A long Jupiter dignity stretch coincided with a multi-year expansion across most equity markets.' },
      { era: '2008 financial crisis', note: 'Widely discussed in mundane circles as a period of severe affliction to Jupiter/Mercury-ruled significators of credit and trade.' },
      { era: '2020 Covid crash & rebound', note: 'A sharp, short-lived affliction followed by rapid recovery — often cited as an example of fast dignity reversal.' },
    ],
  },
  {
    id: 'commodities-gold',
    label: 'Gold',
    planets: ['Sun', 'Jupiter'],
    houses: [2, 11],
    note: 'Sun and Jupiter are the classical significators of gold across most Vedic commodity-astrology traditions.',
    historicalPrecedents: [
      { era: '1979–80 gold spike', note: 'Cited in commodity-astrology literature alongside a strong multi-planet fire-sign alignment.' },
      { era: '2008–2011 gold bull run', note: 'Coincided with a long stretch of Jupiter strength through several signs, per most mundane commodity readings.' },
      { era: '2020 safe-haven rally', note: 'A Sun-Jupiter supportive period discussed as a contributing astrological backdrop, alongside the obvious macro drivers.' },
    ],
  },
  {
    id: 'commodities-silver',
    label: 'Silver',
    planets: ['Moon', 'Venus'],
    houses: [2, 11],
    note: 'Moon is the primary significator of silver; Venus is a secondary significator in some traditions.',
    historicalPrecedents: [
      { era: '1979–80 Hunt Brothers silver spike', note: 'An extreme, short-lived speculative event — mundane texts note it alongside an intense Moon-Venus configuration.' },
      { era: '2011 silver rally', note: 'Ran alongside the broader gold bull run of that period; Moon\'s faster cycle is classically read as the reason silver moves in sharper, quicker bursts than gold.' },
    ],
  },
  {
    id: 'commodities-crude',
    label: 'Crude Oil',
    planets: ['Mars', 'Saturn', 'Rahu'],
    houses: [6, 8],
    note: 'Mars (combustion/energy), Saturn (extraction from the earth), Rahu (foreign/unconventional resources) are commonly used for petroleum and energy commodities.',
    historicalPrecedents: [
      { era: '1973 oil embargo', note: 'A Mars-driven geopolitical shock — the textbook example cited for Mars\'s rulership over energy-market flashpoints.' },
      { era: '1990 Gulf War oil spike', note: 'Another Mars-conflict-linked price shock, cited alongside the invasion of Kuwait.' },
      { era: '2008 crude peak ($147/bbl)', note: 'Discussed as a Rahu-driven speculative/leverage extreme rather than a pure supply event.' },
      { era: '2020 negative WTI print', note: 'An unprecedented dislocation — cited in newer commentary as a Saturn-Rahu structural-shock example.' },
    ],
  },
  {
    id: 'commodities-crypto',
    label: 'Bitcoin & Cryptocurrency',
    planets: ['Rahu', 'Mercury', 'Uranus'],
    houses: [11],
    note: 'No classical texts address crypto directly (it postdates them). Contemporary mundane astrologers most often use Rahu (novel/disruptive, foreign, intangible) and Mercury (networks, information); Uranus (in Western/Vedic-hybrid practice) for sudden volatility. Treat this one as the least classically grounded of the set.',
    sectors: [
      { name: 'Bitcoin (store-of-value)', ruler: 'Rahu / Sun', note: 'Institutional/sovereign-flavored flows — read against Rahu\'s dignity and sign.' },
      { name: 'Altcoins / Layer-1s / DeFi', ruler: 'Mercury / Rahu', note: 'Higher-beta, faster-moving — read against Mercury\'s dignity and retrograde status.' },
    ],
    historicalPrecedents: [
      { era: '2017 ICO mania', note: 'An extreme speculative peak — commonly cited alongside a strong Rahu placement.' },
      { era: '2022 crypto winter (Terra/Luna, FTX)', note: 'A sharp, structural collapse — cited alongside Rahu moving through a difficult sign/eclipse period.' },
      { era: '2024–25 spot-ETF/institutional run', note: 'A steadier, broader-based advance — cited alongside a more settled Rahu-Mercury picture.' },
    ],
  },
  {
    id: 'stock-markets',
    label: 'Stock Markets',
    planets: ['Mercury', 'Jupiter', 'Venus', 'Moon'],
    houses: [2, 5, 11],
    note: 'Mercury — trading/speed. Jupiter — bull sentiment/expansion. Venus — capital flows. Moon — public sentiment/volatility. 5th house — speculation.',
    sectors: [
      { name: 'Banking & Financials', ruler: 'Jupiter', note: 'Broad market direction tends to track Jupiter\'s dignity most closely.' },
      { name: 'IT / Tech / Trading Volume', ruler: 'Mercury', note: 'Retrograde Mercury periods are classically read as choppy, revision-prone stretches for this sleeve.' },
      { name: 'Auto & Consumer Discretionary', ruler: 'Venus', note: 'Dignified Venus historically lines up with consumption-led rallies.' },
      { name: 'Day-to-day breadth/sentiment', ruler: 'Moon', note: 'Fastest-moving significator here — governs the day-to-day noise more than the multi-month trend.' },
    ],
    historicalPrecedents: [
      { era: '2003–2007 secular bull market', note: 'A long stretch of Jupiter strength widely cited in mundane equity commentary.' },
      { era: '2008 crash', note: 'Severe affliction across several of these significators simultaneously.' },
      { era: '2020 V-shaped recovery', note: 'A short, sharp affliction followed by an unusually fast reversal.' },
    ],
  },
  {
    id: 'geopolitics',
    label: 'Geopolitics & Conflict',
    planets: ['Mars', 'Saturn', 'Rahu', 'Ketu', 'Sun'],
    houses: [6, 7, 8, 12],
    note: 'Mars — military action/aggression. Saturn — prolonged conflict, restriction. Rahu/Ketu — foreign powers, sudden escalation/de-escalation. Sun — heads of state, authority. 7th house — foreign relations/open enemies; 6th — conflict/disputes; 8th/12th — losses, hidden threats.',
    historicalPrecedents: [
      { era: 'World War I (1914)', note: 'Classic textbook case cited for a hard Mars-Saturn alignment.' },
      { era: 'World War II (1939)', note: 'Cited alongside a severely afflicted Saturn placement.' },
      { era: 'Russia–Ukraine war (2022)', note: 'Cited alongside a tight Mars-Saturn conjunction and a Rahu sign change.' },
    ],
  },
  {
    id: 'elections',
    label: 'Elections & Leadership',
    planets: ['Sun', 'Jupiter', 'Mercury', 'Saturn'],
    houses: [1, 10],
    note: 'Sun — leadership/authority. Jupiter — public trust/dharma. Mercury — campaigning/messaging. Saturn — the electorate/masses, or entrenched incumbents. 10th house — status, government, public office.',
    historicalPrecedents: [
      { era: 'Incumbent-strengthening cycles', note: 'Mundane commentary generally ties these to a dignified Sun/Jupiter for the ruling chart.' },
      { era: 'Anti-incumbency waves', note: 'More often tied to an afflicted Saturn (electorate discontent) or a weak Sun (leadership strain).' },
    ],
  },
  {
    id: 'disasters',
    label: 'Natural Disasters',
    planets: ['Saturn', 'Mars', 'Rahu', 'Ketu'],
    houses: [8, 12],
    note: 'Saturn — earthquakes, cold/structural events. Mars — fire, volcanic activity. Rahu/Ketu — sudden, unpredictable events; frequently discussed alongside eclipses in classical mundane texts. 8th/12th houses — sudden loss, upheaval.',
    historicalPrecedents: [
      { era: '2004 Indian Ocean tsunami', note: 'Cited alongside a Saturn water-sign placement in most retrospective mundane readings.' },
      { era: '2001 Bhuj earthquake', note: 'Cited alongside a hard Mars-Saturn aspect.' },
      { era: '2020 Covid-19 pandemic', note: 'Cited alongside a Rahu-Ketu axis shift and a major outer-planet stellium — the most-discussed recent example of this category.' },
    ],
  },
];

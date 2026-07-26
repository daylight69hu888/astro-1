// significators-data.js — traditional mundane-astrology significators per research
// category. This is reference material (what classical mundane texts, e.g. B.V. Raman's
// "Mundane Astrology", associate with each theme) — not a prediction engine. The page
// shows where these specific planets currently sit; the person draws their own conclusions.
window.CHITRA_SIGNIFICATORS = [
  {
    id: 'economy',
    label: 'Economy & Financial Markets',
    planets: ['Jupiter', 'Mercury', 'Venus'],
    houses: [2, 11],
    note: 'Jupiter — expansion, banking, credit. Mercury — trade, commerce, communication. Venus — currency, luxury goods, capital markets. 2nd house — national wealth/reserves; 11th — gains, income.',
  },
  {
    id: 'commodities-gold',
    label: 'Gold',
    planets: ['Sun', 'Jupiter'],
    houses: [2, 11],
    note: 'Sun and Jupiter are the classical significators of gold across most Vedic commodity-astrology traditions.',
  },
  {
    id: 'commodities-silver',
    label: 'Silver',
    planets: ['Moon', 'Venus'],
    houses: [2, 11],
    note: 'Moon is the primary significator of silver; Venus is a secondary significator in some traditions.',
  },
  {
    id: 'commodities-crude',
    label: 'Crude Oil',
    planets: ['Mars', 'Saturn', 'Rahu'],
    houses: [6, 8],
    note: 'Mars (combustion/energy), Saturn (extraction from the earth), Rahu (foreign/unconventional resources) are commonly used for petroleum and energy commodities.',
  },
  {
    id: 'commodities-crypto',
    label: 'Bitcoin & Cryptocurrency',
    planets: ['Rahu', 'Mercury', 'Uranus'],
    houses: [11],
    note: 'No classical texts address crypto directly (it postdates them). Contemporary mundane astrologers most often use Rahu (novel/disruptive, foreign, intangible) and Mercury (networks, information); Uranus (in Western/Vedic-hybrid practice) for sudden volatility. Treat this one as the least classically grounded of the set.',
  },
  {
    id: 'stock-markets',
    label: 'Stock Markets',
    planets: ['Mercury', 'Jupiter', 'Venus', 'Moon'],
    houses: [2, 5, 11],
    note: 'Mercury — trading/speed. Jupiter — bull sentiment/expansion. Venus — capital flows. Moon — public sentiment/volatility. 5th house — speculation.',
  },
  {
    id: 'geopolitics',
    label: 'Geopolitics & Conflict',
    planets: ['Mars', 'Saturn', 'Rahu', 'Ketu', 'Sun'],
    houses: [6, 7, 8, 12],
    note: 'Mars — military action/aggression. Saturn — prolonged conflict, restriction. Rahu/Ketu — foreign powers, sudden escalation/de-escalation. Sun — heads of state, authority. 7th house — foreign relations/open enemies; 6th — conflict/disputes; 8th/12th — losses, hidden threats.',
  },
  {
    id: 'elections',
    label: 'Elections & Leadership',
    planets: ['Sun', 'Jupiter', 'Mercury', 'Saturn'],
    houses: [1, 10],
    note: 'Sun — leadership/authority. Jupiter — public trust/dharma. Mercury — campaigning/messaging. Saturn — the electorate/masses, or entrenched incumbents. 10th house — status, government, public office.',
  },
  {
    id: 'disasters',
    label: 'Natural Disasters',
    planets: ['Saturn', 'Mars', 'Rahu', 'Ketu'],
    houses: [8, 12],
    note: 'Saturn — earthquakes, cold/structural events. Mars — fire, volcanic activity. Rahu/Ketu — sudden, unpredictable events; frequently discussed alongside eclipses in classical mundane texts. 8th/12th houses — sudden loss, upheaval.',
  },
];

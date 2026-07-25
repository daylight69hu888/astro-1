// vedic-core.js
// Pure-JS Vedic astronomy engine built on astronomy-engine (no native binaries,
// so it runs cleanly inside Netlify Functions). Uses the Lahiri (Chitrapaksha)
// ayanamsa and whole-sign houses, which is the standard for mundane/Vedic work.

const Astronomy = require('astronomy-engine');

const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIGN_ABBR = ['Ar','Ta','Ge','Cn','Le','Vi','Li','Sc','Sg','Cp','Aq','Pi'];

const NAKSHATRAS = [
  'Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha',
  'Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha',
  'Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishta','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'
];

const NAKSHATRA_LORDS = ['Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury']; // repeats x3 (Vimshottari sequence)

// Traditional combustion orbs (degrees), tighter orb used when the planet is retrograde
const COMBUST_ORB = {
  Moon:    { direct: 12, retro: 12 },
  Mars:    { direct: 17, retro: 17 },
  Mercury: { direct: 14, retro: 12 },
  Jupiter: { direct: 11, retro: 11 },
  Venus:   { direct: 10, retro: 8  },
  Saturn:  { direct: 15, retro: 15 },
};

function deg(rad) { return rad * 180 / Math.PI; }
function rad(d) { return d * Math.PI / 180; }
function norm360(x) { let v = x % 360; if (v < 0) v += 360; return v; }

/**
 * Lahiri (Chitrapaksha) ayanamsa, linear approximation anchored at J2000.
 * Accurate to within a few arc-seconds across the 1900-2100 window, which is
 * sufficient for mundane/research work. A Swiss-Ephemeris-grade figure can be
 * swapped in later without touching any other module.
 */
function lahiriAyanamsa(jdTT) {
  const T = (jdTT - 2451545.0) / 36525; // Julian centuries since J2000 (TT)
  const ayanamsaAtJ2000 = 23.85686111; // 23°51'25" — Lahiri value for J2000.0
  const precessionPerCentury = 1.396971; // degrees/century (~50.29"/yr)
  return ayanamsaAtJ2000 + precessionPerCentury * T;
}

function meanObliquity(jdTT) {
  const T = (jdTT - 2451545.0) / 36525;
  // IAU 1980 mean obliquity approximation
  const seconds = 21.448 - T * (46.8150 + T * (0.00059 - T * 0.001813));
  return 23 + 26 / 60 + seconds / 3600;
}

/** Mean lunar node (Rahu), tropical ecliptic longitude of date. */
function meanNodeLongitude(jdTT) {
  const T = (jdTT - 2451545.0) / 36525;
  const omega = 125.0445479 - 1934.1362891 * T + 0.0020754 * T * T + (T ** 3) / 467441 - (T ** 4) / 60616000;
  return norm360(omega);
}

function signOf(lon) { return Math.floor(norm360(lon) / 30); }
function degInSign(lon) { return norm360(lon) % 30; }

function nakshatraOf(siderealLon) {
  const span = 360 / 27; // 13°20'
  const idx = Math.floor(norm360(siderealLon) / span);
  const posInNak = norm360(siderealLon) % span;
  const pada = Math.floor(posInNak / (span / 4)) + 1;
  return { name: NAKSHATRAS[idx], index: idx, pada, lord: NAKSHATRA_LORDS[idx % 9] };
}

function navamsaSignIndex(siderealLon) {
  const signIdx = signOf(siderealLon);
  const partIdx = Math.floor(degInSign(siderealLon) / (30 / 9)); // 0-8, each 3°20'
  return (signIdx * 9 + partIdx) % 12;
}

function angularSep(a, b) {
  const d = Math.abs(norm360(a) - norm360(b));
  return Math.min(d, 360 - d);
}

/**
 * Right Ascension of the Midheaven (RAMC) and tropical Ascendant, given
 * Greenwich Apparent Sidereal Time (hours), geographic longitude (deg, east+)
 * and latitude (deg), and obliquity (deg).
 */
function computeAscendant(gastHours, lonDeg, latDeg, obliquityDeg) {
  const lstHours = norm360((gastHours * 15) + lonDeg) / 15;
  const ramc = norm360(lstHours * 15); // degrees
  const ramcRad = rad(ramc);
  const eps = rad(obliquityDeg);
  const phi = rad(latDeg);

  const y = Math.cos(ramcRad);
  const x = -(Math.sin(eps) * Math.tan(phi) + Math.cos(eps) * Math.sin(ramcRad));
  const asc = norm360(deg(Math.atan2(y, x)));
  return { ramc, ascendantTropical: asc };
}

function geoEclipticLon(body, astroTime) {
  if (body === 'Sun') {
    return Astronomy.SunPosition(astroTime).elon;
  }
  if (body === 'Moon') {
    return Astronomy.EclipticGeoMoon(astroTime).lon;
  }
  const vec = Astronomy.GeoVector(body, astroTime, true);
  const ecl = Astronomy.Ecliptic(vec);
  return ecl.elon;
}

function isRetrograde(body, astroTime) {
  if (body === 'Sun' || body === 'Moon') return false;
  const dt = 0.5; // half a day step, small enough to detect direction reliably
  const t1 = astroTime.AddDays(-dt);
  const t2 = astroTime.AddDays(dt);
  const l1 = geoEclipticLon(body, t1);
  const l2 = geoEclipticLon(body, t2);
  let diff = l2 - l1;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff < 0;
}

const BODIES = [
  { key: 'Sun', name: 'Sun' },
  { key: 'Moon', name: 'Moon' },
  { key: 'Mercury', name: 'Mercury' },
  { key: 'Venus', name: 'Venus' },
  { key: 'Mars', name: 'Mars' },
  { key: 'Jupiter', name: 'Jupiter' },
  { key: 'Saturn', name: 'Saturn' },
];

/**
 * Main entry point: compute a full sidereal (Lahiri) Vedic chart.
 * @param {Date} utcDate  JS Date in UTC representing the exact birth moment
 * @param {number} latDeg geographic latitude, north positive
 * @param {number} lonDeg geographic longitude, east positive
 */
function computeChart(utcDate, latDeg, lonDeg) {
  const astroTime = Astronomy.MakeTime(utcDate);
  const jdTT = astroTime.tt + 2451545.0;
  const ayanamsa = lahiriAyanamsa(jdTT);
  const obliquity = meanObliquity(jdTT);
  const gastHours = Astronomy.SiderealTime(astroTime);

  const { ramc, ascendantTropical } = computeAscendant(gastHours, lonDeg, latDeg, obliquity);
  const ascendantSidereal = norm360(ascendantTropical - ayanamsa);
  const ascSignIdx = signOf(ascendantSidereal);

  const sunTropicalLon = geoEclipticLon('Sun', astroTime);
  const sunSidereal = norm360(sunTropicalLon - ayanamsa);

  const planets = BODIES.map(({ key, name }) => {
    const tropicalLon = geoEclipticLon(key, astroTime);
    const siderealLon = norm360(tropicalLon - ayanamsa);
    const signIdx = signOf(siderealLon);
    const houseNum = ((signIdx - ascSignIdx + 12) % 12) + 1;
    const nak = nakshatraOf(siderealLon);
    const navSignIdx = navamsaSignIndex(siderealLon);
    const retro = isRetrograde(key, astroTime);
    let combust = false;
    if (COMBUST_ORB[name]) {
      const orb = retro ? COMBUST_ORB[name].retro : COMBUST_ORB[name].direct;
      combust = name !== 'Sun' && angularSep(siderealLon, sunSidereal) <= orb;
    }
    return {
      name,
      longitude: siderealLon,
      sign: SIGNS[signIdx],
      signAbbr: SIGN_ABBR[signIdx],
      signIndex: signIdx,
      degreeInSign: degInSign(siderealLon),
      house: houseNum,
      nakshatra: nak.name,
      nakshatraPada: nak.pada,
      nakshatraLord: nak.lord,
      navamsaSign: SIGNS[navSignIdx],
      navamsaSignIndex: navSignIdx,
      retrograde: retro,
      combust,
    };
  });

  // Rahu / Ketu (mean lunar nodes)
  const rahuTropical = meanNodeLongitude(jdTT);
  const rahuSidereal = norm360(rahuTropical - ayanamsa);
  const ketuSidereal = norm360(rahuSidereal + 180);

  [{ name: 'Rahu', lon: rahuSidereal }, { name: 'Ketu', lon: ketuSidereal }].forEach(({ name, lon }) => {
    const signIdx = signOf(lon);
    const houseNum = ((signIdx - ascSignIdx + 12) % 12) + 1;
    const nak = nakshatraOf(lon);
    const navSignIdx = navamsaSignIndex(lon);
    planets.push({
      name,
      longitude: lon,
      sign: SIGNS[signIdx],
      signAbbr: SIGN_ABBR[signIdx],
      signIndex: signIdx,
      degreeInSign: degInSign(lon),
      house: houseNum,
      nakshatra: nak.name,
      nakshatraPada: nak.pada,
      nakshatraLord: nak.lord,
      navamsaSign: SIGNS[navSignIdx],
      navamsaSignIndex: navSignIdx,
      retrograde: true, // mean node regresses essentially continuously
      combust: false,
    });
  });

  const ascNak = nakshatraOf(ascendantSidereal);

  return {
    meta: {
      ayanamsa,
      ayanamsaName: 'Lahiri (Chitrapaksha)',
      obliquity,
      julianDayTT: jdTT,
      gastHours,
      ramc,
    },
    ascendant: {
      longitude: ascendantSidereal,
      sign: SIGNS[ascSignIdx],
      signAbbr: SIGN_ABBR[ascSignIdx],
      signIndex: ascSignIdx,
      degreeInSign: degInSign(ascendantSidereal),
      nakshatra: ascNak.name,
      nakshatraPada: ascNak.pada,
    },
    planets,
  };
}

module.exports = { computeChart, SIGNS, SIGN_ABBR, NAKSHATRAS, norm360 };

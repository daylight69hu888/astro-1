// scan.js — POST { startDate, endDate } (YYYY-MM-DD, both UTC) -> a list of discrete
// astrological events across that range: sign ingresses, retrograde/direct stations,
// conjunctions (within 1° orb), combustion onset/end, and eclipses.
// Snapshots are taken once per day at 00:00 UTC — fine resolution for a report-level
// scan, but a station/ingress/eclipse's exact hour can be off by up to a day.
const Astronomy = require('astronomy-engine');
const { getPlanetSnapshot, norm360 } = require('./lib/vedic-core');

const CONJUNCTION_ORB = 1; // degrees
const MAX_DAYS = 400; // safety cap so a bad request can't run the function forever

function angularSep(a, b) {
  const d = Math.abs(norm360(a) - norm360(b));
  return Math.min(d, 360 - d);
}

function scanRange(startDate, endDate) {
  const events = [];
  const dayMs = 86400000;
  let prev = null;
  const totalDays = Math.round((endDate - startDate) / dayMs);

  for (let i = 0; i <= totalDays; i++) {
    const day = new Date(startDate.getTime() + i * dayMs);
    const snap = getPlanetSnapshot(day);
    const dateStr = day.toISOString().slice(0, 10);

    if (prev) {
      snap.forEach((p, idx) => {
        const prevP = prev[idx];
        if (prevP.signIndex !== p.signIndex) {
          events.push({
            type: 'ingress', date: dateStr, planet: p.name,
            fromSign: prevP.sign, toSign: p.sign, fromSignIndex: prevP.signIndex, toSignIndex: p.signIndex,
            nakshatra: p.nakshatra, nakshatraPada: p.nakshatraPada,
          });
        }
        if (prevP.nakshatraIndex !== p.nakshatraIndex) {
          events.push({
            type: 'nakshatraIngress', date: dateStr, planet: p.name,
            fromNakshatra: prevP.nakshatra, toNakshatra: p.nakshatra, pada: p.nakshatraPada, nakshatraLord: p.nakshatraLord,
          });
        }
        if (prevP.retrograde !== p.retrograde) {
          events.push({ type: p.retrograde ? 'stationRetrograde' : 'stationDirect', date: dateStr, planet: p.name, sign: p.sign, signIndex: p.signIndex, nakshatra: p.nakshatra, nakshatraPada: p.nakshatraPada });
        }
        if (prevP.combust !== p.combust) {
          events.push({ type: p.combust ? 'combustionBegins' : 'combustionEnds', date: dateStr, planet: p.name, sign: p.sign, signIndex: p.signIndex });
        }
      });

      for (let a = 0; a < snap.length; a++) {
        for (let b = a + 1; b < snap.length; b++) {
          const sepNow = angularSep(snap[a].longitude, snap[b].longitude);
          const sepPrev = angularSep(prev[a].longitude, prev[b].longitude);
          if (sepNow <= CONJUNCTION_ORB && sepPrev > CONJUNCTION_ORB) {
            events.push({
              type: 'conjunction', date: dateStr,
              planetA: snap[a].name, planetB: snap[b].name,
              sign: snap[a].sign, signIndex: snap[a].signIndex, orb: Number(sepNow.toFixed(2)),
              nakshatra: snap[a].nakshatra, nakshatraPada: snap[a].nakshatraPada,
            });
          }
        }
      }
    }
    prev = snap;
  }

  // Eclipses within the range (astronomy-engine's own search, independent of the daily loop)
  try {
    let t = Astronomy.MakeTime(startDate);
    for (let i = 0; i < 10; i++) {
      const le = Astronomy.SearchLunarEclipse(t);
      if (le.peak.date > endDate) break;
      events.push({ type: 'lunarEclipse', date: le.peak.date.toISOString().slice(0, 10), kind: le.kind });
      t = Astronomy.NextLunarEclipse(le.peak);
    }
  } catch (e) { /* non-fatal — eclipse search failing shouldn't kill the whole report */ }
  try {
    let t = Astronomy.MakeTime(startDate);
    for (let i = 0; i < 10; i++) {
      const se = Astronomy.SearchGlobalSolarEclipse(t);
      if (se.peak.date > endDate) break;
      events.push({ type: 'solarEclipse', date: se.peak.date.toISOString().slice(0, 10), kind: se.kind });
      t = Astronomy.NextGlobalSolarEclipse(se.peak);
    }
  } catch (e) { /* non-fatal */ }

  events.sort((x, y) => x.date.localeCompare(y.date));
  return events;
}

exports.handler = async (event) => {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Use POST.' }) };
  }
  try {
    const body = JSON.parse(event.body || '{}');
    const startDate = new Date(`${body.startDate}T00:00:00.000Z`);
    const endDate = new Date(`${body.endDate}T00:00:00.000Z`);
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || endDate < startDate) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid startDate/endDate.' }) };
    }
    const days = (endDate - startDate) / 86400000;
    if (days > MAX_DAYS) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: `Range too long (${Math.round(days)} days). Max is ${MAX_DAYS} days per scan.` }) };
    }
    const events = scanRange(startDate, endDate);
    return { statusCode: 200, headers, body: JSON.stringify({ startDate: body.startDate, endDate: body.endDate, events }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};

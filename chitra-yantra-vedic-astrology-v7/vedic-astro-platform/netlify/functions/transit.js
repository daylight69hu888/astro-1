// transit.js — POST { utcISO } -> current (or any chosen moment's) sidereal planetary
// positions. Deliberately location-independent: geocentric planet longitudes don't
// depend on where the observer stands, so no lat/lon/timezone is needed here — only
// the birth chart module needs those (for the Ascendant/houses).
const { computeChart } = require('./lib/vedic-core');

exports.handler = async (event) => {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Use POST.' }) };
  }
  try {
    const body = JSON.parse(event.body || '{}');
    const utcISO = body.utcISO;
    const utcDate = utcISO ? new Date(utcISO) : new Date();
    if (Number.isNaN(utcDate.getTime())) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid utcISO datetime.' }) };
    }

    // lat/lon are irrelevant here (no houses are derived from a rising sign in a
    // Moon-chart transit view) — 0,0 is a harmless placeholder, its Ascendant output
    // is simply not used by the frontend for this module.
    const chart = computeChart(utcDate, 0, 0);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        utcInstant: utcDate.toISOString(),
        planets: chart.planets,
        meta: chart.meta,
      }),
    };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};

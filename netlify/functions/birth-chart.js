// birth-chart.js — POST { date, time, lat, lon, timezone } -> full sidereal chart JSON
const { DateTime } = require('luxon');
const { computeChart } = require('./lib/vedic-core');

exports.handler = async (event) => {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Use POST.' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { date, time, lat, lon, timezone } = body;

    if (!date || !time || lat === undefined || lon === undefined || !timezone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Required fields: date (YYYY-MM-DD), time (HH:mm), lat, lon, timezone (IANA name).' }),
      };
    }

    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);
    if (Number.isNaN(latNum) || Number.isNaN(lonNum) || Math.abs(latNum) > 90 || Math.abs(lonNum) > 180) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid latitude/longitude.' }) };
    }

    // Interpret the given local date+time in the given IANA timezone, DST-aware,
    // then convert to an absolute UTC instant for the astronomical calculation.
    const local = DateTime.fromISO(`${date}T${time}`, { zone: timezone });
    if (!local.isValid) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: `Could not interpret date/time/timezone: ${local.invalidReason}` }) };
    }
    const utcDate = local.toUTC().toJSDate();

    const chart = computeChart(utcDate, latNum, lonNum);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        input: { date, time, lat: latNum, lon: lonNum, timezone },
        utcInstant: local.toUTC().toISO(),
        localSiderealTimeHours: chart.meta.gastHours,
        chart,
      }),
    };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};

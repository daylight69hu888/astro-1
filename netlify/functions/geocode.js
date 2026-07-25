// geocode.js — resolves "City, Country" -> lat/lon (via OpenStreetMap Nominatim)
// and lat/lon -> IANA timezone (via the local geo-tz dataset, no external call needed).
const geoTz = require('geo-tz');

exports.handler = async (event) => {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  try {
    const place = (event.queryStringParameters && event.queryStringParameters.place || '').trim();
    if (!place) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing "place" query parameter.' }) };
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(place)}`;
    const res = await fetch(url, {
      headers: {
        // Nominatim's usage policy requires a descriptive User-Agent identifying the app.
        'User-Agent': 'VedicMundaneResearch/1.0 (research use)',
        'Accept-Language': 'en',
      },
    });
    if (!res.ok) {
      return { statusCode: 502, headers, body: JSON.stringify({ error: 'Geocoding service unavailable.' }) };
    }
    const results = await res.json();
    if (!results.length) {
      return { statusCode: 404, headers, body: JSON.stringify({ error: `No location found for "${place}".` }) };
    }

    const matches = results.map((r) => {
      const lat = parseFloat(r.lat);
      const lon = parseFloat(r.lon);
      const tzList = geoTz.find(lat, lon);
      return {
        displayName: r.display_name,
        lat,
        lon,
        timezone: tzList && tzList[0] ? tzList[0] : 'UTC',
      };
    });

    return { statusCode: 200, headers, body: JSON.stringify({ matches }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};

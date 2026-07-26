// geocode.js — resolves "City, Country" -> lat/lon.
// Primary provider: Photon (Komoot, OSM-based) — better recall for smaller towns
// and more forgiving of Netlify's shared IPs than Nominatim's strict usage policy.
// Falls back to Nominatim if Photon returns nothing.
const geoTz = require('geo-tz');

function buildDisplayName(props) {
  const parts = [];
  if (props.name) parts.push(props.name);
  if (props.city && props.city !== props.name) parts.push(props.city);
  if (props.state) parts.push(props.state);
  if (props.country) parts.push(props.country);
  return parts.filter(Boolean).join(', ');
}

async function searchPhoton(place) {
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(place)}&limit=8&lang=en`;
  const res = await fetch(url, { headers: { 'User-Agent': 'VedicMundaneResearch/1.0 (research use)' } });
  if (!res.ok) return [];
  const geojson = await res.json();
  if (!geojson.features || !geojson.features.length) return [];
  return geojson.features
    .filter((f) => f.geometry && f.geometry.coordinates)
    .map((f) => ({
      displayName: buildDisplayName(f.properties || {}),
      lat: f.geometry.coordinates[1],
      lon: f.geometry.coordinates[0],
    }));
}

async function searchNominatim(place) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=8&q=${encodeURIComponent(place)}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'VedicMundaneResearch/1.0 (research use)', 'Accept-Language': 'en' },
  });
  if (!res.ok) return [];
  const results = await res.json();
  return results.map((r) => ({ displayName: r.display_name, lat: parseFloat(r.lat), lon: parseFloat(r.lon) }));
}

exports.handler = async (event) => {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  try {
    const place = (event.queryStringParameters && event.queryStringParameters.place || '').trim();
    if (!place) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing "place" query parameter.' }) };
    }

    let raw = [];
    try { raw = await searchPhoton(place); } catch (e) { raw = []; }
    if (!raw.length) {
      try { raw = await searchNominatim(place); } catch (e) { raw = []; }
    }
    // If still nothing and the query has multiple words, retry with just the first
    // word (handles cases like "Raiganj West Bengal" where the combined string
    // over-constrains the search but "Raiganj" alone resolves fine).
    if (!raw.length && place.trim().includes(' ')) {
      const firstWord = place.trim().split(/[\s,]+/)[0];
      try { raw = await searchPhoton(firstWord); } catch (e) { raw = []; }
      if (!raw.length) {
        try { raw = await searchNominatim(firstWord); } catch (e) { raw = []; }
      }
    }

    if (!raw.length) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: `No location found for "${place}". Try just the city name, or add ", India" (or the relevant country).` }),
      };
    }

    const matches = raw.map((m) => {
      const tzList = geoTz.find(m.lat, m.lon);
      return { ...m, timezone: tzList && tzList[0] ? tzList[0] : 'UTC' };
    });

    return { statusCode: 200, headers, body: JSON.stringify({ matches }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};

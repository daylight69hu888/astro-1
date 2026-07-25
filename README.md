# Chitra Yantra — Vedic & Mundane Astrology Research Platform

Module 1 (Birth Chart Generator) of the full platform spec, built to run **entirely on Netlify**
— static frontend + Netlify Functions, no server to manage, no external database required for this module.

## Why the stack differs from the original spec

The original brief called for FastAPI/Node + PostgreSQL + Swiss Ephemeris. Netlify can't host an
always-on backend or a native C library (Swiss Ephemeris), so this build substitutes Netlify-native
equivalents that produce the same output:

| Spec asked for | Used instead | Why |
|---|---|---|
| FastAPI/Node server | Netlify Functions | Netlify only runs serverless functions, not long-lived servers |
| Swiss Ephemeris | `astronomy-engine` (pure JS) | Swiss Ephemeris is a native binary; won't run in Netlify's Lambda-based function runtime. `astronomy-engine` is arc-second-accurate and pure JavaScript |
| PostgreSQL | *(not needed for this module)* | Module 1 is stateless — no DB required. Modules 3/5/6 (countries, reports, history) will need one: recommend **Supabase** or **Neon**, both connect fine from Netlify Functions |

Everything else — Lahiri ayanamsa, whole-sign houses, nakshatra/pada, navamsa (D9), retrograde and
combustion detection — is computed from scratch in `netlify/functions/lib/vedic-core.js`.

## What's built

- **`netlify/functions/lib/vedic-core.js`** — the calculation engine: sidereal planetary longitudes,
  ascendant (validated against a sunrise sanity check — ascendant matches Sun's longitude at sunrise
  to within a fraction of a degree), rashi, house (whole-sign), nakshatra + pada, navamsa (D9),
  retrograde detection, combustion detection.
- **`netlify/functions/birth-chart.js`** — `POST` endpoint: `{ date, time, lat, lon, timezone }` → full chart JSON.
- **`netlify/functions/geocode.js`** — `GET ?place=` endpoint: place name → lat/lon (OpenStreetMap Nominatim)
  + IANA timezone (via the offline `geo-tz` dataset, so no DST guesswork).
- **`public/`** — the frontend: place autocomplete, North Indian / South Indian toggle, Rāśi (D1) /
  Navāṁśa (D9) toggle, full planetary data table, observatory/terminal visual design.

## Deploy to Netlify

**Option A — drag & drop (fastest):**
1. Zip the whole `vedic-astro-platform` folder (or just the contents).
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag it in.
3. Netlify auto-detects `netlify.toml`, installs dependencies, and deploys both the site and the functions.

**Option B — Git-connected (recommended for ongoing work, matches your existing Unfame/Market Mastery workflow):**
```bash
git init
git add .
git commit -m "Chitra Yantra: birth chart module"
git remote add origin <your-repo-url>
git push -u origin main
```
Then in Netlify: **Add new site → Import from Git**. Build settings are already set via `netlify.toml`
(publish = `public`, functions = `netlify/functions`) — no manual config needed.

**Local testing before deploy:**
```bash
npm install
npx netlify dev
```
This serves the frontend and runs the functions locally at `http://localhost:8888`.

## Accuracy notes (read before using for serious research)

- **Ayanamsa**: Lahiri, computed via a linear precession approximation anchored at J2000.0. Accurate
  to a few arc-seconds across 1900–2100 — fine for mundane/research work, but not identical to
  Swiss Ephemeris's Lahiri figure down to the arc-second. If you need that level of precision later,
  this is the one formula that would need upgrading (isolated in one function).
- **Retrograde detection** uses a ±0.5 day finite-difference check — reliable except within a few
  hours of an exact station, where it can be off by a day.
- **Rahu/Ketu** use the *mean* node (standard for most Vedic software), not the *true* node.
- **Houses**: whole-sign (the standard Vedic default). Placidus/other house systems aren't implemented.
- **Combustion orbs** follow classical values; Vedic traditions vary slightly on exact orbs.

## Roadmap (per your original 8-module spec)

1. ✅ Birth Chart Generator
2. ✅ Live Transit Dashboard — Chandra Lagna (Moon-chart) based, not Ascendant-based. Auto-loads
   the natal Moon from whatever chart you last generated in Module 1 (saved to the browser's
   `localStorage`, key `chitraYantra.lastBirthChart` — nothing leaves your device for this).
   No saved chart yet? You can set any Moon sign manually, which also makes this useful for
   pure mundane research unconnected to a specific birth. Planetary positions are geocentric
   (location-independent) — only the birth chart module needs lat/lon/timezone.
3. Country Horoscope Database — needs Supabase/Neon Postgres; schema can reuse the chart JSON shape
4. Mundane Astrology Research — structured notes UI over the transit engine
5. Reports (half-year/yearly, PDF export) — generate from the transit scanner + a PDF library
6. Historical Research — same engine, just a date picker with a "compare to today" view
7. Calendar — derived from the same ingress/retrograde/eclipse scan as Module 2 (conjunction/ingress
   scanning isn't built yet — Module 2 currently shows a single moment's positions, not a scan
   across a date range; that scanner is the natural next addition before Reports/Calendar)
8. Search — once 3/5/6 have a database, this is a query layer over it

Say the word when you want to move to Module 3 (Country Horoscope Database) or the ingress/
conjunction scanner that Modules 5 and 7 will lean on.

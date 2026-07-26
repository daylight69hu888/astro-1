/* chart-render.js
 * Renders a Vedic Rāśi/Navāṁśa chart into an <svg viewBox="0 0 300 300">,
 * in either North Indian (diamond-in-square, sign-rotates-with-ascendant)
 * or South Indian (fixed sign boxes) style.
 */

// ---- North Indian: 12 fixed wedge positions (kendra kites at N/E/S/W) ----
const NI_HOUSES = {
  1:  [[150,0],[225,75],[150,150],[75,75]],
  2:  [[150,0],[300,0],[225,75]],
  3:  [[300,0],[300,150],[225,75]],
  4:  [[300,150],[225,225],[150,150],[225,75]],
  5:  [[300,150],[300,300],[225,225]],
  6:  [[300,300],[150,300],[225,225]],
  7:  [[150,300],[75,225],[150,150],[225,225]],
  8:  [[150,300],[0,300],[75,225]],
  9:  [[0,300],[0,150],[75,225]],
  10: [[0,150],[75,75],[150,150],[75,225]],
  11: [[0,150],[0,0],[75,75]],
  12: [[0,0],[150,0],[75,75]],
};

// Most published North Indian charts (and the app you're comparing against) lay houses
// out counter-clockwise from the Lagna, not clockwise. The wedge SHAPES above are fixed;
// what changes is which logical house's content gets drawn in which wedge. House 1 (top)
// and house 7 (bottom) sit on the mirror axis and don't move; every other pair swaps.
const NI_MIRROR = { 1: 1, 2: 12, 3: 11, 4: 10, 5: 9, 6: 8, 7: 7, 8: 6, 9: 5, 10: 4, 11: 3, 12: 2 };

// ---- South Indian: fixed 4x4 grid, signs fixed to cells, corners blank ----
const SI_GRID = [
  [11, 0, 1, 2],
  [10, -1, -1, 3],
  [9, -1, -1, 4],
  [8, 7, 6, 5],
];
const CELL = 75; // 300/4

const PLANET_ABBR = {
  Sun: 'Su', Moon: 'Mo', Mars: 'Ma', Mercury: 'Me', Jupiter: 'Ju', Venus: 'Ve', Saturn: 'Sa', Rahu: 'Ra', Ketu: 'Ke',
};

function svgEl(tag, attrs) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs || {}).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}
function polyPoints(pts) { return pts.map((p) => p.join(',')).join(' '); }
function centroid(pts) {
  let x = 0, y = 0;
  pts.forEach((p) => { x += p[0]; y += p[1]; });
  return [x / pts.length, y / pts.length];
}
function farthestVertex(pts, c) {
  let best = pts[0], bestD = -1;
  pts.forEach((p) => {
    const d = (p[0] - c[0]) ** 2 + (p[1] - c[1]) ** 2;
    if (d > bestD) { bestD = d; best = p; }
  });
  return best;
}
function lerp(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; }

function planetGlyphLine(planetsHere) {
  return planetsHere.map((p) => {
    let dignityMark = '';
    if (p.dignity === 'Exalted') dignityMark = '\u2191';       // ↑
    else if (p.dignity === 'Debilitated') dignityMark = '\u2193'; // ↓
    return {
      text: p.abbr + dignityMark + (p.retrograde ? '(R)' : '') + (p.combust ? '*' : ''),
      retro: p.retrograde,
    };
  });
}

function drawPlanetBlock(svg, cx, cy, lines, perRow) {
  const textEl = svgEl('text', { x: cx, y: cy, class: 'house-planets', 'text-anchor': 'middle' });
  const rows = [];
  for (let i = 0; i < lines.length; i += perRow) rows.push(lines.slice(i, i + perRow));
  const rowGap = 12;
  const startDy = rows.length > 1 ? -((rows.length - 1) * rowGap) / 2 : 0;
  rows.forEach((row, ri) => {
    const tspan = svgEl('tspan', { x: cx, dy: ri === 0 ? startDy : rowGap });
    row.forEach((item, idx) => {
      const t = svgEl('tspan', item.retro ? { class: 'retro' } : {});
      t.textContent = item.text + (idx < row.length - 1 ? '  ' : '');
      tspan.appendChild(t);
    });
    textEl.appendChild(tspan);
  });
  svg.appendChild(textEl);
}

// The D1 (Rāśi) chart is built around the birth Ascendant's sign.
// The D9 (Navāṁśa) chart must be built around the separately-calculated
// Navāṁśa Lagna (chart.ascendant.navamsaSignIndex) — NOT the same sign.
function ascendantSignForMode(chart, useNavamsa) {
  return useNavamsa ? chart.ascendant.navamsaSignIndex : chart.ascendant.signIndex;
}

function groupPlanetsByHouse(chart, useNavamsa, ascSignIdx) {
  const byHouse = {};
  for (let h = 1; h <= 12; h++) byHouse[h] = [];
  chart.planets.forEach((p) => {
    const h = useNavamsa
      ? (((p.navamsaSignIndex - ascSignIdx + 12) % 12) + 1)
      : p.house;
    // Navāṁśa dignity would need its own exaltation/debilitation table (a planet's
    // dignity is sign-specific), so the ↑/↓ marks only apply to the Rāśi (D1) view.
    byHouse[h].push({
      abbr: PLANET_ABBR[p.name] || p.name.slice(0, 2),
      retrograde: p.retrograde,
      combust: p.combust,
      dignity: useNavamsa ? null : p.dignity,
    });
  });
  return byHouse;
}

function renderNorthIndian(svg, chart, useNavamsa) {
  svg.innerHTML = '';
  const ascSignIdx = ascendantSignForMode(chart, useNavamsa);

  Object.values(NI_HOUSES).forEach((pts) => {
    svg.appendChild(svgEl('polygon', { points: polyPoints(pts), class: 'house-line' }));
  });
  svg.appendChild(svgEl('rect', { x: 0, y: 0, width: 300, height: 300, class: 'house-outline' }));

  const byHouse = groupPlanetsByHouse(chart, useNavamsa, ascSignIdx);

  for (let wedge = 1; wedge <= 12; wedge++) {
    const logicalHouse = NI_MIRROR[wedge];
    const signIdx = (ascSignIdx + logicalHouse - 1) % 12;
    const pts = NI_HOUSES[wedge];
    const c = centroid(pts);
    const tip = farthestVertex(pts, c);
    const numberPos = lerp(c, tip, 0.55);
    const planetPos = lerp(c, tip, -0.28);

    svg.appendChild(svgEl('text', {
      x: numberPos[0], y: numberPos[1] + 3, class: 'house-sign', 'text-anchor': 'middle',
    })).textContent = String(signIdx + 1);

    const lines = planetGlyphLine(byHouse[logicalHouse]);
    drawPlanetBlock(svg, planetPos[0], planetPos[1] + 3, lines, 3);

    if (wedge === 1) {
      svg.appendChild(svgEl('circle', { cx: 150, cy: 8, r: 2.4, class: 'house-asc-marker' }));
    }
  }
}

function renderSouthIndian(svg, chart, useNavamsa) {
  svg.innerHTML = '';
  const ascSignIdx = ascendantSignForMode(chart, useNavamsa);
  const byHouse = groupPlanetsByHouse(chart, useNavamsa, ascSignIdx);

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const signIdx = SI_GRID[row][col];
      const x = col * CELL, y = row * CELL;
      if (signIdx === -1) {
        svg.appendChild(svgEl('rect', { x, y, width: CELL, height: CELL, class: 'grid-center' }));
        continue;
      }
      const isAsc = signIdx === ascSignIdx;
      svg.appendChild(svgEl('rect', { x, y, width: CELL, height: CELL, class: 'grid-cell' + (isAsc ? ' grid-cell--asc' : '') }));
      svg.appendChild(svgEl('text', { x: x + 7, y: y + 14, class: 'house-sign' })).textContent = String(signIdx + 1);
      if (isAsc) {
        const asc = svgEl('text', { x: x + CELL - 7, y: y + 14, class: 'house-sign', 'text-anchor': 'end', fill: '#E8C77E' });
        asc.textContent = 'Asc';
        svg.appendChild(asc);
      }

      const houseNum = ((signIdx - ascSignIdx + 12) % 12) + 1;
      const lines = planetGlyphLine(byHouse[houseNum]);
      drawPlanetBlock(svg, x + CELL / 2, y + CELL / 2 + 6, lines, 2);
    }
  }
  svg.appendChild(svgEl('rect', { x: 0, y: 0, width: 300, height: 300, class: 'house-outline' }));
}

function renderChart(svg, chart, style, useNavamsa) {
  if (style === 'south') renderSouthIndian(svg, chart, useNavamsa);
  else renderNorthIndian(svg, chart, useNavamsa);
}

window.VedicChartRender = { renderChart };

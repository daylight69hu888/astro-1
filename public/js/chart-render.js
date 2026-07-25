/* chart-render.js
 * Renders a Vedic Rāśi/Navāṁśa chart into an <svg viewBox="0 0 300 300">,
 * in either North Indian (diamond-in-square, sign-rotates-with-ascendant)
 * or South Indian (fixed sign boxes) style.
 */

const SIGN_ABBR = ['Ar','Ta','Ge','Cn','Le','Vi','Li','Sc','Sg','Cp','Aq','Pi'];

// ---- North Indian: 12 house polygons (kendra kites at N/E/S/W = houses 1,4,7,10) ----
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
// label anchor points (centroid-ish, nudged for readability) per house
const NI_LABEL_POS = {
  1: [150, 60],  2: [150, 30], 3: [262, 40], 4: [240, 150],
  5: [262, 260], 6: [150, 270], 7: [150, 240], 8: [60, 260],
  9: [38, 150],  10: [60, 150], 11: [38, 40], 12: [150, 30],
};

// ---- South Indian: fixed 4x4 grid, signs fixed to cells, corners blank ----
// row, col (0-indexed) -> sign index (0=Aries...11=Pisces)
const SI_GRID = [
  [11, 0, 1, 2],
  [10, -1, -1, 3],
  [9, -1, -1, 4],
  [8, 7, 6, 5],
];
const CELL = 75; // 300/4

function svgEl(tag, attrs) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs || {}).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}
function polyPoints(pts) { return pts.map((p) => p.join(',')).join(' '); }

function planetGlyphLine(planetsHere) {
  // returns array of {text, retro} for tspans, e.g. "Su", "Me(R)"
  return planetsHere.map((p) => ({
    text: p.abbr + (p.retrograde ? '(R)' : '') + (p.combust ? '*' : ''),
    retro: p.retrograde,
  }));
}

const PLANET_ABBR = {
  Sun: 'Su', Moon: 'Mo', Mars: 'Ma', Mercury: 'Me', Jupiter: 'Ju', Venus: 'Ve', Saturn: 'Sa', Rahu: 'Ra', Ketu: 'Ke',
};

function renderNorthIndian(svg, chart, useNavamsa) {
  svg.innerHTML = '';
  svg.appendChild(svgEl('rect', { x: 0, y: 0, width: 300, height: 300, fill: 'none' }));

  const ascSignIdx = chart.ascendant.signIndex;

  // draw the 4 outer square edges + house dividing lines by drawing each house polygon
  Object.entries(NI_HOUSES).forEach(([houseNum, pts]) => {
    svg.appendChild(svgEl('polygon', { points: polyPoints(pts), class: 'house-line' }));
  });
  // bold outer boundary
  svg.appendChild(svgEl('rect', { x: 0, y: 0, width: 300, height: 300, class: 'house-outline' }));

  // group planets by house
  const byHouse = {};
  for (let h = 1; h <= 12; h++) byHouse[h] = [];
  chart.planets.forEach((p) => {
    const h = useNavamsa
      ? (((p.navamsaSignIndex - ascSignIdx + 12) % 12) + 1)
      : p.house;
    byHouse[h].push({ abbr: PLANET_ABBR[p.name] || p.name.slice(0, 2), retrograde: p.retrograde, combust: p.combust });
  });

  for (let h = 1; h <= 12; h++) {
    const signIdx = (ascSignIdx + h - 1) % 12;
    const [lx, ly] = NI_LABEL_POS[h];
    // sign abbreviation, small, offset above planet list
    svg.appendChild(svgEl('text', { x: lx, y: ly - 12, class: 'house-sign', 'text-anchor': 'middle' })).textContent = SIGN_ABBR[signIdx];

    const planetsHere = byHouse[h];
    const lines = planetGlyphLine(planetsHere);
    const textEl = svgEl('text', { x: lx, y: ly + 2, class: 'house-planets', 'text-anchor': 'middle' });
    // wrap up to 3 per line
    const rows = [];
    for (let i = 0; i < lines.length; i += 3) rows.push(lines.slice(i, i + 3));
    rows.forEach((row, ri) => {
      const tspan = svgEl('tspan', { x: lx, dy: ri === 0 ? 0 : 11 });
      row.forEach((item, idx) => {
        const t = svgEl('tspan', item.retro ? { class: 'retro' } : {});
        t.textContent = item.text + (idx < row.length - 1 ? '  ' : '');
        tspan.appendChild(t);
      });
      textEl.appendChild(tspan);
    });
    svg.appendChild(textEl);

    if (h === 1) {
      svg.appendChild(svgEl('circle', { cx: 150, cy: 8, r: 2.4, class: 'house-asc-marker' }));
    }
  }
}

function renderSouthIndian(svg, chart, useNavamsa) {
  svg.innerHTML = '';
  const ascSignIdx = chart.ascendant.signIndex;

  const byHouse = {};
  for (let h = 1; h <= 12; h++) byHouse[h] = [];
  chart.planets.forEach((p) => {
    const h = useNavamsa
      ? (((p.navamsaSignIndex - ascSignIdx + 12) % 12) + 1)
      : p.house;
    byHouse[h].push({ abbr: PLANET_ABBR[p.name] || p.name.slice(0, 2), retrograde: p.retrograde, combust: p.combust });
  });

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
      svg.appendChild(svgEl('text', { x: x + 6, y: y + 13, class: 'house-sign' })).textContent = SIGN_ABBR[signIdx];
      if (isAsc) {
        const asc = svgEl('text', { x: x + CELL - 8, y: y + 13, class: 'house-sign', 'text-anchor': 'end', fill: '#E8C77E' });
        asc.textContent = 'Asc';
        svg.appendChild(asc);
      }

      const houseNum = ((signIdx - ascSignIdx + 12) % 12) + 1;
      const lines = planetGlyphLine(byHouse[houseNum]);
      const cx = x + CELL / 2;
      const textEl = svgEl('text', { x: cx, y: y + CELL / 2 + 4, class: 'house-planets', 'text-anchor': 'middle' });
      const rows = [];
      for (let i = 0; i < lines.length; i += 2) rows.push(lines.slice(i, i + 2));
      rows.forEach((r, ri) => {
        const tspan = svgEl('tspan', { x: cx, dy: ri === 0 ? (rows.length > 1 ? -6 * (rows.length - 1) : 0) : 12 });
        r.forEach((item, idx) => {
          const t = svgEl('tspan', item.retro ? { class: 'retro' } : {});
          t.textContent = item.text + (idx < r.length - 1 ? ' ' : '');
          tspan.appendChild(t);
        });
        textEl.appendChild(tspan);
      });
      svg.appendChild(textEl);
    }
  }
  svg.appendChild(svgEl('rect', { x: 0, y: 0, width: 300, height: 300, class: 'house-outline' }));
}

function renderChart(svg, chart, style, useNavamsa) {
  if (style === 'south') renderSouthIndian(svg, chart, useNavamsa);
  else renderNorthIndian(svg, chart, useNavamsa);
}

window.VedicChartRender = { renderChart };

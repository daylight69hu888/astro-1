// guide-render.js — renders the "Personal House-by-House Guide" grid on the Birth
// Chart page. Standalone script: reads the same localStorage key app.js already saves
// to (chitraYantra.lastBirthChart), so it doesn't need to touch app.js at all.
(function () {
  const PLANET_ORDER = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

  function toneClass(tone) {
    if (tone === 'good') return 'guide-card--good';
    if (tone === 'bad') return 'guide-card--bad';
    return 'guide-card--neutral';
  }

  function renderGuide() {
    const container = document.getElementById('personalGuide');
    if (!container) return; // this page doesn't have the guide section — nothing to do

    let saved;
    try {
      const raw = localStorage.getItem('chitraYantra.lastBirthChart');
      if (!raw) {
        container.innerHTML = '<p class="panel__note">Calculate a birth chart above to see your personal house-by-house guide here.</p>';
        return;
      }
      saved = JSON.parse(raw);
    } catch (e) {
      container.innerHTML = '<p class="panel__note">Could not read the saved chart.</p>';
      return;
    }

    const planets = saved.chart.planets;
    const sunPlanet = planets.find((pl) => pl.name === 'Sun');

    const cardsHtml = PLANET_ORDER.map((name) => {
      const p = planets.find((pl) => pl.name === name);
      if (!p) return '';
      const guide = window.CHITRA_PLANET_HOUSE_GUIDE[name] && window.CHITRA_PLANET_HOUSE_GUIDE[name][p.house];
      if (!guide) {
        return `<div class="guide-card guide-card--neutral">
          <div class="guide-card__head"><span class="guide-card__planet">${name}</span><span class="guide-card__house">House ${p.house}</span></div>
          <p class="guide-card__theme">No write-up available for this placement yet.</p>
        </div>`;
      }

      const introHtml = guide.intro ? `<p class="guide-card__intro">${guide.intro}</p>` : '';
      const posHtml = guide.positive && guide.positive.length
        ? `<div class="guide-card__section-label guide-card__section-label--pos">Positive</div><ul class="guide-card__list guide-card__list--pos">${guide.positive.map((x) => `<li>${x}</li>`).join('')}</ul>` : '';
      const negHtml = guide.negative && guide.negative.length
        ? `<div class="guide-card__section-label guide-card__section-label--neg">Caution</div><ul class="guide-card__list guide-card__list--neg">${guide.negative.map((x) => `<li>${x}</li>`).join('')}</ul>` : '';
      const remedyHtml = guide.remedy ? `<p class="guide-card__remedy"><strong>Remedy:</strong> ${guide.remedy}</p>` : '';
      const badgeHtml = guide.badge ? `<span class="guide-card__badge">${guide.badge}</span>` : '';

      const conditionalHtml = guide.conditional && guide.conditional.length
        ? `<div class="guide-card__section-label guide-card__section-label--cond">If another planet is placed as follows</div>
           <ul class="guide-card__list guide-card__list--cond">${guide.conditional.map((c) => `<li>${c.text}</li>`).join('')}</ul>`
        : '';

      const environmentalHtml = guide.environmental && guide.environmental.length
        ? `<div class="guide-card__section-label guide-card__section-label--env">Environmental / Vastu markers</div>
           <ul class="guide-card__list guide-card__list--env">${guide.environmental.map((x) => `<li>${x}</li>`).join('')}</ul>`
        : '';

      // Special case: Rahu in the 1st house depends entirely on where the Sun is placed
      let sunPositionHtml = '';
      if (guide.sunPosition && sunPlanet) {
        const line = guide.sunPosition[sunPlanet.house];
        sunPositionHtml = `<div class="guide-card__section-label guide-card__section-label--cond">Result based on your Sun's house (House ${sunPlanet.house})</div>
          <p class="guide-card__conditional-result">${line || 'No specific write-up for this Sun house.'}</p>
          <details class="guide-card__all-sun">
            <summary>See all 12 Sun-house variants</summary>
            <ul class="guide-card__list guide-card__list--cond">
              ${Object.keys(guide.sunPosition).map((h) => `<li${Number(h) === sunPlanet.house ? ' class="guide-card__current-line"' : ''}>${guide.sunPosition[h]}</li>`).join('')}
            </ul>
          </details>`;
      }

      return `
        <div class="guide-card ${toneClass(guide.tone)}">
          <div class="guide-card__head">
            <span class="guide-card__planet">${name}</span>
            <span class="guide-card__house">House ${p.house} \u00b7 ${p.sign}</span>
          </div>
          <p class="guide-card__theme">${guide.theme}</p>
          ${badgeHtml}
          ${introHtml}
          ${posHtml}
          ${negHtml}
          ${remedyHtml}
          ${conditionalHtml}
          ${environmentalHtml}
          ${sunPositionHtml}
        </div>`;
    }).join('');

    container.innerHTML = `
      <h2 class="table__title" style="margin-top:28px;">Personal House-by-House Guide
        <span class="table__title-sub">Planet placements interpreted by house \u2014 including cross-planet conditions noted in the source material</span>
      </h2>
      <div class="guide-grid">${cardsHtml}</div>
    `;
  }

  document.addEventListener('DOMContentLoaded', renderGuide);
  const form = document.getElementById('chartForm');
  if (form) {
    form.addEventListener('submit', () => { setTimeout(renderGuide, 1500); });
  }
})();

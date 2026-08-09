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
      const posHtml = guide.positive.length
        ? `<ul class="guide-card__list guide-card__list--pos">${guide.positive.map((x) => `<li>${x}</li>`).join('')}</ul>` : '';
      const negHtml = guide.negative.length
        ? `<ul class="guide-card__list guide-card__list--neg">${guide.negative.map((x) => `<li>${x}</li>`).join('')}</ul>` : '';
      const badgeHtml = guide.badge ? `<span class="guide-card__badge">${guide.badge}</span>` : '';
      return `
        <div class="guide-card ${toneClass(guide.tone)}">
          <div class="guide-card__head">
            <span class="guide-card__planet">${name}</span>
            <span class="guide-card__house">House ${p.house} \u00b7 ${p.sign}</span>
          </div>
          <p class="guide-card__theme">${guide.theme}</p>
          ${badgeHtml}
          ${posHtml}
          ${negHtml}
        </div>`;
    }).join('');

    container.innerHTML = `
      <h2 class="table__title" style="margin-top:28px;">Personal House-by-House Guide
        <span class="table__title-sub">Planet placements interpreted by house \u2014 not conjunctions</span>
      </h2>
      <div class="guide-grid">${cardsHtml}</div>
    `;
  }

  // Render once on load (covers "already generated earlier" case)...
  document.addEventListener('DOMContentLoaded', renderGuide);
  // ...and again shortly after a new chart is calculated on this page, since app.js
  // saves to localStorage asynchronously and this script doesn't hook into that flow directly.
  const form = document.getElementById('chartForm');
  if (form) {
    form.addEventListener('submit', () => { setTimeout(renderGuide, 1500); });
  }
})();

/* Shared IMSDA tools navigation component - PUBLIC version (public tools only).
   DEPLOY: on the PUBLIC host, upload this file as tools-nav.js (tool pages always load tools-nav.js).
   Add <link rel="stylesheet" href="tools-nav.css"> and <script defer src="tools-nav.js"></script>
   to any static tool page to reuse this header.
   Copy of tools-nav.js with only the tools on index-public.html.
   Keep the code below the TOOLS list identical in both files. */
(function () {
  const TOOLS = [
    { section: 'Pastors / Churches', items: [
      ['logo-generator.html','Adventist Logo Maker'],
      ['business-card-generator.html','Business Card Creator'],
      ['church-letterhead-pdf-generator.html','Church Letterhead PDF'],
      ['custom-quote-generator.html','Quote Generator'],
      ['church-bulletin-generator.html','Bulletin Maker']
    ]},
    { section: 'Event Tools', items: [
      ['name-tag-maker-Avery18660.html','Name Tag (Avery 18660)'],
      ['name-tag-generator-8395.html','Name Tag (Avery 8395)'],
      ['avery-5392.html','Name Tag (Avery 5392)'],
      ['schedule-maker.html','Schedule Maker'],
      ['schedule-avery-5392.html','Schedule Maker (Avery 5392)'],
      ['calendar-builder.html','Calendar Generator']
    ]},
    { section: 'Audio/Video and Technology', items: [
      ['church-av-quote-request.html','Church AV Quote Request'],
      ['church-wifi-coverage.html','Church Network & WiFi Estimator'],
      ['church-network-quote-request.html','Church Networking/Internet Quote Request'],
      ['livestream-equipment-checklist.html','Livestream Equipment Checklist'],
      ['livestream-checklist.html','Livestream Checklist'],
      ['security-camera-coverage-estimator.html','Security Camera Estimator'],
      ['security-camera-quote-generator.html','Security Camera Quote Request']
    ]},
    { section: 'Special Tools', items: [
      ['imconnected.html','Email Newsletter Builder']
    ]}
  ];

  const path = location.pathname.split('/').pop() || 'index.html';
  const currentTitle = document.title || 'Tool';
  /* Unified IMSDA Tools Navigation */
  const nav = document.createElement('header');
  nav.className = 'imsda-tools-nav';
  nav.innerHTML = `
    <div class="imsda-tools-nav__inner">
      <a class="imsda-tools-nav__brand" href="index.html" aria-label="IMSDA Tools home">IMSDA Tools</a>
      <div class="imsda-tools-nav__current" aria-live="polite">${currentTitle}</div>
      <div class="imsda-tools-nav__spacer"></div>
      <a class="imsda-tools-nav__link" href="index.html">Back to Tools</a>
      <div class="imsda-tools-nav__menu">
        <button type="button" class="imsda-tools-nav__toggle" aria-haspopup="true" aria-expanded="false" aria-controls="imsda-tools-nav-panel">Browse Tools</button>
        <div id="imsda-tools-nav-panel" class="imsda-tools-nav__panel" aria-hidden="true"></div>
      </div>
    </div>`;

  const panel = nav.querySelector('#imsda-tools-nav-panel');
  TOOLS.forEach(group => {
    const section = document.createElement('section');
    section.className = 'imsda-tools-nav__section';
    const heading = document.createElement('h3');
    heading.textContent = group.section;
    section.appendChild(heading);
    group.items.forEach(([href, label]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      if (href === path) {
        link.setAttribute('aria-current', 'page');
        link.style.fontWeight = '800';
      }
      section.appendChild(link);
    });
    panel.appendChild(section);
  });

  const body = document.body;
  body.style.setProperty('--imsda-body-pt', getComputedStyle(body).paddingTop);
  body.classList.add('imsda-has-nav');
  body.prepend(nav);
  function syncNavHeight() {
    body.style.setProperty('--imsda-nav-h', nav.offsetHeight + 'px');
  }
  syncNavHeight();
  if (window.ResizeObserver) new ResizeObserver(syncNavHeight).observe(nav);
  else window.addEventListener('resize', syncNavHeight);

  const toggle = nav.querySelector('.imsda-tools-nav__toggle');
  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
  }
  toggle.addEventListener('click', function () {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    panel.setAttribute('aria-hidden', String(open));
  });
  document.addEventListener('click', function (event) {
    if (!nav.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });
})();

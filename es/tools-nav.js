/* Componente de navegación compartido de las herramientas IMSDA - versión PÚBLICA (solo herramientas públicas).
   IMPLEMENTACIÓN: en el servidor PÚBLICO, suba este archivo como tools-nav.js (las páginas siempre cargan tools-nav.js).
   Agregue <link rel="stylesheet" href="tools-nav.css"> y <script defer src="tools-nav.js"></script>
   a cualquier página de herramienta estática para reutilizar este encabezado.
   Copia de tools-nav.js con solo las herramientas de index-public.html.
   Mantenga idéntico en ambos archivos el código debajo de la lista TOOLS. */
(function () {
  const TOOLS = [
    { section: 'Pastores / Iglesias', items: [
      ['logo-generator.html','Creador de logotipos adventistas'],
      ['business-card-generator.html','Creador de tarjetas de presentación'],
      ['church-letterhead-pdf-generator.html','Membrete de iglesia en PDF'],
      ['custom-quote-generator.html','Generador de cotizaciones'],
      ['church-bulletin-generator.html','Creador de boletines']
    ]},
    { section: 'Herramientas para eventos', items: [
      ['name-tag-maker-Avery18660.html','Gafete (Avery 18660)'],
      ['name-tag-generator-8395.html','Gafete (Avery 8395)'],
      ['avery-5392.html','Gafete (Avery 5392)'],
      ['schedule-maker.html','Creador de horarios'],
      ['schedule-avery-5392.html','Creador de horarios (Avery 5392)'],
      ['calendar-builder.html','Generador de calendarios']
    ]},
    { section: 'Audio/Video y Tecnología', items: [
      ['church-av-quote-request.html','Solicitud de cotización AV para iglesias'],
      ['church-wifi-coverage.html','Estimador de red y WiFi para la iglesia'],
      ['church-network-quote-request.html','Solicitud de cotización de red/Internet para la iglesia'],
      ['livestream-equipment-checklist.html','Lista de equipo para transmisión en vivo'],
      ['livestream-checklist.html','Lista de verificación para transmisión en vivo'],
      ['security-camera-quote-generator.html','Solicitud de cotización de cámaras de seguridad']
    ]},
    { section: 'Herramientas especiales', items: [
      ['../imconnected.html','Creador de boletines por correo electrónico (en inglés)']
    ]}
  ];

  const path = location.pathname.split('/').pop() || 'index.html';
  const currentTitle = document.title || 'Herramienta';
  /* Navegación unificada de herramientas IMSDA */
  const nav = document.createElement('header');
  nav.className = 'imsda-tools-nav';
  nav.innerHTML = `
    <div class="imsda-tools-nav__inner">
      <a class="imsda-tools-nav__brand" href="index.html" aria-label="Inicio de Herramientas IMSDA">Herramientas IMSDA</a>
      <div class="imsda-tools-nav__current" aria-live="polite">${currentTitle}</div>
      <div class="imsda-tools-nav__spacer"></div>
      <a class="imsda-tools-nav__link" href="index.html">Volver a herramientas</a>
      <div class="imsda-tools-nav__menu">
        <button type="button" class="imsda-tools-nav__toggle" aria-haspopup="true" aria-expanded="false" aria-controls="imsda-tools-nav-panel">Explorar herramientas</button>
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

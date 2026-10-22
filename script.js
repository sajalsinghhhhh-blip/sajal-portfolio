(() => {
  const body = document.body, themeButton = document.querySelector('.theme-toggle'), themeIcon = document.querySelector('.theme-icon');
  const menuButton = document.querySelector('.menu-toggle'), mobileMenu = document.querySelector('.mobile-menu');
  const setTheme = (light) => { body.classList.toggle('light', light); body.classList.toggle('dark', !light); themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme'); themeIcon.textContent = light ? '◐' : '☼'; document.querySelector('meta[name="theme-color"]').content = light ? '#f4f3ef' : '#141915'; };
  try { setTheme(localStorage.getItem('sajal-portfolio-theme') === 'light'); } catch { setTheme(false); }
  themeButton.addEventListener('click', () => { const light = !body.classList.contains('light'); setTheme(light); try { localStorage.setItem('sajal-portfolio-theme', light ? 'light' : 'dark'); } catch { /* Theme still works for this visit. */ } });
  const closeMenu = () => { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); mobileMenu.hidden = true; };
  menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); mobileMenu.hidden = !open; });
  mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu)); window.addEventListener('resize', () => { if (window.innerWidth > 680) closeMenu(); });
  document.querySelector('#year').textContent = new Date().getFullYear();
  const filters = document.querySelectorAll('.filter-button'), cards = document.querySelectorAll('.project-card');
  filters.forEach((button) => button.addEventListener('click', () => { const filter = button.dataset.filter; filters.forEach((item) => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); }); cards.forEach((card) => card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.kind !== filter)); }));
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) { const observer = new IntersectionObserver((entries, current) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); current.unobserve(entry.target); } }), { threshold: .12, rootMargin: '0px 0px -24px 0px' }); items.forEach((item) => observer.observe(item)); } else items.forEach((item) => item.classList.add('is-visible'));
})();

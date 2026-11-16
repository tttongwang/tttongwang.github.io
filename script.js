// Keep the public site URL clean when opened from a ChatGPT-shared link.
const currentUrl = new URL(window.location.href);
const referringSource = currentUrl.searchParams.get('utm_source');
if (referringSource && referringSource.toLowerCase() === 'chatgpt.com') {
  currentUrl.searchParams.delete('utm_source');
  window.history.replaceState(window.history.state, '', `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
}

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  }));
}

const filters = [...document.querySelectorAll('.filter-button')];
const publications = [...document.querySelectorAll('.pub-item')];
filters.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach(other => {
      const isActive = other === button;
      other.classList.toggle('active', isActive);
      other.setAttribute('aria-pressed', String(isActive));
    });
    publications.forEach(publication => {
      publication.hidden = category !== 'all' && publication.dataset.category !== category;
    });
  });
});

const sections = document.querySelectorAll('main section[id]');
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
if ('IntersectionObserver' in window) {
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-26% 0px -60% 0px' });
  sections.forEach(section => activeObserver.observe(section));
}

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

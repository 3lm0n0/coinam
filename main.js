// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Hamburger menu
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
  });
  // Cerrar al hacer click en un link
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });
  // Cerrar al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    }
  });
}


// Horizontal scroll panels
const hscrollSection = document.querySelector('.hscroll-section');
const hscrollTrack = document.querySelector('.hscroll-track');
const progressFill = document.querySelector('.hscroll-progress-fill');
const curEl = document.querySelector('.hscroll-counter .cur');
const hscrollHint = document.querySelector('.hscroll-hint');

if (hscrollSection && hscrollTrack) {
  const numPanels = hscrollTrack.children.length;

  function updateHScroll() {
    const rect = hscrollSection.getBoundingClientRect();
    const scrolled = -rect.top;
    const scrollableHeight = hscrollSection.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

    hscrollTrack.style.transform = 'translateX(' + (-progress * (numPanels - 1) * window.innerWidth) + 'px)';

    if (progressFill) progressFill.style.width = (progress * 100) + '%';

    if (curEl) {
      const idx = Math.min(numPanels - 1, Math.round(progress * (numPanels - 1)));
      curEl.textContent = String(idx + 1).padStart(2, '0');
    }

    if (hscrollHint) hscrollHint.style.opacity = progress > 0.02 ? '0' : '1';
  }

  window.addEventListener('scroll', updateHScroll, { passive: true });
  updateHScroll();
}

// Intersection Observer for section reveals
const sections = document.querySelectorAll('[data-section]');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

sections.forEach(s => io.observe(s));

// Año dinámico en el footer
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu (Safari-safe)
const openBtn = document.querySelector('[data-open]');
const closeEls = document.querySelectorAll('[data-close]');
const overlay = document.querySelector('.overlay');
const drawer = document.querySelector('.drawer');
const navLinks = document.querySelectorAll('[data-nav]');

function openMenu(){
  document.body.classList.add('menu-open');
  if (drawer) drawer.setAttribute('aria-hidden', 'false');
}
function closeMenu(){
  document.body.classList.remove('menu-open');
  if (drawer) drawer.setAttribute('aria-hidden', 'true');
}

if (openBtn) openBtn.addEventListener('click', openMenu);
closeEls.forEach(el => el.addEventListener('click', closeMenu));
if (overlay) overlay.addEventListener('click', closeMenu);
navLinks.forEach(a => a.addEventListener('click', closeMenu));

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Reveal on scroll (IntersectionObserver + fallback)
const items = Array.from(document.querySelectorAll('.reveal'));

function revealFallback(){
  const vh = window.innerHeight || 800;
  items.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < vh - 40) el.classList.add('is-visible');
  });
}

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.12 });

  items.forEach(el => io.observe(el));
} else {
  window.addEventListener('scroll', revealFallback, { passive:true });
  window.addEventListener('load', revealFallback);
  revealFallback();
}

// FAQ accordion
document.querySelectorAll('[data-acc]').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.classList.contains('is-open');
    document.querySelectorAll('[data-acc].is-open').forEach(b => b.classList.remove('is-open'));
    if (!isOpen) btn.classList.add('is-open');
  });
});

// Prevent submit until Formspree is set
const form = document.getElementById('contactForm');
if (form){
  form.addEventListener('submit', (e) => {
    const action = form.getAttribute('action') || '';
    if (action.indexOf('DEIN_FORM_ID') !== -1) {
      e.preventDefault();
      alert('Formular ist bereit. Für echten Versand: Formspree-ID eintragen.');
    }
  });
}




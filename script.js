// Mobile menu
const openBtn = document.querySelector('[data-open]');
const closeEls = document.querySelectorAll('[data-close]');
const overlay = document.querySelector('.overlay');
const drawer = document.querySelector('.drawer');

function openMenu(){
  document.body.classList.add('menu-open');
  drawer?.setAttribute('aria-hidden','false');
}
function closeMenu(){
  document.body.classList.remove('menu-open');
  drawer?.setAttribute('aria-hidden','true');
}

openBtn?.addEventListener('click', openMenu);
closeEls.forEach(el => el.addEventListener('click', closeMenu));
overlay?.addEventListener('click', closeMenu);
window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeMenu(); });

// Reveal (IntersectionObserver + fallback)
const items = Array.from(document.querySelectorAll('.reveal'));
function fallback(){
  const vh = window.innerHeight || 800;
  items.forEach(el=>{
    const r = el.getBoundingClientRect();
    if(r.top < vh - 40) el.classList.add('is-visible');
  });
}
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.12 });
  items.forEach(el=>io.observe(el));
} else {
  window.addEventListener('scroll', fallback, { passive:true });
  window.addEventListener('load', fallback);
  fallback();
}

// FAQ accordion
document.querySelectorAll('[data-acc]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const isOpen = btn.classList.contains('is-open');
    document.querySelectorAll('[data-acc].is-open').forEach(b=>b.classList.remove('is-open'));
    if(!isOpen) btn.classList.add('is-open');
  });
});

// Prevent submit until Formspree is set
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', (e)=>{
    const action = form.getAttribute('action') || '';
    if(action.includes('DEIN_FORM_ID')){
      e.preventDefault();
      alert('Formular ist bereit. Für echten Versand: Formspree-ID eintragen.');
    }
  });
}

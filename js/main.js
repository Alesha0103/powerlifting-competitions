// ============================================================
// POWERLIFTING CHAMPIONSHIP — main.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initEmbers();
  initCountdown();
  initScrollReveal();
  initCounterAnimations();
  initMobileNav();
  initRegisterForm();
});

// ============================================================
// HEADER — sticky + scroll
// ============================================================
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ============================================================
// EMBER PARTICLES
// ============================================================
function initEmbers() {
  const canvas = document.querySelector('.hero__canvas');
  if (!canvas) return;

  const count = 30;

  for (let i = 0; i < count; i++) {
    createEmber(canvas, i * (5000 / count));
  }
}

function createEmber(container, delay = 0) {
  const el = document.createElement('div');
  el.className = 'ember';
  repositionEmber(el);
  el.style.animationDelay = `${delay}ms`;
  el.style.animationDuration = `${2000 + Math.random() * 3000}ms`;
  container.appendChild(el);

  el.addEventListener('animationend', () => {
    repositionEmber(el);
    el.style.animationDelay = '0ms';
    el.style.animationDuration = `${2000 + Math.random() * 3000}ms`;
  });
}

function repositionEmber(el) {
  const size = 2 + Math.random() * 5;
  const hue = Math.random() > 0.5 ? '#f39c12' : '#e74c3c';
  el.style.cssText = `
    left: ${Math.random() * 100}%;
    bottom: 80px;
    width: ${size}px;
    height: ${size}px;
    background: ${hue};
    box-shadow: 0 0 ${size * 2}px ${hue};
  `;
}

// ============================================================
// COUNTDOWN TIMER
// ============================================================
function initCountdown() {
  const target = new Date('2026-06-15T09:00:00');
  const days  = document.getElementById('cd-days');
  const hours = document.getElementById('cd-hours');
  const mins  = document.getElementById('cd-mins');
  const secs  = document.getElementById('cd-secs');

  if (!days) return;

  function update() {
    const now  = new Date();
    const diff = target - now;

    if (diff <= 0) {
      days.textContent = hours.textContent = mins.textContent = secs.textContent = '00';
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    days.textContent  = String(d).padStart(2, '0');
    hours.textContent = String(h).padStart(2, '0');
    mins.textContent  = String(m).padStart(2, '0');
    secs.textContent  = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => observer.observe(el));
}

// ============================================================
// COUNTER ANIMATIONS
// ============================================================
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-counter]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.counter, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  }

  requestAnimationFrame(step);
}

// ============================================================
// MOBILE NAV
// ============================================================
function initMobileNav() {
  const burger = document.querySelector('.hamburger');
  const nav    = document.querySelector('.site-nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  nav.querySelectorAll('.site-nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ============================================================
// REGISTER FORM
// ============================================================
function initRegisterForm() {
  const form = document.querySelector('.js-register-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn   = form.querySelector('button');
    const email = input?.value.trim();

    if (!email || !email.includes('@')) {
      input?.classList.add('error');
      input?.focus();
      setTimeout(() => input?.classList.remove('error'), 2000);
      return;
    }

    btn.textContent = '✓ REGISTERED!';
    btn.disabled = true;
    input.value = '';

    setTimeout(() => {
      btn.textContent = 'REGISTER NOW';
      btn.disabled = false;
    }, 4000);
  });
}

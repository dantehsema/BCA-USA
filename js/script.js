/* BCA-USA — script.js */

// ── Sticky Header ─────────────────────────────
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── Hamburger Menu ────────────────────────────
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('main-nav');
if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    const open = mainNav.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded', open);
    hamburger.classList.toggle('active', open);
  });
  document.addEventListener('click', e => {
    if (!header.contains(e.target)) {
      mainNav.classList.remove('nav-open');
      hamburger.classList.remove('active');
    }
  });
}

// ── Scroll Reveal (Intersection Observer) ─────
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => io.observe(el));
}

// ── Waitlist Form ─────────────────────────────
function handleWaitlist(e) {
  e.preventDefault();
  const btn   = document.getElementById('waitlist-submit-btn');
  const name  = document.getElementById('waitlist-name');
  const email = document.getElementById('waitlist-email');
  if (!btn || !name || !email) return;
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = 'linear-gradient(135deg,#2e7d32,#388e3c)';
  btn.disabled = true;
  name.disabled = email.disabled = true;
}

// ── Active Nav Link ───────────────────────────
(function() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === page || (page === '' && href === 'index.html'))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
})();

// ── Events Filter ─────────────────────────────
function initEventFilter() {
  const tabs  = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.event-card[data-category]');
  if (!tabs.length || !cards.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.filter;
      cards.forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.style.display = show ? '' : 'none';
        if (show) setTimeout(() => card.classList.add('visible'), 50);
      });
    });
  });
}
initEventFilter();

// ── Smooth anchor scroll ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

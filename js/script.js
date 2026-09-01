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

// ── Link hover previews ───────────────────────
(function initLinkPreviews() {
  const BY_ID = {
    'nav-home': 'Return to the homepage — hero, community stats, featured events, and chapter overview.',
    'nav-about': 'Our history since 1988, mission & vision, leadership board, and photo gallery.',
    'nav-events': 'Upcoming conventions, cultural nights, fundraisers, and regional programs.',
    'nav-join': 'Membership portal preview — join the waitlist for chapter-based enrollment.',
    'nav-contact': 'National office contact, message form, and directory of all 14 US chapters.',
    'nav-cta': 'Start membership — sign up for alerts when chapter registration opens.',
    'hero-events-btn': 'See the full events calendar: national convention, galas, summits, and chapter gatherings.',
    'hero-about-btn': 'Learn who we are — Bali Nyonga heritage, 501(c)(3) status, and nationwide chapters.',
    'about-readmore-btn': 'Read the full BCA-USA story, organizational structure, and leadership profiles.',
    'evt-convention-btn': 'Details on the Annual National Convention — assemblies, cultural nights, and networking.',
    'evt-summit-btn': 'Leadership Summit info — national strategy, chapter reports, and executive forums.',
    'evt-gala-btn': 'Cultural Night Gala — traditions, music, dance, food, and fellowship in the DMV area.',
    'all-events-btn': 'Browse every upcoming and past BCA-USA event in one place.',
    'waitlist-submit-btn': 'Save your spot — we\'ll email you when the membership portal launches (select your chapter on the membership page).',
    'find-chapter-btn': 'Locate your nearest chapter among 14 nationwide regions and contact local leaders.',
    'cta-join-btn': 'Join the membership waitlist — be first to enroll through your local chapter.',
    'cta-contact-btn': 'Reach the national office or connect with a chapter near you.',
    'evt1-btn': 'Inquire about the Annual National Convention — dates, venue, and registration.',
    'evt2-btn': 'Learn more about the virtual Leadership Summit and how to participate.',
    'evt3-btn': 'Get tickets for the Cultural Night Gala — Bali Nyonga music, dance, and food.',
    'evt4-btn': 'Details on the Bali Heritage Youth Forum — mentorship and cultural education in Houston.',
    'evt5-btn': 'Reserve seats for the Annual Fundraising Dinner supporting projects in Bali, Cameroon.',
    'evt6-btn': 'Explore the Bali Arts & Heritage Festival — textiles, sculpture, and live performances.',
    'events-join-btn': 'Sign up for membership alerts so you never miss convention registration.',
    'events-contact-btn': 'Email or call your regional chapter for local event schedules.',
    'about-join-btn': 'Join the waitlist after learning about BCA-USA\'s mission and community.',
    'about-contact-btn': 'Questions about our history or leadership? Message the national office.',
    'join-contact-btn': 'Speak with BCA-USA directly — email, mailing address, and social channels.',
    'join-about-btn': 'Discover our pillars: cultural preservation, community, and development impact.',
    'contact-submit-btn': 'Send your message to info@bca-usa.org — general inquiries and chapter questions.',
    'contact-fb': 'Visit our Facebook page for news, photos, and community updates.',
    'contact-yt': 'Watch cultural performances and event highlights on our YouTube channel.',
    'footer-facebook': 'Follow BCA-USA on Facebook for announcements and community stories.',
    'footer-instagram': 'Instagram is coming soon — photos and reels from chapter events.',
    'footer-youtube': 'Stream Bali cultural content and convention highlights on YouTube.',
    'footer-fb-bottom': 'Connect with BCA-USA on Facebook.',
    'footer-yt-bottom': 'Watch videos from BCA-USA events and cultural programs.',
    'hamburger': 'Open the mobile menu — Home, About, Events, Membership, and Contact.'
  };

  const BY_HREF = {
    'index.html': 'Homepage — overview of BCA-USA, stats, pillars, events preview, and chapters.',
    'about.html': 'About us — founding story, mission, vision, leadership, and gallery.',
    'events.html': 'Events hub — filter by national, regional, cultural, and fundraiser programs.',
    'join.html': 'Membership — coming-soon portal, waitlist signup, and member benefits.',
    'contact.html': 'Contact — national office details, inquiry form, and chapter directory.',
    'mailto:info@bca-usa.org': 'Email the national office at info@bca-usa.org for general questions.',
    'https://bca-usa.org': 'Visit the official BCA-USA website for the full leadership directory.',
    'https://www.facebook.com/bcausa/': 'BCA-USA on Facebook — community news, events, and photos.',
    'https://www.youtube.com/balichamba': 'YouTube channel with cultural performances and event recordings.',
    '#': 'More information coming soon — contact the national office in the meantime.'
  };

  const BY_HREF_HASH = {
    'about.html#history': 'Our founding in 1988 and growth into 14 nationwide chapters.',
    'about.html#leadership': 'National Executive Committee and board member profiles.',
    'about.html#chapters': 'Overview of regional chapters across the United States.',
    'about.html#mission': 'Mission and vision statements guiding BCA-USA\'s work.',
    '#chapters': 'Jump to the full chapter directory and regional contact links.'
  };

  const FILTER_PREVIEWS = {
    all: 'Show every upcoming event — national, regional, cultural, and fundraiser.',
    national: 'Filter to national programs like the Annual Convention and Leadership Summit.',
    regional: 'Regional chapter events such as youth forums and local gatherings.',
    cultural: 'Cultural nights, arts festivals, and heritage celebrations.',
    fundraiser: 'Galas and dinners raising funds for healthcare and education in Bali.'
  };

  const CHAPTER_MAIL = {
    'Eastern Chapter Inquiry': 'Email about the Eastern Chapter — Maryland, Virginia, DC, Delaware, and WV.',
    'Southern Texas Chapter': 'Contact the Southern Texas Chapter leadership.',
    'Northern Texas Chapter': 'Reach the Northern Texas Chapter for local events and membership.',
    'Oklahoma Chapter': 'Connect with the Oklahoma statewide chapter.',
    'South Eastern Chapter': 'Inquire about the South Eastern US chapter.',
    'Great Lakes Chapter': 'Contact the Great Lakes regional chapter.',
    'Chapter Location': 'Ask the national office to help you find one of the 8+ additional chapters.'
  };

  function label(el) {
    return (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function hrefKey(el) {
    const href = el.getAttribute('href') || '';
    if (!href || href === '#') return '';
    try {
      const u = new URL(href, location.href);
      const path = u.pathname.split('/').pop() || 'index.html';
      return u.hash ? path + u.hash : (href.startsWith('mailto:') || href.startsWith('http') ? href : path);
    } catch {
      return href;
    }
  }

  function previewFor(el) {
    const id = el.id;
    if (id && BY_ID[id]) return BY_ID[id];

    const href = el.getAttribute('href') || '';
    if (href.startsWith('mailto:') && href.includes('subject=')) {
      const subject = decodeURIComponent(href.split('subject=')[1] || '');
      if (CHAPTER_MAIL[subject]) return CHAPTER_MAIL[subject];
    }

    const hashKey = hrefKey(el);
    if (hashKey && BY_HREF_HASH[hashKey]) return BY_HREF_HASH[hashKey];

    if (el.classList.contains('filter-tab')) {
      const f = el.dataset.filter;
      if (f && FILTER_PREVIEWS[f]) return FILTER_PREVIEWS[f];
    }

    if (href && BY_HREF[href]) return BY_HREF[href];
    if (hashKey && BY_HREF[hashKey.split('#')[0]]) return BY_HREF[hashKey.split('#')[0]];

    const text = label(el).toLowerCase();
    if (text.includes('po box')) return 'National mailing address — PO Box 1602, Spring, TX 77383.';
    if (text.includes('our history')) return BY_HREF_HASH['about.html#history'];
    if (text.includes('leadership') && href.includes('#')) return BY_HREF_HASH['about.html#leadership'];
    if (text.includes('mission') && href.includes('#')) return BY_HREF_HASH['about.html#mission'];
    if (text.includes('chapters') && href.includes('contact')) return 'Full directory of all 14 US chapters with regional contact links.';
    if (text.includes('learn more') && href.includes('events')) return 'Open the events page for schedules, descriptions, and registration info.';
    if (text.includes('get tickets') || text.includes('ticket')) return 'Membership or ticket details — join the waitlist or contact your chapter.';
    if (text.includes('inquire') || text.includes('contact')) return 'Send a message to BCA-USA about this event or program.';
    if (text.includes('join')) return 'Membership information and waitlist signup for your local chapter.';
    if (text.includes('home')) return BY_HREF['index.html'];

    if (el.classList.contains('logo')) return 'BCA-USA homepage — preserving heritage, building community since 1988.';
    if (el.classList.contains('nav-link')) return BY_HREF[href.split('#')[0]] || 'Navigate to this section of the BCA-USA site.';
    if (el.classList.contains('btn')) return 'Go to ' + (BY_HREF[href.split('#')[0]] || 'this page for more details.');
    if (el.classList.contains('chapter-link')) return 'Email the chapter contact for local events and membership questions.';
    if (el.classList.contains('social-btn')) return 'Open our social channel for news, media, and community updates.';
    if (el.classList.contains('footer-col') || el.closest('.footer-col')) {
      return BY_HREF_HASH[hashKey] || BY_HREF[href.split('#')[0]] || BY_HREF[href] || 'Navigate to this section of the site.';
    }

    return '';
  }

  const selectors = [
    'a.btn', 'button.btn', 'a.nav-link', 'a.logo', 'a.social-btn',
    'a.chapter-link', 'a.social-contact-btn', '.footer-col a',
    'button.filter-tab', 'button.hamburger'
  ].join(', ');

  const tip = document.createElement('div');
  tip.className = 'link-preview-tip';
  tip.setAttribute('role', 'tooltip');
  tip.hidden = true;
  document.body.appendChild(tip);

  let active = null;
  const GAP = 10;
  const VIEW_MARGIN = 12;
  const ARROW_EDGE = 18;

  function positionTip(el) {
    const rect = el.getBoundingClientRect();
    const anchorX = rect.left + rect.width / 2;

    tip.classList.remove('visible');
    tip.style.visibility = 'hidden';
    tip.hidden = false;
    tip.style.left = '0';
    tip.style.top = '0';

    const tipRect = tip.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - VIEW_MARGIN;
    const spaceAbove = rect.top - VIEW_MARGIN;
    let placement = 'bottom';
    let top = rect.bottom + GAP;
    if (tipRect.height + GAP > spaceBelow && spaceAbove > spaceBelow) {
      placement = 'top';
      top = rect.top - tipRect.height - GAP;
    }

    let left = anchorX - tipRect.width / 2;
    left = Math.max(VIEW_MARGIN, Math.min(left, window.innerWidth - tipRect.width - VIEW_MARGIN));

    const arrowX = Math.max(ARROW_EDGE, Math.min(anchorX - left, tipRect.width - ARROW_EDGE));

    tip.style.top = top + 'px';
    tip.style.left = left + 'px';
    tip.style.setProperty('--tip-arrow-x', arrowX + 'px');
    tip.dataset.placement = placement;
    tip.style.visibility = '';
  }

  function showTip(el, text) {
    active = el;
    tip.textContent = text;
    tip.hidden = false;
    requestAnimationFrame(() => {
      positionTip(el);
      requestAnimationFrame(() => {
        if (active === el) tip.classList.add('visible');
      });
    });
  }

  function hideTip() {
    active = null;
    tip.classList.remove('visible');
    tip.hidden = true;
    tip.style.visibility = 'hidden';
  }

  document.querySelectorAll(selectors).forEach(el => {
    const text = previewFor(el);
    if (!text) return;
    el.classList.add('has-link-preview');
    el.setAttribute('data-link-preview', text);

    el.addEventListener('mouseenter', () => showTip(el, text));
    el.addEventListener('mouseleave', hideTip);
    el.addEventListener('focus', () => showTip(el, text));
    el.addEventListener('blur', hideTip);
  });

  window.addEventListener('scroll', () => { if (active) positionTip(active); }, { passive: true });
  window.addEventListener('resize', () => { if (active) positionTip(active); }, { passive: true });
})();

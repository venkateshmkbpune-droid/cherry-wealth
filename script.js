const viewKey = 'cherryWealthPageViews';
const stats = document.querySelectorAll('.count');

const updateVisitCount = () => {
  const stored = Number(localStorage.getItem(viewKey) || '0');
  const visits = stored + 1;
  localStorage.setItem(viewKey, visits);
  const visitCount = document.getElementById('visit-count');
  if (visitCount) {
    visitCount.textContent = `Visits from this browser: ${visits}`;
  }
};

const animateStat = (stat) => {
  const target = Number(stat.dataset.target || '0');
  const duration = 1400;
  const increment = Math.ceil(target / (duration / 30));
  let current = 0;

  const update = () => {
    current += increment;
    if (current >= target) {
      stat.textContent = target;
      return;
    }
    stat.textContent = current;
    requestAnimationFrame(update);
  };

  update();
};

const initStats = () => {
  if (!('IntersectionObserver' in window)) {
    stats.forEach(animateStat);
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  stats.forEach((stat) => observer.observe(stat));
};

const setupMobileNav = () => {
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.nav-toggle');
  if (!nav || !toggle) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.getAttribute('data-visible') === 'true';
    nav.setAttribute('data-visible', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 760) {
        nav.setAttribute('data-visible', 'false');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
      }
    });
  });
};

window.addEventListener('DOMContentLoaded', () => {
  updateVisitCount();
  initStats();
  setupMobileNav();
});

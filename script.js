const stats = document.querySelectorAll('.count');
const viewKey = 'cherryWealthPageViews';

const updateVisitCount = () => {
  const stored = Number(localStorage.getItem(viewKey) || '0');
  const visits = stored + 1;
  localStorage.setItem(viewKey, visits);
  const visitCount = document.getElementById('visit-count');
  if (visitCount) {
    visitCount.textContent = `Visits from this browser: ${visits}`;
  }
};

const animateStats = () => {
  stats.forEach((stat) => {
    const target = Number(stat.dataset.target || '0');
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / target), 20);
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      stat.textContent = current;
      if (current >= target) {
        clearInterval(timer);
        stat.textContent = target + (stat.dataset.target === '120' ? '+' : '');
      }
    }, stepTime);
  });
};

window.addEventListener('DOMContentLoaded', () => {
  updateVisitCount();
  animateStats();
});

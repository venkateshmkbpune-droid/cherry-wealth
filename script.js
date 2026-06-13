// Cherry Wealth - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Newsletter form submission
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      if (email) {
        alert(`Thank you for subscribing with ${email}! You'll receive our latest updates soon.`);
        this.reset();
      }
    });
  }

  // Get Started button
  const contactBtn = document.querySelector('.contact-btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', function() {
      const contactSection = document.getElementById('contact');
      contactSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Add scroll animation for cards
  const cards = document.querySelectorAll('.service-card, .benefit-item');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  cards.forEach(card => {
    observer.observe(card);
  });

  // Add animation styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .nav-link::after {
      content: '';
      display: block;
      width: 0;
      height: 2px;
      background-color: #C49A3F;
      transition: width 0.3s ease;
    }

    .nav-link:hover::after {
      width: 100%;
    }
  `;
  document.head.appendChild(style);

  // Active nav link on scroll
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // Counter animation for stats (if present)
  const counters = document.querySelectorAll('.count');
  if (counters.length > 0) {
    const startCounting = () => {
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const updateCount = () => {
          const current = parseInt(counter.innerText);
          const increment = target / 100;
          if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCount, 50);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
    };

    // Start counting when stats section is in view
    const statsPanel = document.querySelector('.stats-panel');
    if (statsPanel) {
      const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startCounting();
            statsObserver.unobserve(entry.target);
          }
        });
      });
      statsObserver.observe(statsPanel);
    }
  }

  console.log('Cherry Wealth Website - Loaded Successfully');
});

// Mobile menu toggle functionality (if you add a hamburger menu later)
function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu) {
    navMenu.classList.toggle('active');
  }
}

// Add active state styling
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: #C49A3F;
    font-weight: 600;
  }
`;
document.head.appendChild(style);

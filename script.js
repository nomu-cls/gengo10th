// LP variation switching via URL parameter: ?lp=1 through ?lp=7
document.addEventListener('DOMContentLoaded', () => {
  // --- LP Variant Switching ---
  const params = new URLSearchParams(window.location.search);
  const lpNum = params.get('lp') || '1';
  const variants = document.querySelectorAll('.hero-variant');
  let found = false;
  variants.forEach(v => {
    if (v.dataset.lp === lpNum) {
      v.style.display = '';
      found = true;
    } else {
      v.style.display = 'none';
    }
  });
  // If invalid lp param, fallback to LP1
  if (!found) {
    variants.forEach(v => {
      v.style.display = v.dataset.lp === '1' ? '' : 'none';
    });
  }

  // --- Scroll-reveal animation ---
  const selectors = [
    '.pain-card', '.pain-scene-card', '.stat-block', '.comparison__col', '.feature-card',
    '.benefit-group', '.testimonial-card', '.workshop-day', '.solution-example',
    '.origin-story', '.app-metaphor', '.target-audience', '.message-box', '.optin-box',
    '.realisation', '.insight-message', '.solution-core', '.solution-note', '.cta-mid',
    '.opening-text', '.intro-box', '.doubt-box', '.urgency-box',
    '.solution-simple', '.intro-profile', '.intro-voices'
  ];
  document.querySelectorAll(selectors.join(',')).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * .08}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // --- Form submit with redirect ---
  const REDIRECT_URL = 'https://gengogaku.kotakahito-sejutsukagengogaku.com/p/ImfWxYiSIAJ9';

  document.querySelectorAll('form[action*="tkal.analogialemma"]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = '送信中...';
      btn.disabled = true;

      const formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      }).then(() => {
        window.location.href = REDIRECT_URL;
      }).catch(() => {
        // Even if fetch fails due to CORS, the request was sent
        window.location.href = REDIRECT_URL;
      });
    });
  });
});

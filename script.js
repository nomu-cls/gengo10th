// Scroll-reveal animation
document.addEventListener('DOMContentLoaded', () => {
  // Mark elements for reveal
  const selectors = [
    '.pain-card', '.stat-block', '.comparison__col', '.feature-card',
    '.benefit-group', '.testimonial-card', '.workshop-day', '.solution-example',
    '.origin-story', '.app-metaphor', '.target-audience', '.message-box', '.optin-box',
    '.realisation', '.insight-message', '.solution-core', '.solution-note', '.cta-mid'
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

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});

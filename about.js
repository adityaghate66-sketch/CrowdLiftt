/* Counter animation */
  const counters = document.querySelectorAll('[data-target]');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(el => {
          const target = parseInt(el.getAttribute('data-target'), 10);
          const duration = 1600;
          const step = 16;
          const increment = target / (duration / step);
          let current = 0;
          const label = el.closest('.stat-cell').querySelector('.stat-label').textContent;
          const suffix = label.includes('%') ? '%' : '+';
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.floor(current).toLocaleString('en-IN') + suffix;
          }, step);
        });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  statsObserver.observe(document.getElementById('stats'));

  /* Feature card scroll reveal */
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        featureObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.feature-card').forEach(el => featureObserver.observe(el));

  /* USP card stagger */
  const uspObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 120);
        uspObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.usp-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity .5s ease, transform .5s ease, border-color .3s, box-shadow .3s';
    uspObserver.observe(card);
  });
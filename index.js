if (localStorage.getItem('crowdlift_session')) {
      window.location.href = 'home.html';
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    // Hero bg load animation
    window.addEventListener('load', () => {
      document.getElementById('heroBg').classList.add('loaded');
    });

    // Scroll-triggered fade-in using IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, entry.target.dataset.delay || 0);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Stagger feature cards
    document.querySelectorAll('.feature-card').forEach((el, i) => {
      el.dataset.delay = i * 80;
      observer.observe(el);
    });

    // Stagger muscle cards
    document.querySelectorAll('.muscle-card').forEach((el, i) => {
      el.dataset.delay = i * 60;
      observer.observe(el);
    });

    // Steps
    document.querySelectorAll('.step').forEach((el, i) => {
      el.dataset.delay = i * 120;
      observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
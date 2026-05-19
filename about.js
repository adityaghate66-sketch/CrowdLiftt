 const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const bar1 = document.getElementById('bar1');
  const bar2 = document.getElementById('bar2');
  const bar3 = document.getElementById('bar3');
  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
    navLinks.classList.toggle('open', menuOpen);

    bar1.style.transform = menuOpen ? 'rotate(45deg) translateY(7px)'  : '';
    bar2.style.opacity   = menuOpen ? '0' : '1';
    bar3.style.transform = menuOpen ? 'rotate(-45deg) translateY(-7px)' : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  hamburger.addEventListener('keydown', e => { if (e.key === 'Enter') toggleMenu(); });


  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (menuOpen) toggleMenu();
    });
  });



  const counters = document.querySelectorAll('[data-target]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800; 
    const step = 16;       
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      const suffix = el.closest('.stat-cell').querySelector('.stat-label').textContent.includes('%') ? '%' : '+';
      el.textContent = Math.floor(current).toLocaleString('en-IN') + suffix;
    }, step);
  }


  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(animateCounter);
        statsObserver.disconnect(); 
      }
    });
  }, { threshold: 0.3 });

  statsObserver.observe(document.getElementById('stats'));


  /* ── 3. TESTIMONIALS SCROLL REVEAL ── */
  const cards = document.querySelectorAll('.testimonial-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger the reveal using setTimeout
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 150);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => cardObserver.observe(card));


  /* ── 4. USP CARD STAGGER ON LOAD ── */
  const uspCards = document.querySelectorAll('.usp-card');
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

  uspCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity .5s ease, transform .5s ease, border-color .3s, box-shadow .3s';
    uspObserver.observe(card);
  });


  /* ── 5. ACTIVE NAV LINK HIGHLIGHT ── */
  const sections   = document.querySelectorAll('section[id], div[id="stats"]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--rust)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  /* ── 6. SMOOTH SCROLL POLYFILL for older browsers ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
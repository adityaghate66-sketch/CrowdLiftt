 const SESSION_KEY = 'crowdlift_session';
    const USERS_KEY   = 'crowdlift_users';

    
    if (localStorage.getItem(SESSION_KEY)) {
      window.location.href = 'home.html';
    }

    const togglePass  = document.getElementById('togglePass');
    const passInput   = document.getElementById('loginPassword');

    togglePass.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type     = isPass ? 'text' : 'password';
      togglePass.textContent = isPass ? '🙈' : '👁';
    });

    function login() {
      const email    = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const errorEl  = document.getElementById('errorMsg');
      const btn      = document.getElementById('loginBtn');

      errorEl.classList.remove('show');

      if (!email || !password) {
        errorEl.textContent = 'Please fill in all fields.';
        errorEl.classList.add('show');
        return;
      }

      btn.textContent = 'Signing in...';
      btn.classList.add('loading');

      setTimeout(() => {
        const users   = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

        const matched = users.filter(u => u.email === email && u.password === password);

        if (matched.length === 0) {
          errorEl.textContent = 'Invalid email or password. Try again.';
          errorEl.classList.add('show');
          btn.textContent = 'Sign In →';
          btn.classList.remove('loading');
          return;
        }

        localStorage.setItem(SESSION_KEY, JSON.stringify(matched[0]));
        btn.textContent = '✓ Welcome back!';
        setTimeout(() => window.location.href = 'home.html', 600);
      }, 500);
    }

    document.getElementById('loginBtn').addEventListener('click', login);

    document.addEventListener('keydown', e => {
      if (e.key === 'Enter') login();
    });

    ['loginEmail','loginPassword'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => {
        document.getElementById('errorMsg').classList.remove('show');
      });
    });
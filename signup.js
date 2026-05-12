const SESSION_KEY = 'crowdlift_session';
    const USERS_KEY   = 'crowdlift_users';

    if (localStorage.getItem(SESSION_KEY)) {
      window.location.href = 'home.html';
    }

    // Password toggle
    const togglePass = document.getElementById('togglePass');
    const passInput  = document.getElementById('signupPassword');
    togglePass.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      togglePass.textContent = isPass ? '🙈' : '👁';
    });

    // Password strength
    passInput.addEventListener('input', () => {
      const val = passInput.value;
      let strength = 0;
      if (val.length >= 6) strength++;
      if (val.length >= 10) strength++;
      if (/[A-Z]/.test(val) || /[0-9]/.test(val)) strength++;
      if (/[^A-Za-z0-9]/.test(val)) strength++;

      const colors = ['', '#ff5555', '#ffc107', '#4caf50', '#c8ff00'];
      const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
      const bars   = ['sb1','sb2','sb3','sb4'];

      bars.forEach((id, i) => {
        document.getElementById(id).style.background =
          i < strength ? colors[strength] : '#1a1a1e';
      });

      document.getElementById('strengthText').textContent =
        val.length > 0 ? labels[strength] : '';
      document.getElementById('strengthText').style.color =
        colors[strength] || var_muted;
    });

    // Step 1 → Step 2
    document.getElementById('nextBtn').addEventListener('click', () => {
      const name     = document.getElementById('signupName').value.trim();
      const email    = document.getElementById('signupEmail').value.trim();
      const password = document.getElementById('signupPassword').value;
      const confirm  = document.getElementById('signupConfirm').value;
      const err      = document.getElementById('errorMsg1');

      err.classList.remove('show');

      if (!name || !email || !password || !confirm) {
        err.textContent = 'Please fill in all fields.';
        err.classList.add('show'); return;
      }
      if (!email.includes('@') || !email.includes('.')) {
        err.textContent = 'Enter a valid email address.';
        err.classList.add('show'); return;
      }
      if (password.length < 6) {
        err.textContent = 'Password must be at least 6 characters.';
        err.classList.add('show'); return;
      }
      if (password !== confirm) {
        err.textContent = 'Passwords do not match.';
        err.classList.add('show'); return;
      }

      // Check duplicate email — filter HOF
      const users    = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
      const existing = users.filter(u => u.email === email);
      if (existing.length > 0) {
        err.textContent = 'An account with this email already exists.';
        err.classList.add('show'); return;
      }

      // Go to step 2
      document.getElementById('step1').style.display = 'none';
      document.getElementById('step2').style.display = 'block';
      document.getElementById('progressFill').style.width = '66%';
      document.getElementById('step1lbl').classList.remove('active');
      document.getElementById('step2lbl').classList.add('active');
      document.getElementById('loginSwitch').style.display = 'none';
    });

    // Back button
    document.getElementById('backBtn').addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('step2').style.display = 'none';
      document.getElementById('step1').style.display = 'block';
      document.getElementById('progressFill').style.width = '33%';
      document.getElementById('step2lbl').classList.remove('active');
      document.getElementById('step1lbl').classList.add('active');
      document.getElementById('loginSwitch').style.display = 'block';
    });

    // Step 2 → Create account
    document.getElementById('signupBtn').addEventListener('click', () => {
      const age      = document.getElementById('signupAge').value;
      const gender   = document.getElementById('signupGender').value;
      const weight   = document.getElementById('signupWeight').value;
      const height   = document.getElementById('signupHeight').value;
      const goal     = document.getElementById('signupGoal').value;
      const activity = document.getElementById('signupActivity').value;
      const err      = document.getElementById('errorMsg2');

      err.classList.remove('show');

      if (!age || !gender || !weight || !height || !goal || !activity) {
        err.textContent = 'Please fill in all fields.';
        err.classList.add('show'); return;
      }

      const name     = document.getElementById('signupName').value.trim();
      const email    = document.getElementById('signupEmail').value.trim();
      const password = document.getElementById('signupPassword').value;

      const newUser = {
        name, email, password,
        age: parseInt(age),
        gender,
        weight: parseFloat(weight),
        height: parseFloat(height),
        goal, activity,
        joinedAt: new Date().toISOString(),
        streak: 0,
        lastVisit: null,
        checkedInToday: false,
        calendar: {},
      };

      const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));

      // Show step 3
      document.getElementById('step2').style.display = 'none';
      document.getElementById('step3').style.display = 'block';
      document.getElementById('progressFill').style.width = '100%';
      document.getElementById('step2lbl').classList.remove('active');
      document.getElementById('step3lbl').classList.add('active');

      setTimeout(() => window.location.href = 'home.html', 2000);
    });
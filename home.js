// ── SESSION ───────────────────────────────────────────────
    const SESSION_KEY = 'crowdlift_session';
    const USERS_KEY   = 'crowdlift_users';
    const CROWD_KEY   = 'crowdlift_crowd';

    let session = JSON.parse(localStorage.getItem(SESSION_KEY));
    if (!session) window.location.href = 'login.html';

    // ── HELPERS ───────────────────────────────────────────────
    function getUsers() { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
    function getCurrentUser() {
      return getUsers().filter(u => u.email === session.email)[0] || session;
    }
    function updateUser(data) {
      const users = getUsers();
      const idx = users.findIndex(u => u.email === session.email);
      if (idx !== -1) { users[idx] = { ...users[idx], ...data }; saveUsers(users); }
      localStorage.setItem(SESSION_KEY, JSON.stringify({ ...session, ...data }));
      session = { ...session, ...data };
    }

    function formatHour(h) {
      const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
      return { hour, period: h >= 12 ? 'PM' : 'AM' };
    }

    // ── TOAST ─────────────────────────────────────────────────
    let toastTimer;
    function showToast(msg, dark = false) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.className = 'toast' + (dark ? ' dark' : '');
      void t.offsetWidth;
      t.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
    }

    // ── GREETING ──────────────────────────────────────────────
    function setGreeting() {
      const h = new Date().getHours();
      const greet = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
      const user = getCurrentUser();
      const first = user.firstName || user.name.split(' ')[0];
      document.getElementById('navName').textContent = first;
      document.getElementById('greetingName').innerHTML = `${greet}, <span>${first}</span> 👋`;
      document.getElementById('greetingSub').textContent = h < 12 ? 'Start strong today.' : h < 17 ? 'Keep pushing.' : 'Evening grind hits different.';
      const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
      document.getElementById('greetingTime').textContent = timeStr;
    }

    // ── LOGOUT ────────────────────────────────────────────────
    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem(SESSION_KEY);
      window.location.href = 'login.html';
    });

    // ── STREAK ────────────────────────────────────────────────
    function loadStreak() {
      const user = getCurrentUser();
      const streak = user.streak || 0;
      document.getElementById('streakNum').textContent = streak;
      document.getElementById('streakSub').textContent =
        streak === 0 ? 'Check in to start!' :
        streak === 1 ? '1 day — keep going!' :
        `${streak} days strong 🔥`;
    }

    // ── CHECK IN / OUT ────────────────────────────────────────
    let selectedMuscles = [];

    document.querySelectorAll('.muscle-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        pill.classList.toggle('selected');
        const muscle = pill.dataset.muscle;
        if (selectedMuscles.includes(muscle)) {
          selectedMuscles = selectedMuscles.filter(m => m !== muscle); // filter HOF
        } else {
          selectedMuscles.push(muscle);
        }
      });
    });

    function loadCheckinState() {
      const user = getCurrentUser();
      const today = new Date().toDateString();
      if (user.checkedInToday && user.checkInDate === today) {
        showCheckedInState(user);
      }
    }

    function showCheckedInState(user) {
      document.getElementById('checkinSection').style.display = 'none';
      document.getElementById('checkoutSection').style.display = 'block';
      document.getElementById('statusDot').classList.add('active');
      document.getElementById('statusText').textContent = 'Checked in';
      const muscles = user.todayMuscles || [];
      document.getElementById('checkinMuscleDisplay').textContent =
        `Training: ${muscles.join(', ') || 'General workout'}`;
      if (user.checkInTime) {
        document.getElementById('checkinTime').textContent = `since ${user.checkInTime}`;
      }
    }

    document.getElementById('checkinBtn').addEventListener('click', () => {
      const now     = new Date();
      const today   = now.toDateString();
      const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

      // Update crowd data per muscle
      const crowd = JSON.parse(localStorage.getItem(CROWD_KEY)) || {};
      selectedMuscles.forEach(m => {
        crowd[m] = (crowd[m] || 0) + 1;
      });
      localStorage.setItem(CROWD_KEY, JSON.stringify(crowd));

      // Update user
      const user   = getCurrentUser();
      const cal    = user.calendarDays || {};
      cal[today]   = 'attended';

      // Streak logic
      const yesterday = new Date(now - 86400000).toDateString();
      const streak = (user.lastVisit === yesterday || user.lastVisit === today)
        ? (user.streak || 0) + (user.lastVisit === today ? 0 : 1)
        : 1;

      updateUser({
        checkedInToday: true,
        checkInDate: today,
        checkInTime: timeStr,
        todayMuscles: selectedMuscles,
        lastVisit: today,
        streak,
        calendarDays: cal,
      });

      showCheckedInState({ ...getCurrentUser(), checkInTime: timeStr });
      renderCrowdGrid();
      loadStreak();
      renderCalendar();
      showToast('✓ Checked in! Have a great session.');

      // Also update admin count
      const count = parseInt(localStorage.getItem('gympulse_count') || '0');
      localStorage.setItem('gympulse_count', count + 1);
    });

    document.getElementById('checkoutBtn').addEventListener('click', () => {
      const crowd = JSON.parse(localStorage.getItem(CROWD_KEY)) || {};
      const user  = getCurrentUser();
      const muscles = user.todayMuscles || [];

      // Decrease crowd on checkout — map HOF
      muscles.map(m => {
        if (crowd[m] && crowd[m] > 0) crowd[m]--;
      });
      localStorage.setItem(CROWD_KEY, JSON.stringify(crowd));

      updateUser({ checkedInToday: false, checkInDate: null });

      document.getElementById('checkinSection').style.display = 'block';
      document.getElementById('checkoutSection').style.display = 'none';
      document.getElementById('statusDot').classList.remove('active');
      document.getElementById('statusText').textContent = 'Not checked in';
      document.getElementById('checkinTime').textContent = '';
      selectedMuscles = [];
      document.querySelectorAll('.muscle-pill').forEach(p => p.classList.remove('selected'));

      renderCrowdGrid();
      showToast('Checked out. Great session!', true);

      const count = parseInt(localStorage.getItem('gympulse_count') || '0');
      localStorage.setItem('gympulse_count', Math.max(0, count - 1));
    });

    // ── CROWD GRID ────────────────────────────────────────────
    function renderCrowdGrid() {
      const crowd   = JSON.parse(localStorage.getItem(CROWD_KEY)) || {};
      const muscles = ['Chest','Back','Arms','Legs','Shoulders','Core'];
      const grid    = document.getElementById('crowdGrid');

      // map muscles to cards — HOF
      grid.innerHTML = muscles.map(m => {
        const count = crowd[m] || 0;
        const max   = 10;
        const pct   = Math.min((count / max) * 100, 100);
        const color = pct < 35 ? '#4caf50' : pct < 70 ? '#ffc107' : '#c8ff00';
        const label = pct < 35 ? 'Low' : pct < 70 ? 'Moderate' : 'Packed';
        return `
          <div class="crowd-muscle-card">
            <div class="cm-name">${m}</div>
            <div class="cm-bar-wrap"><div class="cm-bar" style="width:${pct}%;background:${color};"></div></div>
            <div class="cm-count">${count} people · ${label}</div>
          </div>`;
      }).join('');
    }

    // ── CROWD PREDICTOR ───────────────────────────────────────
    const crowdData = {
      0:[1,1,2,3,3,2,2,3,2,2,1,1,1,2,3,3,2,2,1],
      1:[1,1,2,3,3,2,2,3,2,2,1,1,1,2,3,3,2,2,1],
      2:[1,1,2,2,3,2,2,3,2,2,1,1,1,2,3,3,2,2,1],
      3:[1,1,2,3,3,2,2,3,2,2,1,1,1,2,2,3,2,2,1],
      4:[1,1,2,3,3,2,2,3,2,2,1,1,1,3,3,3,3,2,1],
      5:[2,2,3,3,3,3,3,3,3,3,2,2,2,3,2,2,2,2,1],
      6:[2,2,2,3,3,3,2,2,2,2,1,1,1,2,2,2,1,1,1],
    };
    const LEVELS=['','Low','Moderate','Packed'];
    const DESCS=['','Barely anyone. Go now!','Some people. Still manageable.','Peak hours. Expect to wait.'];
    const TCOLS=['','#4caf50','#ffc107','#c8ff00'];
    const BCOLS=['','#4caf50','#ffc107','#c8ff00'];
    const BGCOLS=['','#0d1a0b','#1a1600','#141700'];
    const BORCOLS=['','#1a3318','#332c00','#2e3200'];
    const BWIDS=['','25%','60%','95%'];
    const HMCOLS=['','#1e3a1a','#3a2e00','#3a3d00'];
    let selDay=-1, selHour=6;

    function updateTimeDisplay(h) {
      const {hour,period}=formatHour(h);
      document.getElementById('timeDisplay').innerHTML=`${hour}:00 <span class="time-period">${period}</span>`;
    }

    function updateCrowd() {
      if(selDay===-1) return;
      const lvl=crowdData[selDay][selHour-5]||1;
      const card=document.getElementById('crowdCard');
      card.style.background=BGCOLS[lvl];
      card.style.borderColor=BORCOLS[lvl];
      document.getElementById('crowdLevel').textContent=LEVELS[lvl];
      document.getElementById('crowdLevel').style.color=TCOLS[lvl];
      document.getElementById('crowdDesc').textContent=DESCS[lvl];
      document.getElementById('crowdDesc').style.color=TCOLS[lvl];
      document.getElementById('crowdBar').style.width=BWIDS[lvl];
      document.getElementById('crowdBar').style.background=BCOLS[lvl];
    }

    function updateBestTime() {
      if(selDay===-1) return;
      const data=crowdData[selDay];
      const min=Math.min(...data.map(v=>v));
      const idx=data.indexOf(min);
      const {hour,period}=formatHour(idx+5);
      document.getElementById('bestTime').textContent=`${hour}:00 ${period} — Least crowded`;
    }

    document.querySelectorAll('.day-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        document.querySelectorAll('.day-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        selDay=parseInt(btn.dataset.day);
        updateBestTime(); updateCrowd();
      });
    });

    document.getElementById('timeSlider').addEventListener('input',e=>{
      selHour=parseInt(e.target.value);
      updateTimeDisplay(selHour); updateCrowd();
    });

    // ── HEATMAP ───────────────────────────────────────────────
    function buildHeatmap() {
      const days=['M','T','W','T','F','S','S'];
      const slots=[6,9,12,15,18,21];
      const hm=document.getElementById('heatmap');
      hm.innerHTML='';
      hm.appendChild(document.createElement('div'));
      days.map(d=>{ const el=document.createElement('div'); el.className='hm-header'; el.textContent=d; hm.appendChild(el); });
      slots.forEach(t=>{
        const lbl=document.createElement('div'); lbl.className='hm-row-label';
        const {hour,period}=formatHour(t); lbl.textContent=`${hour}${period[0].toLowerCase()}`; hm.appendChild(lbl);
        for(let d=0;d<7;d++){
          const lvl=crowdData[d][t-5]||1;
          const cell=document.createElement('div'); cell.className='hm-cell'; cell.style.background=HMCOLS[lvl]; hm.appendChild(cell);
        }
      });
    }

    // ── WEATHER ───────────────────────────────────────────────
    async function fetchWeather() {
      try {
        const res  = await fetch('https://api.open-meteo.com/v1/forecast?latitude=12.9716&longitude=77.5946&current=temperature_2m,weathercode&timezone=Asia/Kolkata');
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        const temp = Math.round(data.current.temperature_2m);
        const code = data.current.weathercode;
        const desc = code===0?'Clear sky':code<=3?'Partly cloudy':code<=48?'Foggy':code<=67?'Rainy':'Stormy';
        const tips = [
          {codes:[0,1,2,3],tip:'Nice day — gym might be less packed.'},
          {codes:[51,53,55,61,63,65,80,81,82],tip:'Rainy outside — expect more people at gym!'},
          {codes:[95,96,99],tip:'Storm outside — gym will be packed.'},
        ];
        const match = tips.filter(t=>t.codes.includes(code)); // filter HOF
        const tip = match.length>0 ? match[0].tip : temp>35 ? 'Hot outside — gym busier than usual.' : 'Check crowd before heading out.';
        document.getElementById('weatherTemp').textContent=`${temp}°C`;
        document.getElementById('weatherDesc').textContent=desc;
        document.getElementById('weatherTip').textContent=tip;
        document.getElementById('weatherLoading').style.display='none';
        document.getElementById('weatherContent').style.display='block';
      } catch(err) {
        document.getElementById('weatherLoading').textContent='Weather unavailable';
      }
    }

    // ── CALENDAR ──────────────────────────────────────────────
    let calYear=new Date().getFullYear(), calMonth=new Date().getMonth();

    function renderCalendar() {
      const user    = getCurrentUser();
      const cal     = user.calendarDays || {};
      const today   = new Date();
      const months  = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      const days    = ['Su','Mo','Tu','We','Th','Fr','Sa'];

      document.getElementById('calMonth').textContent = `${months[calMonth]} ${calYear}`;

      const grid = document.getElementById('calGrid');
      grid.innerHTML = '';

      // day headers
      days.forEach(d => {
        const el = document.createElement('div');
        el.className = 'cal-day-header';
        el.textContent = d;
        grid.appendChild(el);
      });

      const firstDay = new Date(calYear, calMonth, 1).getDay();
      const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();

      // empty slots
      for(let i=0;i<firstDay;i++){
        const el=document.createElement('div'); el.className='cal-day empty'; grid.appendChild(el);
      }

      for(let d=1;d<=daysInMonth;d++){
        const date = new Date(calYear, calMonth, d);
        const key  = date.toDateString();
        const el   = document.createElement('div');
        el.className = 'cal-day';
        el.textContent = d;

        if (date.toDateString() === today.toDateString()) el.classList.add('today');
        else if (cal[key] === 'attended') el.classList.add('attended');
        else if (date < today && calMonth===today.getMonth() && calYear===today.getFullYear()) el.classList.add('missed');

        grid.appendChild(el);
      }
    }

    document.getElementById('calPrev').addEventListener('click', () => {
      calMonth--; if(calMonth<0){calMonth=11;calYear--;} renderCalendar();
    });
    document.getElementById('calNext').addEventListener('click', () => {
      calMonth++; if(calMonth>11){calMonth=0;calYear++;} renderCalendar();
    });

    // ── WEEKLY PLAN ───────────────────────────────────────────
    function renderWeeklyPlan() {
      const plans = [
        {day:'Mon', muscles:['Chest','Triceps']},
        {day:'Tue', muscles:['Back','Biceps']},
        {day:'Wed', muscles:['Legs']},
        {day:'Thu', muscles:['Shoulders','Core']},
        {day:'Fri', muscles:['Chest','Back']},
        {day:'Sat', muscles:['Arms','Core']},
        {day:'Sun', muscles:['Rest']},
      ];

      const todayIdx = new Date().getDay();
      const dayMap   = [6,0,1,2,3,4,5]; // Sun=0 → index 6
      const todayPlanIdx = dayMap[todayIdx];

      // map plans to HTML — HOF
      document.getElementById('weekPlan').innerHTML = plans.map((p,i) => `
        <div class="plan-day ${i===todayPlanIdx?'today-plan':''}">
          <div class="plan-day-name">${p.day}</div>
          <div class="plan-muscles">
            ${p.muscles.map(m=>`<span class="plan-tag ${m==='Rest'?'rest':''}">${m}</span>`).join('')}
          </div>
        </div>
      `).join('');
    }

    // ── INIT ──────────────────────────────────────────────────
    setGreeting();
    loadStreak();
    loadCheckinState();
    renderCrowdGrid();
    buildHeatmap();
    updateTimeDisplay(selHour);
    renderCalendar();
    renderWeeklyPlan();
    fetchWeather();
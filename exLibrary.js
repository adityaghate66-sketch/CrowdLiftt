 const EXERCISES = [
    { id:1,  name:'Bench Press',       icon:'🏋️', group:'chest',     difficulty:'beginner',     muscle:'Pectorals',   desc:'The king of chest movements. Lie back, lower the bar to your chest, drive it up with full power.',  sets:'4 × 8–12'},
    { id:2,  name:'Incline Dumbbell',  icon:'💪', group:'chest',     difficulty:'intermediate', muscle:'Upper Chest',  desc:'Targets the neglected upper chest. Angle the bench to 30–45° and press in a controlled arc.',        sets:'3 × 10' },
    { id:3,  name:'Cable Fly',         icon:'🔄', group:'chest',     difficulty:'intermediate', muscle:'Chest Stretch',desc:'Constant tension through the full range. Great finisher after heavy pressing.',                     sets:'3 × 15' },
    { id:4,  name:'Pull-Up',           icon:'🧗', group:'back',      difficulty:'intermediate', muscle:'Lats',         desc:'Bodyweight pulling that builds width and grip. Dead-hang at the bottom, chin over bar at top.',       sets:'4 × 6–10' },
    { id:5,  name:'Barbell Row',       icon:'🪵', group:'back',      difficulty:'intermediate', muscle:'Mid-Back',     desc:'Horizontal pulling pattern that adds thickness. Brace your core and row the bar into your hips.',     sets:'4 × 8' },
    { id:6,  name:'Deadlift',          icon:'⚡', group:'back',      difficulty:'advanced',     muscle:'Full Back',    desc:'The most complete posterior chain exercise on earth. Hinge, brace, and pull with intention.',           sets:'3 × 5' },
    { id:7,  name:'Bicep Curl',        icon:'💥', group:'arms',      difficulty:'beginner',     muscle:'Biceps',       desc:'Supinate at the top, squeeze, lower slowly. Chasing the pump here.',                                 sets:'3 × 12–15' },
    { id:8,  name:'Skull Crusher',     icon:'💀', group:'arms',      difficulty:'intermediate', muscle:'Triceps',      desc:'EZ bar overhead extension that isolates the long head of the triceps under stretch.',                 sets:'3 × 10' },
    { id:9,  name:'Hammer Curl',       icon:'🔨', group:'forearms',  difficulty:'beginner',     muscle:'Brachialis',   desc:'Neutral grip curl that hammers the brachialis and forearm muscles equally.',                          sets:'3 × 12' },
    { id:10, name:'Squat',             icon:'🦵', group:'legs',      difficulty:'intermediate', muscle:'Quads/Glutes', desc:'The foundational lower-body lift. Knees track toes, chest tall, break parallel.',                     sets:'5 × 5' },
    { id:11, name:'Romanian Deadlift', icon:'🔥', group:'legs',      difficulty:'intermediate', muscle:'Hamstrings',   desc:'Hinge-dominant movement that stretches and loads the hamstrings through a long range.',               sets:'4 × 8–10' },
    { id:12, name:'Leg Press',         icon:'🚀', group:'quads',     difficulty:'beginner',     muscle:'Quads',        desc:'Machine-based quad builder. Drive through the full foot and avoid locking out knees.',                 sets:'4 × 12' },
    { id:13, name:'Plank',             icon:'🧱', group:'core',      difficulty:'beginner',     muscle:'Core',         desc:'Isometric core stability. Pack your shoulders, squeeze your glutes, hold the line.',                   sets:'3 × 60s' },
    { id:14, name:'Ab Wheel',          icon:'⚙️', group:'core',      difficulty:'advanced',     muscle:'Deep Core',    desc:'Rolling anti-extension that brutally loads the rectus abdominis and hip flexors.',                    sets:'3 × 10' },
    { id:15, name:'Russian Twist',     icon:'🌀', group:'obliques',  difficulty:'intermediate', muscle:'Obliques',     desc:'Rotational core work. Keep the spine long, rotate through your torso not your arms.',                  sets:'3 × 20' },
    { id:16, name:'Side Plank',        icon:'📐', group:'obliques',  difficulty:'beginner',     muscle:'Obliques',     desc:'Lateral anti-flexion. Stack feet, drive your hip up, hold with full tension in the lateral chain.',    sets:'3 × 30s' },
    { id:17, name:'OHP',               icon:'🏔️', group:'shoulders', difficulty:'intermediate', muscle:'Deltoids',     desc:'Standing overhead press. Bar starts at the clavicle, drive it straight up and lockout hard.',          sets:'4 × 6–8' },
    { id:18, name:'Lateral Raise',     icon:'🦅', group:'shoulders', difficulty:'beginner',     muscle:'Side Delts',   desc:'Isolation for the lateral head. Slight forward lean, lead with your elbows, controlled descent.',      sets:'4 × 15' },
    { id:19, name:'Calf Raise',        icon:'🦶', group:'calves',    difficulty:'beginner',     muscle:'Gastrocnemius',desc:'Full range from stretched to peak contraction. Pause at the top, lower slowly. Consistency key.',      sets:'4 × 20' },
    { id:20, name:'Nordic Curl',       icon:'🎿', group:'legs',      difficulty:'advanced',     muscle:'Hamstrings',   desc:'The most demanding hamstring exercise. Eccentric-dominant, builds unmatched sprint strength.',          sets:'3 × 5' },
  ];
 
  let activeGroup = 'all';
  let activeLevel = 'all';
 
  function getFiltered() {
    const q = document.getElementById('search-input').value.toLowerCase().trim();
    return EXERCISES.filter(e => {
      const matchGroup = activeGroup === 'all' || e.group === activeGroup;
      const matchLevel = activeLevel === 'all' || e.difficulty === activeLevel;
      const matchQ = !q || e.name.toLowerCase().includes(q) || e.muscle.toLowerCase().includes(q) || e.group.toLowerCase().includes(q);
      return matchGroup && matchLevel && matchQ;
    });
  }
 
  function renderCards() {
    const grid = document.getElementById('exercise-grid');
    const results = getFiltered();
    document.getElementById('results-count').textContent = results.length + ' Exercise' + (results.length !== 1 ? 's' : '');
 
    if (!results.length) {
      grid.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><div class="empty-title">No exercises found</div><p class="empty-sub">Try adjusting your filters or search term.</p></div>';
      return;
    }
 
    grid.innerHTML = results.map(e => `
      <div class="exercise-card">
        <div class="card-header">
          <div class="card-header-left">
            <span class="exercise-icon">${e.icon}</span>
            <span class="exercise-name">${e.name}</span>
          </div>
          <span class="difficulty ${e.difficulty}">${e.difficulty}</span>
        </div>
        <div class="card-body">
          <span class="muscle-tag">${e.muscle}</span>
          <p class="exercise-desc">${e.desc}</p>
        </div>
        <div class="card-footer">
          <span class="sets-info">Sets &amp; Reps <strong>${e.sets}</strong></span>
        </div>
      </div>
    `).join('');
  }
 
  function initChips() {
    document.getElementById('chip-row').addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      document.querySelectorAll('#chip-row .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeGroup = chip.dataset.group;
      renderCards();
    });
    document.getElementById('level-row').addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      document.querySelectorAll('#level-row .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeLevel = chip.dataset.level;
      renderCards();
    });
    document.getElementById('search-input').addEventListener('input', renderCards);
  }
 
  document.getElementById('total-count').textContent = EXERCISES.length;
  document.getElementById('stat-total').textContent = EXERCISES.length;
  initChips();
  renderCards();
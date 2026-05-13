const exercises = [
    {
        name: "Push-Up",
        group: "chest",
        icon: "💪",
        desc: "Best bodyweight chest exercise."
    },

    {
        name: "Pull-Up",
        group: "back",
        icon: "🦾",
        desc: "Excellent back builder."
    },

    {
        name: "Bicep Curl",
        group: "arms",
        icon: "🏋️",
        desc: "Targets biceps."
    },

    {
        name: "Squat",
        group: "legs",
        icon: "🦵",
        desc: "King of leg exercises."
    },

    {
        name: "Plank",
        group: "core",
        icon: "🧱",
        desc: "Great for core strength."
    },
    {
        name: "Calf-Raises",
        group: "calves",
        icon: "❤️",
        desc: "Best weighted calves exercise."
    },
    {
        name: "OverHead-Press",
        group: "shoulders",
        icon: "🪨",
        desc: "Best dumbell shoulder exercise."
    },
    {
        name: "Cable-rows",
        group: "triceps",
        icon: "🧲",
        desc: "Best cable triceps exercise."
    }
];

function renderExercises(filter="all"){

    const grid = document.getElementById("exercise-grid");
    const count = document.getElementById("results-count");

    let filtered = exercises;

    if(filter !== "all"){
        filtered = exercises.filter(ex => ex.group === filter);
    }

    count.textContent = `${filtered.length} Exercises`;

    grid.innerHTML = filtered.map(ex => `
    
        <div class="exercise-card">
            <div>${ex.icon}</div>
            <div class="exercise-name">${ex.name}</div>
            <div>${ex.group.toUpperCase()}</div>
            <div class="exercise-desc">${ex.desc}</div>
        </div>
    
    `).join("");
}


document.getElementById("chip-row").addEventListener("click",(e)=>{

    const chip = e.target.closest(".chip");

    if(!chip) return;

    document.querySelectorAll(".chip").forEach(c=>{
        c.classList.remove("active");
    });

    chip.classList.add("active");

    renderExercises(chip.dataset.group);

});


document.getElementById("search-input").addEventListener("input",(e)=>{

    const value = e.target.value.toLowerCase();

    const filtered = exercises.filter(ex =>
        ex.name.toLowerCase().includes(value) ||
        ex.group.toLowerCase().includes(value)
    );

    const grid = document.getElementById("exercise-grid");

    grid.innerHTML = filtered.map(ex => `
    
        <div class="exercise-card">
            <div>${ex.icon}</div>
            <div class="exercise-name">${ex.name}</div>
            <div>${ex.group.toUpperCase()}</div>
            <div class="exercise-desc">${ex.desc}</div>
        </div>
    
    `).join("");

});


renderExercises();
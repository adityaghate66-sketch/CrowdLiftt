const exercises = [

    // CHEST
    {
        name:"Wall Push-Up",
        group:"chest",
        level:"beginner",
        icon:"💪",
        desc:"Easy beginner chest exercise."
    },

    {
        name:"Push-Up",
        group:"chest",
        level:"intermediate",
        icon:"🔥",
        desc:"Classic chest builder."
    },

    {
        name:"Archer Push-Up",
        group:"chest",
        level:"advanced",
        icon:"⚡",
        desc:"Advanced unilateral chest movement."
    },



    // BACK
    {
        name:"Superman Hold",
        group:"back",
        level:"beginner",
        icon:"🦾",
        desc:"Strengthens lower back."
    },

    {
        name:"Pull-Up",
        group:"back",
        level:"intermediate",
        icon:"🏋️",
        desc:"Excellent back builder."
    },

    {
        name:"Muscle-Up",
        group:"back",
        level:"advanced",
        icon:"🚀",
        desc:"Explosive upper body movement."
    },



    // ARMS
    {
        name:"Light Dumbbell Curl",
        group:"arms",
        level:"beginner",
        icon:"💥",
        desc:"Basic bicep exercise."
    },

    {
        name:"Bicep Curl",
        group:"arms",
        level:"intermediate",
        icon:"🏋️",
        desc:"Targets biceps."
    },

    {
        name:"21s Curl",
        group:"arms",
        level:"advanced",
        icon:"⚔️",
        desc:"High intensity arm exercise."
    },



    // LEGS
    {
        name:"Chair Squat",
        group:"legs",
        level:"beginner",
        icon:"🦵",
        desc:"Beginner leg movement."
    },

    {
        name:"Squat",
        group:"legs",
        level:"intermediate",
        icon:"🏔️",
        desc:"King of leg exercises."
    },

    {
        name:"Pistol Squat",
        group:"legs",
        level:"advanced",
        icon:"🔥",
        desc:"Single leg advanced squat."
    },



    // CORE
    {
        name:"Dead Bug",
        group:"core",
        level:"beginner",
        icon:"🧱",
        desc:"Basic core stability exercise."
    },

    {
        name:"Plank",
        group:"core",
        level:"intermediate",
        icon:"⚙️",
        desc:"Great for core strength."
    },

    {
        name:"Dragon Flag",
        group:"core",
        level:"advanced",
        icon:"🐉",
        desc:"Elite core exercise."
    },



    // SHOULDERS
    {
        name:"Wall Shoulder Tap",
        group:"shoulders",
        level:"beginner",
        icon:"🪨",
        desc:"Beginner shoulder activation."
    },

    {
        name:"Overhead Press",
        group:"shoulders",
        level:"intermediate",
        icon:"🏋️",
        desc:"Builds shoulder strength."
    },

    {
        name:"Handstand Push-Up",
        group:"shoulders",
        level:"advanced",
        icon:"🚨",
        desc:"Elite shoulder movement."
    },



    // CALVES
    {
        name:"Standing Calf Raise",
        group:"calves",
        level:"beginner",
        icon:"🐾",
        desc:"Simple calf exercise."
    },

    {
        name:"Weighted Calf Raise",
        group:"calves",
        level:"intermediate",
        icon:"⚡",
        desc:"Weighted calf builder."
    },

    {
        name:"Single Leg Calf Raise",
        group:"calves",
        level:"advanced",
        icon:"🔥",
        desc:"Advanced calf isolation."
    },



    // OBLIQUES
    {
        name:"Side Bend",
        group:"obliques",
        level:"beginner",
        icon:"🌪️",
        desc:"Targets oblique muscles."
    },

    {
        name:"Russian Twist",
        group:"obliques",
        level:"intermediate",
        icon:"🌀",
        desc:"Rotational core movement."
    },

    {
        name:"Windshield Wipers",
        group:"obliques",
        level:"advanced",
        icon:"⚔️",
        desc:"Advanced oblique exercise."
    },



    // FOREARMS
    {
        name:"Wrist Curl",
        group:"forearms",
        level:"beginner",
        icon:"✋",
        desc:"Improves forearm strength."
    },

    {
        name:"Reverse Curl",
        group:"forearms",
        level:"intermediate",
        icon:"🪓",
        desc:"Targets brachioradialis."
    },

    {
        name:"Towel Pull-Up",
        group:"forearms",
        level:"advanced",
        icon:"🧗",
        desc:"Extreme grip challenge."
    },



    // QUADS
    {
        name:"Bodyweight Lunge",
        group:"quads",
        level:"beginner",
        icon:"🦿",
        desc:"Basic quad movement."
    },

    {
        name:"Bulgarian Split Squat",
        group:"quads",
        level:"intermediate",
        icon:"🏔️",
        desc:"Excellent quad builder."
    },

    {
        name:"Jump Squat",
        group:"quads",
        level:"advanced",
        icon:"🚀",
        desc:"Explosive quad exercise."
    }

];



let selectedGroup = "all";
let selectedLevel = "all";



function renderExercises(searchValue = "") {

    const grid = document.getElementById("exercise-grid");
    const count = document.getElementById("results-count");



    let filtered = exercises.filter(ex => {

        const matchesGroup =
            selectedGroup === "all" ||
            ex.group === selectedGroup;

        const matchesLevel =
            selectedLevel === "all" ||
            ex.level === selectedLevel;

        const matchesSearch =
            ex.name.toLowerCase().includes(searchValue) ||
            ex.group.toLowerCase().includes(searchValue);

        return matchesGroup &&
               matchesLevel &&
               matchesSearch;
    });



    count.textContent = `${filtered.length} Exercises`;



    grid.innerHTML = filtered.map(ex => `

        <div class="exercise-card">

            <div class="card-top">

                <div class="exercise-icon">
                    ${ex.icon}
                </div>

                <div class="difficulty ${ex.level}">
                    ${ex.level}
                </div>

            </div>

            <div class="exercise-name">
                ${ex.name}
            </div>

            <div class="muscle-tag">
                ${ex.group.toUpperCase()}
            </div>

            <div class="exercise-desc">
                ${ex.desc}
            </div>

        </div>

    `).join("");
}





// MUSCLE FILTER
document.getElementById("chip-row")
.addEventListener("click",(e)=>{

    const chip = e.target.closest(".chip");

    if(!chip) return;

    document.querySelectorAll("#chip-row .chip")
    .forEach(c => c.classList.remove("active"));

    chip.classList.add("active");

    selectedGroup = chip.dataset.group;

    const searchValue =
        document.getElementById("search-input")
        .value
        .toLowerCase();

    renderExercises(searchValue);

});





// LEVEL FILTER
document.getElementById("level-row")
.addEventListener("click",(e)=>{

    const chip = e.target.closest(".chip");

    if(!chip) return;

    document.querySelectorAll("#level-row .chip")
    .forEach(c => c.classList.remove("active"));

    chip.classList.add("active");

    selectedLevel = chip.dataset.level;

    const searchValue =
        document.getElementById("search-input")
        .value
        .toLowerCase();

    renderExercises(searchValue);

});





// SEARCH FILTER
document.getElementById("search-input")
.addEventListener("input",(e)=>{

    const value = e.target.value.toLowerCase();

    renderExercises(value);

});




// INITIAL RENDER
renderExercises();
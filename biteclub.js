const activityLevels = {
  sedentary: { label: "Sedentary", factor: 1.2 },
  light: { label: "Lightly Active", factor: 1.375 },
  moderate: { label: "Moderately Active", factor: 1.55 },
  very: { label: "Very Active", factor: 1.725 }
};

const goalLabels = {
  lose: "Lose Weight",
  maintain: "Maintain",
  gain: "Gain Muscle"
};

const goalAdjustments = {
  lose: -450,
  maintain: 0,
  gain: 300
};

const macroSplits = {
  lose: { protein: 35, carbs: 35, fat: 30 },
  maintain: { protein: 25, carbs: 50, fat: 25 },
  gain: { protein: 30, carbs: 45, fat: 25 }
};

const mealSlots = [
  { key: "breakfast", label: "Breakfast", share: 0.25 },
  { key: "mid", label: "Mid-morning Snack", share: 0.1 },
  { key: "lunch", label: "Lunch", share: 0.3 },
  { key: "evening", label: "Evening Snack", share: 0.1 },
  { key: "dinner", label: "Dinner", share: 0.25 }
];

const mealPlans = {
  veg: [
    { day: "Mon", breakfast: "Greek yogurt oats with berries", mid: "Apple with roasted chana", lunch: "Paneer rice bowl with salad", evening: "Peanut butter toast", dinner: "Dal, quinoa and mixed vegetables" },
    { day: "Tue", breakfast: "Vegetable poha with curd", mid: "Banana and almonds", lunch: "Chickpea wrap with mint yogurt", evening: "Cottage cheese cubes", dinner: "Rajma, brown rice and cucumber salad" },
    { day: "Wed", breakfast: "Besan chilla with tomato chutney", mid: "Sprouts chaat", lunch: "Tofu paneer-style curry with millet", evening: "Buttermilk and makhana", dinner: "Vegetable khichdi with curd" },
    { day: "Thu", breakfast: "Protein smoothie with milk and oats", mid: "Orange and walnuts", lunch: "Paneer tikka salad bowl", evening: "Hummus with carrots", dinner: "Palak dal with chapati" },
    { day: "Fri", breakfast: "Idli with sambar", mid: "Curd with berries", lunch: "Vegetable biryani with raita", evening: "Corn chaat", dinner: "Chole with quinoa salad" },
    { day: "Sat", breakfast: "Avocado paneer toast", mid: "Guava and seeds", lunch: "Soya chunk curry with rice", evening: "Lassi and fruit", dinner: "Mushroom matar with roti" },
    { day: "Sun", breakfast: "Upma with peanuts", mid: "Protein yogurt cup", lunch: "Paneer burrito bowl", evening: "Trail mix", dinner: "Lentil pasta with vegetables" }
  ],
  nonveg: [
    { day: "Mon", breakfast: "Egg omelette with multigrain toast", mid: "Greek yogurt and berries", lunch: "Grilled chicken rice bowl", evening: "Tuna cucumber bites", dinner: "Fish curry with rice and salad" },
    { day: "Tue", breakfast: "Boiled eggs with oats", mid: "Banana and peanut butter", lunch: "Turkey or chicken wrap", evening: "Cottage cheese bowl", dinner: "Chicken stir-fry with noodles" },
    { day: "Wed", breakfast: "Scrambled eggs with vegetables", mid: "Apple and almonds", lunch: "Fish tikka salad bowl", evening: "Protein shake", dinner: "Lean chicken keema with roti" },
    { day: "Thu", breakfast: "Egg bhurji with toast", mid: "Curd and fruit", lunch: "Chicken quinoa bowl", evening: "Roasted chana", dinner: "Prawn curry with brown rice" },
    { day: "Fri", breakfast: "Protein smoothie and egg whites", mid: "Orange and walnuts", lunch: "Chicken biryani with raita", evening: "Tuna toast", dinner: "Grilled fish with potatoes" },
    { day: "Sat", breakfast: "Oats with milk and boiled eggs", mid: "Fruit bowl", lunch: "Chicken salad sandwich", evening: "Yogurt and seeds", dinner: "Turkey meatballs with pasta" },
    { day: "Sun", breakfast: "Masala omelette with paratha", mid: "Coconut water and nuts", lunch: "Fish rice plate", evening: "Chicken soup", dinner: "Roast chicken with vegetables" }
  ],
  vegan: [
    { day: "Mon", breakfast: "Soy milk oats with berries", mid: "Apple with roasted peanuts", lunch: "Tofu rice bowl with salad", evening: "Hummus with carrots", dinner: "Lentil quinoa stew" },
    { day: "Tue", breakfast: "Chickpea flour chilla", mid: "Banana and almonds", lunch: "Bean burrito bowl", evening: "Soy yogurt and seeds", dinner: "Tofu vegetable stir-fry" },
    { day: "Wed", breakfast: "Peanut butter chia oats", mid: "Sprouts chaat", lunch: "Tempeh millet bowl", evening: "Makhana and fruit", dinner: "Dal, rice and spinach" },
    { day: "Thu", breakfast: "Plant protein smoothie", mid: "Orange and walnuts", lunch: "Chickpea salad wrap", evening: "Edamame cup", dinner: "Soya chunk curry with roti" },
    { day: "Fri", breakfast: "Idli with sambar", mid: "Fruit and pumpkin seeds", lunch: "Tofu biryani with salad", evening: "Avocado toast", dinner: "Black bean pasta" },
    { day: "Sat", breakfast: "Upma with peas and peanuts", mid: "Guava and seeds", lunch: "Vegan kebab rice plate", evening: "Coconut yogurt", dinner: "Vegetable khichdi with lentils" },
    { day: "Sun", breakfast: "Tofu scramble with toast", mid: "Trail mix", lunch: "Falafel quinoa bowl", evening: "Plant protein shake", dinner: "Thai tofu curry with rice" }
  ]
};

const foodLibrary = [
  { name: "Oats", type: "Vegan", calories: 389, protein: 17, carbs: 66, fat: 7 },
  { name: "Brown Rice", type: "Vegan", calories: 123, protein: 3, carbs: 26, fat: 1 },
  { name: "Quinoa", type: "Vegan", calories: 120, protein: 4, carbs: 21, fat: 2 },
  { name: "Lentils", type: "Vegan", calories: 116, protein: 9, carbs: 20, fat: 0 },
  { name: "Chickpeas", type: "Vegan", calories: 164, protein: 9, carbs: 27, fat: 3 },
  { name: "Tofu", type: "Vegan", calories: 144, protein: 17, carbs: 3, fat: 9 },
  { name: "Soya Chunks", type: "Vegan", calories: 345, protein: 52, carbs: 33, fat: 1 },
  { name: "Peanut Butter", type: "Vegan", calories: 588, protein: 25, carbs: 20, fat: 50 },
  { name: "Almonds", type: "Vegan", calories: 579, protein: 21, carbs: 22, fat: 50 },
  { name: "Banana", type: "Vegan", calories: 89, protein: 1, carbs: 23, fat: 0 },
  { name: "Paneer", type: "Veg", calories: 265, protein: 18, carbs: 3, fat: 21 },
  { name: "Greek Yogurt", type: "Veg", calories: 97, protein: 10, carbs: 4, fat: 5 },
  { name: "Milk", type: "Veg", calories: 60, protein: 3, carbs: 5, fat: 3 },
  { name: "Curd", type: "Veg", calories: 98, protein: 11, carbs: 4, fat: 4 },
  { name: "Eggs", type: "Non-Veg", calories: 155, protein: 13, carbs: 1, fat: 11 },
  { name: "Chicken Breast", type: "Non-Veg", calories: 165, protein: 31, carbs: 0, fat: 4 },
  { name: "Fish", type: "Non-Veg", calories: 206, protein: 22, carbs: 0, fat: 12 },
  { name: "Tuna", type: "Non-Veg", calories: 132, protein: 28, carbs: 0, fat: 1 },
  { name: "Prawns", type: "Non-Veg", calories: 99, protein: 24, carbs: 0, fat: 0 },
  { name: "Turkey", type: "Non-Veg", calories: 189, protein: 29, carbs: 0, fat: 7 }
];

const guidance = {
  lose: {
    eat: ["Lean protein at each meal", "High-fiber vegetables", "Whole grains in measured portions", "Low-calorie soups and salads"],
    avoid: ["Sugary drinks", "Deep-fried snacks", "Large desserts", "Frequent late-night grazing"]
  },
  maintain: {
    eat: ["Balanced plates", "Seasonal fruits", "Protein-rich snacks", "Regular meal timing"],
    avoid: ["Skipping meals then overeating", "Liquid calories", "Ultra-processed snacks", "Random weekend surpluses"]
  },
  gain: {
    eat: ["Protein with every meal", "Rice, oats, potatoes and pasta", "Nuts, seeds and healthy oils", "Post-workout carb plus protein"],
    avoid: ["Dirty bulking every day", "Missing breakfast", "Very low-carb meals", "Training without recovery food"]
  }
};

const dom = {
  form: document.getElementById("profileForm"),
  weight: document.getElementById("weight"),
  heightCm: document.getElementById("heightCm"),
  heightFt: document.getElementById("heightFt"),
  heightIn: document.getElementById("heightIn"),
  heightCmFields: document.getElementById("heightCmFields"),
  heightFtFields: document.getElementById("heightFtFields"),
  age: document.getElementById("age"),
  gender: document.getElementById("gender"),
  activity: document.getElementById("activity"),
  preference: document.getElementById("preference"),
  goal: document.getElementById("goal"),
  resetProfile: document.getElementById("resetProfile"),
  headerTarget: document.getElementById("headerTarget"),
  headerGoal: document.getElementById("headerGoal"),
  bmiValue: document.getElementById("bmiValue"),
  bmiText: document.getElementById("bmiText"),
  bmiStatus: document.getElementById("bmiStatus"),
  bmiMarker: document.getElementById("bmiMarker"),
  bmrValue: document.getElementById("bmrValue"),
  tdeeValue: document.getElementById("tdeeValue"),
  targetValue: document.getElementById("targetValue"),
  targetNote: document.getElementById("targetNote"),
  macroDonut: document.getElementById("macroDonut"),
  macroCalories: document.getElementById("macroCalories"),
  proteinGrams: document.getElementById("proteinGrams"),
  carbGrams: document.getElementById("carbGrams"),
  fatGrams: document.getElementById("fatGrams"),
  proteinPercent: document.getElementById("proteinPercent"),
  carbPercent: document.getElementById("carbPercent"),
  fatPercent: document.getElementById("fatPercent"),
  dayTabs: document.getElementById("dayTabs"),
  mealGrid: document.getElementById("mealGrid"),
  mealTotal: document.getElementById("mealTotal"),
  foodSearch: document.getElementById("foodSearch"),
  foodFilter: document.getElementById("foodFilter"),
  foodRows: document.getElementById("foodRows"),
  guideGrid: document.getElementById("guideGrid"),
  supplementGrid: document.getElementById("supplementGrid"),
  trackerForm: document.getElementById("trackerForm"),
  logDate: document.getElementById("logDate"),
  logMeal: document.getElementById("logMeal"),
  logCalories: document.getElementById("logCalories"),
  logProtein: document.getElementById("logProtein"),
  logCarbs: document.getElementById("logCarbs"),
  logFat: document.getElementById("logFat"),
  consumedToday: document.getElementById("consumedToday"),
  trackerTarget: document.getElementById("trackerTarget"),
  remainingToday: document.getElementById("remainingToday"),
  targetFill: document.getElementById("targetFill"),
  weeklyChart: document.getElementById("weeklyChart"),
  logList: document.getElementById("logList")
};

let currentWeightUnit = "kg";
let currentHeightUnit = "cm";
let activeDayIndex = 0;
let latestMetrics = null;
let mealLogs = loadLogs();
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sectionPanels = Array.from(document.querySelectorAll(".section-panel"));

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function getDefaultSectionId() {
  const hash = window.location.hash.replace("#", "");
  const hasMatchingNav = navLinks.some((link) => link.getAttribute("href") === `#${hash}`);
  return hasMatchingNav ? hash : "food-library";
}

function popSection(section) {
  section.classList.remove("section-pop");
  window.requestAnimationFrame(() => {
    section.classList.add("section-pop");
  });
}

function showSection(sectionId, shouldScroll) {
  let firstVisibleSection = null;

  sectionPanels.forEach((section) => {
    const isVisible = section.dataset.section === sectionId;
    section.classList.toggle("is-visible", isVisible);
    section.setAttribute("aria-hidden", String(!isVisible));
    if (isVisible && !firstVisibleSection) {
      firstVisibleSection = section;
    }
  });

  setActiveNav(sectionId);

  if (firstVisibleSection) {
    popSection(firstVisibleSection);
    if (shouldScroll) {
      firstVisibleSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

function numberValue(input, fallback) {
  const value = Number(input.value);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function selectedRadio(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : "";
}

function round(value) {
  return Math.round(value);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatCalories(value) {
  return `${round(value).toLocaleString()} kcal`;
}

function todayString() {
  const today = new Date();
  const offset = today.getTimezoneOffset() * 60000;
  return new Date(today.getTime() - offset).toISOString().slice(0, 10);
}

function dateLabel(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString(undefined, { weekday: "short" });
}

function loadLogs() {
  try {
    const saved = localStorage.getItem("biteclubMealLogs");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

function saveLogs() {
  localStorage.setItem("biteclubMealLogs", JSON.stringify(mealLogs));
}

function getProfile() {
  const weightUnit = selectedRadio("weightUnit");
  const heightUnit = selectedRadio("heightUnit");
  const rawWeight = numberValue(dom.weight, 72);
  const weightKg = weightUnit === "kg" ? rawWeight : rawWeight * 0.45359237;
  const heightCm = heightUnit === "cm"
    ? numberValue(dom.heightCm, 175)
    : (numberValue(dom.heightFt, 5) * 30.48) + (Number(dom.heightIn.value || 0) * 2.54);

  return {
    weightUnit,
    heightUnit,
    weightKg,
    heightCm,
    age: numberValue(dom.age, 28),
    gender: dom.gender.value,
    activity: dom.activity.value,
    preference: dom.preference.value,
    goal: dom.goal.value
  };
}

function calculateMetrics(profile) {
  const heightM = profile.heightCm / 100;
  const bmi = profile.weightKg / (heightM * heightM);
  const bmrBase = (10 * profile.weightKg) + (6.25 * profile.heightCm) - (5 * profile.age);
  const bmr = profile.gender === "male" ? bmrBase + 5 : bmrBase - 161;
  const tdee = bmr * activityLevels[profile.activity].factor;
  const targetCalories = Math.max(1200, tdee + goalAdjustments[profile.goal]);
  const split = macroSplits[profile.goal];
  const macros = {
    protein: (targetCalories * split.protein / 100) / 4,
    carbs: (targetCalories * split.carbs / 100) / 4,
    fat: (targetCalories * split.fat / 100) / 9
  };

  return { bmi, bmr, tdee, targetCalories, split, macros };
}

function getBmiCategory(bmi) {
  if (bmi < 18.5) {
    return { label: "Underweight", text: "Below normal range", color: "#3478f6" };
  }
  if (bmi < 25) {
    return { label: "Normal", text: "Normal range", color: "#2f9e57" };
  }
  if (bmi < 30) {
    return { label: "Overweight", text: "Above normal range", color: "#e67832" };
  }
  return { label: "Obese", text: "High BMI range", color: "#cf3f45" };
}

function convertWeightUnit(newUnit) {
  const currentValue = Number(dom.weight.value);
  if (!Number.isFinite(currentValue) || currentValue <= 0 || currentWeightUnit === newUnit) {
    currentWeightUnit = newUnit;
    return;
  }

  if (newUnit === "lb") {
    dom.weight.value = (currentValue / 0.45359237).toFixed(1);
  } else {
    dom.weight.value = (currentValue * 0.45359237).toFixed(1);
  }
  currentWeightUnit = newUnit;
}

function convertHeightUnit(newUnit) {
  if (currentHeightUnit === newUnit) {
    return;
  }

  if (newUnit === "ft") {
    const cm = numberValue(dom.heightCm, 175);
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches - (feet * 12));
    dom.heightFt.value = feet;
    dom.heightIn.value = inches === 12 ? 0 : inches;
    if (inches === 12) {
      dom.heightFt.value = feet + 1;
    }
    dom.heightCmFields.classList.add("hide");
    dom.heightFtFields.classList.remove("hide");
  } else {
    const feet = numberValue(dom.heightFt, 5);
    const inches = Number(dom.heightIn.value || 0);
    dom.heightCm.value = ((feet * 30.48) + (inches * 2.54)).toFixed(1);
    dom.heightFtFields.classList.add("hide");
    dom.heightCmFields.classList.remove("hide");
  }

  currentHeightUnit = newUnit;
}

function updateProfileView() {
  const profile = getProfile();
  const metrics = calculateMetrics(profile);
  latestMetrics = metrics;
  renderMetrics(profile, metrics);
  renderMacros(metrics);
  renderDayTabs(profile);
  renderMealPlan(profile, metrics);
  renderFoodLibrary(profile);
  renderGuidance(profile);
  renderSupplements(profile);
  renderTracker();
}

function renderMetrics(profile, metrics) {
  const bmiInfo = getBmiCategory(metrics.bmi);
  const markerPercent = clamp(((metrics.bmi - 14) / 26) * 100, 0, 100);
  const targetDelta = goalAdjustments[profile.goal];
  const targetCopy = targetDelta === 0
    ? "Maintenance target"
    : `${targetDelta > 0 ? "+" : ""}${targetDelta} kcal from TDEE`;

  dom.bmiValue.textContent = metrics.bmi.toFixed(1);
  dom.bmiText.textContent = bmiInfo.text;
  dom.bmiStatus.textContent = bmiInfo.label;
  dom.bmiStatus.style.borderColor = bmiInfo.color;
  dom.bmiStatus.style.color = bmiInfo.color;
  dom.bmiMarker.style.left = `${markerPercent}%`;
  dom.bmrValue.textContent = round(metrics.bmr).toLocaleString();
  dom.tdeeValue.textContent = round(metrics.tdee).toLocaleString();
  dom.targetValue.textContent = round(metrics.targetCalories).toLocaleString();
  dom.targetNote.textContent = targetCopy;
  dom.headerTarget.textContent = formatCalories(metrics.targetCalories);
  dom.headerGoal.textContent = goalLabels[profile.goal];
}

function renderMacros(metrics) {
  const split = metrics.split;
  const proteinEnd = split.protein;
  const carbEnd = split.protein + split.carbs;
  dom.macroDonut.style.background = `conic-gradient(var(--green) 0 ${proteinEnd}%, var(--blue) ${proteinEnd}% ${carbEnd}%, var(--orange) ${carbEnd}% 100%)`;
  dom.macroCalories.textContent = round(metrics.targetCalories).toLocaleString();
  dom.proteinGrams.textContent = `${round(metrics.macros.protein)}g`;
  dom.carbGrams.textContent = `${round(metrics.macros.carbs)}g`;
  dom.fatGrams.textContent = `${round(metrics.macros.fat)}g`;
  dom.proteinPercent.textContent = `${split.protein}%`;
  dom.carbPercent.textContent = `${split.carbs}%`;
  dom.fatPercent.textContent = `${split.fat}%`;
}

function renderDayTabs(profile) {
  const plan = mealPlans[profile.preference];
  if (activeDayIndex > plan.length - 1) {
    activeDayIndex = 0;
  }

  dom.dayTabs.innerHTML = plan.map((day, index) => {
    const activeClass = index === activeDayIndex ? "active" : "";
    return `<button type="button" class="day-tab ${activeClass}" data-day="${index}">${day.day}</button>`;
  }).join("");
}

function renderMealPlan(profile, metrics) {
  const day = mealPlans[profile.preference][activeDayIndex];
  const split = metrics.split;
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  dom.mealGrid.innerHTML = mealSlots.map((slot) => {
    const calories = round(metrics.targetCalories * slot.share);
    const protein = round((calories * split.protein / 100) / 4);
    const carbs = round((calories * split.carbs / 100) / 4);
    const fat = round((calories * split.fat / 100) / 9);

    totalCalories += calories;
    totalProtein += protein;
    totalCarbs += carbs;
    totalFat += fat;

    return `
      <article class="meal-card">
        <span>${slot.label}</span>
        <h3>${day[slot.key]}</h3>
        <p>${calories.toLocaleString()} kcal</p>
        <p>P ${protein}g | C ${carbs}g | F ${fat}g</p>
      </article>
    `;
  }).join("");

  dom.mealTotal.innerHTML = `
    <span>${day.day} total</span>
    <span class="pill">${totalCalories.toLocaleString()} kcal</span>
    <span class="pill">Protein ${totalProtein}g</span>
    <span class="pill">Carbs ${totalCarbs}g</span>
    <span class="pill">Fat ${totalFat}g</span>
  `;
}

function typeClass(type) {
  if (type === "Vegan") return "vegan";
  if (type === "Veg") return "veg";
  return "nonveg";
}

function foodAllowed(food, preference) {
  if (preference === "vegan") {
    return food.type === "Vegan";
  }
  if (preference === "veg") {
    return food.type === "Vegan" || food.type === "Veg";
  }
  return true;
}

function renderFoodLibrary(profile) {
  const search = dom.foodSearch.value.trim().toLowerCase();
  const filter = dom.foodFilter.value;
  const rows = foodLibrary.filter((food) => {
    const searchMatch = food.name.toLowerCase().includes(search);
    const filterMatch = filter === "match"
      ? foodAllowed(food, profile.preference)
      : filter === "all" || food.type === filter;
    return searchMatch && filterMatch;
  });

  dom.foodRows.innerHTML = rows.length
    ? rows.map((food) => `
      <tr>
        <td><strong>${food.name}</strong></td>
        <td><span class="tag ${typeClass(food.type)}">${food.type}</span></td>
        <td>${food.calories}</td>
        <td>${food.protein}g</td>
        <td>${food.carbs}g</td>
        <td>${food.fat}g</td>
      </tr>
    `).join("")
    : `<tr><td colspan="6">No foods match this search.</td></tr>`;
}

function renderGuidance(profile) {
  const guide = guidance[profile.goal];
  const waterLiters = clamp(profile.weightKg * 0.035, 1.8, 5.2);
  dom.guideGrid.innerHTML = `
    <article class="guide-card">
      <h3>Foods to Eat</h3>
      <ul>${guide.eat.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>
    <article class="guide-card">
      <h3>Foods to Avoid</h3>
      <ul>${guide.avoid.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>
    <article class="guide-card">
      <h3>Water Intake</h3>
      <ul>
        <li>${waterLiters.toFixed(1)} liters per day</li>
        <li>Add more during hot weather</li>
        <li>Add more for sweaty workouts</li>
      </ul>
    </article>
  `;
}

function renderSupplements(profile) {
  const protein = profile.preference === "vegan" ? "Plant Protein" : "Whey Protein";
  const omega = profile.preference === "vegan" ? "Algae Omega-3" : "Omega-3";
  const goalSpecific = profile.goal === "gain"
    ? "Creatine Monohydrate"
    : profile.goal === "lose"
      ? "Fiber Supplement"
      : "Electrolytes";

  const supplements = [
    { title: protein, points: ["Useful when food protein is low", "Best counted inside daily calories"] },
    { title: "Creatine", points: ["3-5g daily is a common gym dose", "Works best with consistent training"] },
    { title: omega, points: ["Supports essential fat intake", "Choose third-party tested products"] },
    { title: "Multivitamin", points: ["Covers small micronutrient gaps", "Does not replace fruits and vegetables"] },
    { title: goalSpecific, points: ["Goal-specific add-on", "Use only if it fits your routine"] },
    { title: "Caffeine", points: ["Optional pre-workout support", "Avoid late in the day"] }
  ];

  dom.supplementGrid.innerHTML = supplements.map((item) => `
    <article class="supplement-card">
      <h3>${item.title}</h3>
      <ul>${item.points.map((point) => `<li>${point}</li>`).join("")}</ul>
    </article>
  `).join("");
}

function renderTracker() {
  if (!latestMetrics) {
    return;
  }

  const date = dom.logDate.value || todayString();
  const target = round(latestMetrics.targetCalories);
  const todaysLogs = mealLogs.filter((log) => log.date === date);
  const consumed = todaysLogs.reduce((sum, log) => sum + log.calories, 0);
  const remaining = target - consumed;
  const percent = clamp((consumed / target) * 100, 0, 130);

  dom.consumedToday.textContent = consumed.toLocaleString();
  dom.trackerTarget.textContent = target.toLocaleString();
  dom.remainingToday.textContent = remaining.toLocaleString();
  dom.remainingToday.style.color = remaining < 0 ? "var(--orange)" : "var(--ink)";
  dom.targetFill.style.width = `${Math.min(percent, 100)}%`;

  renderWeeklyChart(date, target);
  renderLogList(todaysLogs);
}

function renderWeeklyChart(endDateString, target) {
  const endDate = new Date(`${endDateString}T00:00:00`);
  const dates = [];
  for (let index = 6; index >= 0; index -= 1) {
    const date = new Date(endDate);
    date.setDate(endDate.getDate() - index);
    dates.push(date.toISOString().slice(0, 10));
  }

  dom.weeklyChart.innerHTML = dates.map((date) => {
    const total = mealLogs
      .filter((log) => log.date === date)
      .reduce((sum, log) => sum + log.calories, 0);
    const height = clamp((total / target) * 80, 3, 100);
    const overClass = total > target ? "over" : "";
    return `
      <div class="bar-wrap" title="${date}: ${total} kcal">
        <div class="bar-shell">
          <div class="bar ${overClass}" style="height:${height}%"></div>
        </div>
        <div class="bar-label">${dateLabel(date)}</div>
      </div>
    `;
  }).join("");
}

function renderLogList(logs) {
  if (!logs.length) {
    dom.logList.innerHTML = `<div class="empty-state">No meals logged for this date.</div>`;
    return;
  }

  dom.logList.innerHTML = logs.map((log) => `
    <div class="log-item">
      <div>
        <strong>${log.meal}</strong>
        <span>${log.calories} kcal | P ${log.protein}g | C ${log.carbs}g | F ${log.fat}g</span>
      </div>
      <button type="button" class="danger-btn" data-delete-log="${log.id}">Delete</button>
    </div>
  `).join("");
}

function addLog(event) {
  event.preventDefault();
  const calories = Number(dom.logCalories.value);
  if (!Number.isFinite(calories) || calories <= 0) {
    return;
  }

  mealLogs.push({
    id: String(Date.now()),
    date: dom.logDate.value || todayString(),
    meal: dom.logMeal.value.trim() || "Meal",
    calories: round(calories),
    protein: round(Number(dom.logProtein.value || 0)),
    carbs: round(Number(dom.logCarbs.value || 0)),
    fat: round(Number(dom.logFat.value || 0))
  });

  saveLogs();
  dom.trackerForm.reset();
  dom.logDate.value = todayString();
  renderTracker();
}

function resetProfile() {
  dom.weight.value = "72";
  document.getElementById("weightKg").checked = true;
  currentWeightUnit = "kg";
  document.getElementById("heightCmUnit").checked = true;
  currentHeightUnit = "cm";
  dom.heightCmFields.classList.remove("hide");
  dom.heightFtFields.classList.add("hide");
  dom.heightCm.value = "175";
  dom.heightFt.value = "5";
  dom.heightIn.value = "9";
  dom.age.value = "28";
  dom.gender.value = "male";
  dom.activity.value = "moderate";
  dom.preference.value = "nonveg";
  dom.goal.value = "maintain";
  updateProfileView();
}

dom.form.addEventListener("input", updateProfileView);
dom.form.addEventListener("change", (event) => {
  if (event.target.name === "weightUnit") {
    convertWeightUnit(event.target.value);
  }
  if (event.target.name === "heightUnit") {
    convertHeightUnit(event.target.value);
  }
  updateProfileView();
});

dom.resetProfile.addEventListener("click", resetProfile);

dom.dayTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-day]");
  if (!button) {
    return;
  }
  activeDayIndex = Number(button.dataset.day);
  updateProfileView();
});

dom.foodSearch.addEventListener("input", () => renderFoodLibrary(getProfile()));
dom.foodFilter.addEventListener("change", () => renderFoodLibrary(getProfile()));
dom.trackerForm.addEventListener("submit", addLog);
dom.logDate.addEventListener("change", renderTracker);

dom.logList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-log]");
  if (!button) {
    return;
  }
  mealLogs = mealLogs.filter((log) => log.id !== button.dataset.deleteLog);
  saveLogs();
  renderTracker();
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const sectionId = link.getAttribute("href").replace("#", "");
    const hasPanel = sectionPanels.some((section) => section.dataset.section === sectionId);
    if (!hasPanel) {
      return;
    }

    event.preventDefault();
    showSection(sectionId, true);
    window.history.replaceState(null, "", link.getAttribute("href"));
  });
});

dom.logDate.value = todayString();
updateProfileView();
showSection(getDefaultSectionId(), false);
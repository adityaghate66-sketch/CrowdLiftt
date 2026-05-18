# CrowdLift — Know Before You Go

## Problem Statement
Gym-goers waste time showing up to a packed gym with no way to know how crowded it is. CrowdLift solves this by letting users check in, select their muscle group, and see real-time crowd levels — so everyone knows exactly how busy the gym is before they leave home.

## Live Demo
**Deployed link:** https://quiet-meringue-d2f182.netlify.app/

## Features
- Real-time crowd tracking per muscle group (Chest, Back, Arms, Legs, Shoulders, Core)
- Check-in / Check-out system — crowd updates live for all users via Supabase
- Crowd predictor — predict crowd levels for any day and time
- Weekly heatmap — visual overview of busy hours
- Workout calendar — green for days attended, red for missed days
- Streak tracker — consecutive gym days
- Personalized 7-day workout plan
- Live Bengaluru weather with gym crowd tip
- Exercise library — 30+ exercises across 6 muscle groups with step-by-step instructions
- Diet & nutrition page (BiteClub) — BMI, BMR, TDEE calculator with meal plans
- Login & Signup with 2-step onboarding (collects age, weight, height, goal, activity level)

## Tech Stack
- HTML, CSS, JavaScript (Vanilla)
- Supabase (Realtime Database for crowd data)
- Open-Meteo API (free weather API)

## API Used
- **Supabase** — https://supabase.com (realtime crowd data storage and sync)

## How to Run Locally
1. git clone https://github.com/adityaghate66-sketch/CrowdLiftt
2. cd CrowdLiftt
3. Open index.html in browser (or use Live Server in VS Code)

## JavaScript Concepts Used
- **fetch + async/await** — Weather API fetch in home.js, Supabase crowd data fetch
- **Error handling** — try/catch around all async calls (weather fetch, Supabase read/write)
- **HOFs (map/filter/reduce)** — crowd grid rendering, exercise filtering, search, tip matching
- **DOM Events** — check-in/out buttons, day selector, time slider, calendar nav, muscle pills
- **Debouncing** — exercise library search bar (300ms debounce)

## Bonus Topics
- Debouncing — search bar in exercise library
- Real-time updates — Supabase realtime subscription for live crowd sync

## Team Members
- Member 1 — Crowd predictor, check-in/out system, Supabase integration, dashboard (home.js)
- Member 2 — Exercise library (exLibrary.html/css/js)
- Member 3 — Diet & nutrition page (biteclub.html/css/js)
- Member 4 — Landing page, login, signup, about page

## Future Improvements
- Push notifications when gym is less crowded
- Admin panel for gym staff
- Mobile app version
- Integration with gym membership systems

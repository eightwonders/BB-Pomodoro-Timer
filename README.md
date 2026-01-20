# Pomodoro Timer (React + TypeScript)

Minimal Pomodoro timer skeleton using React, TypeScript and Vite.

Features:
- Start / Pause / Reset
- Work / Break durations editable in settings
- Automatic switch between work and break
- Minimal styling (CSS)

Getting started:
1. Install dependencies
   ```bash
   npm install
   ```
2. Run dev server
   ```bash
   npm run dev
   ```

Project structure:
- src/
  - main.tsx — app entry
  - App.tsx — root component
  - components/
    - Timer.tsx — main timer logic and display
    - Settings.tsx — simple inputs to change durations
  - styles/index.css — basic styling

Notes:
- This is a skeleton — extend with persistent settings, notifications, long breaks, or a task list.
- You can replace the basic audio beep with notifications or better sounds.
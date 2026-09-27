# QuestBoard ⚔️

A gamified take on the classic to-do list — tasks become "quests," completing them levels you up, and overdue quests glow red so nothing slips through the cracks. Built with React and a dark, neon-accented card-grid UI that looks nothing like a typical to-do app.

## Features

- Add, edit, delete, and mark quests as complete
- Organize quests into types: **Work**, **Personal**, **Urgent**
- Filter by status (All / Active / Completed) and by quest type, using pill-style filter buttons
- Quests persist across page refreshes via `localStorage`
- Live progress bar plus open/completed counts and a "Level" indicator that increases as you complete quests
- Optional due dates, with an **overdue** visual indicator (red glow + warning label) for anything past due and not yet completed
- Simulated loading state on startup and an empty-state message when no quests match the current filters
- Responsive card-grid layout — works on both desktop and mobile widths

## Technologies Used

- [React 18](https://react.dev/) — functional components only, no class components
- [Vite](https://vitejs.dev/) — dev server and build tool
- Plain CSS with CSS custom properties (variables), gradients, and glow effects for the neon theme
- Browser `localStorage` API for persistence
- No external UI/state libraries — state is managed with React's built-in `useState` and `useEffect` hooks, plus one custom hook (`useLocalStorage`)

## Project Structure

```
questboard/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── QuestForm.jsx
│   │   ├── FilterTabs.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── QuestBoardView.jsx
│   │   └── QuestCard.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   ```
   Then open the URL shown in your terminal (usually `http://localhost:5173`).
3. **Build for production** (optional)
   ```bash
   npm run build
   npm run preview
   ```

## Known Limitations

- No drag-and-drop reordering of quests.
- No dark/light theme toggle — QuestBoard is dark-themed only by design (TaskFlow, the companion app, covers the theme-toggle stretch goal instead).
- No client-side routing — the app is intentionally a single view, so React Router wasn't needed.
- Data is stored per-browser via `localStorage`; it isn't synced across devices or browsers.

# Changelog — Ultimate Offline Life Planner

## v1.0.0 — 2026-10-17

Initial release.

### Features

- **Dashboard (Today):** today's date, daily priorities, upcoming tasks,
  habit completion summary, goal progress overview.
- **Daily planner:** dated schedule with time blocks, priorities, tasks, notes.
- **Weekly planner:** seven-day view with task grouping.
- **Monthly calendar:** month navigation, date selection, events and tasks.
- **Tasks:** add/edit/delete, completion checkboxes, due dates, priorities,
  categories, search and filters, simple recurrence (daily/weekly).
- **Habit tracker:** customizable habits, daily completion dots, streak
  counters, weekly statistics.
- **Goal tracker:** goal titles, milestones, target dates, progress tracking,
  archived/completed states.
- **Budget tracker:** income and expense entries, categories, monthly totals,
  currency selection, monthly bar chart. Informational only — not financial advice.
- **Journal:** dated entries, optional mood tags, search, edit and delete.
- **Notes:** categories, search, edit and delete.
- **Settings:** light/dark mode, 12/24-hour time, date format, week-start day,
  JSON export/import with validation, CSV export, reset with confirmation.
- **Onboarding:** first-run walkthrough with optional sample data.
- **Help panel:** in-app feature reference.
- **Brain dump, Dopamine menu, Impulse parking lot:** quick-capture tools for
  getting ideas out of your head.

### Technical

- Single self-contained HTML file; no build step, no server required.
- Data stored locally in the browser (localStorage); manual JSON backup
  export/import with validation; CSV export for tasks, habits, and budget.
- Keyboard accessible (visible focus states, Esc closes dialogs); responsive
  desktop and mobile layouts; confirmation dialogs for destructive actions.

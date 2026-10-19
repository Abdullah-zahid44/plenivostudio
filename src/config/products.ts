/**
 * Product catalog. Prices are the single source of truth — every page must
 * render prices from this file, never hard-code a different price.
 *
 * priceUSD is an editable configuration value. Changing it here updates the
 * whole site. It must match the configured payment provider variant price
 * before checkout is enabled (see checkout.ts).
 */

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  /** Editable price in USD. Must match the payment provider variant price. */
  priceUSD: number;
  currency: 'USD';
  version: string;
  /** Short feature list for cards. */
  features: string[];
  /** Full feature list for the product detail page. */
  detailedFeatures: { title: string; description: string }[];
  /** What the buyer receives in the ZIP archive. */
  whatsIncluded: string[];
  /** Honest platform/browser requirements. */
  requirements: string[];
  /** Honest limitations — never hidden. */
  limitations: string[];
  demoPath: string;
  checkoutVariantKey: 'ultimateLifePlanner';
}

export const products: Product[] = [
  {
    id: 'ultimate-life-planner',
    slug: 'ultimate-life-planner',
    name: 'Ultimate Offline Life Planner',
    tagline: 'Your entire life, planned in one private file. No cloud, no subscription.',
    priceUSD: 29,
    currency: 'USD',
    version: '1.0.0',
    features: [
      'Dashboard, daily, weekly and monthly views',
      'Tasks with priorities, categories and due dates',
      'Habit tracker with streaks',
      'Goals with milestones',
      'Budget tracker with monthly totals',
      'Journal and notes',
      'Works fully offline — data stays on your device',
      'One-time purchase, free backup & restore tools',
    ],
    detailedFeatures: [
      {
        title: 'Dashboard',
        description:
          "Today's date, a daily summary, your top priorities, upcoming tasks, habit completion and goal progress at a glance.",
      },
      {
        title: 'Daily Planner',
        description:
          'Dated schedule with time blocks, daily priorities, tasks and free-form notes for each day.',
      },
      {
        title: 'Weekly Planner',
        description:
          'Seven-day overview with task grouping. Reorder tasks with accessible up/down controls — no drag required.',
      },
      {
        title: 'Monthly Calendar',
        description:
          'Month navigation, date selection, and events and tasks shown on each date.',
      },
      {
        title: 'Tasks',
        description:
          'Add, edit, delete and complete tasks. Priorities, categories, due dates, search and filters. Simple recurrence (daily / weekly / monthly) where technically reliable.',
      },
      {
        title: 'Habit Tracker',
        description:
          'Customizable habits with daily check-off, streak counters and weekly/monthly statistics.',
      },
      {
        title: 'Goal Tracker',
        description:
          'Goals with titles, milestones, target dates, progress tracking and archived/completed states.',
      },
      {
        title: 'Budget Tracker',
        description:
          'Income and expense entries with categories, monthly totals, currency selection and a simple bar chart. Informational only — not financial advice.',
      },
      {
        title: 'Journal',
        description:
          'Dated journal entries with optional mood, full-text search, edit and delete.',
      },
      {
        title: 'Notes',
        description: 'Notes organized by folder or category, with search and editing.',
      },
      {
        title: 'Settings',
        description:
          'Light/dark mode, 12/24-hour time, date format, week-start preference, export/import, and reset with confirmation.',
      },
      {
        title: 'Onboarding & Help',
        description:
          'First-run walkthrough, built-in help panel, and optional sample data so you can explore safely before adding your own.',
      },
      {
        title: 'Backup & Restore',
        description:
          'Manual JSON export/import with versioned schema, validation and corruption checks, plus CSV export for tasks, habits and budget. Your responsibility: keep your own backups.',
      },
    ],
    whatsIncluded: [
      'ultimate-life-planner.html — the planner (single self-contained file, works offline)',
      'README.md — overview and quick start',
      'QUICKSTART.md — five-minute setup guide',
      'LICENSE.txt — your single-user digital license',
      'CHANGELOG.md — version history',
      'BROWSER-SUPPORT.md — tested browsers and devices matrix',
      'Backup guide — how to export and restore your data',
    ],
    requirements: [
      'A modern browser: recent Chrome, Edge, Firefox or Safari on desktop.',
      'Works from a local file or any static host. No installation, no account, no internet connection required after download.',
      'Mobile browsers (iOS Safari, Android Chrome) are supported for viewing and basic use — see BROWSER-SUPPORT.md for the tested matrix.',
    ],
    limitations: [
      'Data is stored in your browser (IndexedDB with localStorage fallback). If browser data is cleared, unsaved changes are lost — keep regular JSON backups using the built-in export.',
      'Some browsers restrict storage for pages opened directly as files (file://). If persistence is unavailable, the planner shows an honest notice and offers export instead of silently losing data.',
      'No sync between devices — each copy keeps its own local data. Use export/import to move data.',
      'The budget tracker is informational only and is not financial advice.',
    ],
    demoPath: '/demo',
    checkoutVariantKey: 'ultimateLifePlanner',
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatPrice(usd: number): string {
  return `$${usd.toFixed(2)}`;
}

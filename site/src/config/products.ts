/**
 * Product catalog. Prices are the single source of truth — every page must
 * render prices from this file, never hard-code a different price.
 *
 * priceUSD is an editable configuration value. Changing it here updates the
 * whole site. It must match the configured payment provider variant price
 * before checkout is enabled (see checkout.ts).
 *
 * ADDING A NEW PRODUCT:
 *   1. Add one entry to `products` below (copy the existing entry as a template).
 *   2. Put its screenshots in public/screenshots/ (real captures only — never
 *      stock or mock imagery) and list them in `screenshots`.
 *   3. Set `category` to an id from categories.ts (add the category there first
 *      if it does not exist yet).
 *   4. Rebuild — the product page at /products/<slug> and the catalog entry
 *      are generated automatically. No page files to write by hand.
 */

export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** 'hero' = main product-page hero image, 'phone' = mobile overlay / tour row. */
  role?: 'hero' | 'phone';
}

export interface TourItem {
  title: string;
  text: string;
  /** Must match a Screenshot.src in this product's `screenshots`. */
  screenshot: string;
}

export interface ProductFaq {
  q: string;
  a: string;
}

export interface ComparisonCompetitor {
  name: string;
  price: string;
  billing: string;
  account: string;
  dataLocation: string;
  offline: string;
}

export interface ComparisonTable {
  eyebrow: string;
  heading: string;
  intro: string;
  /** Small print rendered under the table. */
  caption: string;
  footnote: string;
  /** Sub-label under our column header, e.g. the product name. */
  ourColumnSub: string;
  competitors: ComparisonCompetitor[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  /** Fuller description for meta tags and JSON-LD. Keep factual. */
  description: string;
  /** Category id — must exist in categories.ts. */
  category: string;
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
  /** Canonical screenshots. The 'hero' role (or first entry) is the page hero. */
  screenshots: Screenshot[];
  /** Main product file name inside the ZIP, e.g. 'ultimate-life-planner.html'. */
  fileName: string;
  /** Named views/modules inside the product — drives the "All N views" section. */
  views?: string[];
  /** Screenshot tour rows — drives the "Take the tour" section. */
  tour?: TourItem[];
  /** Product-specific FAQs. */
  faqs?: ProductFaq[];
  /** Set to render the "one-time vs subscriptions" comparison table. */
  comparison?: ComparisonTable;
  /** Src of the screenshot shown in the "What's in the ZIP" section. */
  zipScreenshot?: string;
  /** Homepage spotlight + catalog pin. Only one product should be featured. */
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 'ultimate-life-planner',
    slug: 'ultimate-life-planner',
    name: 'Ultimate Offline Life Planner',
    tagline: 'Your entire life, planned in one private file. No cloud, no subscription.',
    description:
      'The Ultimate Offline Life Planner is a single self-contained HTML file with 17 views — tasks, habits, goals, budget, journal and more. It works fully offline in a modern browser; your data stays on your device. One-time purchase, no subscription.',
    category: 'life-planning',
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
    screenshots: [
      {
        src: '/screenshots/planner-dashboard.svg',
        alt: "Ultimate Offline Life Planner dashboard: today's date, daily summary, priorities, upcoming tasks and habit progress",
        caption: 'Dashboard — your day at a glance',
        width: 1500,
        height: 1000,
        role: 'hero',
      },
      {
        src: '/screenshots/planner-tasks.svg',
        alt: 'Tasks view: task list with priorities, categories, due dates and filters',
        caption: 'Tasks — priorities, categories, due dates',
        width: 1500,
        height: 1000,
      },
      {
        src: '/screenshots/planner-habits.svg',
        alt: 'Habit tracker: daily check-offs, streak counters and weekly statistics',
        caption: 'Habits — streaks and statistics',
        width: 1500,
        height: 1000,
      },
      {
        src: '/screenshots/planner-weekly.svg',
        alt: 'Weekly planner: seven-day overview with grouped tasks',
        caption: 'Weekly — seven days at a glance',
        width: 1500,
        height: 1000,
      },
      {
        src: '/screenshots/planner-budget.svg',
        alt: 'Budget tracker: income and expense entries with monthly totals',
        caption: 'Budget — monthly totals, informational only',
        width: 1500,
        height: 1000,
      },
      {
        src: '/screenshots/planner-timer.svg',
        alt: 'Focus Timer view: a countdown timer for timed work sessions',
        caption: 'Focus Timer — timed work sessions',
        width: 1500,
        height: 1000,
      },
      {
        src: '/screenshots/planner-mobile.svg',
        alt: 'The planner running in a mobile browser',
        caption: 'Mobile — viewing and everyday use',
        width: 390,
        height: 844,
        role: 'phone',
      },
    ],
    fileName: 'ultimate-life-planner.html',
    views: [
      'Today',
      'Brain Dump',
      'Tasks',
      'Weekly',
      'Goals',
      'Calendar',
      'Habits',
      'Routines',
      'Focus Timer',
      'Dopamine Menu',
      'Impulse Parking Lot',
      'Budget',
      'Journal',
      'Notes',
      'Progress',
      'Backup/Restore',
      'Settings',
    ],
    tour: [
      {
        title: 'Tasks',
        text: 'Add, edit, delete and complete tasks. Priorities, categories, due dates, search and filters. Simple recurrence (daily / weekly / monthly) where technically reliable.',
        screenshot: '/screenshots/planner-tasks.svg',
      },
      {
        title: 'Habit Tracker',
        text: 'Customizable habits with daily check-off, streak counters and weekly/monthly statistics.',
        screenshot: '/screenshots/planner-habits.svg',
      },
      {
        title: 'Weekly Planner',
        text: 'Seven-day overview with task grouping. Reorder tasks with accessible up/down controls — no drag required.',
        screenshot: '/screenshots/planner-weekly.svg',
      },
      {
        title: 'Budget Tracker',
        text: 'Income and expense entries with categories, monthly totals, currency selection and a simple bar chart. Informational only — not financial advice.',
        screenshot: '/screenshots/planner-budget.svg',
      },
      {
        title: 'Focus Timer',
        text: 'A built-in focus timer view for timed work sessions — part of the same offline file, no separate app or account.',
        screenshot: '/screenshots/planner-timer.svg',
      },
    ],
    faqs: [
      {
        q: 'Do I need the internet to use it after purchase?',
        a: 'No. The planner is a single self-contained HTML file. Once downloaded, it runs entirely offline in your browser.',
      },
      {
        q: 'Which devices and browsers are supported?',
        a: 'Recent versions of Chrome, Edge, Firefox and Safari on desktop are supported. Mobile browsers work for everyday use. The ZIP includes a BROWSER-SUPPORT.md file with the full tested matrix — we state what is tested rather than claiming universal support.',
      },
      {
        q: 'Where is my data stored?',
        a: 'Locally in your browser (IndexedDB with a localStorage fallback). Nothing is uploaded anywhere. Keep regular backups with the built-in JSON export, because clearing browser data will remove unsaved changes.',
      },
      {
        q: 'What exactly do I receive?',
        a: 'A ZIP archive with the planner HTML file, README, quick-start guide, license, changelog, browser-support matrix and backup instructions.',
      },
      {
        q: 'Can I use it on multiple devices?',
        a: 'Your license covers you as one user on your own devices. Each copy keeps its own local data — there is no sync. Use export/import to move data between devices.',
      },
      {
        q: 'What is the refund policy?',
        a: 'Please read the Refund Policy page before purchasing. Because this is a downloadable digital product, refunds are limited once the file has been downloaded, with exceptions as described there and as required by applicable law.',
      },
    ],
    comparison: {
      eyebrow: 'One-time vs subscriptions',
      heading: 'Pay once, or pay every month',
      intro:
        'Plenivostudio is a single HTML file, fully offline (zero network calls — verified in our QA), no account, and your data stays on your device. Here is how that compares on the facts that matter:',
      caption:
        'Prices as of October 2026 — verify on official sites; prices vary by region and billing.',
      footnote:
        'Competitor prices as of October 2026 from public pricing pages; they change — check official sites. Apps differ in scope; compare on what you need.',
      ourColumnSub: 'Ultimate Offline Life Planner',
      competitors: [
        {
          name: 'Notion',
          price: 'from $10/user/mo',
          billing: 'Subscription',
          account: 'Yes',
          dataLocation: 'Their cloud',
          offline: 'No',
        },
        {
          name: 'Todoist',
          price: 'from $5/mo',
          billing: 'Subscription',
          account: 'Yes',
          dataLocation: 'Their cloud',
          offline: 'No',
        },
        {
          name: 'TickTick',
          price: '$49.99/yr',
          billing: 'Subscription',
          account: 'Yes',
          dataLocation: 'Their cloud',
          offline: 'No',
        },
      ],
    },
    zipScreenshot: '/screenshots/planner-weekly.svg',
    featured: true,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** The product shown in the homepage spotlight. Falls back to the first product. */
export function getFeaturedProduct(): Product {
  return products.find((p) => p.featured) ?? products[0];
}

export function formatPrice(usd: number): string {
  return `$${usd.toFixed(2)}`;
}

# Digitali — Architecture

## Repo
`Abdullah-zahid44/digitali` — monorepo: marketing site + planner product + docs.

## Layout
```
digitali/
├── README.md                     # project overview, honest status
├── ARCHITECTURE.md               # this file
├── site/                         # Astro 4+, static output → Cloudflare Pages
│   ├── astro.config.mjs           # output: 'static', site URL from env
│   ├── package.json / tsconfig.json
│   ├── public/
│   │   ├── robots.txt / favicon.svg
│   │   ├── screenshots/          # REAL planner screenshots (generated, not mockups)
│   │   └── downloads/            # demo.html served here (/downloads/demo.html)
│   ├── src/
│   │   ├── config/
│   │   │   ├── site.ts           # brand, canonical URL, contact email (CONFIG), socials
│   │   │   ├── products.ts       # catalog: 1 product, price from config
│   │   │   └── checkout.ts       # Lemon Squeezy: enabled=false until approval
│   │   ├── layouts/Base.astro
│   │   ├── components/           # Header, Footer, Hero, ProductCard, FaqAccordion,
│   │   │                         # CheckoutButton (disabled state), ScreenshotFigure, etc.
│   │   ├── pages/                # index, products/, products/ultimate-life-planner,
│   │   │                         # demo, about, contact, faq, privacy, terms,
│   │   │                         # refund-policy, license, 404
│   │   └── styles/global.css     # design tokens
│   └── wrangler.toml             # pages config (optional)
├── planner/
│   ├── ultimate-life-planner.html # THE PRODUCT — single self-contained file
│   ├── demo.html                  # generated: DEMO_MODE build, isolated sample data
│   ├── packaging/
│   │   ├── README.md / QUICKSTART.md / LICENSE.txt / CHANGELOG.md / BROWSER-SUPPORT.md
│   └── dist/
│       └── digitali-ultimate-life-planner-1.0.0.zip
├── docs/
│   ├── DEPLOYMENT-cloudflare.md
│   ├── LEMON-SQUEEZY-SETUP.md
│   ├── PRELAUNCH-CHECKLIST.md
│   └── MERCHANT-CONFIG-CHECKLIST.md
└── tests/
    └── planner-smoke.mjs          # Playwright: views, CRUD, backup, offline
```

## Design tokens (site)
- `--paper: #FAFAF8` (bg), `--ink: #16181D` (text), `--indigo: #6554D9` (primary),
  `--lavender: #E9E6FB` (tint), `--gray: #F1F0EC` (muted bg), `--line: #E5E3DC`
- Fonts: Inter (UI) via Google Fonts + `link`; display serif: Georgia/'Source Serif' stack
- Radius 14–20px cards, soft shadows `0 8px 28px rgba(22,24,29,.07)`, 12-col grid
- NO neon, NO heavy gradients, NO AI-looking art, NO stock photos

## Planner (product) engineering
- Single HTML file. Zero external requests (no CDNs, fonts, analytics). System font stacks.
- Storage: async adapter — IndexedDB (`digitali-db`, store `kv`) primary,
  localStorage fallback, in-memory fallback. Honest banner if only memory works
  (e.g. some file:// contexts): "changes won't persist — use Export".
- State: one JSON doc, versioned schema (`schemaVersion: 1`). Export/import with
  validation + corruption checks. CSV export for tasks/habits/budget.
- Features (13): Dashboard, Daily, Weekly (7-day), Monthly calendar, Tasks
  (CRUD, priorities, categories, due dates, search/filter, simple recurrence),
  Habits (streaks, stats), Goals (milestones), Budget (income/expense, categories,
  monthly totals, currency select, bar chart; "informational, not financial advice"),
  Journal (dated, mood, search), Notes (categories, search), Settings
  (theme, 12/24h, date format, week start, export/import/reset), Onboarding
  (first-run tour + sample-data opt-in), Help panel.
- Keyboard accessible (focus states, Esc closes modals), responsive, empty states,
  confirm dialogs for destructive actions.

## Checkout (Lemon Squeezy)
- `src/config/checkout.ts`: `{ enabled: false, storeUrl: '', variants: { ultimateLifePlanner: '' } }`
- CheckoutButton: when disabled → "Purchasing opens after store activation"
  (honest, non-functional-by-design until configured). When enabled → hosted
  checkout URL redirect. No secrets in frontend. Delivery via Lemon Squeezy
  digital delivery (per LEMON-SQUEEZY-SETUP.md).

## Contact
- Until a verified endpoint exists: `mailto:` to `site.contactEmail` (CONFIG item,
  owner must supply). No fake form-success. Form validates client-side and
  clearly states it opens the visitor's email app.

## Honesty rules (entire repo)
- No fake testimonials, counts, badges, reviews, scarcity timers, discount lies.
- Prices only from `products.ts`. Structured data only with real facts.
- Legal pages: plain-language drafts; `[MERCHANT CONFIG]` markers anywhere a
  real company name, address, email, jurisdiction or tax ID is required.
- Every limitation goes in docs + PRELAUNCH-CHECKLIST + README "Known limitations".

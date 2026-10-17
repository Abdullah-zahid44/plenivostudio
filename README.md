# Plenivostudio

Plenivostudio is a one-person digital products business selling a one-time-purchase,
offline HTML life planner. This monorepo contains the marketing site, the
planner product, packaging, docs, and tests.

**Brand note:** "Plenivostudio" is a temporary, editable brand name until confirmed
by the owner.

## Repository map

```
plenivostudio/
├── README.md                  # this file
├── ARCHITECTURE.md            # architecture, design tokens, honesty rules
├── site/                      # Astro 4+ marketing site → Cloudflare Pages
│   ├── src/config/            # site.ts, products.ts, checkout.ts (all CONFIG)
│   ├── src/pages/             # home, products, demo, about, contact, faq,
│   │                          # privacy, terms, refund-policy, license, 404
│   └── public/screenshots/    # real planner screenshots (generated, not mockups)
├── planner/
│   ├── ultimate-life-planner.html   # THE PRODUCT — single self-contained file
│   ├── demo.html                    # demo build (isolated sample data)
│   ├── packaging/                   # README, QUICKSTART, LICENSE, CHANGELOG,
│   │                                # BROWSER-SUPPORT (shipped inside the ZIP)
│   └── dist/                        # distributable ZIP
├── docs/
│   ├── DEPLOYMENT-cloudflare.md
│   ├── LEMON-SQUEEZY-SETUP.md
│   ├── PRELAUNCH-CHECKLIST.md
│   └── MERCHANT-CONFIG-CHECKLIST.md
└── tests/
    └── planner-smoke.mjs       # Playwright smoke tests (node)
```

## Build the site

```bash
cd site
npm install
npm run build     # static output in site/dist/
```

Deploy: see `docs/DEPLOYMENT-cloudflare.md` (Cloudflare Pages, root `site`,
build command `npm run build`, output `dist`, env var `SITE_URL`).

## QA the planner

```bash
cd tests
npm install        # installs playwright-core (uses system Firefox)
node planner-smoke.mjs ../planner/ultimate-life-planner.html
```

The script prints PASS/FAIL per check and exits nonzero on failure. It asserts:
zero page/console errors, all 14 views render, task add + complete, habit add +
day-toggle, backup export downloads valid JSON, import restores it, and zero
external network requests.

## Project status (honest)

| Area | Status |
|---|---|
| Planner v1.0.0 (`ultimate-life-planner.html`) | Built; smoke-tested (see Known limitations) |
| Marketing site (Astro) | In build |
| Screenshots (from running planner) | In build |
| Demo page | In build |
| Legal pages (Privacy, Terms, Refund, License) | Drafts; `[MERCHANT CONFIG]` items open |
| Lemon Squeezy checkout | **Not connected** — buttons show honest disabled state |
| Contact email | **Not configured** — `[MERCHANT CONFIG]` |
| Cloudflare Pages deployment | Not yet deployed |

## Known limitations (v1.0.0)

1. **Lemon Squeezy is not connected.** Purchasing is disabled by design until
   merchant approval and checkout URLs are configured
   (`site/src/config/checkout.ts`). See `docs/LEMON-SQUEEZY-SETUP.md`.
2. **Contact email unconfigured.** The contact page uses a `[MERCHANT CONFIG]`
   placeholder until the owner supplies a real monitored address.
3. **Safari (desktop), iOS Safari, and Android Chrome are not tested on real
   devices.** Expected to work (standard web APIs only) but unverified; the
   smoke test covers Firefox and Chromium on desktop. See
   `planner/packaging/BROWSER-SUPPORT.md`.
4. **The planner makes zero external requests.** Google Fonts CDN links were
   removed during QA; the planner uses system font stacks (Georgia / system
   sans) so it works fully offline. Verified by `tests/planner-smoke.mjs`.
5. **Habit day-toggle works.** Each of the 7 day-dots is clickable and the
   streak recalculates from consecutive completions; weekly count (x/7) shown.
6. **Storage is IndexedDB-first** (database `plenivostudio-ulp`, object store `kv`),
   with automatic fallback to localStorage and then in-memory storage (with an
   on-screen warning to export a backup if only memory is available). Data
   persists per browser profile; regular JSON backups are recommended
   (Backup / Restore → Export). `file://` caveats are documented in
   `planner/packaging/BROWSER-SUPPORT.md`.
7. **Single product.** The catalog contains one product: Ultimate Offline
   Life Planner, $29 one-time (from `site/src/config/products.ts`).
8. **No backend.** The site is fully static; there is no server, database,
   user accounts, or cloud sync — by design.

## Contributing / workflow

1. Read `ARCHITECTURE.md` (honesty rules are mandatory).
2. Make changes; never add fake testimonials, metrics, badges, or placeholder
   legal text.
3. Run the site build and the planner smoke test.
4. Complete `docs/PRELAUNCH-CHECKLIST.md` before any public launch.

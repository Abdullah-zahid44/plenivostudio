# Plenivostudio — Pre-Launch Verification Checklist

Complete every item before announcing the site publicly or accepting payments.
Check the box only when the item is genuinely done — not "will do later".

## Merchant configuration

- [ ] Every item in `docs/MERCHANT-CONFIG-CHECKLIST.md` is supplied by the owner
      (legal name, contact email, jurisdiction, refund window decision, support hours).
- [ ] No `[MERCHANT CONFIG]` markers remain in published pages. Verify:
      `grep -rn "MERCHANT CONFIG" site/src site/public`
- [ ] Contact email is the owner's real, monitored address
      (`site/src/config/site.ts` → `contactEmail`).

## Payments (Lemon Squeezy)

- [ ] Merchant account approved and store active (see `docs/LEMON-SQUEEZY-SETUP.md`).
- [ ] Product + $29 one-time variant created; price matches `site/src/config/products.ts`.
- [ ] Checkout URLs pasted into `site/src/config/checkout.ts` and `enabled: true`.
- [ ] ZIP uploaded to Lemon Squeezy digital delivery and attached to the variant.
- [ ] Full test-mode checklist passed (test purchase, download delivery, refund flow).
- [ ] One live purchase + refund completed after leaving test mode.

## Product files

- [ ] `planner/ultimate-life-planner.html` is the final release build.
- [ ] `planner/demo.html` exists, is clearly labeled as a demo, uses isolated
      sample data, and never touches a purchaser's real data.
- [ ] `planner/dist/plenivostudio-ultimate-life-planner-1.0.0.zip` exists and
      contains: the planner HTML, `packaging/README.md`, `packaging/QUICKSTART.md`,
      `packaging/LICENSE.txt`, `packaging/CHANGELOG.md`, `packaging/BROWSER-SUPPORT.md`.
- [ ] The ZIP uploaded to Lemon Squeezy is byte-identical to the local dist ZIP.
- [ ] Real screenshots (generated from the running planner) are present in
      `site/public/screenshots/` and used on Home, product detail, and demo pages.

## Site build & QA

- [ ] `cd site && npm install && npm run build` completes with no errors.
- [ ] All pages render: `/`, `/products`, `/products/ultimate-life-planner`,
      `/demo`, `/about`, `/contact`, `/faq`, `/privacy`, `/terms`,
      `/refund-policy`, `/license`, and the 404 page.
- [ ] Mobile menu, sticky header, and footer legal links work on desktop and
      mobile viewports.
- [ ] Contact form validates input and honestly opens the visitor's email app
      (no fake success message) until a verified endpoint is configured.
- [ ] Checkout button shows "Purchasing opens after store activation" while
      unconfigured; redirects to Lemon Squeezy once configured.
- [ ] `sitemap.xml` and `robots.txt` are served; canonical URLs use the
      production `SITE_URL`.
- [ ] No placeholder or lorem text remains. Verify:
      `grep -rni "lorem" site/src site/public`
      `grep -rn "TODO\|FIXME\|XXX" site/src planner docs tests --include="*.ts" --include="*.astro" --include="*.mjs" --include="*.md" | grep -v node_modules`

## Planner QA

- [ ] `node tests/planner-smoke.mjs ../planner/ultimate-life-planner.html`
      passes all checks (views, task CRUD, habits, backup export/import,
      no external network requests).
- [ ] Spot-checked on real devices/browsers per `planner/packaging/BROWSER-SUPPORT.md`;
      untested platforms are disclosed, not claimed.
- [ ] Onboarding tour, sample-data opt-in, help panel, and empty states verified manually.
- [ ] Backup export → delete data → import restores correctly (manual check).

## Legal pages

- [ ] Privacy, Terms, Refund Policy, and License drafts reviewed and approved
      by the owner; `[MERCHANT CONFIG]` items resolved.
- [ ] Refund policy is consistent with Lemon Squeezy's actual refund handling.
- [ ] No fake testimonials, reviews, customer counts, trust badges, scarcity
      timers, or discount claims anywhere. Verify:
      `grep -rni "testimonial\|5-star\|rated 4\.\|customers\|trusted by\|limited time\|only .* left\|sale ends" site/src | grep -vi "faq"`

## Sign-off

- [ ] Owner has read `docs/MERCHANT-CONFIG-CHECKLIST.md` and the Known
      limitations in `README.md`, and accepts them.
- [ ] Launch date recorded: _______________

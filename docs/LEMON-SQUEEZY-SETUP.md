# Lemon Squeezy Setup — Plenivostudio

Plenivostudio uses Lemon Squeezy as the Merchant of Record (MoR): they handle
payment processing, VAT/sales-tax collection and remittance, invoicing, and
secure digital file delivery. This document covers merchant approval, product
setup, wiring the checkout into the site, and testing.

> Until the steps below are complete, the site's checkout buttons intentionally
> display "Purchasing opens after store activation" and do not accept payment.
> Never present purchasing as available before it is.

## Part 1 — Merchant approval

1. Create an account at [lemonsqueezy.com](https://www.lemonsqueezy.com).
2. Complete the merchant onboarding: legal business or individual name,
   country of residence, payout (bank) details, and tax information.
3. Submit any identity/business verification documents Lemon Squeezy requests.
4. Wait for approval. **Do not sell or promise sales dates until the store is
   approved and active.** Approval timelines vary; there is no guaranteed
   eligibility.

## Part 2 — Create the store, product, and variant

1. In the Lemon Squeezy dashboard, create a store (e.g. "Plenivostudio").
2. Create a product: **Ultimate Offline Life Planner**.
3. Add a variant for the one-time purchase (price: **$29.00 USD**, one-time —
   this must match `site/src/config/products.ts`; never display a different
   price on the site).
4. Under the product's **Files** / digital delivery settings, upload the
   distributable ZIP:
   `planner/dist/plenivostudio-ultimate-life-planner-1.0.0.zip`
   and attach it to the variant so buyers receive a download link after
   purchase. Re-upload the ZIP here whenever you ship a new planner version.

## Part 3 — Wire the checkout URL into the site

1. In the Lemon Squeezy dashboard, open the variant and copy its **share /
   checkout URL**. It looks like:
   `https://<your-store>.lemonsqueezy.com/checkout/buy/<variant-id>`
2. Open `site/src/config/checkout.ts` and set:

```ts
export const checkout = {
  enabled: true,
  storeUrl: "https://<your-store>.lemonsqueezy.com",
  variants: {
    ultimateLifePlanner: "https://<your-store>.lemonsqueezy.com/checkout/buy/<variant-id>",
  },
};
```

3. Commit, push, and let Cloudflare Pages redeploy. The checkout buttons will
   now redirect buyers to Lemon Squeezy's secure hosted checkout.

### Rules

- **Hosted checkout redirect is the default and only supported flow.** Link
  the button to the checkout URL; do not attempt to embed or proxy checkout.
- **Never put API keys, signing secrets, or webhook secrets in frontend code.**
  They do not belong in this repository at all. If you later add license-key
  verification, it must run server-side (e.g. a Cloudflare Worker), never in
  the browser.
- The overlay checkout option is out of scope until it is verified working;
  use the redirect.

## Part 4 — Test-mode checklist

Lemon Squeezy provides a test mode. Complete every item before going live:

- [ ] Enable test mode and create a test checkout link for the variant.
- [ ] Complete a test purchase with a test card (e.g. `4242 4242 4242 4242`,
      any future expiry, any CVC).
- [ ] Confirm the buyer receives the download (email receipt and/or
      post-purchase download page) and that the ZIP opens correctly.
- [ ] Confirm the purchased ZIP matches the current release version.
- [ ] Process a test refund and confirm the refund receipt is issued.
- [ ] Disable test mode and repeat one live purchase with a real card for a
      small amount if possible, then refund it.
- [ ] Confirm the site's displayed price ($29) matches the Lemon Squeezy
      variant price exactly.

## Part 5 — Ongoing operations

- **New planner versions:** build the new ZIP, upload it to the Lemon Squeezy
  product files, update `CHANGELOG.md`, and update the site's version references.
- **Refunds:** handle through the Lemon Squeezy dashboard, consistent with the
  published refund policy (`/refund-policy`).
- **Tax:** as Merchant of Record, Lemon Squeezy calculates, collects, and
  remits VAT/sales tax. Keep your store's tax settings and business details
  current in their dashboard.
- **Customer email for delivery issues:** buyers contact the address on the
  site's Contact page; reply with the Lemon Squeezy order lookup as needed.

## What we explicitly do not do

- No fake payment processing or "demo checkout" that pretends to charge.
- No Stripe secret keys or any payment secrets in the frontend.
- No claims of Lemon Squeezy approval, partnership, or guaranteed eligibility.
- No price, discount, or offer on the site that differs from the configured
  Lemon Squeezy variant.

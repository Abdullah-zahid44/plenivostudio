# Merchant Configuration Checklist

The site and legal pages are built with `[MERCHANT CONFIG]` markers everywhere
a real-world fact is required. Nothing may go to production with these
unresolved. For each item: why it is needed, and where it goes.

## 1. Legal business or individual name

- **Why:** Required on the Terms, Privacy Policy, License, and Lemon Squeezy
  merchant onboarding. Operating under a false or invented company name is
  deceptive and can breach payment-provider terms.
- **Where it goes:** `site/src/config/site.ts` (`legalName`); Privacy, Terms,
  License pages; Lemon Squeezy store settings.
- **Note:** "Plenivostudio" is a temporary, editable brand name until confirmed.

## 2. Contact email (real, monitored)

- **Why:** The Contact page's mailto link, support replies, and buyer
  correspondence all use this. An unmonitored or fake address breaks support
  and refund handling.
- **Where it goes:** `site/src/config/site.ts` (`contactEmail`); Contact page;
  Lemon Squeezy store contact settings.

## 3. Physical address (if required)

- **Why:** Some jurisdictions and payment providers require a business address
  on legal pages or in checkout. Do not invent one.
- **Where it goes:** Terms / Privacy Policy footer block, only if legally
  required in your jurisdiction; otherwise omit entirely rather than
  fabricating.

## 4. Jurisdiction / governing law

- **Why:** The Terms must state which country's or state's law governs the
  agreement. This affects refund rights and dispute handling.
- **Where it goes:** Terms page ("Governing law" section). Example format:
  "These terms are governed by the laws of [MERCHANT CONFIG: jurisdiction]."

## 5. Tax / VAT handling

- **Why:** Buyers need to know whether displayed prices include tax.
- **Where it goes:** Product detail page and Terms ("Pricing and taxes"
  section).
- **Default position:** Lemon Squeezy acts as Merchant of Record and
  calculates, collects, and remits VAT/sales tax. Keep this wording only while
  it matches the actual contractual setup. The $29 price is entered in Lemon
  Squeezy; their checkout shows the final tax-inclusive or tax-exclusive total
  per buyer location.

## 6. Refund window decision

- **Why:** The published refund policy must state a concrete window (e.g.
  14 days) and the process. It must also respect applicable consumer law and
  Lemon Squeezy's actual refund mechanics — never promise what the provider
  cannot do.
- **Where it goes:** `/refund-policy` page; `docs/LEMON-SQUEEZY-SETUP.md`
  test checklist; Lemon Squeezy dashboard refund handling.

## 7. Support hours and response-time expectation

- **Why:** Sets honest expectations (e.g. "replies within 2 business days").
  Never claim 24/7 support unless it is true.
- **Where it goes:** Contact page and FAQ ("How do I get support?").

## 8. Lemon Squeezy store approval

- **Why:** Checkout must stay in its honest disabled state until the store is
  approved and the variant URL is configured. Selling without an active
  merchant account is not possible and must not be implied.
- **Where it goes:** `site/src/config/checkout.ts` (`enabled: true` only after
  approval); see `docs/LEMON-SQUEEZY-SETUP.md`.

## How to resolve

1. Fill in each item above with real information.
2. Search the repo for remaining markers: `grep -rn "MERCHANT CONFIG" site/src site/public docs`.
3. Re-run the build and the pre-launch checklist.
4. Keep a private copy of these details outside the repository; do not commit
   secrets (API keys, tax IDs) to git.

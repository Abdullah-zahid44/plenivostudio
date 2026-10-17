/**
 * Site-wide configuration.
 *
 * brandName is a temporary, editable brand. The owner must confirm the final
 * brand name before production release (see MERCHANT-CONFIG-CHECKLIST.md).
 *
 * contactEmail is intentionally EMPTY. The owner must supply a verified
 * contact email before launch. Never invent one here.
 *
 * No analytics are configured. If analytics are added later, the Privacy
 * Policy must be updated to describe them.
 */

export const site = {
  /** Temporary editable brand name — confirm before production release. */
  brandName: 'Plenivostudio',
  tagline: 'Offline digital planners you buy once and own.',
  description:
    'Beautifully designed offline digital planning tools. One-time purchase, no subscriptions. Your planning data stays on your device.',
  /** Canonical URL, overridable via the SITE_URL environment variable. */
  canonicalUrl:
    typeof process !== 'undefined' && process.env.SITE_URL
      ? process.env.SITE_URL
      : 'https://plenivostudio.pages.dev',
  /**
   * CONFIG ITEM — owner must supply a verified contact email before launch.
   * Until set, the contact page shows a "not configured" notice.
   */
  contactEmail: 'info.cosmicragsltd@gmail.com',
  /** No social accounts exist yet — owner may add verified URLs here. */
  socials: [] as { label: string; href: string }[],
  locale: 'en-US',
  /** CONFIG ITEM — legal entity details to be supplied by owner. */
  merchant: {
    companyName: '[MERCHANT CONFIG: legal company name]',
    address: '[MERCHANT CONFIG: registered address]',
    jurisdiction: '[MERCHANT CONFIG: jurisdiction / governing law]',
    taxId: '[MERCHANT CONFIG: tax identifier, if applicable]',
  },
};

export type SiteConfig = typeof site;

/**
 * Lemon Squeezy checkout configuration.
 *
 * STATUS: DISABLED. The store is not yet approved and no products/variants
 * exist in Lemon Squeezy. Do NOT enable until:
 *   1. The Lemon Squeezy store is approved,
 *   2. The product and variant are created in the Lemon Squeezy dashboard,
 *   3. The variant checkout URL below is pasted in, and
 *   4. The variant price matches products.ts (priceUSD).
 *
 * How it works when enabled:
 * - CheckoutButton redirects the buyer to the hosted Lemon Squeezy checkout
 *   URL (the reliable default). No overlay, no embedded JS.
 * - Never put secret API keys in the frontend. Only the public checkout URL
 *   belongs here.
 * - Digital delivery uses Lemon Squeezy's approved file-delivery feature
 *   (see docs/LEMON-SQUEEZY-SETUP.md).
 */

export interface CheckoutConfig {
  enabled: boolean;
  /** Public store URL, e.g. https://digitali.lemonsqueezy.com */
  storeUrl: string;
  /** Public hosted checkout URLs per product variant. */
  variants: {
    ultimateLifePlanner: string;
  };
}

export const checkout: CheckoutConfig = {
  enabled: false,
  storeUrl: '',
  variants: {
    ultimateLifePlanner: '',
  },
};

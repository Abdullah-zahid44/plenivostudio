/**
 * Payment-provider checkout configuration (provider-agnostic).
 *
 * The site deliberately never names a payment provider in customer-facing
 * copy, because multiple providers may be used over time. This config holds
 * the hosted checkout URLs of whichever provider is currently active.
 *
 * STATUS: DISABLED. No provider is configured yet. Do NOT enable until:
 *   1. The merchant account with the chosen provider is approved,
 *   2. The product and variant/price are created in the provider dashboard,
 *   3. The hosted checkout URL below is pasted in, and
 *   4. The variant price matches products.ts (priceUSD).
 *
 * How it works when enabled:
 * - CheckoutButton redirects the buyer to the hosted checkout URL
 *   (the reliable default). No overlay, no embedded JS.
 * - Never put secret API keys in the frontend. Only the public checkout URL
 *   belongs here.
 * - Digital delivery uses the provider's approved file-delivery feature
 *   (see docs/ for the provider setup guide).
 */

export interface CheckoutConfig {
  enabled: boolean;
  /** Public store URL of the active provider, e.g. https://example.provider.com */
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

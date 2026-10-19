/**
 * Tiny unique-id helper for components rendered multiple times on one page
 * (e.g. CheckoutButton's aria-describedby note). Module state persists for
 * the whole static build, so ids stay unique per page render.
 */
let seq = 0;

export function nextUniqueId(prefix: string): string {
  seq += 1;
  return `${prefix}-${seq}`;
}

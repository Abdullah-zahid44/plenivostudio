/**
 * Product categories.
 *
 * Add a new category here when a new planner line launches — product pages,
 * the catalog and filters pick up the label automatically. Never hard-code
 * a category label in a page or component; use categoryLabel().
 */

export interface Category {
  id: string;
  label: string;
  /** One-line description, used by catalog/filter UI. */
  description: string;
}

export const categories: Category[] = [
  {
    id: 'life-planning',
    label: 'Life Planning',
    description: 'All-in-one planners for tasks, habits, goals and daily life.',
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

/** Human-readable label for a category id. Falls back to the id itself. */
export function categoryLabel(id: string): string {
  return getCategory(id)?.label ?? id;
}

export const shoppingCategories = ["On-course", "Travel", "Weather", "Personal"] as const;
export type ShoppingCategory = (typeof shoppingCategories)[number];
export type ShoppingItem = { id: string; name: string; category: ShoppingCategory; completed: boolean; courseSlug?: string; tripSlug?: string };
export type ShoppingList = { version: 1; items: ShoppingItem[] };

export const emptyShoppingList = (): ShoppingList => ({ version: 1, items: [] });

export function parseShoppingList(raw: string | null): ShoppingList {
  if (!raw) return emptyShoppingList();
  try {
    const value = JSON.parse(raw) as Partial<ShoppingList>;
    if (value.version !== 1 || !Array.isArray(value.items)) return emptyShoppingList();
    const items = value.items.filter((item): item is ShoppingItem => Boolean(
      item && typeof item.id === "string" && typeof item.name === "string" && item.name.trim() &&
      shoppingCategories.includes(item.category as ShoppingCategory) && typeof item.completed === "boolean",
    )).map((item) => ({ ...item, name: item.name.trim().slice(0, 80) }));
    return { version: 1, items };
  } catch { return emptyShoppingList(); }
}

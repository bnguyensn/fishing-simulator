export interface Item {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const itemsDb: Record<string, Item> = {
  'fish-1': {
    id: 'fish-1',
    name: 'Fish',
    icon: '/items/fish.webp',
    description: 'A fish',
  },
};

export type ItemId = keyof typeof itemsDb;

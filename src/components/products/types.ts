export type SortOption = 'name' | 'price-asc' | 'price-desc';

export type Filters = {
  priceRange: [number, number]; // min, max
  inStock: boolean;
  sortBy: SortOption;
};

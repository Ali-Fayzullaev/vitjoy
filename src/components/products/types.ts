export type SortOption = 'name' | 'price-asc' | 'price-desc';

export type Filters = {
  priceRange: [number, number]; // min, max
  inStock: boolean;
  sortBy: SortOption;
};

export type DisplayOptions = {
  viewMode: 'grid' | 'list';
  columns: 1 | 2 | 3 | 4;           // ← было 2|3|4, добавили 1
  density: 'cozy' | 'compact';
  ratio: '1/1' | '4/3' | '3/4';
  imageFit: 'cover' | 'contain';
  showDescription: boolean;
};
export type SortOption = 'name' | 'price-asc' | 'price-desc';

export type Filters = {
  priceRange: [number, number]; // min, max
  inStock: boolean;
  sortBy: SortOption;
};

export type DisplayOptions = {
  viewMode: 'grid' | 'list';
  columns: 2 | 3 | 4;
  density: 'cozy' | 'compact';
  ratio: '1/1' | '4/3' | '3/4';
  imageFit: 'cover' | 'contain';
  showDescription: boolean;
};
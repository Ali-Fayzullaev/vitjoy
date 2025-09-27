// src/components/products/types.ts
export type SortOption = 'name' | 'date' // можно доп. 'popularity'
export type Filters = {
  inStock: boolean;
  sortBy: SortOption;
}

export type DisplayOptions = {
  viewMode: 'grid' | 'list';
  columns: 1 | 2 | 3 | 4;
  density: 'cozy' | 'compact';
  ratio: '1/1' | '4/3' | '3/4';
  imageFit: 'cover' | 'contain';
  showDescription: boolean;
}

// src/components/products/ProductGrid.tsx
'use client';

import type { Product } from '@/data/products';
import type { DisplayOptions } from './types';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[];
  display: DisplayOptions;
  onProductClick: (p: Product) => void;
};

export function ProductGrid({ products, display, onProductClick }: Props) {
  if (display.viewMode === 'list') {
    return (
      <div className="space-y-3">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            display={display}
            onProductClick={onProductClick}
          />
        ))}
      </div>
    );
  }

  // Строим классы адаптивно:
  // база: 1 колонка всегда
  // sm: ≥2 если выбрано 2+
  // md: ≥3 если выбрано 3+
  // lg: ≥4 если выбрано 4
  const gridCols = [
    'grid-cols-1',                                  // base (мобилка)
    display.columns >= 2 ? 'sm:grid-cols-2' : '',
    display.columns >= 3 ? 'md:grid-cols-3' : '',
    display.columns >= 4 ? 'lg:grid-cols-4' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`grid ${gridCols} gap-4 md:gap-6`}>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          display={display}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
}

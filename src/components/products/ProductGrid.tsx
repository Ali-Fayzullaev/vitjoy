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

  const cols =
    display.columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : display.columns === 3
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  return (
    <div className={`grid ${cols} gap-4 md:gap-6`}>
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

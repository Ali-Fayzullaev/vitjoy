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

  // Маппинг для Tailwind (чтобы классы попали в билд)
  const COLS: Record<1|2|3|4, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  // На очень узких экранах 1 колонка может быть удобнее.
  // Если хочешь разрешить 1 колонку — расширь тип DisplayOptions.columns и маппинг.
  const baseCols = display.columns in COLS ? (display.columns as 2|3|4) : 2;
  const gridColsClass = COLS[baseCols];

  return (
    <div className={`grid ${gridColsClass} gap-4 md:gap-6 sm:${COLS[Math.max(2, baseCols as number) as 2|3|4]}`}>
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

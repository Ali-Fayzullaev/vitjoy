// src/components/products/ProductGrid.tsx
"use client";

import type { Product } from "@/data/products";
import type { DisplayOptions } from "./types";
import { ProductCard } from "./ProductCard";

type Props = {
  products: Product[];
  display: DisplayOptions;
  onProductClick: (p: Product) => void;
};

export function ProductGrid({ products, display, onProductClick }: Props) {
  if (display.viewMode === "list") {
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
  const gridCols = [
    // Мобильные устройства: используем display.columns для base
    `grid-cols-${Math.min(display.columns, 2)}`, // Ограничение до 2 колонок
    display.columns >= 2 ? "sm:grid-cols-2" : "",
    display.columns >= 3 ? "md:grid-cols-3" : "",
    display.columns >= 4 ? "lg:grid-cols-4" : "",
  ]
    .filter(Boolean)
    .join(" ");

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

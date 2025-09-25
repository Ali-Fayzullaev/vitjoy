// src/app/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { ProductModal } from "@/components/products/ProductModal";
import { FiltersSidebar } from "@/components/products/FiltersSidebar";
import { Header } from "@/components/layout/Header";
import { products } from "@/data/products";
import type { Filters } from "@/components/products/types";
import type { Product } from "@/data/products";
import { ProductsToolbar } from "@/components/products/ProductsToolbar";
import { ProductGrid } from "@/components/products/ProductGrid";
import type { DisplayOptions } from "@/components/products/types"; // ← добавь тип

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 20000],
    inStock: false,
    sortBy: "name",
  });

  // NEW: состояние отображения карточек (grid/list, колонки и т.д.)
  const [display, setDisplay] = useState<DisplayOptions>({
    viewMode: "grid",
    columns: 3,
    density: "cozy",
    ratio: "1/1",
    imageFit: "cover",
    showDescription: false,
  });

  // опционально: восстановление display из localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("vitjoy-display");
      if (raw) setDisplay((prev) => ({ ...prev, ...JSON.parse(raw) }));
    } catch {}
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const [min, max] = filters.priceRange;
      const matchesPrice = product.price >= min && product.price <= max;

      const matchesStock = filters.inStock ? product.inStock === true : true;

      return matchesSearch && matchesPrice && matchesStock;
    });

    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return result;
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <ProductsToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        onFiltersOpen={() => setIsFiltersOpen(true)}
        // ↓↓↓ передаём весь блок настроек + setter
        display={display}
        onDisplayChange={setDisplay}
        total={filteredProducts.length}
      />

      <main className="flex-1 w-full px-2 py-6 md:p-8">
        {" "}
        {/* w-[100wv] → w-full */}
        {/* ... Hero + Features как было ... */}
        <section className="space-y-8">
          {/* Заголовок секции как было */}
          <ProductGrid
            products={filteredProducts}
            display={display}
            onProductClick={setSelectedProduct}
          />
        </section>
      </main>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <FiltersSidebar
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onFiltersChange={setFilters}
        currentFilters={filters}
        maxPrice={20000}
      />
    </div>
  );
}

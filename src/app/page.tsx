// src/app/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { ProductModal } from "@/components/products/ProductModal";
import { Header } from "@/components/layout/Header";
import { products } from "@/data/products";
import type { Filters } from "@/components/products/types";
import type { Product } from "@/data/products";
import { ProductsToolbar } from "@/components/products/ProductsToolbar";
import { ProductGrid } from "@/components/products/ProductGrid";
import type { DisplayOptions } from "@/components/products/types"; // ← добавь тип
import { PromoHero } from "@/components/home/PromoHero";
import { HighlightsStrip } from "@/components/home/HighlightsStrip";
import { WhySection } from "@/components/home/WhySection";
import { WhyFAQ } from "@/components/home/WhyFAQ";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // NEW: состояние отображения карточек (grid/list, колонки и т.д.)
  const [display, setDisplay] = useState<DisplayOptions>({
    viewMode: "grid",
    columns: 4, // временное начальное значение (будет скорректировано ниже)
    density: "cozy",
    ratio: "1/1",
    imageFit: "cover",
    showDescription: false,
  });

  const [filters, setFilters] = useState<Filters>({
    inStock: false,
    sortBy: "name",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Фильтрация по searchQuery (по имени продукта)
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Здесь можно добавить дополнительные фильтры, например, по наличию товара
      return matchesSearch;
    });
  }, [products, searchQuery]);

  // 1) пробуем восстановить из localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("vitjoy-display");
      if (raw) {
        setDisplay((prev) => ({ ...prev, ...JSON.parse(raw) }));
      } else {
        // 2) если сохранённого нет — ставим умный дефолт по медиазапросу
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        setDisplay((prev) => ({ ...prev, columns: isDesktop ? 4 : 1 }));
      }
    } catch {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      setDisplay((prev) => ({ ...prev, columns: isDesktop ? 4 : 1 }));
    }
  }, []);

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
        <div className="mb-6 md:mb-8">
          <PromoHero />
        </div>
        {/* --- новый блок 2: UСP три карточки --- */}
        <div className="mb-6 md:mb-8">
          <HighlightsStrip />
        </div>
        <section className="space-y-8">
          {/* Заголовок секции как было */}
          <ProductGrid
            products={filteredProducts}
            display={display}
            onProductClick={setSelectedProduct}
          />
        </section>
        {/* Почему VITJOY */}
        <WhySection />
        {/* FAQ (опционально) */}
        <WhyFAQ />
      </main>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

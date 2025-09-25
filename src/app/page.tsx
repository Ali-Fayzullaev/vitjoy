"use client";

import { useState, useMemo } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductModal } from "@/components/products/ProductModal";
import { FiltersSidebar } from "@/components/products/FiltersSidebar";
import { Header } from "@/components/layout/Header";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { Leaf, Zap, Shield, Heart, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Filters, SortOption } from "@/components/products/types";
import type { Product } from "@/data/products";

type ViewMode = "grid" | "list";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 20000],
    inStock: false,
    sortBy: "name",
  });

 const filteredProducts = useMemo(() => {
  let result = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const [min, max] = filters.priceRange;
    const matchesPrice = product.price >= min && product.price <= max;

    // inStock: если фильтр включён, показываем только продукты с inStock === true
    const matchesStock = filters.inStock ? product.inStock === true : true;

    return matchesSearch && matchesPrice && matchesStock;
  });

  result.sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return a.title.localeCompare(b.title);
    }
  });

  return result;
}, [searchQuery, filters]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onSearch={setSearchQuery}
        onFiltersOpen={() => setIsFiltersOpen(true)}
      />

      <main className="flex-1 container py-8">
        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm text-muted-foreground">
            Найдено {filteredProducts.length} продуктов
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className={
                viewMode === "grid"
                  ? "bg-[#60C20E] hover:bg-[#4ea30c]"
                  : undefined
              }
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <motion.section
          className="text-center space-y-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="relative">
              <Leaf className="h-20 w-20 text-[#60C20E] mb-4" />
              <div className="absolute inset-0 bg-[#60C20E] rounded-full opacity-20 animate-pulse scale-150" />
            </div>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Добро пожаловать в <span className="text-gradient">VITJOY</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Премиальные витамины и пищевые добавки для вашего здоровья и
            благополучия. Качество, которому можно доверять.
          </motion.p>
        </motion.section>

        {/* Features */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="text-center p-8 rounded-2xl bg-card border hover-lift"
          >
            <Zap className="h-16 w-16 text-[#60C20E] mx-auto mb-6 p-3 bg-[#60C20E]/10 rounded-2xl" />
            <h3 className="font-bold text-xl mb-4">Мгновенный эффект</h3>
            <p className="text-muted-foreground leading-relaxed">
              Инновационные формулы с быстрым и заметным результатом для вашего
              здоровья
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="text-center p-8 rounded-2xl bg-card border hover-lift"
          >
            <Shield className="h-16 w-16 text-[#60C20E] mx-auto mb-6 p-3 bg-[#60C20E]/10 rounded-2xl" />
            <h3 className="font-bold text-xl mb-4">Гарантия качества</h3>
            <p className="text-muted-foreground leading-relaxed">
              Вся продукция сертифицирована и проходит строгий контроль качества
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="text-center p-8 rounded-2xl bg-card border hover-lift"
          >
            <Heart className="h-16 w-16 text-[#60C20E] mx-auto mb-6 p-3 bg-[#60C20E]/10 rounded-2xl" />
            <h3 className="font-bold text-xl mb-4">Забота о здоровье</h3>
            <p className="text-muted-foreground leading-relaxed">
              Профессиональный подход к поддержанию вашего благополучия и
              здоровья
            </p>
          </motion.div>
        </motion.section>

        {/* Products */}
        <section className="space-y-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-4">Наша продукция</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Откройте для себя премиальную коллекцию витаминов и добавок,
              созданных для вашего здоровья и жизненной энергии
            </p>
          </motion.div>

          <ProductGrid
            products={filteredProducts}
            viewMode={viewMode}
            onProductClick={setSelectedProduct}
          />
        </section>
      </main>


      {/* Modals */}
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

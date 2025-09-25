'use client';

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { X, SlidersHorizontal, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { PriceFilter } from "../filters/PriceFilter";
import type { Filters } from "./types";

interface FiltersSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: Filters) => void;
  currentFilters: Filters;
  maxPrice?: number; // опционально
}

export function FiltersSidebar({
  isOpen,
  onClose,
  onFiltersChange,
  currentFilters,
  maxPrice = 20000,
}: FiltersSidebarProps) {
  const [filters, setFilters] = useState<Filters>(currentFilters);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  const handleFilterChange = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onFiltersChange(next);
  };

  const resetFilters = () => {
    const def: Filters = {
      priceRange: [0, maxPrice],
      inStock: false,
      sortBy: 'name',
    };
    setFilters(def);
    onFiltersChange(def);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:z-50"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-background border-l z-50 shadow-2xl overflow-y-auto"
          >
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="h-6 w-6 text-[#60C20E]" />
                  <h2 className="text-xl font-bold">Фильтры и сортировка</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-9 w-9">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Filters Content */}
              <div className="flex-1 space-y-8">
                {/* Sort By */}
                <div>
                  <Label className="text-sm font-semibold mb-4 block">
                    Сортировать по
                  </Label>
                  <div className="space-y-2">
                    {[
                      { value: "name", label: "Названию" },
                      { value: "price-asc", label: "Цене (по возрастанию)" },
                      { value: "price-desc", label: "Цене (по убыванию)" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="sortBy"
                          value={option.value}
                          checked={filters.sortBy === option.value}
                          onChange={(e) =>
                            handleFilterChange("sortBy", e.target.value as Filters['sortBy'])
                          }
                          className="h-4 w-4 text-[#60C20E] focus:ring-[#60C20E]"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <PriceFilter
                    maxPrice={maxPrice}
                    value={filters.priceRange}
                    onChange={(value) => handleFilterChange("priceRange", value as [number, number])}
                  />
                </div>

                {/* Stock Filter */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <Label className="text-sm font-semibold block">
                      Только в наличии
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      Показать доступные товары
                    </span>
                  </div>
                  <Switch
                    checked={filters.inStock}
                    onCheckedChange={(checked) =>
                      handleFilterChange("inStock", checked)
                    }
                    className="data-[state=checked]:bg-[#60C20E]"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-6 border-t">
                <Button onClick={resetFilters} variant="outline" className="w-full h-12 gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Сбросить фильтры
                </Button>
                <Button onClick={onClose} className="w-full h-12 bg-[#60C20E] hover:bg-[#4ea30c] text-base font-semibold">
                  Применить фильтры
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

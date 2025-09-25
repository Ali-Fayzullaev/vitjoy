"use client";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { X, SlidersHorizontal, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Filters {
  priceRange: number;
  inStock: boolean;
  sortBy: "name" | "price-asc" | "price-desc";
}

interface FiltersSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: Filters) => void;
  currentFilters: Filters;
}

export function FiltersSidebar({
  isOpen,
  onClose,
  onFiltersChange,
  currentFilters,
}: FiltersSidebarProps) {
  const [filters, setFilters] = useState<Filters>(currentFilters);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  const handleFilterChange = (key: keyof Filters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: Filters = {
      priceRange: 50000,
      inStock: false,
      sortBy: "name",
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-80 bg-background border-l z-50 shadow-2xl"
          >
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-[#60C20E]" />
                  <h2 className="text-xl font-bold">Фильтры и сортировка</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Filters Content */}
              <div className="flex-1 space-y-8 overflow-y-auto">
                {/* Sort By */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Сортировка
                  </Label>
                  <div className="space-y-2">
                    {[
                      { value: "name", label: "По названию" },
                      { value: "price-asc", label: "Цена по возрастанию" },
                      { value: "price-desc", label: "Цена по убыванию" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleFilterChange("sortBy", option.value)
                        }
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          filters.sortBy === option.value
                            ? "border-[#60C20E] bg-[#60C20E]/10 text-[#60C20E]"
                            : "border-border hover:border-[#60C20E]/50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Цена: до {filters.priceRange.toLocaleString("kz-KZ")} ₸
                  </Label>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="1000"
                    value={filters.priceRange}
                    onChange={(e) =>
                      handleFilterChange("priceRange", parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#60C20E]"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>0 ₸</span>
                    <span>50,000 ₸</span>
                  </div>
                </div>

                {/* Stock Filter */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <Label className="text-sm font-medium">
                    Только в наличии
                  </Label>
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
                <Button
                  className="w-full bg-[#60C20E] hover:bg-[#4ea30c] h-12 rounded-xl font-semibold"
                  onClick={resetFilters}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Сбросить фильтры
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl font-semibold"
                  onClick={onClose}
                >
                  Применить
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

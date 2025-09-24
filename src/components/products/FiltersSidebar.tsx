'use client';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface FiltersSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: any) => void;
}

export function FiltersSidebar({ isOpen, onClose, onFiltersChange }: FiltersSidebarProps) {
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    inStock: false,
    sortBy: 'name'
  });

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-80 bg-background border-l z-50 shadow-2xl"
          >
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-[#60C20E]" />
                  <h2 className="text-xl font-bold">Фильтры</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Filters Content */}
              <div className="flex-1 space-y-6 overflow-y-auto">
                {/* Sort By */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Сортировка</Label>
                  <select 
                    className="w-full p-2 border rounded-lg bg-background"
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  >
                    <option value="name">По названию</option>
                    <option value="price-asc">Цена по возрастанию</option>
                    <option value="price-desc">Цена по убыванию</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Цена: до {filters.priceRange[1].toLocaleString()} ₸
                  </Label>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>0 ₸</span>
                    <span>50,000 ₸</span>
                  </div>
                </div>

                {/* Stock Filter */}
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Только в наличии</Label>
                  <Switch
                    checked={filters.inStock}
                    onCheckedChange={(checked) => handleFilterChange('inStock', checked)}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-6 border-t">
                <Button 
                  className="w-full bg-[#60C20E] hover:bg-[#4ea30c]"
                  onClick={() => {
                    const resetFilters = {
                      priceRange: [0, 50000],
                      inStock: false,
                      sortBy: 'name'
                    };
                    setFilters(resetFilters);
                    onFiltersChange(resetFilters);
                  }}
                >
                  Сбросить фильтры
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
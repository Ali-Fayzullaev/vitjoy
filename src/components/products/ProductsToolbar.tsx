// src/components/products/ProductsToolbar.tsx
'use client';

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid3X3, List, Filter, Search } from "lucide-react";
import { DisplayControls } from "./DisplayControls";
import type { DisplayOptions } from "./types";

type ViewMode = "grid" | "list";

type ProductsToolbarProps = {
  searchValue: string;
  onSearchChange: (v: string) => void;
  onFiltersOpen: () => void;
  // ↓↓↓ добавили:
  display: DisplayOptions;
  onDisplayChange: (v: DisplayOptions) => void;
  total: number;
};

export function ProductsToolbar({
  searchValue,
  onSearchChange,
  onFiltersOpen,
  display,
  onDisplayChange,
  total,
}: ProductsToolbarProps) {
  const [q, setQ] = useState(searchValue);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // debounce → onSearchChange
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onSearchChange(q), 250);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [q, onSearchChange]);

  useEffect(() => setQ(searchValue), [searchValue]);

  // помощник: изменить только одно поле display
  const setDisplayField = <K extends keyof DisplayOptions>(key: K, v: DisplayOptions[K]) =>
    onDisplayChange({ ...display, [key]: v });

  return (
    <div className="sticky top-[calc(env(safe-area-inset-top)+56px)] z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-3 space-y-3">
        {/* Поиск */}
        <div className="relative w-full md:max-w-md lg:max-w-lg xl:max-w-2xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Найдите нужный продукт…"
            className="pl-10 h-11 rounded-xl w-full"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        {/* Кнопки/счётчик */}
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            Найдено: <span className="font-medium text-foreground">{total}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Красивый поповер с настройками вида */}
            <DisplayControls
              value={display}
              onChange={onDisplayChange}
              onFiltersOpen={onFiltersOpen}
            />

            {/* Быстрые кнопки Grid/List (optional, можно оставить) */}
            <div className="hidden sm:flex items-center gap-1">
              <Button
                variant={display.viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setDisplayField("viewMode", "grid")}
                className={display.viewMode === "grid" ? "bg-[#60C20E] hover:bg-[#4ea30c]" : ""}
                aria-label="Сетка"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={display.viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setDisplayField("viewMode", "list")}
                aria-label="Список"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={onFiltersOpen}
              className="rounded-xl"
            >
              <Filter className="mr-2 h-4 w-4" />
              Фильтры
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

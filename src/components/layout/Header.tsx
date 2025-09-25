'use client';

import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

type HeaderProps = {
  onSearch: (q: string) => void;
  onFiltersOpen: () => void;
};

export function Header({ onSearch, onFiltersOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="container flex h-14 items-center gap-3">
        {/* Лого */}
        <div className="font-extrabold tracking-wide text-emerald-600 dark:text-emerald-400">
          VITJOY
        </div>

        {/* Поиск */}
        <div className="ml-auto flex w-full max-w-lg items-center gap-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск продуктов…"
              className="pl-10"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          {/* Фильтры */}
          <Button variant="outline" onClick={onFiltersOpen} className="shrink-0">
            <Filter className="mr-2 h-4 w-4" />
            Фильтры
          </Button>
        </div>
      </div>
    </header>
  );
}

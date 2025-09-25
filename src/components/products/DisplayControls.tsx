// src/components/products/DisplayControls.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Grid3X3, List, SlidersHorizontal, Image as ImageIcon, AlignHorizontalSpaceBetween } from 'lucide-react';
import type { DisplayOptions } from './types';

type Props = {
  value: DisplayOptions;
  onChange: (v: DisplayOptions) => void;
  onFiltersOpen: () => void;
};

export function DisplayControls({ value, onChange, onFiltersOpen }: Props) {
  const [open, setOpen] = useState(false);

  // helper
  const set = <K extends keyof DisplayOptions>(key: K, v: DisplayOptions[K]) =>
    onChange({ ...value, [key]: v });

  // сохраняем выбор в localStorage (чтобы не сбрасывалось)
  useEffect(() => {
    try { localStorage.setItem('vitjoy-display', JSON.stringify(value)); } catch {}
  }, [value]);

  return (
    <div className="flex items-center gap-2">
      {/* Тогглы grid/list быстро */}
      <div className="hidden sm:flex items-center gap-1">
        <Button
          variant={value.viewMode === 'grid' ? 'default' : 'outline'}
          size="icon"
          onClick={() => set('viewMode', 'grid')}
          className={value.viewMode === 'grid' ? 'bg-[#60C20E] hover:bg-[#4ea30c]' : ''}
          aria-label="Сетка"
        >
          <Grid3X3 className="h-4 w-4" />
        </Button>
        <Button
          variant={value.viewMode === 'list' ? 'default' : 'outline'}
          size="icon"
          onClick={() => set('viewMode', 'list')}
          aria-label="Список"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>

      {/* Красивый Popover с детальными настройками */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="rounded-xl" aria-expanded={open}>
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Вид
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 rounded-2xl">
          <div className="space-y-4">
            {/* Вид */}
            <div>
              <Label className="text-xs uppercase text-muted-foreground">Режим</Label>
              <div className="mt-2 flex gap-2">
                <Button
                  variant={value.viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => set('viewMode', 'grid')}
                  className={value.viewMode === 'grid' ? 'bg-[#60C20E] hover:bg-[#4ea30c]' : ''}
                >
                  <Grid3X3 className="mr-2 h-4 w-4" /> Сетка
                </Button>
                <Button
                  variant={value.viewMode === 'list' ? 'default' : 'outline'}
                  onClick={() => set('viewMode', 'list')}
                >
                  <List className="mr-2 h-4 w-4" /> Список
                </Button>
              </div>
            </div>

            {/* Колонки (только для grid) */}
            {value.viewMode === 'grid' && (
              <div>
                <Label className="text-xs uppercase text-muted-foreground">Колонки</Label>
                <ToggleGroup type="single" value={String(value.columns)} className="mt-2">
                  {[2,3,4].map((c) => (
                    <ToggleGroupItem
                      key={c}
                      value={String(c)}
                      aria-label={`${c} колонки`}
                      className={`h-9 w-9 rounded-md ${value.columns === c ? 'bg-[#60C20E] text-white' : ''}`}
                      onClick={() => set('columns', c as 2|3|4)}
                    >
                      {c}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            )}

            {/* Плотность */}
            <div>
              <Label className="text-xs uppercase text-muted-foreground">Плотность</Label>
              <div className="mt-2 flex gap-2">
                <Button
                  variant={value.density === 'cozy' ? 'default' : 'outline'}
                  onClick={() => set('density', 'cozy')}
                >
                  Стандарт
                </Button>
                <Button
                  variant={value.density === 'compact' ? 'default' : 'outline'}
                  onClick={() => set('density', 'compact')}
                >
                  Компакт
                </Button>
              </div>
            </div>

            {/* Соотношение сторон + подрезка */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs uppercase text-muted-foreground">Соотношение</Label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(['1/1','4/3','3/4'] as const).map((r) => (
                    <Button
                      key={r}
                      variant={value.ratio === r ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => set('ratio', r)}
                      className="justify-center"
                    >
                      <AlignHorizontalSpaceBetween className="mr-2 h-4 w-4" /> {r}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-xs uppercase text-muted-foreground">Фото</Label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(['cover','contain'] as const).map((fit) => (
                    <Button
                      key={fit}
                      variant={value.imageFit === fit ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => set('imageFit', fit)}
                      className="justify-center"
                    >
                      <ImageIcon className="mr-2 h-4 w-4" /> {fit}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Показывать описание */}
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <div className="text-sm font-medium">Описание в карточке</div>
                <div className="text-xs text-muted-foreground">Краткий текст под названием</div>
              </div>
              <Switch checked={value.showDescription} onCheckedChange={(v) => set('showDescription', v)} />
            </div>

            {/* Кнопка к фильтрам */}
            <Button variant="outline" className="w-full" onClick={onFiltersOpen}>
              Открыть фильтры каталога
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Кнопка «Фильтры» как у тебя */}
      <Button variant="outline" onClick={onFiltersOpen} className="rounded-xl sm:hidden">
        Фильтры
      </Button>
    </div>
  );
}

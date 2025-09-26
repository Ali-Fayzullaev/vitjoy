// src/components/products/DisplayControls.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
// добавь импорт
import {
  X,
  Grid3X3,
  List,
  SlidersHorizontal,
  Image as ImageIcon,
  AlignHorizontalSpaceBetween,
} from "lucide-react";

import type { DisplayOptions } from "./types";

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

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("vitjoy-display", JSON.stringify(value));
    } catch {}
  }, [value]);

  // Медиа-запрос (JS) чтобы упростить логику показа мобильных колонок
  const isMobile = useMemo(
    () =>
      typeof window !== "undefined"
        ? window.matchMedia("(max-width: 640px)").matches
        : true,
    []
  );

  return (
    <div className="flex items-center gap-2">
      {/* Быстрые кнопки grid/list (desktop) */}
      <div className="hidden sm:flex items-center gap-1">
        <Button
          variant={value.viewMode === "grid" ? "default" : "outline"}
          size="icon"
          onClick={() => set("viewMode", "grid")}
          className={
            value.viewMode === "grid" ? "bg-[#60C20E] hover:bg-[#4ea30c]" : ""
          }
          aria-label="Сетка"
        >
          <Grid3X3 className="h-4 w-4" />
        </Button>
        <Button
          variant={value.viewMode === "list" ? "default" : "outline"}
          size="icon"
          onClick={() => set("viewMode", "list")}
          aria-label="Список"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>

      {/* Поповер с настройками вида */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="rounded-xl" aria-expanded={open}>
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Вид
          </Button>
        </PopoverTrigger>

        {/* На мобилке делаем контент шире и безопасный отступ */}
        <PopoverContent
          className="w-[min(92vw,24rem)] p-4 rounded-2xl"
          sideOffset={8}
          align="end"
        >
          <div className="space-y-5">
            {/* Режим */}
            <div className="space-y-5">
              {/* Режим */}
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase text-muted-foreground">
                    Режим
                  </Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Закрыть"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setOpen(false)} // <<< закрываем Popover
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-2 flex gap-2">
                  <Button
                    type="button"
                    variant={value.viewMode === "grid" ? "default" : "outline"}
                    onClick={() => set("viewMode", "grid")}
                    className={
                      value.viewMode === "grid"
                        ? "bg-[#60C20E] hover:bg-[#4ea30c]"
                        : ""
                    }
                  >
                    <Grid3X3 className="mr-2 h-4 w-4" /> Сетка
                  </Button>
                  <Button
                    type="button"
                    variant={value.viewMode === "list" ? "default" : "outline"}
                    onClick={() => set("viewMode", "list")}
                  >
                    <List className="mr-2 h-4 w-4" /> Список
                  </Button>
                </div>
              </div>

              {/* ...остальные секции (Колонки / Соотношение / Фото / Плотность / Переключатель описания) без изменений ... */}
            </div>

            {/* Колонки */}
            {value.viewMode === "grid" && (
              <div>
                <Label className="text-xs uppercase text-muted-foreground">
                  Колонки
                </Label>

                {/* Мобилка: 1/2 */}
                <div className="mt-2 sm:hidden">
                  <ToggleGroup
                    type="single"
                    value={String(Math.min(Math.max(value.columns, 1), 2))}
                    onValueChange={(val) => {
                      if (!val) return;
                      const n = Number(val) as 1 | 2;
                      set("columns", n as unknown as 2 | 3 | 4); // тип узкий — приведём
                    }}
                    className="grid grid-cols-2 gap-2"
                  >
                    {([1, 2] as const).map((c) => (
                      <ToggleGroupItem
                        key={c}
                        value={String(c)}
                        aria-label={`${c} колонка(и)`}
                        className="h-9 rounded-md data-[state=on]:bg-[#60C20E] data-[state=on]:text-white"
                      >
                        {c}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>

                {/* Десктоп: 2/3/4 */}
                <div className="mt-2 hidden sm:block">
                  <ToggleGroup
                    type="single"
                    value={String(value.columns)}
                    onValueChange={(val) => {
                      if (!val) return;
                      const n = Number(val) as 2 | 3 | 4;
                      set("columns", n);
                    }}
                    className="flex gap-2"
                  >
                    {([2, 3, 4] as const).map((c) => (
                      <ToggleGroupItem
                        key={c}
                        value={String(c)}
                        aria-label={`${c} колонки`}
                        className="h-9 w-9 rounded-md data-[state=on]:bg-[#60C20E] data-[state=on]:text-white"
                      >
                        {c}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </div>
            )}

            {/* Соотношение сторон */}
            <div>
              <Label className="text-xs uppercase text-muted-foreground">
                Соотношение
              </Label>
              <ToggleGroup
                type="single"
                value={value.ratio}
                onValueChange={(val) =>
                  val && set("ratio", val as DisplayOptions["ratio"])
                }
                className="mt-2 grid grid-cols-3 gap-2"
              >
                {(["1/1", "4/3", "3/4"] as const).map((r) => (
                  <ToggleGroupItem
                    key={r}
                    value={r}
                    className="h-9 rounded-md justify-center data-[state=on]:bg-[#60C20E] data-[state=on]:text-white"
                  >
                    <AlignHorizontalSpaceBetween className="mr-2 h-4 w-4" /> {r}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Подрезка фото */}
            <div>
              <Label className="text-xs uppercase text-muted-foreground">
                Фото
              </Label>
              <ToggleGroup
                type="single"
                value={value.imageFit}
                onValueChange={(val) =>
                  val && set("imageFit", val as DisplayOptions["imageFit"])
                }
                className="mt-2 grid grid-cols-2 gap-2"
              >
                {(["cover", "contain"] as const).map((fit) => (
                  <ToggleGroupItem
                    key={fit}
                    value={fit}
                    className="h-9 rounded-md justify-center data-[state=on]:bg-[#60C20E] data-[state=on]:text-white"
                  >
                    <ImageIcon className="mr-2 h-4 w-4" /> {fit}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Плотность */}
            <div>
              <Label className="text-xs uppercase text-muted-foreground">
                Плотность
              </Label>
              <ToggleGroup
                type="single"
                value={value.density}
                onValueChange={(val) =>
                  val && set("density", val as DisplayOptions["density"])
                }
                className="mt-2 flex gap-2"
              >
                <ToggleGroupItem
                  value="cozy"
                  className="h-9 rounded-md px-3 data-[state=on]:bg-[#60C20E] data-[state=on]:text-white"
                >
                  Стандарт
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="compact"
                  className="h-9 rounded-md px-3 data-[state=on]:bg-[#60C20E] data-[state=on]:text-white"
                >
                  Компакт
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Показывать описание */}
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <div className="text-sm font-medium">Описание в карточке</div>
                <div className="text-xs text-muted-foreground">
                  Краткий текст под названием
                </div>
              </div>
              <Switch
                checked={value.showDescription}
                onCheckedChange={(v) => set("showDescription", v)}
                className="data-[state=checked]:bg-[#60C20E]"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

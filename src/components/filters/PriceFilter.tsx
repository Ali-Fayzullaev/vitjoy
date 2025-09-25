'use client';

import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

interface PriceFilterProps {
  maxPrice: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function PriceFilter({ maxPrice, value, onChange }: PriceFilterProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('kk-KZ').format(price);

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">
        Цена, ₸
      </Label>
      <Slider
        value={value}
        onValueChange={(val) => onChange(val as [number, number])}
        min={0}
        max={maxPrice}
        step={100}
        className="w-full"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{formatPrice(value[0])} ₸</span>
        <span>{formatPrice(value[1])} ₸</span>
      </div>
    </div>
  );
}

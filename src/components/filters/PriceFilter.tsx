'use client';

import { useState } from 'react';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';

interface PriceFilterProps {
  maxPrice: number;
  value: number[];
  onChange: (value: number[]) => void;
}

export function PriceFilter({ maxPrice, value, onChange }: PriceFilterProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('kz-KZ').format(price);
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Цена, ₸</Label>
      <Slider
        value={value}
        onValueChange={onChange}
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
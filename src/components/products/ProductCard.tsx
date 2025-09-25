'use client';

import Image from 'next/image';
import type { Product } from '@/data/products';
import type { DisplayOptions } from './types';

export type ProductCardProps = {
  product: Product;
  display: DisplayOptions;              // ← вместо старого viewMode
  onProductClick: (p: Product) => void;
};

export function ProductCard({ product, display, onProductClick }: ProductCardProps) {
  const aspect =
    display.ratio === '1/1' ? 'aspect-square'
    : display.ratio === '4/3' ? 'aspect-[4/3]'
    : 'aspect-[3/4]';

  const padding = display.density === 'compact' ? 'p-3' : 'p-4';
  const titleCls = display.density === 'compact' ? 'text-sm' : 'text-base';
  const priceCls = display.density === 'compact' ? 'text-lg' : 'text-2xl';

  // GRID
  if (display.viewMode === 'grid') {
    return (
      <div
        className="group cursor-pointer overflow-hidden rounded-2xl border bg-card transition hover:shadow-lg"
        onClick={() => onProductClick(product)} id='catalog'
      >
        <div className={`relative ${aspect} bg-muted overflow-hidden`}>
          <Image
            src={product.images[0].src}
            alt={product.title}
            fill
            className={display.imageFit === 'cover'
              ? 'object-cover group-hover:scale-105 transition'
              : 'object-contain p-2'}
            sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
          />
        </div>
        <div className={`${padding} space-y-2`}>
          <h3 className={`${titleCls} font-semibold line-clamp-2 group-hover:text-[#60C20E]`}>
            {product.title}
          </h3>
          {display.showDescription && product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          )}
          <div className={`${priceCls} font-bold text-[#60C20E]`}>
            {new Intl.NumberFormat('kk-KZ').format(product.price)} {product.unit ?? '₸'}
          </div>
        </div>
      </div>
    );
  }

  // LIST
  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-2xl border bg-card transition hover:shadow-lg"
      onClick={() => onProductClick(product)} id='catalog'
    >
      <div className="flex gap-4 p-3">
        <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.images[0].src}
            alt={product.title}
            fill
            className={display.imageFit === 'cover' ? 'object-cover' : 'object-contain p-1'}
            sizes="96px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold leading-tight line-clamp-2 group-hover:text-[#60C20E]">
            {product.title}
          </h3>
          {display.showDescription && product.description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          )}
          <div className="mt-2 text-xl font-bold text-[#60C20E]">
            {new Intl.NumberFormat('kk-KZ').format(product.price)} {product.unit ?? '₸'}
          </div>
        </div>
      </div>
    </div>
  );
}

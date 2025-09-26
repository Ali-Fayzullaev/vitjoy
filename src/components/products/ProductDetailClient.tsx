// src/components/products/ProductDetailClient.tsx
'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import type { Product } from '@/data/products';

export function ProductDetailClient({ product }: { product: Product }) {
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState(false);
  const total = product.images?.length || 0;

  // ensure index safe when images length changes
  useEffect(() => {
    if (idx >= total) setIdx(Math.max(0, total - 1));
  }, [total, idx]);

  const next = () => {
    setIdx((s) => (s + 1) % Math.max(1, total));
    setZoom(false);
  };
  const prev = () => {
    setIdx((s) => (s - 1 + total) % Math.max(1, total));
    setZoom(false);
  };

  // helper to render specifications nicely
  const renderSpecs = (raw?: string) => {
    if (!raw) return null;
    // Split by newlines; try to parse "key:value" style lines
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    // if lines look like `Ключ:значение` -> table; else -> paragraphs
    const kv = lines.every((ln) => ln.includes(':') || ln.includes('—') || ln.includes('-'));
    if (kv) {
      return (
        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {lines.map((l, i) => {
            const parts = l.split(/[:—-]/).map((p) => p.trim()).filter(Boolean);
            if (parts.length >= 2) {
              return (
                <div key={i} className="flex gap-2">
                  <dt className="w-36 text-sm text-muted-foreground">{parts[0]}</dt>
                  <dd className="text-sm">{parts.slice(1).join(': ')}</dd>
                </div>
              );
            }
            return <div key={i} className="col-span-2 text-sm text-muted-foreground">{l}</div>;
          })}
        </dl>
      );
    }
    return lines.map((line, i) => (
      <p key={i} className="text-sm text-muted-foreground">{line}</p>
    ));
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* LEFT: Gallery */}
      <div className="space-y-4">
        <div className="relative rounded-2xl bg-muted overflow-hidden border">
          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-[3/4]">
            {total > 0 ? (
              <>
                <Image
                  src={product.images[idx].src}
                  alt={product.images[idx].alt ?? product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-contain transition-transform duration-300 ${zoom ? 'scale-150' : 'scale-100'}`}
                  priority={idx === 0}
                  style={{ objectPosition: 'center' }}
                />
                {/* Prev/Next */}
                {total > 1 && (
                  <>
                    <button
                      aria-label="previous image"
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/70 shadow-md backdrop-blur hover:bg-white dark:bg-neutral-900/60"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      aria-label="next image"
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/70 shadow-md backdrop-blur hover:bg-white dark:bg-neutral-900/60"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
                {/* counter */}
                <div className="absolute left-3 top-3 rounded-full bg-white/80 px-2 py-1 text-xs font-medium shadow backdrop-blur dark:bg-neutral-900/60">
                  {idx + 1} / {total}
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
                Нет изображений
              </div>
            )}
          </div>
        </div>

        {/* thumbnails */}
        {total > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((img, i) => (
              <button
                key={img.src + i}
                onClick={() => { setIdx(i); setZoom(false); }}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border ${i === idx ? 'ring-2 ring-emerald-400' : 'border-transparent'}`}
              >
                <Image src={img.src} alt={img.alt ?? `${product.title} ${i + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: Info */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">{product.title}</h1>
          <div className="mt-2 flex items-center gap-3">
            <div className="text-2xl font-bold text-emerald-600">
              {new Intl.NumberFormat('kk-KZ').format(product.price)} {product.unit ?? '₸'}
            </div>
            <div className={`rounded-full px-2 py-1 text-xs font-medium ${product.inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {product.inStock ? 'В наличии' : 'Нет в наличии'}
            </div>
          </div>

          {/* SHORT description (if exists) */}
          {product.description ? (
            <div className="mt-4 text-sm text-muted-foreground">
              {/* показываем первые 220 символов и кнопку «Показать подробнее» */}
              <DescriptionBlock text={product.description} />
            </div>
          ) : (
            <div className="mt-4 text-sm text-muted-foreground">Описание отсутствует.</div>
          )}

          {/* specifications */}
          {product.specifications && (
            <div className="mt-6">
              <h3 className="mb-2 text-sm font-semibold">Характеристики</h3>
              <div className="rounded-lg border p-3 bg-card/60">
                {renderSpecs(product.specifications)}
              </div>
            </div>
          )}
        </div>

        {/* Buy area sticky bottom on mobile */}
        <div className="mt-6">
          <div className="flex gap-3">
            <Button asChild className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500">
              <a href={product.kaspiUrl ?? '#'} target="_blank" rel="noreferrer noopener" onClick={(e) => {
                if (!product.kaspiUrl) e.preventDefault();
              }}>
                <span className="inline-flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" /> Купить на Kaspi
                </span>
              </a>
            </Button>
            <Button variant="outline" className="h-12 rounded-xl" onClick={() => { navigator.clipboard?.writeText(window.location.href); }}>
              Скопировать ссылку
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Откроется официальный магазин Kaspi</p>
        </div>
      </div>
    </div>
  );
}

/* маленький компонент для показа/скрытия длинного description */
function DescriptionBlock({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const truncated = text.length > 220 ? text.slice(0, 220) + '…' : text;
  return (
    <div>
      <div className="prose max-w-none text-sm dark:prose-invert">
        {open ? text.split('\n').map((p, i) => <p key={i}>{p}</p>) : <p>{truncated}</p>}
      </div>
      {text.length > 220 && (
        <button
          onClick={() => setOpen((s) => !s)}
          className="mt-2 text-sm font-medium text-emerald-600 hover:underline"
        >
          {open ? 'Показать меньше' : 'Показать подробнее'}
        </button>
      )}
    </div>
  );
}

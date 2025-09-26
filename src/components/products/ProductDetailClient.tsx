// src/components/products/ProductDetailClient.tsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/data/products';
import { ChevronLeft, ChevronRight, ExternalLink, Star, Shield, Truck, CheckCircle, LinkIcon } from 'lucide-react';

export function ProductDetailClient({ product }: { product: Product }) {
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const total = product.images?.length || 0;

  // ensure index safe when images length changes
  useEffect(() => {
    if (idx >= total) setIdx(Math.max(0, total - 1));
  }, [total, idx]);

  const next = () => {
    setIdx((s) => (s + 1) % Math.max(1, total));
    setZoom(false);
    setImageLoaded(false);
  };
  
  const prev = () => {
    setIdx((s) => (s - 1 + total) % Math.max(1, total));
    setZoom(false);
    setImageLoaded(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // helper to render specifications nicely
  const renderSpecs = (raw?: string) => {
    if (!raw) return null;
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const kv = lines.every((ln) => ln.includes(':') || ln.includes('—') || ln.includes('-'));
    
    if (kv) {
      return (
        <dl className="grid grid-cols-1 gap-3">
          {lines.map((l, i) => {
            const parts = l.split(/[:—-]/).map((p) => p.trim()).filter(Boolean);
            if (parts.length >= 2) {
              return (
                <div key={i} className="flex gap-3 py-2 border-b border-border/40 last:border-b-0">
                  <dt className="w-40 flex-shrink-0 text-sm font-medium text-foreground/80">{parts[0]}</dt>
                  <dd className="text-sm text-foreground/90">{parts.slice(1).join(': ')}</dd>
                </div>
              );
            }
            return (
              <div key={i} className="py-2">
                <div className="text-sm font-semibold text-foreground/90">{l}</div>
              </div>
            );
          })}
        </dl>
      );
    }
    return lines.map((line, i) => (
      <p key={i} className="text-sm text-foreground/80 py-1">{line}</p>
    ));
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-7xl mx-auto px-4">
      {/* LEFT: Gallery */}
      <div className="space-y-6">
        <div className="relative rounded-3xl bg-gradient-to-br from-muted/50 to-muted/20 overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative aspect-[4/3] md:aspect-[3/4]">
            {total > 0 ? (
              <>
                <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />
                <Image
                  src={product.images[idx].src}
                  alt={product.images[idx].alt ?? product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-contain transition-all duration-500 ${
                    zoom ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                  } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  priority={idx === 0}
                  style={{ objectPosition: 'center' }}
                  onLoad={() => setImageLoaded(true)}
                  onClick={() => setZoom(!zoom)}
                />
                
                {/* Navigation Arrows */}
                {total > 1 && (
                  <>
                    <button
                      aria-label="previous image"
                      onClick={prev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-2xl bg-white/80 shadow-lg backdrop-blur-md hover:bg-white hover:scale-110 transition-all duration-200 dark:bg-neutral-900/70"
                    >
                      <ChevronLeft className="h-6 w-6 mx-auto" />
                    </button>
                    <button
                      aria-label="next image"
                      onClick={next}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-2xl bg-white/80 shadow-lg backdrop-blur-md hover:bg-white hover:scale-110 transition-all duration-200 dark:bg-neutral-900/70"
                    >
                      <ChevronRight className="h-6 w-6 mx-auto" />
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                <div className="absolute left-4 top-4 rounded-2xl bg-white/80 backdrop-blur-md px-3 py-2 text-sm font-semibold shadow-lg dark:bg-neutral-900/70">
                  {idx + 1} / {total}
                </div>

                {/* Zoom Hint */}
                {!zoom && (
                  <div className="absolute right-4 top-4 rounded-2xl bg-white/80 backdrop-blur-md px-3 py-2 text-xs text-muted-foreground shadow-lg dark:bg-neutral-900/70">
                    🔍 Нажмите для увеличения
                  </div>
                )}
              </>
            ) : (
              <div className="flex h-full items-center justify-center p-8">
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 mx-auto mb-3 bg-muted rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">📷</span>
                  </div>
                  <p className="text-sm font-medium">Нет изображений</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnails */}
        {total > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <button
                key={img.src + i}
                onClick={() => { setIdx(i); setZoom(false); setImageLoaded(false); }}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  i === idx 
                    ? 'border-primary shadow-lg scale-105' 
                    : 'border-transparent hover:border-border'
                }`}
              >
                <Image 
                  src={img.src} 
                  alt={img.alt ?? `${product.title} ${i + 1}`} 
                  fill 
                  className="object-cover" 
                  sizes="80px" 
                />
                <div className={`absolute inset-0 bg-primary/20 transition-opacity ${
                  i === idx ? 'opacity-100' : 'opacity-0'
                }`} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: Info */}
      <div className="flex flex-col justify-between space-y-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {product.title}
              </h1>

            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                product.inStock 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                <CheckCircle className="h-4 w-4" />
                {product.inStock ? 'В наличии' : 'Нет в наличии'}
              </div>
              
              {/* Delivery Info */}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Truck className="h-4 w-4" />
                Доставка за 1-2 дня
              </div>
            </div>
          </div>

          {/* Description */}
          {product.description ? (
            <div className="bg-gradient-to-br from-card/50 to-card/30 rounded-2xl p-6 border border-border/50">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Описание продукта
              </h3>
              <DescriptionBlock text={product.description} />
            </div>
          ) : (
            <div className="rounded-2xl bg-muted/30 p-6 text-center">
              <p className="text-muted-foreground">Описание отсутствует</p>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && (
            <div className="bg-gradient-to-br from-card/50 to-card/30 rounded-2xl p-6 border border-border/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Характеристики
              </h3>
              <div className="rounded-xl bg-background/50 p-4 backdrop-blur-sm">
                {renderSpecs(product.specifications)}
              </div>
            </div>
          )}
        </div>

        {/* Buy Section */}
        <div className="sticky bottom-6 bg-background/80 backdrop-blur-lg rounded-2xl border border-border/50 p-6 shadow-lg">
          <div className="space-y-4">

            <div className="flex gap-3">
              <Button asChild className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <a href={product.kaspiUrl ?? '#'} target="_blank" rel="noreferrer noopener" onClick={(e) => {
                  if (!product.kaspiUrl) e.preventDefault();
                }}>
                  <span className="inline-flex items-center gap-2 text-lg font-semibold">
                    <ExternalLink className="h-5 w-5" /> Купить на Kaspi
                  </span>
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                className={`h-14 rounded-2xl border-2 transition-all duration-200 group relative overflow-hidden min-w-[140px] ${
                  copied 
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-600' 
                    : 'border-border/60 hover:border-primary/50 hover:bg-primary/5'
                }`}
                onClick={handleCopyLink}
                disabled={copied}
              >
                <span className={`inline-flex items-center gap-2 font-semibold transition-all duration-200 ${
                  copied ? 'scale-110' : 'group-hover:scale-105'
                }`}>
                  {copied ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Скопировано!
                    </>
                  ) : (
                    <>
                      <LinkIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                      <span className="hidden sm:inline">Копировать ссылку</span>
                      <span className="sm:hidden">Ссылка</span>
                    </>
                  )}
                </span>
                
                {/* Анимация при нажатии */}
                <span className="absolute inset-0 h-full w-full scale-0 rounded-2xl bg-emerald-100 opacity-0 transition-transform duration-300 group-active:scale-100 group-active:opacity-100" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>Безопасная оплата • Гарантия качества • Быстрая доставка</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Компонент для показа/скрытия длинного description */
function DescriptionBlock({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const truncated = text.length > 220 ? text.slice(0, 220) + '…' : text;
  
  return (
    <div className="space-y-3">
      <div className="prose prose-sm max-w-none text-foreground/80 leading-relaxed">
        {open ? (
          text.split('\n').map((p, i) => <p key={i} className="mb-3">{p}</p>)
        ) : (
          <p>{truncated}</p>
        )}
      </div>
      {text.length > 220 && (
        <button
          onClick={() => setOpen((s) => !s)}
          className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200 inline-flex items-center gap-1"
        >
          {open ? (
            <>
              <span>Свернуть</span>
              <ChevronLeft className="h-4 w-4 rotate-90" />
            </>
          ) : (
            <>
              <span>Показать подробнее</span>
              <ChevronLeft className="h-4 w-4 -rotate-90" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
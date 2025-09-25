'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../../data/products';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // свайпы (touch)
  const touchStartX = useRef<number | null>(null);

  // сбрасываем индекс/зум при смене товара или закрытии
  useEffect(() => {
    if (!isOpen) {
      setCurrentImageIndex(0);
      setIsZoomed(false);
    }
  }, [isOpen, product?.id]);

  // клавиатура
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (!product?.images?.length) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, product?.images?.length]);

  if (!product || !product.images?.length) return null;

  const total = product.images.length;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    setIsZoomed(false);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('kk-KZ').format(price); // KZ-фомат

  const onOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    // порог
    if (Math.abs(dx) > 30) {
      dx > 0 ? prevImage() : nextImage();
    }
    touchStartX.current = null;
  };

  const current = product.images[currentImageIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[92vh] overflow-hidden p-0 sm:rounded-3xl">
        {/* скрытый заголовок для доступности */}
        <DialogHeader className="sr-only">
          <DialogTitle>{product.title}</DialogTitle>
        </DialogHeader>

        <div className="grid h-full gap-0 md:grid-cols-2">
          {/* IMAGE AREA */}
          <div
            className="relative bg-gradient-to-br from-neutral-100 to-white dark:from-neutral-900 dark:to-neutral-950"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative aspect-square md:h-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`h-full w-full ${
                    isZoomed ? 'overflow-auto' : 'overflow-hidden'
                  }`}
                >
                  <Image
                    src={current.src}
                    alt={`${product.title} — изображение ${currentImageIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-contain md:object-contain cursor-${
                      isZoomed ? 'zoom-out' : 'zoom-in'
                    } transition-transform duration-300 ${
                      isZoomed ? 'scale-[1.5]' : 'scale-100'
                    }`}
                    onClick={() => setIsZoomed((z) => !z)}
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* NAV ARROWS */}
              {total > 1 && (
                <>
                  <Button
                    aria-label="Предыдущее изображение"
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/70 shadow-md backdrop-blur hover:bg-white dark:bg-neutral-900/60 dark:hover:bg-neutral-900"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    aria-label="Следующее изображение"
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/70 shadow-md backdrop-blur hover:bg-white dark:bg-neutral-900/60 dark:hover:bg-neutral-900"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}
              {/* COUNTER */}
              <div className="absolute top-2 left-2 rounded-full bg-white/80 px-2 py-1 text-xs font-medium shadow backdrop-blur dark:bg-neutral-900/60">
                {currentImageIndex + 1} / {total}
              </div>

              {/* DOTS (mobile) */}
              {total > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Показать изображение ${i + 1}`}
                      onClick={() => {
                        setCurrentImageIndex(i);
                        setIsZoomed(false);
                      }}
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        i === currentImageIndex
                          ? 'bg-emerald-500'
                          : 'bg-white/60 hover:bg-white dark:bg-neutral-800/60 dark:hover:bg-neutral-700'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* THUMBS (desktop) */}
            {total > 1 && (
              <div className="hidden md:flex gap-2 p-4 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={img.src + i}
                    aria-label={`Открыть изображение ${i + 1}`}
                    onClick={() => {
                      setCurrentImageIndex(i);
                      setIsZoomed(false);
                    }}
                    className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      i === currentImageIndex
                        ? 'border-emerald-500 shadow-md'
                        : 'border-transparent hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={`Миниатюра ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO PANEL */}
          <div className="flex h-full flex-col bg-white/70 backdrop-blur dark:bg-neutral-950/60">
           
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* title */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                  {product.title}
                </h2>
              </div>

              {/* price */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 dark:border-emerald-500/25 dark:bg-emerald-900/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
                  {formatPrice(product.price)} {product.unit || '₸'}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                  💰 В наличии • 🚚 Быстрая доставка
                </div>
              </div>
            </div>

            {/* buy button */}
            <div className="sticky bottom-0 border-t bg-white/80 p-3 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/70">
              <Button
                className="h-12 w-full rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-base font-semibold shadow-lg hover:from-emerald-500 hover:to-green-500"
                asChild
              >
                <a
                  href={product.kaspiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  Купить на Kaspi
                </a>
              </Button>
              <p className="mt-1 text-center text-[11px] text-neutral-500 dark:text-neutral-400">
                Откроется официальный магазин Kaspi
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

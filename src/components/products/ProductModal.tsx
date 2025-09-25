"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "../../data/products";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // touch swipe
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setCurrentImageIndex(0);
      setIsZoomed(false);
    }
  }, [isOpen, product?.id]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (!product?.images?.length) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
    new Intl.NumberFormat("kk-KZ").format(price);

  const onOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 30) dx > 0 ? prevImage() : nextImage();
    touchStartX.current = null;
  };

  const current = product.images[currentImageIndex];
  const hasDescription =
    typeof product.description === "string" &&
    product.description.trim().length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* ВАЖНО: делаем всю модалку прокручиваемой на мобилке */}
      <DialogContent className="max-w-5xl h-[92vh] overflow-y-auto p-0 sm:rounded-3xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.title}</DialogTitle>
        </DialogHeader>

        <div className="grid h-full gap-0 md:grid-cols-2">
          {/* IMAGE AREA */}
          <div
            className="
              relative
              bg-gradient-to-br from-neutral-100 to-white dark:from-neutral-900 dark:to-neutral-950
              md:sticky md:top-0 md:h-[92vh]  /* десктоп: фиксируем зону */
            "
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* мобилка: фиксированная высота, чтобы не прыгало при развороте описания */}
            <div className="relative h-[56vh] md:h-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`h-full w-full ${
                    isZoomed ? "overflow-auto" : "overflow-hidden"
                  }`}
                >
                  <Image
                    src={current.src}
                    alt={`${product.title} — изображение ${
                      currentImageIndex + 1
                    }`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    // object-contain без масштабирования при развороте описания
                    className={`object-contain cursor-${
                      isZoomed ? "zoom-out" : "zoom-in"
                    } transition-transform duration-300 ${
                      isZoomed ? "scale-[1.25]" : "scale-100"
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
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/70 shadow-md backdrop-blur hover:bg-white dark:bg-neutral-900/60 dark:hover:bg-neutral-900"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    aria-label="Следующее изображение"
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/70 shadow-md backdrop-blur hover:bg-white dark:bg-neutral-900/60 dark:hover:bg-neutral-900"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}

              {/* COUNTER */}
              <div className="absolute top-2 left-2 z-10 rounded-full bg-white/80 px-2 py-1 text-xs font-medium shadow backdrop-blur dark:bg-neutral-900/60">
                {currentImageIndex + 1} / {total}
              </div>

              {/* DOTS (mobile) */}
              {total > 1 && (
                <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 flex gap-1.5 md:hidden">
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
                          ? "bg-emerald-500"
                          : "bg-white/60 hover:bg-white dark:bg-neutral-800/60 dark:hover:bg-neutral-700"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* MOBILE PREV/NEXT BAR (на случай, если стрелки перекрываются) */}
              {total > 1 && (
                <div className="md:hidden absolute bottom-3 left-0 right-0 z-10 flex items-center justify-between px-3">
                  <Button
                    onClick={prevImage}
                    className="rounded-full bg-white/80 backdrop-blur text-neutral-900 shadow hover:bg-white dark:bg-neutral-900/70 dark:text-neutral-100"
                    size="sm"
                    aria-label="Предыдущее"
                  >
                    ‹ Пред
                  </Button>
                  <Button
                    onClick={nextImage}
                    className="rounded-full bg-white/80 backdrop-blur text-neutral-900 shadow hover:bg-white dark:bg-neutral-900/70 dark:text-neutral-100"
                    size="sm"
                    aria-label="Следующее"
                  >
                    След ›
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* INFO PANEL */}
          <div className="flex h-full flex-col bg-white/70 backdrop-blur dark:bg-neutral-950/60">
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 pb-20">
              {/* title */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                  {product.title}
                </h2>
              </div>

              {/* price */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 dark:border-emerald-500/25 dark:bg-emerald-900/10">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
                  {formatPrice(product.price)} {product.unit || "₸"}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                  💰 В наличии • 🚚 Быстрая доставка
                </div>
              </div>

              {/* DESCRIPTION (optional, collapsible) */}
              {hasDescription && (
                <DescriptionBlock text={product.description!} />
              )}
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

/** Аккуратный блок описания: компактный режим + раскрытие. */
function DescriptionBlock({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      <div
        className={`rounded-2xl border p-4 text-sm leading-relaxed text-neutral-800 dark:text-neutral-200 dark:border-neutral-800
          bg-neutral-100/60 dark:bg-neutral-900/60
          ${expanded ? "" : "max-h-40 overflow-hidden"}
        `}
        style={{ whiteSpace: "pre-line" }} // сохраняем переносы строк
      >
        {text}
      </div>

      {!expanded && (
        <div className="pointer-events-none absolute inset-x-0 bottom-12 h-16 bg-gradient-to-t from-neutral-100/90 to-transparent dark:from-neutral-900/90" />
      )}

      <div className="mt-2 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? (
            <>
              Свернуть <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Показать больше <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

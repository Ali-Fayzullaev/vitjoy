"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
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

  if (!product) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
    setIsZoomed(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
    setIsZoomed(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("kz-KZ").format(price);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.title}</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Button
            variant="secondary"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur"
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="grid md:grid-cols-2 gap-0 max-h-[95vh] overflow-hidden">
            {/* Image Gallery */}
            <div className="relative bg-gradient-to-br from-muted/50 to-background">
              <div className="relative aspect-square md:h-[80vh] rounded-r-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className={`relative w-full h-full cursor-${
                      isZoomed ? "zoom-out" : "zoom-in"
                    }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  >
                    <Image
                      src={product.images[currentImageIndex].src}
                      alt={product.images[currentImageIndex].alt}
                      fill
                      className={`object-contain transition-transform duration-300 ${
                        isZoomed ? "scale-150" : "scale-100"
                      }`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Zoom Button */}
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="absolute left-4 top-4 h-10 w-10 rounded-full bg-background/80 backdrop-blur"
                >
                  {isZoomed ? (
                    <ZoomOut className="h-5 w-5" />
                  ) : (
                    <ZoomIn className="h-5 w-5" />
                  )}
                </Button>

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}

                {/* Image Indicators */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setIsZoomed(false);
                        }}
                        className={`w-3 h-3 rounded-full transition-all ${
                          currentImageIndex === index
                            ? "bg-[#60C20E] scale-125"
                            : "bg-background/60 hover:bg-background/80"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setIsZoomed(false);
                        }}
                        className={`relative aspect-square w-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                          currentImageIndex === index
                            ? "border-[#60C20E] shadow-lg"
                            : "border-transparent hover:border-[#60C20E]/50"
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-10 overflow-y-auto max-h-[80vh]">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                    {product.title}
                  </h2>

                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#60C20E]/10 to-green-400/10 border border-[#60C20E]/20">
                    <div className="text-3xl font-bold text-[#60C20E] mb-2">
                      {formatPrice(product.price)} {product.unit}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      💫 В наличии • 🚚 Бесплатная доставка
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    📋 Описание изображения:
                  </h3>
                  <p className="text-foreground leading-relaxed text-lg bg-muted/30 p-4 rounded-xl">
                    {product.images[currentImageIndex].alt}
                  </p>
                </div>

                <Button
                  className="w-full h-14 bg-gradient-to-r from-[#60C20E] to-green-500 hover:from-[#4ea30c] hover:to-green-600 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  asChild
                >
                  <a
                    href={product.kaspiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <ExternalLink className="h-5 w-5" />
                    🛒 Купить в Kaspi
                  </a>
                </Button>

                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-muted/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#60C20E]">🚚</div>
                    <div className="text-sm font-medium">Быстрая доставка</div>
                    <div className="text-xs text-muted-foreground">1-3 дня</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#60C20E]">🔄</div>
                    <div className="text-sm font-medium">Легкий возврат</div>
                    <div className="text-xs text-muted-foreground">14 дней</div>
                  </div>
                </div>

                <div className="space-y-3 text-sm border-t pt-4">
                  <div className="flex justify-between py-2 border-b border-border/10">
                    <span className="text-muted-foreground">Артикул:</span>
                    <span className="font-medium">{product.id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/10">
                    <span className="text-muted-foreground">Категория:</span>
                    <span className="font-medium">Витамины и добавки</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Гарантия:</span>
                    <span className="font-medium text-[#60C20E]">
                      ✅ 12 месяцев
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

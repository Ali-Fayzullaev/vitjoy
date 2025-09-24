'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../../data/products';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('kz-KZ').format(price);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.title}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4"
          >
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 overflow-y-auto">
          {/* Image Gallery */}
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={product.images[currentImageIndex].src}
                    alt={product.images[currentImageIndex].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}

              {/* Image Indicators */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentImageIndex === index 
                          ? 'bg-[#60C20E]' 
                          : 'bg-background/60 hover:bg-background/80'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square w-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index 
                        ? 'border-[#60C20E]' 
                        : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                Описание изображения:
              </h3>
              <p className="text-foreground leading-relaxed">
                {product.images[currentImageIndex].alt}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/50">
              <div className="text-3xl font-bold text-[#60C20E] mb-2">
                {formatPrice(product.price)} {product.unit}
              </div>
              <div className="text-sm text-muted-foreground">
                В наличии • Бесплатная доставка
              </div>
            </div>

            <Button 
              className="w-full h-14 bg-gradient-primary hover:opacity-90 text-lg font-semibold rounded-2xl"
              asChild
            >
              <a 
                href={product.kaspiUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <ExternalLink className="h-5 w-5" />
                Купить в Kaspi
              </a>
            </Button>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Артикул:</span>
                <span className="font-medium">{product.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Доставка:</span>
                <span className="font-medium">1-3 дня</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
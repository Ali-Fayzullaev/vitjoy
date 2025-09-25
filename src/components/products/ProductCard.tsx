"use client";

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ExternalLink, ZoomIn } from "lucide-react";
import Image from "next/image";
import type { Product } from "../../data/products";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
  onProductClick: (product: Product) => void;
}

export function ProductCard({
  product,
  viewMode,
  onProductClick,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("kz-KZ").format(price);
  };

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-[#60C20E]/30 cursor-pointer"
          onClick={() => onProductClick(product)}
        >
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="relative aspect-square md:w-64 flex-shrink-0 overflow-hidden">
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  fill
                  className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  sizes="(max-width: 768px) 100vw, 256px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-3 top-3 h-10 w-10 rounded-full bg-background/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    onProductClick(product);
                  }}
                >
                  <ZoomIn className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 p-6">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#60C20E] transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 mb-4">
                      {product.images[0].alt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#60C20E]">
                      {formatPrice(product.price)} {product.unit}
                    </span>
                    <Button
                      className="bg-[#60C20E] hover:bg-[#4ea30c] transition-all"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a
                        href={product.kaspiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Купить
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="group overflow-hidden hover-lift cursor-pointer border-2 hover:border-[#60C20E]/20 transition-all duration-300"
        onClick={() => onProductClick(product)}
      >
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

            <Button
              variant="secondary"
              size="icon"
              className="absolute right-3 top-3 h-10 w-10 rounded-full bg-background/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                onProductClick(product);
              }}
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-4 space-y-3">
            <h3 className="font-semibold line-clamp-2 group-hover:text-[#60C20E] transition-colors leading-tight">
              {product.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.images[0].alt}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-[#60C20E]">
                {formatPrice(product.price)} {product.unit}
              </span>
              <Button
                size="sm"
                className="bg-[#60C20E] hover:bg-[#4ea30c] transition-all"
                asChild
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={product.kaspiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  Купить
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

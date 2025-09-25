"use client";

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ExternalLink, Eye } from "lucide-react";
import Image from "next/image";
import type { Product } from "../../data/products";

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
      <Card
        className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-in cursor-pointer"
        onClick={() => onProductClick(product)}
      >
        <CardContent className="p-0">
          <div className="flex items-center gap-4 p-4">
            <div className="relative flex-shrink-0">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={product.images[0].src}
                  alt={product.title}
                  fill
                  className={`object-cover transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  sizes="80px"
                />
              </div>
              {product.images.length > 1 && (
                <div className="absolute -top-1 -right-1 bg-[#60C20E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  +{product.images.length - 1}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate group-hover:text-[#60C20E] transition-colors">
                {product.title}
              </h3>
              <div className="text-2xl font-bold text-[#60C20E] mt-1">
                {formatPrice(product.price)} {product.unit}
              </div>
            </div>

            <Button
              size="sm"
              className="bg-[#60C20E] hover:bg-[#4ea30c] whitespace-nowrap"
              asChild
            >
              <a
                href={product.kaspiUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Купить
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid View
  return (
    <Card
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-in cursor-pointer hover-lift"
      onClick={() => onProductClick(product)}
    >
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative aspect-square bg-gradient-to-br from-muted/20 to-background overflow-hidden">
          <Image
            src={product.images[0].src}
            alt={product.title}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />

          {/* View Images Badge */}
          {product.images.length > 1 && (
            <div className="absolute top-2 right-2">
              <Button
                variant="secondary"
                size="sm"
                className="h-8 rounded-full bg-background/80 backdrop-blur text-xs font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  onProductClick(product);
                }}
              >
                <Eye className="h-3 w-3 mr-1" />
                {product.images.length} фото
              </Button>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-background/80 backdrop-blur"
              onClick={(e) => {
                e.stopPropagation();
                onProductClick(product);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              Посмотреть
            </Button>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold line-clamp-2 leading-tight group-hover:text-[#60C20E] transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-[#60C20E]">
              {formatPrice(product.price)} {product.unit}
            </span>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-[#60C20E] to-green-500 hover:from-[#4ea30c] hover:to-green-600 transition-all duration-300"
            asChild
          >
            <a
              href={product.kaspiUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Купить в Kaspi
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

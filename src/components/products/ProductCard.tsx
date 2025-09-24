"use client";

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ExternalLink, ZoomIn, Leaf } from "lucide-react";
import Image from "next/image";
import type { Product } from "../../data/products";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

interface ProductCardProps {
  product: Product;
  view?: "grid" | "list";
}

export function ProductCard({ product, view = "grid" }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("kz-KZ").format(price);
  };

  if (view === "list") {
    return (
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-in">
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-64 h-64">
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              className="object-cover"
              onLoad={() => setImageLoaded(true)}
              sizes="256px"
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <ProductModal product={product} />
            </Dialog>
          </div>

          <CardContent className="flex-1 p-6">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-[#60C20E] transition-colors">
              {product.title}
            </h3>
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {product.images[0].alt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#60C20E]">
                {formatPrice(product.price)} {product.unit}
              </span>
              <Button asChild className="bg-[#60C20E] hover:bg-[#4ea30c]">
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
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-in">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[currentImageIndex].src}
          alt={product.images[currentImageIndex].alt}
          fill
          className={`object-cover transition-all duration-500 ${
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
          } group-hover:scale-105`}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <ProductModal product={product} />
        </Dialog>

        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImageIndex === index
                    ? "bg-[#60C20E] scale-125"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-[#60C20E] transition-colors">
          {product.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.images[0].alt}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[#60C20E]">
            {formatPrice(product.price)} {product.unit}
          </span>

          <Button
            size="sm"
            className="bg-[#60C20E] hover:bg-[#4ea30c] transition-all duration-200 hover:scale-105"
            asChild
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
      </CardContent>
    </Card>
  );
}

function ProductModal({ product }: { product: Product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <DialogContent className="max-w-4xl">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={product.images[currentImageIndex].src}
              alt={product.images[currentImageIndex].alt}
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 transition-all ${
                    currentImageIndex === index
                      ? "ring-2 ring-[#60C20E]"
                      : "opacity-60 hover:opacity-100"
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
          )}
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="h-5 w-5 text-[#60C20E]" />
              <span className="text-sm font-medium text-[#60C20E]">VITJOY</span>
            </div>
            <h2 className="text-2xl font-bold">{product.title}</h2>
          </div>

          <div className="text-3xl font-bold text-[#60C20E]">
            {new Intl.NumberFormat("kz-KZ").format(product.price)}{" "}
            {product.unit}
          </div>

          <div className="prose prose-sm text-muted-foreground">
            <p>{product.images[currentImageIndex].alt}</p>
          </div>

          <Button
            size="lg"
            className="w-full bg-[#60C20E] hover:bg-[#4ea30c] text-lg py-3"
            asChild
          >
            <a
              href={product.kaspiUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Купить в Kaspi
            </a>
          </Button>

          <div className="text-sm text-muted-foreground">
            <p>🚀 Быстрая доставка</p>
            <p>✅ Гарантия качества</p>
            <p>💚 100% натуральный состав</p>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  
  if (!product) {
    return { title: "Товар не найден" };
  }
  
  return {
    title: product.title,
    description: product.description ? product.description.slice(0, 160) : `Купить ${product.title}`,
    openGraph: {
      title: product.title,
      description: product.description?.slice(0, 160) ?? undefined,
      images: product.images?.[0]?.src ? [{ url: product.images[0].src }] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product: Product | undefined = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <ProductDetailClient product={product} />
    </div>
  );
}

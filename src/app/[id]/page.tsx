// app/[id]/page.tsx (Server Component)
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import type { Metadata } from "next";

type Props = { params: { id: string } };

export async function generateStaticParams() {
  // pre-render всех страниц продуктов на билд-тайме (если хочется)
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find((p) => p.id === params.id);
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

export default function Page({ params }: Props) {
  const id = params.id;
  const product: Product | undefined = products.find((p) => p.id === id);

  if (!product) {
    // 404 страница
    notFound();
  }

  // серверная обёртка: отрисовка клиентского компонента, чтобы не портить SSG/SSR
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <ProductDetailClient product={product!} />
    </div>
  );
}

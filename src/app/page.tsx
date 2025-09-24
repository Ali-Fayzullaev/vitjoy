// app/page.tsx — стартовый лендинг для VITJOY (исправлено: синтаксическая ошибка, вынос products, предпросмотр img1/img2)
// Стек: Next.js (App Router), Tailwind CSS v4, shadcn/ui, lucide-react, framer-motion
// Безопасности и удобства:
// - SafeImage (не падает при пустом src)
// - Проверки данных в dev (runDevAsserts)
// - Галерея на Dialog, лента превью
// - Временный QuickCheck: показывает /images/img1 и /images/img2 по схеме imgN.png или N.png
// - ВАЖНО: товары вынесены в src/data/products.ts

"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Leaf,
  Moon,
  SunMedium,
  ChevronRight,
  ExternalLink,
  Search,
  ImageOff,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { products, type Product } from "@/data/products";

// --------------------------
// ТЕМА (светлая/тёмная без next-themes)
// --------------------------
function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const doc = document.documentElement;
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("vitjoy-theme")
        : null;
    const prefersDark =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
        : false;
    const initial = stored ? stored === "dark" : prefersDark;
    doc.classList.toggle("dark", initial);
    setIsDark(initial);
  }, []);
  const toggle = () => {
    if (typeof document === "undefined") return;
    const doc = document.documentElement;
    const newVal = !doc.classList.contains("dark");
    doc.classList.toggle("dark", newVal);
    if (typeof window !== "undefined")
      localStorage.setItem("vitjoy-theme", newVal ? "dark" : "light");
  };
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "vitjoy-theme" && typeof document !== "undefined") {
        const doc = document.documentElement;
        doc.classList.toggle("dark", e.newValue === "dark");
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    }
  }, []);
  return { isDark, toggle };
}

// --------------------------
// УТИЛИТЫ ДЛЯ ИЗОБРАЖЕНИЙ
// --------------------------
const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const shimmer = (w: number, h: number) =>
  `data:image/svg+xml;base64,${toBase64(
    `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g"><stop stop-color="#eee" offset="20%"/><stop stop-color="#ddd" offset="50%"/><stop stop-color="#eee" offset="70%"/></linearGradient></defs><rect width="${w}" height="${h}" fill="#eee"/><rect id="r" width="${w}" height="${h}" fill="url(#g)"/></svg>`
  )}`;

type SafeImageProps = Omit<ComponentProps<typeof Image>, "src" | "alt"> & {
  src?: string | null;
  alt?: string | null;
};

function SafeImage({ src, alt, ...rest }: SafeImageProps) {
  if (!src || typeof src !== "string") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
        <ImageOff className="h-6 w-6" />
        <span className="sr-only">Нет изображения</span>
      </div>
    );
  }
  return <Image src={src} alt={alt ?? ""} {...rest} />;
}

// --------------------------
// КОМПОНЕНТЫ
// --------------------------
function ThemeToggle() {
  const { toggle } = useDarkMode();
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggle}
      className="rounded-2xl"
    >
      <SunMedium className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Leaf className="h-6 w-6 text-emerald-500" />
      <span className="font-extrabold tracking-wide text-emerald-600 dark:text-emerald-400">
        VITJOY
      </span>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800 dark:supports-[backdrop-filter]:bg-neutral-900/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo />
        <div className="flex items-center gap-2">
          <SearchBar />
          <ThemeToggle />
          <Button asChild size="sm" className="rounded-2xl">
            <Link href="#catalog">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Каталог
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-transparent">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Витамины и нутрициология{" "}
            <span className="text-emerald-600">VITJOY</span>
          </motion.h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-300">
            Чистые составы, понятная польза и быстрые результаты. Выбирайте
            продукт — остальное мы упростили.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Button asChild className="rounded-2xl">
              <Link href="#catalog">
                Смотреть товары <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="rounded-2xl" asChild>
              <a href="#why">Почему VITJOY?</a>
            </Button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lg"
        >
          <SafeImage
            src="/logo.jpg"
            alt="Лайфстайл VITJOY"
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={shimmer(800, 600)}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </section>
  );
}

function SearchBar() {
  const [q, setQ] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof document === "undefined") return;
    const el = document.getElementById("catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <form onSubmit={onSubmit} className="relative hidden items-center md:flex">
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Поиск…"
        className="rounded-2xl pr-8"
      />
      <Search className="absolute right-2 h-4 w-4 text-neutral-500" />
    </form>
  );
}

function Catalog({ items }: { items: Product[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return items.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query, items]);
  return (
    <section id="catalog" className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Каталог</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Натуральные продукты для ежедневного здоровья
          </p>
        </div>
        <div className="w-64">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Фильтр по названию"
            className="rounded-2xl"
          />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            <ProductCard product={p} priority={idx < 2} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  priority,
}: {
  product: Product;
  priority?: boolean;
}) {
  const cover = product.images?.[0];
  return (
    <Card className="group overflow-hidden rounded-3xl border border-neutral-200/60 bg-white/70 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 transition hover:shadow-lg dark:border-neutral-800/60 dark:bg-neutral-900/50 dark:supports-[backdrop-filter]:bg-neutral-900/40">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <SafeImage
            src={cover?.src ?? null}
            alt={cover?.alt ?? "Изображение товара"}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            placeholder="blur"
            blurDataURL={shimmer(600, 450)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={Boolean(priority)}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-black/20" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-lg font-semibold tracking-tight">
            {product.title}
          </CardTitle>
          <div className="ml-auto flex items-center gap-1">
            {product.tags?.map((t) => (
              <Badge key={t} className="rounded-full">
                {t}
              </Badge>
            ))}
          </div>
        </div>
        <CardDescription className="line-clamp-2 text-neutral-600 dark:text-neutral-300">
          {product.description}
        </CardDescription>
        <ThumbsStrip images={product.images} />
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="text-xl font-bold tracking-tight">
          {product.price.toLocaleString("ru-RU")} {product.unit ?? "₸"}
        </div>
        <div className="flex items-center gap-2">
          <GalleryDialog product={product} />
          <KaspiButton href={product.kaspiUrl} />
        </div>
      </CardFooter>
    </Card>
  );
}

function ThumbsStrip({ images }: { images: Product["images"] }) {
  const thumbs = (images || []).slice(0, 6);
  if (thumbs.length <= 1) return null;
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {thumbs.map((img, i) => (
        <div
          key={img.src + i}
          className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-800/60"
        >
          <SafeImage
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={shimmer(160, 120)}
            sizes="80px"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

function KaspiButton({ href }: { href?: string }) {
  const valid = typeof href === "string" && href.startsWith("http");
  if (!valid) {
    return (
      <Button variant="outline" className="rounded-2xl" disabled>
        Ссылка Kaspi недоступна
      </Button>
    );
  }
  return (
    <Button asChild className="rounded-2xl">
      <a href={href} target="_blank" rel="noopener noreferrer">
        Купить на Kaspi <ExternalLink className="ml-1 h-4 w-4" />
      </a>
    </Button>
  );
}

function GalleryDialog({ product }: { product: Product }) {
  const imgs = (product.images || []).filter(
    (i) => i && typeof i.src === "string" && i.src.length > 0
  );
  const hasImages = imgs.length > 0;
  if (!hasImages) {
    return (
      <Button variant="outline" className="rounded-2xl" disabled>
        Нет фото
      </Button>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-2xl"
          aria-label="Фото товара"
        >
          Галерея
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl rounded-3xl p-0">
        <DialogHeader className="px-6 py-4">
          <DialogTitle className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-emerald-500" />
            {product.title}
          </DialogTitle>
        </DialogHeader>
        <div className="grid max-h-[75vh] grid-cols-1 gap-2 overflow-y-auto p-4 sm:grid-cols-2">
          {imgs.map((img, i) => (
            <div
              key={`${product.id}-${i}`}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <SafeImage
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={shimmer(600, 450)}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Why() {
  const items = [
    {
      title: "Чистые составы",
      text: "Без лишних наполнителей, только рабочие дозировки.",
    },
    {
      title: "Быстрая доставка",
      text: "Вся логистика через Kaspi — удобно и надёжно.",
    },
    {
      title: "Экологичный подход",
      text: "Акцент на перерабатываемые материалы и сокращение пластика.",
    },
  ];
  return (
    <section id="why" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-bold">Почему выбирают VITJOY</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-3xl border border-neutral-200 p-6 shadow-sm dark:border-neutral-800"
          >
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Leaf className="h-5 w-5 text-emerald-500" />
              {it.title}
            </h3>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">
              {it.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// -------------------------------------------------
// TEMP: Просмотр содержимого ваших папок без переименования
// -------------------------------------------------
async function tryLoad(src: string) {
  return new Promise<boolean>((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

function FolderViewer({
  dir,
  baseName,
  count = 8,
  exts = ["webp", "jpg", "jpeg", "png"],
}: {
  dir: string; // например '/images/img1'
  baseName: string; // например 'img'
  count?: number;
  exts?: string[];
}) {
  const [found, setFound] = useState<string[]>([]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const ok: string[] = [];
      for (let i = 1; i <= count; i++) {
        let added = false;
        for (const ext of exts) {
          const url = `${dir}/${baseName}${i}.${ext}`;
          // eslint-disable-next-line no-await-in-loop
          const exists = await tryLoad(url);
          if (exists) {
            ok.push(url);
            added = true;
            break;
          }
        }
        if (!added) {
          for (const ext of exts) {
            const url2 = `${dir}/${i}.${ext}`;
            // eslint-disable-next-line no-await-in-loop
            const exists2 = await tryLoad(url2);
            if (exists2) {
              ok.push(url2);
              break;
            }
          }
        }
      }
      if (mounted) setFound(ok);
    })();
    return () => {
      mounted = false;
    };
  }, [dir, baseName, count, exts]);

  if (found.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200 p-4 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        Не нашёл картинок по шаблону{" "}
        <code>{`${dir}/${baseName}N.{webp|jpg|jpeg|png}`}</code> или{" "}
        <code>{`${dir}/N.{ext}`}</code>.
      </div>
    );
  }

  return (
    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
      {found.map((src) => (
        <div
          key={src}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl"
        >
          <SafeImage
            src={src}
            alt={src.split("/").pop() ?? "image"}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={shimmer(600, 450)}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}

function QuickCheck() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="mb-4 text-xl font-semibold">
        Проверка ваших папок (временный блок)
      </h2>
      <p className="mb-3 text-sm text-neutral-500 dark:text-neutral-400">
        Этот блок ищет файлы по шаблонам <code>img1.png</code>… или{" "}
        <code>1.png</code> в указанной директории. Можно убрать после
        переименования.
      </p>
      <div className="space-y-6">
        <div>
          <h3 className="mb-2 font-medium">Папка img1</h3>
          <FolderViewer
            dir="/images/img1"
            baseName="img"
            count={10}
            exts={["png", "jpg", "jpeg", "webp"]}
          />
        </div>
        <div>
          <h3 className="mb-2 font-medium">Папка img2</h3>
          <FolderViewer
            dir="/images/img2"
            baseName="img"
            count={10}
            exts={["png", "jpg", "jpeg", "webp"]}
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-10 dark:border-neutral-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <Logo />
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          © {new Date().getFullYear()} VITJOY. Все права защищены.
        </p>
      </div>
    </footer>
  );
}

// --------------------------
// «ТЕСТЫ» (runtime asserts в dev)
// --------------------------
function runDevAsserts(list: Product[]) {
  if (process.env.NODE_ENV === "production") return;
  try {
    const hasIds = list.every((p) => Boolean(p.id && p.title && p.kaspiUrl));
    console.assert(
      hasIds,
      "[TEST] У каждого товара должны быть id/title/kaspiUrl"
    );

    const priceOk = list.every(
      (p) => typeof p.price === "number" && p.price >= 0
    );
    console.assert(priceOk, "[TEST] Цена должна быть числом ≥ 0");

    const imgShapeOk = list.every((p) => Array.isArray(p.images));
    console.assert(imgShapeOk, "[TEST] images должен быть массивом");

    const withCovers = list.filter((p) => p.images?.[0]?.src).length;
    console.log(`[TEST] Товаров с обложкой: ${withCovers}/${list.length}`);
  } catch (e) {
    console.warn("[TEST] Ошибка в проверках данных", e);
  }
}

// Включаем отладочный баннер Tailwind при NEXT_PUBLIC_DEBUG_TW=1
function DebugTW() {
  if (
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_DEBUG_TW !== "1"
  )
    return null;
  return (
    <div className="fixed bottom-3 right-3 z-[100] rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-lg">
      Tailwind is ACTIVE
    </div>
  );
}

export default function Page() {
  useEffect(() => runDevAsserts(products), []);
  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-50">
      {/* Декоративный фон */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-40 [mask-image:radial-gradient(600px_400px_at_70%_0%,black,transparent)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-20%,rgba(16,185,129,0.15),transparent)] dark:bg-[radial-gradient(1200px_600px_at_-10%_-20%,rgba(16,185,129,0.2),transparent)]" />
      </div>

      <Header />
      <Hero />
      <Catalog items={products} />
      <QuickCheck />
      <Why />
      <Footer />
      <DebugTW />
    </main>
  );
}

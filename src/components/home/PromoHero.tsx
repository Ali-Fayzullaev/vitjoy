'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function PromoHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-neutral-950 border-border">
      <div className="absolute inset-0">
        {/* необязательно: если /images/banners/hero.jpg нет — фон просто градиент */}
        <Image
          src="/logo.jpg"
          alt="VITJOY Hero"
          fill
          className="object-cover opacity-20 dark:opacity-15"
          sizes="100vw"
          priority
          onError={(e) => {
            // если нет картинки — скроем <img>, останется градиент
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-14 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            Новая коллекция — уже в наличии
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Премиальные витамины{' '}
            <span className="text-emerald-600 dark:text-emerald-400">VITJOY</span> для ежедневной энергии
          </h1>

          <p className="mt-3 text-muted-foreground">
            Чистые составы, честные дозировки и быстрая доставка через Kaspi. Заботьтесь о себе красиво и удобно.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button asChild className="rounded-xl">
              <a href="#catalog">Смотреть каталог</a>
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <a href="#why">Почему VITJOY?</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { ShieldCheck, Truck, Leaf } from 'lucide-react';

const items = [
  { icon: ShieldCheck, title: 'Гарантия качества', text: 'Сертификаты и строгий контроль' },
  { icon: Truck,       title: 'Быстрая доставка',  text: 'Kaspi. Удобно и надёжно' },
  { icon: Leaf,        title: 'Чистые формулы',    text: 'Без лишних добавок' },
];

export function HighlightsStrip() {
  return (
    <section className="grid gap-3 sm:grid-cols-3">
      {items.map(({ icon: Icon, title, text }) => (
        <div
          key={title}
          className="rounded-2xl border bg-card p-4 sm:p-5 hover:shadow-sm transition"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <div className="font-semibold leading-tight">{title}</div>
              <div className="text-xs text-muted-foreground">{text}</div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

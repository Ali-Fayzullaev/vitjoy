'use client';

import { ShieldCheck, Leaf, Truck, FlaskConical, HeartPulse, Sparkles } from 'lucide-react';

type Item = { icon: React.ElementType; title: string; text: string };

const items: Item[] = [
  { icon: ShieldCheck,  title: 'Сертифицировано',        text: 'Строгий контроль качества и прозрачный состав' },
  { icon: Leaf,         title: 'Чистые формулы',         text: 'Без лишних добавок, только рабочие дозировки' },
  { icon: Truck,        title: 'Быстрая доставка',       text: 'Удобно через Kaspi, по всему Казахстану' },
  { icon: FlaskConical, title: 'Эффективные дозы',       text: 'Оптимальные концентрации для результата' },
  { icon: HeartPulse,   title: 'Поддержка здоровья',     text: 'Ежедневная забота о вашем самочувствии' },
  { icon: Sparkles,     title: 'Честные цены',           text: 'Лучший баланс стоимости и качества' },
];

export function WhySection() {
  return (
    <section id="why" className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Почему выбирают VITJOY?</h2>
        <p className="mt-2 text-muted-foreground">
          Качество, которому можно доверять — от состава до доставки.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-2xl border bg-card/60 p-5 transition hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-semibold leading-tight">{title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* баннер-уверенность */}
      <div className="mt-8 rounded-2xl border bg-gradient-to-br from-emerald-50 to-white p-6 text-center dark:from-emerald-950/20 dark:to-neutral-950">
        <p className="text-sm text-muted-foreground">Более 10 000 довольных клиентов</p>
        <p className="mt-1 text-lg font-semibold">
          Попробуйте — почувствуйте разницу уже в первый месяц
        </p>
      </div>
    </section>
  );
}

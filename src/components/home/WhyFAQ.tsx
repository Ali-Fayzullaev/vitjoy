'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function WhyFAQ() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12">
      <h3 className="mb-4 text-center text-2xl font-bold">Частые вопросы</h3>
      <Accordion type="single" collapsible className="rounded-2xl border bg-card/60 p-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>Как быстро я получу заказ?</AccordionTrigger>
          <AccordionContent>
            Обычно доставка через Kaspi занимает 1–3 рабочих дня в зависимости от региона.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Подходят ли добавки веганам?</AccordionTrigger>
          <AccordionContent>
            Большая часть ассортимента — в растительных капсулах, без глютена и ГМО. Смотрите карточку товара.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Есть ли гарантия качества?</AccordionTrigger>
          <AccordionContent>
            Да. Вся продукция сертифицирована. При вопросах — мы поможем с обменом/возвратом.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

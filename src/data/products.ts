export type Product = {
  id: string
  title: string
  price: number
  unit?: string
  tags?: string[]
  description: string
  kaspiUrl: string
  images: { src: string; alt: string }[]
}

export const products: Product[] = [
  {
    id: 'green-boost',
    title: 'VITJOY Green Boost',
    price: 5990,
    unit: '₸',
    tags: ['Хит', 'Органик'],
    description: 'Натуральный микс витаминов и суперфудов для энергии и иммунитета.',
    kaspiUrl: 'https://kaspi.kz/shop/p/vitjoy-green-boost-123456/',
    images: [
      { src: '/images/img1/img1.png', alt: 'Green Boost — баночка' },
      { src: '/images/img1/img2.png', alt: 'Green Boost — баночка' },
      { src: '/images/img1/img3.png', alt: 'Green Boost — баночка' },
      { src: '/images/img1/img4.png', alt: 'Green Boost — баночка' },
      { src: '/images/img1/img5.png', alt: 'Green Boost — баночка' },
      { src: '/images/img1/img6.png', alt: 'Green Boost — баночка' },
    ],
  },
  {
    id: 'omega-plus',
    title: 'VITJOY Omega+ DHA/EPA',
    price: 7990,
    unit: '₸',
    tags: ['Новинка'],
    description: 'Омега‑3 высокой чистоты: сердце, мозг и суставы — ежедневно.',
    kaspiUrl: 'https://kaspi.kz/shop/p/vitjoy-omega-plus-654321/',
    images: [
      { src: '/images/img2/img1.png', alt: 'Omega+ — блистер' },
      { src: '/images/img2/img2.png', alt: 'Omega+ — капсулы крупно' },
      { src: '/images/img2/img3.png', alt: 'Omega+ — на столе' },
      { src: '/images/img2/img4.png', alt: 'Omega+ — с упаковкой' },
      { src: '/images/img2/img5.png', alt: 'Omega+ — инфографика' },
      { src: '/images/img2/img6.png', alt: 'Omega+ — семья и здоровье' },
    ],
  },
  {
    id: 'omega-plus2',
    title: 'VITJOY Omega+ DHA/EPA',
    price: 7990,
    unit: '₸',
    tags: ['Новинка'],
    description: 'Омега‑3 высокой чистоты: сердце, мозг и суставы — ежедневно.',
    kaspiUrl: 'https://kaspi.kz/shop/p/vitjoy-omega-plus-654321/',
    images: [
      { src: '/images/img3/img1.png', alt: 'Omega+ — блистер' },
      { src: '/images/img3/img2.png', alt: 'Omega+ — капсулы крупно' },
      { src: '/images/img3/img3.png', alt: 'Omega+ — на столе' },
      { src: '/images/img3/img4.png', alt: 'Omega+ — с упаковкой' },
      { src: '/images/img3/img5.png', alt: 'Omega+ — инфографика' },
      { src: '/images/img3/img6.png', alt: 'Omega+ — семья и здоровье' },
    ],
  },
]


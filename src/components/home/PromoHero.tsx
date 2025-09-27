import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Zap, Heart, Shield, Star } from "lucide-react";
import Link from "next/link";

export function PromoHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const benefits = [
    { icon: Shield, text: "100% натуральные", color: "emerald" },
    { icon: Heart, text: "Для вашего здоровья", color: "rose" },
    { icon: Zap, text: "Быстрая доставка", color: "amber" },
  ];

  return (
    <>
      <style jsx>{`
        .hero-glow {
          background: radial-gradient(
            circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(16, 185, 129, 0.15) 0%,
            transparent 50%
          );
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: -2s;
        }

        .animate-float-delayed-2 {
          animation: float 6s ease-in-out infinite;
          animation-delay: -4s;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scaleIn 0.7s ease-out forwards;
          opacity: 0;
          transform: scale(0.8);
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
          opacity: 0;
          transform: translateX(-30px);
        }

        .animate-pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounceGentle 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }

        .animate-gradient {
          animation: gradient 4s ease infinite;
          background-size: 200% 200%;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.6);
          }
        }

        @keyframes bounceGentle {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>

      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20">
        {/* Интерактивный фон с эффектом мыши */}
        <div className="hero-glow absolute inset-0 transition-all duration-300 pointer-events-none" />

        {/* Анимированный фон */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Основные градиенты */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 dark:from-emerald-400/10 dark:to-teal-400/10" />

          {/* Плавающие орбы */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-xl animate-float" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-rose-400/15 to-pink-400/15 rounded-full blur-xl animate-float-delayed" />
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-full blur-xl animate-float-delayed-2" />
          <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-violet-400/15 to-purple-400/15 rounded-full blur-xl animate-float" />

          {/* Геометрические элементы */}
          <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-emerald-500/40 rounded-full animate-bounce-gentle" />
          <div
            className="absolute top-1/2 left-1/5 w-1 h-1 bg-rose-500/40 rounded-full animate-bounce-gentle"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-1/3 right-1/5 w-3 h-3 bg-amber-500/40 rounded-full animate-bounce-gentle"
            style={{ animationDelay: "2s" }}
          />

          {/* Декоративная сетка */}
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(16, 185, 129, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16, 185, 129, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Левая колонка - Контент */}
            <div className="space-y-8">
              {/* Бейдж */}
              <div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-400/20 dark:to-teal-400/20 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-400/30 rounded-full px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <Sparkles className="w-4 h-4 animate-spin-slow" />
                Новая коллекция — уже в наличии
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              </div>

              {/* Заголовок */}
              <div className="space-y-4">
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight text-slate-900 dark:text-slate-100 animate-fade-in-up"
                  style={{ animationDelay: "0.3s" }}
                >
                  Премиальные
                  <br />
                  <span className="relative">
                    <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 dark:from-emerald-400 dark:via-teal-400 dark:to-emerald-500 bg-clip-text text-transparent animate-gradient">
                      витамины
                    </span>
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-lg -z-10 animate-pulse-glow" />
                  </span>
                  <br />
                  для вашей энергии
                </h1>

                <p
                  className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg animate-fade-in-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  Чистые составы, честные дозировки и быстрая доставка через
                  Kaspi.
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {" "}
                    Заботьтесь о себе красиво
                  </span>{" "}
                  и удобно.
                </p>
              </div>

              {/* Преимущества */}
              <div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={`group flex items-center gap-3 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:scale-105 transition-all duration-300 animate-scale-in`}
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${
                        benefit.color === "emerald"
                          ? "from-emerald-400 to-emerald-600"
                          : benefit.color === "rose"
                          ? "from-rose-400 to-rose-600"
                          : "from-amber-400 to-amber-600"
                      } rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <Link
                  href="#catalog"
                  className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-3">
                    Смотреть каталог
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>

                <Link
                  href="#why"
                  className="px-8 py-4 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm hover:scale-[1.02] hover:-translate-y-1"
                >
                  Почему VITJOY?
                </Link>
              </div>

              {/* Рейтинг и отзывы */}
              <div
                className="flex items-center gap-6 pt-4 animate-slide-in-left"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    4.9/5
                  </span>
                </div>

                <div className="h-4 w-px bg-slate-300 dark:bg-slate-600" />

                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full border-2 border-white dark:border-slate-900"
                      />
                    ))}
                  </div>
                  <span>1000+ довольных клиентов</span>
                </div>
              </div>
            </div>

            {/* Правая колонка - Визуальный элемент */}
            <div
              className="relative animate-scale-in"
              style={{ animationDelay: "0.6s" }}
            >
              {/* Главный визуальный элемент */}
              <div className="relative mx-auto max-w-md">
                {/* Фоновые эффекты */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-3xl blur-3xl animate-pulse-glow" />

                {/* Основная карточка продукта */}
                <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50 hover:scale-105 transition-all duration-500">
                  {/* Имитация баночки витаминов */}
                  <div className="relative mx-auto w-48 h-64 bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 rounded-3xl shadow-2xl overflow-hidden animate-float">
                    {/* Этикетка */}
                    <div className="absolute inset-4 bg-white/95 dark:bg-slate-100 rounded-2xl flex flex-col items-center justify-center text-center p-4 shadow-inner">
                      <div className="text-2xl font-black text-slate-900 mb-2">
                        VITJOY
                      </div>
                      <div className="text-xs text-slate-600 mb-3">
                        Premium Quality
                      </div>

                      {/* Логотип витамина */}
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                        <Sparkles className="w-8 h-8 text-white animate-spin-slow" />
                      </div>

                      <div className="text-xs font-semibold text-emerald-600">
                        Витамин D3 + K2
                      </div>
                      <div className="text-xs text-slate-500">60 капсул</div>
                    </div>

                    {/* Блик на баночке */}
                    <div className="absolute top-8 left-8 w-16 h-32 bg-white/30 rounded-full blur-sm transform -rotate-12" />
                  </div>

                  {/* Плавающие элементы вокруг */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full animate-bounce-gentle shadow-lg" />
                  <div
                    className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-bounce-gentle shadow-lg"
                    style={{ animationDelay: "1s" }}
                  />
                  <div
                    className="absolute top-1/2 -right-6 w-4 h-4 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full animate-bounce-gentle shadow-lg"
                    style={{ animationDelay: "2s" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

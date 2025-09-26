"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Инициализация состояния после монтирования
  useEffect(() => {
    setMounted(true);
  }, []);

  // Определяем текущую тему
  const isDark = (theme ?? resolvedTheme) === "dark";

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
      {/* safe-area top for iOS notches */}
      <div className="h-[env(safe-area-inset-top)]" />
      <div className="w-[100vw] px-4 sm:px-6">
        <div className="flex h-14 items-center gap-2 justify-between">
          {/* Лого */}
          <div className="font-extrabold tracking-wide text-emerald-600 dark:text-emerald-400">
            VITJOY
          </div>

          {/* Переключатель темы */}
          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label="Сменить тему"
            >
              {mounted ? (
                isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )
              ) : (
                <Sun className="h-5 w-5" /> // Показываем Sun до монтирования
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
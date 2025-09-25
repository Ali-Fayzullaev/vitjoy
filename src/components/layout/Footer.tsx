import { Leaf, Phone, MapPin, Building, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t py-8">
      <div className="w-[100wv] px-4 md:px-10 text-sm text-muted-foreground">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-[#60C20E]" />
              <span className="text-xl font-bold text-gradient">VITJOY</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Качественные витамины и пищевые добавки для вашего здоровья и
              благополучия
            </p>
          </div>

          {/* Contacts */}
          <div className="space-y-4">
            <h3 className="font-semibold">Контакты</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#60C20E]" />
                <div>
                  <div className="font-medium">Отдел заботы</div>
                  <div className="text-muted-foreground">8 (700) 603-30-03</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#60C20E]" />
                <div>
                  <div className="font-medium">Рабочий телефон</div>
                  <div className="text-muted-foreground">8 (700) 903-30-03</div>
                </div>
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold">Компания</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-[#60C20E]" />
                <div>
                  <div className="font-medium">Название</div>
                  <div className="text-muted-foreground">ИП GOOD PRICE</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-[#60C20E]" />
                <div>
                  <div className="font-medium">БИН (ИИН)</div>
                  <div className="text-muted-foreground">971014350978</div>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="font-semibold">Адрес</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#60C20E] mt-0.5" />
                <div className="text-muted-foreground">
                  Усть-Каменогорск Г.А., Усть-Каменогорск, ПРОСПЕКТ НУРСУЛТАНА
                  НАЗАРБАЕВА, дом 77, кв/офис 195
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 VITJOY. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

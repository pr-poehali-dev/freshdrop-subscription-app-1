import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Page = "catalog" | "subscriptions" | "cart" | "checkout" | "profile" | "calculator" | "about";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  type: "subscription" | "product";
  period?: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const subscriptions = [
  {
    id: "sub-1",
    name: "Старт",
    tag: "Для одного",
    volume: "19 л",
    frequency: "1 раз в 2 недели",
    price: 490,
    bottles: 2,
    features: ["Бутыль ПЭТ 19 л", "Бесплатная доставка", "СМС-уведомления"],
    color: "from-fresh-100 to-fresh-50",
    accent: "text-fresh-600",
    border: "border-fresh-200",
    popular: false,
  },
  {
    id: "sub-2",
    name: "Семейный",
    tag: "Хит продаж",
    volume: "19 л × 2",
    frequency: "2 раза в неделю",
    price: 890,
    bottles: 8,
    features: ["2 бутыли ПЭТ 19 л", "Приоритетная доставка", "Push-уведомления", "Скидка 10% на товары"],
    color: "from-sky-100 to-fresh-50",
    accent: "text-sky-600",
    border: "border-sky-200",
    popular: true,
  },
  {
    id: "sub-3",
    name: "Офис",
    tag: "Для команды",
    volume: "19 л × 5",
    frequency: "Ежедневно",
    price: 1990,
    bottles: 22,
    features: ["5 бутылей ПЭТ 19 л", "Утренняя доставка", "Персональный менеджер", "Скидка 15%"],
    color: "from-eco-100 to-fresh-50",
    accent: "text-eco-700",
    border: "border-eco-300",
    popular: false,
  },
];

const accessories = [
  { id: "acc-1", name: "Помпа электрическая", price: 1290, icon: "Zap", tag: "Топ", desc: "USB-зарядка, тихий мотор" },
  { id: "acc-2", name: "Помпа ручная", price: 390, icon: "Hand", tag: "", desc: "Компактная, без батареек" },
  { id: "acc-3", name: "Стакан стеклянный", price: 290, icon: "GlassWater", tag: "Эко", desc: "Боросиликатное стекло" },
  { id: "acc-4", name: "Фильтр-кувшин", price: 1490, icon: "Filter", tag: "", desc: "Ресурс 300 л" },
  { id: "acc-5", name: "Охладитель", price: 4990, icon: "Thermometer", tag: "Новинка", desc: "Охлаждение + нагрев" },
  { id: "acc-6", name: "Термокружка", price: 790, icon: "Coffee", tag: "Эко", desc: "500 мл, 12 часов тепла" },
];

const orderHistory = [
  { date: "24 февр", items: "19 л × 2, Помпа", amount: 2170 },
  { date: "10 февр", items: "19 л × 2", amount: 890 },
  { date: "27 янв", items: "19 л × 2, Стакан", amount: 1180 },
];

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "catalog", label: "Каталог", icon: "LayoutGrid" },
  { id: "subscriptions", label: "Подписки", icon: "RefreshCw" },
  { id: "cart", label: "Корзина", icon: "ShoppingCart" },
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "calculator", label: "Норма", icon: "Droplets" },
  { id: "about", label: "О нас", icon: "Info" },
];

// ─── CATALOG ──────────────────────────────────────────────────────────────────

function CatalogPage({ onAddToCart }: { onAddToCart: (item: CartItem) => void }) {
  const [activeTab, setActiveTab] = useState<"subscriptions" | "accessories">("subscriptions");

  return (
    <div className="flex flex-col min-h-full">
      <div className="hero-bg px-5 pt-12 pb-8 relative overflow-hidden">
        <div className="absolute top-4 right-5">
          <span className="text-xs font-medium text-fresh-600 bg-fresh-100 px-3 py-1 rounded-full">Доставка сегодня</span>
        </div>
        <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-fresh-200/30 blur-3xl pointer-events-none" />
        <p className="text-fresh-500 font-medium text-sm mb-1 animate-fade-in">Чистая вода</p>
        <h1 className="font-display text-4xl font-light leading-tight text-slate-800 animate-fade-in stagger-1">
          Свежесть<br /><span className="italic text-fresh-500">с доставкой</span>
        </h1>
        <p className="mt-3 text-ice-500 text-sm leading-relaxed animate-fade-in stagger-2">
          Экологичная вода прямо к вашей двери.<br />Без пластика, без хлопот.
        </p>
        <div className="flex gap-6 mt-6 animate-fade-in stagger-3">
          {[["12 000+", "клиентов"], ["4.9★", "рейтинг"], ["2 ч", "доставка"]].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-lg font-bold text-slate-800">{val}</div>
              <div className="text-xs text-ice-400">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-4 flex gap-2">
        {[{ id: "subscriptions" as const, label: "Подписки" }, { id: "accessories" as const, label: "Товары" }].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === tab.id ? "tab-active" : "bg-ice-100 text-ice-500"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="px-5 pb-6 flex flex-col gap-4">
        {activeTab === "subscriptions" ? (
          subscriptions.map((sub, i) => (
            <div
              key={sub.id}
              className={`relative rounded-2xl bg-gradient-to-br ${sub.color} border ${sub.border} p-5 card-hover animate-fade-in`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {sub.popular && (
                <div className="absolute -top-2.5 left-5">
                  <span className="bg-gradient-to-r from-fresh-500 to-eco-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {sub.tag}
                  </span>
                </div>
              )}
              <div className="flex items-start justify-between mb-3">
                <div>
                  {!sub.popular && <span className={`text-xs font-medium ${sub.accent} mb-1 block`}>{sub.tag}</span>}
                  <h3 className="text-xl font-semibold text-slate-800">{sub.name}</h3>
                  <p className="text-sm text-ice-500 mt-0.5">{sub.volume} · {sub.frequency}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${sub.accent}`}>{sub.price} ₽</div>
                  <div className="text-xs text-ice-400">за доставку</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {sub.features.map(f => (
                  <span key={f} className="text-xs bg-white/60 text-slate-600 px-2.5 py-1 rounded-lg">{f}</span>
                ))}
              </div>
              <button
                onClick={() => onAddToCart({ id: sub.id, name: sub.name, price: sub.price, qty: 1, type: "subscription", period: sub.frequency })}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all bg-white/70 hover:bg-white ${sub.accent} hover:shadow-md`}
              >
                Оформить подписку
              </button>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {accessories.map((acc, i) => (
              <div key={acc.id} className="bg-white rounded-2xl p-4 border border-ice-100 shadow-sm card-hover animate-fade-in" style={{ animationDelay: `${i * 0.06}s` }}>
                {acc.tag && <span className="text-xs font-medium text-eco-700 bg-eco-50 px-2 py-0.5 rounded-full mb-2 inline-block">{acc.tag}</span>}
                <div className="w-10 h-10 rounded-xl bg-fresh-50 flex items-center justify-center mb-3">
                  <Icon name={acc.icon} size={20} fallback="Package" className="text-fresh-500" />
                </div>
                <h4 className="text-sm font-semibold text-slate-800 leading-tight mb-1">{acc.name}</h4>
                <p className="text-xs text-ice-400 mb-3">{acc.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-fresh-600">{acc.price} ₽</span>
                  <button
                    onClick={() => onAddToCart({ id: acc.id, name: acc.name, price: acc.price, qty: 1, type: "product" })}
                    className="w-8 h-8 rounded-lg bg-fresh-500 text-white flex items-center justify-center hover:bg-fresh-600 transition-colors"
                  >
                    <Icon name="Plus" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SUBSCRIPTIONS ────────────────────────────────────────────────────────────

function SubscriptionsPage({ onAddToCart }: { onAddToCart: (item: CartItem) => void }) {
  const [selected, setSelected] = useState(subscriptions[1]);
  const [volume, setVolume] = useState("19");
  const [frequency, setFrequency] = useState("2");
  const [extra, setExtra] = useState<string[]>([]);

  const extras = [
    { id: "cooler", label: "Кулер в аренду", price: 299 },
    { id: "pump", label: "Электропомпа", price: 89 },
    { id: "eco", label: "Эко-бутыль", price: 49 },
  ];

  const toggleExtra = (e: string) =>
    setExtra(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e]);

  const totalPrice = selected.price + extra.reduce((s, e) => {
    const found = extras.find(x => x.id === e);
    return s + (found?.price ?? 0);
  }, 0);

  return (
    <div className="flex flex-col pb-8">
      <div className="hero-bg px-5 pt-12 pb-6">
        <p className="text-fresh-500 text-sm font-medium mb-1">Подписки</p>
        <h2 className="font-display text-3xl font-light text-slate-800">Выберите <span className="italic text-fresh-500">план</span></h2>
        <p className="text-ice-400 text-sm mt-2">Отмените или измените в любой момент</p>
      </div>

      <div className="px-5 mt-5 flex flex-col gap-3">
        {subscriptions.map(sub => (
          <button key={sub.id} onClick={() => setSelected(sub)}
            className={`text-left rounded-2xl border-2 p-4 transition-all duration-200 ${selected.id === sub.id ? "border-fresh-400 bg-fresh-50 shadow-md" : "border-ice-100 bg-white"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selected.id === sub.id ? "border-fresh-500 bg-fresh-500" : "border-ice-300"}`}>
                  {selected.id === sub.id && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{sub.name}</div>
                  <div className="text-xs text-ice-400">{sub.volume} · {sub.frequency}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-fresh-600">{sub.price} ₽</div>
                <div className="text-xs text-ice-400">/доставка</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="px-5 mt-6">
        <h3 className="font-semibold text-slate-800 mb-3">Настройте подписку</h3>

        <div className="bg-white rounded-2xl border border-ice-100 p-4 mb-3">
          <label className="text-sm text-ice-500 mb-2 block">Объём бутыли</label>
          <div className="flex gap-2">
            {["12", "19"].map(v => (
              <button key={v} onClick={() => setVolume(v)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${volume === v ? "bg-fresh-500 text-white" : "bg-ice-100 text-ice-500"}`}
              >{v} л</button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-ice-100 p-4 mb-3">
          <label className="text-sm text-ice-500 mb-2 block">Доставок в неделю</label>
          <div className="flex gap-2">
            {["1", "2", "3"].map(f => (
              <button key={f} onClick={() => setFrequency(f)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${frequency === f ? "bg-fresh-500 text-white" : "bg-ice-100 text-ice-500"}`}
              >{f}×</button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-ice-100 p-4 mb-5">
          <label className="text-sm text-ice-500 mb-2 block">Дополнения</label>
          <div className="flex flex-col gap-2">
            {extras.map(e => (
              <button key={e.id} onClick={() => toggleExtra(e.id)}
                className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-all ${extra.includes(e.id) ? "bg-fresh-50 border border-fresh-200" : "bg-ice-50 border border-transparent"}`}
              >
                <span className="text-sm text-slate-700">{e.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-fresh-600">+{e.price} ₽</span>
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${extra.includes(e.id) ? "bg-fresh-500 border-fresh-500" : "border-ice-300"}`}>
                    {extra.includes(e.id) && <Icon name="Check" size={12} className="text-white" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-fresh-500 to-sky-500 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm opacity-80">Итого за доставку</div>
              <div className="text-3xl font-bold">{totalPrice} ₽</div>
            </div>
            <div className="text-right opacity-80 text-sm">
              <div>~{Math.round(totalPrice * 4)} ₽</div>
              <div>в месяц</div>
            </div>
          </div>
          <button
            onClick={() => onAddToCart({ id: selected.id + "-custom", name: `${selected.name} (${volume}л, ${frequency}×/нед)`, price: totalPrice, qty: 1, type: "subscription" })}
            className="w-full bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl py-3 font-semibold transition-all"
          >
            Оформить подписку
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CART ─────────────────────────────────────────────────────────────────────

function CartPage({ cart, onUpdateQty, onRemove, onCheckout }: {
  cart: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-5 py-20">
        <div className="w-24 h-24 rounded-full bg-fresh-50 flex items-center justify-center mb-5 animate-float">
          <Icon name="ShoppingCart" size={40} className="text-fresh-300" />
        </div>
        <h3 className="font-display text-2xl font-light text-slate-700 mb-2">Корзина пуста</h3>
        <p className="text-ice-400 text-sm text-center">Добавьте подписку или товары из каталога</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      <div className="hero-bg px-5 pt-12 pb-6">
        <p className="text-fresh-500 text-sm font-medium mb-1">Корзина</p>
        <h2 className="font-display text-3xl font-light text-slate-800">
          {cart.length} {cart.length === 1 ? "товар" : cart.length < 5 ? "товара" : "товаров"}
        </h2>
      </div>

      <div className="px-5 mt-4 flex flex-col gap-3">
        {cart.map((item, i) => (
          <div key={item.id} className="bg-white rounded-2xl border border-ice-100 p-4 flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${i * 0.06}s` }}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.type === "subscription" ? "bg-fresh-50" : "bg-ice-50"}`}>
              <Icon name={item.type === "subscription" ? "Droplets" : "Package"} size={22} fallback="Box" className={item.type === "subscription" ? "text-fresh-500" : "text-ice-400"} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-slate-800 text-sm truncate">{item.name}</div>
              {item.period && <div className="text-xs text-ice-400">{item.period}</div>}
              <div className="font-bold text-fresh-600 mt-1">{item.price * item.qty} ₽</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => item.qty > 1 ? onUpdateQty(item.id, item.qty - 1) : onRemove(item.id)}
                className="w-8 h-8 rounded-lg bg-ice-100 flex items-center justify-center text-ice-500 hover:bg-red-50 hover:text-red-400 transition-colors"
              >
                <Icon name={item.qty > 1 ? "Minus" : "Trash2"} size={14} />
              </button>
              <span className="w-5 text-center text-sm font-medium text-slate-700">{item.qty}</span>
              <button
                onClick={() => onUpdateQty(item.id, item.qty + 1)}
                className="w-8 h-8 rounded-lg bg-fresh-50 flex items-center justify-center text-fresh-500 hover:bg-fresh-100 transition-colors"
              >
                <Icon name="Plus" size={14} />
              </button>
            </div>
          </div>
        ))}

        <div className="bg-white rounded-2xl border border-ice-100 p-4">
          <div className="flex gap-2">
            <input type="text" placeholder="Промокод" className="flex-1 bg-ice-50 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fresh-300 transition-all" />
            <button className="px-4 py-2.5 bg-fresh-500 text-white rounded-xl text-sm font-medium hover:bg-fresh-600 transition-colors">Применить</button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-fresh-500 to-sky-500 rounded-2xl p-5 text-white mt-2 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="opacity-80 text-sm">Товары ({cart.length})</span>
            <span className="font-medium">{total} ₽</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="opacity-80 text-sm">Доставка</span>
            <span className="font-medium" style={{ color: "#86efac" }}>Бесплатно</span>
          </div>
          <div className="border-t border-white/20 pt-4 flex justify-between items-center mb-5">
            <span className="font-semibold">Итого</span>
            <span className="text-2xl font-bold">{total} ₽</span>
          </div>
          <button onClick={onCheckout} className="w-full bg-white text-fresh-600 font-bold py-3.5 rounded-xl hover:bg-fresh-50 transition-all">
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CHECKOUT ─────────────────────────────────────────────────────────────────

function CheckoutPage({ total, onBack }: { total: number; onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("card");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10-14");
  const [confirmed, setConfirmed] = useState(false);
  const orderNum = Math.floor(Math.random() * 9000 + 1000);

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-8 text-center py-20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-eco-100 to-fresh-100 flex items-center justify-center mb-6 animate-scale-in">
          <Icon name="CheckCircle" size={44} className="text-eco-500" />
        </div>
        <h3 className="font-display text-3xl font-light text-slate-800 mb-2">Заказ оформлен!</h3>
        <p className="text-ice-400 text-sm mb-1">Заказ #{orderNum} принят.</p>
        <p className="text-ice-400 text-sm">Пришлём уведомление о доставке.</p>
        <div className="mt-8 bg-fresh-50 rounded-2xl p-5 w-full border border-fresh-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-fresh-100 flex items-center justify-center">
              <Icon name="Truck" size={18} className="text-fresh-500" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-slate-700">Ожидайте курьера</div>
              <div className="text-xs text-ice-400">{date} · {time}:00</div>
            </div>
          </div>
        </div>
        <button onClick={onBack} className="mt-6 w-full py-3 bg-fresh-500 text-white rounded-xl font-semibold hover:bg-fresh-600 transition-all">На главную</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-8">
      <div className="hero-bg px-5 pt-12 pb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-ice-400 text-sm mb-4 hover:text-fresh-500 transition-colors">
          <Icon name="ChevronLeft" size={16} /> Корзина
        </button>
        <h2 className="font-display text-3xl font-light text-slate-800">Оформление</h2>
        <div className="flex items-center gap-2 mt-4">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s ? "bg-fresh-500 text-white" : "bg-ice-100 text-ice-400"}`}>{s}</div>
              {s < 3 && <div className={`h-0.5 w-8 transition-all ${step > s ? "bg-fresh-400" : "bg-ice-100"}`} />}
            </div>
          ))}
          <span className="ml-2 text-xs text-ice-400">{step === 1 ? "Адрес" : step === 2 ? "Оплата" : "Дата"}</span>
        </div>
      </div>

      <div className="px-5 mt-5">
        {step === 1 && (
          <div className="animate-fade-in">
            <h3 className="font-semibold text-slate-800 mb-4">Адрес доставки</h3>
            <input type="text" placeholder="Улица, дом, квартира" value={address} onChange={e => setAddress(e.target.value)}
              className="w-full bg-white border border-ice-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-fresh-300 mb-3 transition-all" />
            <input type="text" placeholder="Подъезд, этаж, код домофона"
              className="w-full bg-white border border-ice-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-fresh-300 mb-3 transition-all" />
            <input type="text" placeholder="Комментарий для курьера"
              className="w-full bg-white border border-ice-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-fresh-300 mb-6 transition-all" />
            <button onClick={() => setStep(2)} disabled={!address}
              className="w-full py-3.5 bg-fresh-500 text-white rounded-xl font-semibold disabled:opacity-40 hover:bg-fresh-600 transition-all">
              Далее — способ оплаты
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h3 className="font-semibold text-slate-800 mb-4">Способ оплаты</h3>
            {[
              { id: "card", label: "Банковская карта", icon: "CreditCard", sub: "Visa, MasterCard, Мир" },
              { id: "sbp", label: "СБП", icon: "Smartphone", sub: "Быстрые платежи" },
              { id: "cash", label: "Наличные", icon: "Banknote", sub: "При получении" },
            ].map(p => (
              <button key={p.id} onClick={() => setPayment(p.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 mb-3 transition-all ${payment === p.id ? "border-fresh-400 bg-fresh-50" : "border-ice-100 bg-white"}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${payment === p.id ? "bg-fresh-100" : "bg-ice-50"}`}>
                  <Icon name={p.icon} size={20} fallback="CreditCard" className={payment === p.id ? "text-fresh-500" : "text-ice-400"} />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-slate-800">{p.label}</div>
                  <div className="text-xs text-ice-400">{p.sub}</div>
                </div>
                {payment === p.id && (
                  <div className="w-5 h-5 rounded-full bg-fresh-500 flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                )}
              </button>
            ))}
            <button onClick={() => setStep(3)} className="w-full mt-3 py-3.5 bg-fresh-500 text-white rounded-xl font-semibold hover:bg-fresh-600 transition-all">
              Далее — дата доставки
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h3 className="font-semibold text-slate-800 mb-4">Дата и время доставки</h3>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full bg-white border border-ice-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-fresh-300 mb-4 transition-all" />
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[["08-12", "08:00–12:00"], ["10-14", "10:00–14:00"], ["14-18", "14:00–18:00"], ["18-22", "18:00–22:00"]].map(([val, label]) => (
                <button key={val} onClick={() => setTime(val)}
                  className={`py-3 rounded-xl text-sm font-medium border-2 transition-all ${time === val ? "border-fresh-400 bg-fresh-50 text-fresh-700" : "border-ice-100 bg-white text-slate-600"}`}
                >{label}</button>
              ))}
            </div>
            <div className="bg-ice-50 rounded-2xl p-4 mb-5">
              <div className="text-sm font-medium text-slate-700 mb-2">Итого к оплате</div>
              <div className="flex justify-between items-center">
                <span className="text-ice-500 text-sm">Заказ</span>
                <span className="font-bold text-xl text-slate-800">{total} ₽</span>
              </div>
            </div>
            <button onClick={() => setConfirmed(true)} disabled={!date}
              className="w-full py-4 bg-gradient-to-r from-fresh-500 to-sky-500 text-white rounded-xl font-bold text-base disabled:opacity-40 hover:shadow-lg transition-all">
              Подтвердить заказ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────

function ProfilePage() {
  const [notifDelivery, setNotifDelivery] = useState(true);
  const [notifPromo, setNotifPromo] = useState(false);
  const [notifRenew, setNotifRenew] = useState(true);

  return (
    <div className="flex flex-col pb-8">
      <div className="hero-bg px-5 pt-12 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fresh-400 to-sky-500 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-white">АИ</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Александра И.</h2>
            <p className="text-ice-400 text-sm">+7 999 123-45-67</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-2 h-2 rounded-full bg-eco-400" />
              <span className="text-xs text-eco-600">Подписка активна</span>
            </div>
          </div>
        </div>
        <div className="mt-5 bg-gradient-to-r from-fresh-500 to-sky-500 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm opacity-80">Текущая подписка</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Активна</span>
          </div>
          <div className="font-bold text-lg">Семейный · 19 л × 2</div>
          <div className="text-sm opacity-80 mt-0.5">2 доставки в неделю · 890 ₽/доставка</div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs opacity-70">Следующая: 1 марта</span>
            <button className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">Управление</button>
          </div>
        </div>
      </div>

      <div className="px-5 mt-5 grid grid-cols-3 gap-3">
        {[["24", "Заказов", "Package"], ["856", "Литров", "Droplets"], ["2 180 ₽", "Сэкономлено", "PiggyBank"]].map(([v, l, ic]) => (
          <div key={l} className="bg-white rounded-2xl p-3 border border-ice-100 text-center">
            <Icon name={ic} size={18} fallback="Info" className="text-fresh-400 mx-auto mb-1" />
            <div className="font-bold text-slate-800 text-sm">{v}</div>
            <div className="text-xs text-ice-400">{l}</div>
          </div>
        ))}
      </div>

      <div className="px-5 mt-5">
        <h3 className="font-semibold text-slate-800 mb-3">История заказов</h3>
        <div className="flex flex-col gap-2">
          {orderHistory.map((order, i) => (
            <div key={i} className="bg-white rounded-2xl border border-ice-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-eco-50 flex items-center justify-center">
                  <Icon name="CheckCircle" size={18} className="text-eco-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-700">{order.items}</div>
                  <div className="text-xs text-ice-400">{order.date}</div>
                </div>
              </div>
              <div className="text-sm font-bold text-slate-800">{order.amount} ₽</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-5">
        <h3 className="font-semibold text-slate-800 mb-3">Уведомления</h3>
        <div className="bg-white rounded-2xl border border-ice-100 divide-y divide-ice-50">
          {[
            { label: "О доставке", sub: "Статус заказа и курьер", val: notifDelivery, set: setNotifDelivery },
            { label: "Акции", sub: "Скидки и спецпредложения", val: notifPromo, set: setNotifPromo },
            { label: "Переоформление", sub: "Напоминание о продлении", val: notifRenew, set: setNotifRenew },
          ].map(({ label, sub, val, set }) => (
            <div key={label} className="flex items-center justify-between p-4">
              <div>
                <div className="text-sm font-medium text-slate-700">{label}</div>
                <div className="text-xs text-ice-400">{sub}</div>
              </div>
              <button onClick={() => set(!val)} className={`w-12 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${val ? "bg-fresh-500" : "bg-ice-200"}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${val ? "left-6" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-5">
        <h3 className="font-semibold text-slate-800 mb-3">Адреса доставки</h3>
        <div className="bg-white rounded-2xl border border-ice-100 p-4 flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-fresh-50 flex items-center justify-center">
            <Icon name="Home" size={18} className="text-fresh-500" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-slate-700">Домой</div>
            <div className="text-xs text-ice-400">ул. Ленина, 12, кв. 34</div>
          </div>
          <span className="text-xs bg-fresh-50 text-fresh-600 px-2 py-0.5 rounded-full">Основной</span>
        </div>
        <button className="w-full py-3 border-2 border-dashed border-ice-200 rounded-2xl text-sm text-ice-400 hover:border-fresh-300 hover:text-fresh-500 transition-colors flex items-center justify-center gap-2">
          <Icon name="Plus" size={16} /> Добавить адрес
        </button>
      </div>
    </div>
  );
}

// ─── CALCULATOR ───────────────────────────────────────────────────────────────

function CalculatorPage({ onAddToCart }: { onAddToCart: (item: CartItem) => void }) {
  const [people, setPeople] = useState(2);
  const [activity, setActivity] = useState<"low" | "medium" | "high">("medium");
  const [season, setSeason] = useState<"cold" | "warm">("cold");
  const [calculated, setCalculated] = useState(false);

  const base = people * 2.5;
  const actMult = { low: 0.9, medium: 1.0, high: 1.3 }[activity];
  const seaMult = season === "warm" ? 1.2 : 1.0;
  const daily = Math.round(base * actMult * seaMult * 10) / 10;
  const weekly = Math.round(daily * 7 * 10) / 10;
  const monthly = Math.round(daily * 30 * 10) / 10;
  const bottlesPerMonth = Math.ceil(monthly / 19);
  const recommended = subscriptions.find(s =>
    bottlesPerMonth <= 4 ? s.id === "sub-1" : bottlesPerMonth <= 8 ? s.id === "sub-2" : s.id === "sub-3"
  ) || subscriptions[1];

  return (
    <div className="flex flex-col pb-8">
      <div className="hero-bg px-5 pt-12 pb-6">
        <p className="text-fresh-500 text-sm font-medium mb-1">Калькулятор</p>
        <h2 className="font-display text-3xl font-light text-slate-800">Норма <span className="italic text-fresh-500">воды</span></h2>
        <p className="text-ice-400 text-sm mt-2">Рассчитайте нужный объём для вашей семьи</p>
      </div>

      <div className="px-5 mt-5 flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-ice-100 p-5">
          <div className="text-sm font-medium text-slate-700 mb-4">Количество человек</div>
          <div className="flex items-center justify-between">
            <button onClick={() => setPeople(Math.max(1, people - 1))}
              className="w-12 h-12 rounded-xl bg-ice-100 flex items-center justify-center text-ice-500 hover:bg-fresh-50 hover:text-fresh-500 transition-all text-xl">
              −
            </button>
            <div className="text-center">
              <div className="text-5xl font-bold text-fresh-500">{people}</div>
              <div className="text-xs text-ice-400 mt-1">{people === 1 ? "человек" : people < 5 ? "человека" : "человек"}</div>
            </div>
            <button onClick={() => setPeople(Math.min(10, people + 1))}
              className="w-12 h-12 rounded-xl bg-ice-100 flex items-center justify-center text-ice-500 hover:bg-fresh-50 hover:text-fresh-500 transition-all text-xl">
              +
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-ice-100 p-5">
          <div className="text-sm font-medium text-slate-700 mb-3">Уровень активности</div>
          <div className="flex gap-2">
            {[{ id: "low" as const, label: "Низкий", icon: "Armchair" }, { id: "medium" as const, label: "Средний", icon: "User" }, { id: "high" as const, label: "Высокий", icon: "Dumbbell" }].map(a => (
              <button key={a.id} onClick={() => setActivity(a.id)}
                className={`flex-1 flex flex-col items-center py-3 px-2 rounded-xl border-2 transition-all ${activity === a.id ? "border-fresh-400 bg-fresh-50" : "border-ice-100"}`}
              >
                <Icon name={a.icon} size={20} fallback="User" className={activity === a.id ? "text-fresh-500" : "text-ice-400"} />
                <span className={`text-xs mt-1 font-medium ${activity === a.id ? "text-fresh-600" : "text-ice-400"}`}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-ice-100 p-5">
          <div className="text-sm font-medium text-slate-700 mb-3">Время года</div>
          <div className="flex gap-2">
            {[{ id: "cold" as const, label: "Холодное", icon: "Snowflake" }, { id: "warm" as const, label: "Тёплое", icon: "Sun" }].map(s => (
              <button key={s.id} onClick={() => setSeason(s.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${season === s.id ? "border-fresh-400 bg-fresh-50" : "border-ice-100"}`}
              >
                <Icon name={s.icon} size={18} fallback="Calendar" className={season === s.id ? "text-fresh-500" : "text-ice-400"} />
                <span className={`text-sm font-medium ${season === s.id ? "text-fresh-600" : "text-ice-400"}`}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => setCalculated(true)}
          className="w-full py-4 bg-gradient-to-r from-fresh-500 to-sky-500 text-white rounded-xl font-bold text-base hover:shadow-lg transition-all">
          Рассчитать
        </button>

        {calculated && (
          <div className="animate-scale-in flex flex-col gap-4">
            <div className="bg-gradient-to-br from-fresh-500 to-sky-500 rounded-2xl p-5 text-white">
              <div className="text-sm opacity-80 mb-3">Рекомендуемый объём</div>
              <div className="grid grid-cols-3 gap-3">
                {[["В день", `${daily} л`], ["В неделю", `${weekly} л`], ["В месяц", `${monthly} л`]].map(([label, value]) => (
                  <div key={label} className="bg-white/15 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold">{value}</div>
                    <div className="text-xs opacity-70 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm opacity-80 text-center">~{bottlesPerMonth} бутыль(-ей) 19л в месяц</div>
            </div>
            <div className="bg-white rounded-2xl border-2 border-fresh-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Sparkles" size={16} className="text-fresh-500" />
                <span className="text-sm font-semibold text-slate-700">Рекомендуем для вас</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-bold text-slate-800 text-lg">{recommended.name}</div>
                  <div className="text-sm text-ice-400">{recommended.volume} · {recommended.frequency}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-fresh-600">{recommended.price} ₽</div>
                  <div className="text-xs text-ice-400">/доставка</div>
                </div>
              </div>
              <button
                onClick={() => onAddToCart({ id: recommended.id, name: recommended.name, price: recommended.price, qty: 1, type: "subscription" })}
                className="w-full py-3 bg-fresh-500 text-white rounded-xl font-semibold hover:bg-fresh-600 transition-all"
              >
                Оформить подписку
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function AboutPage() {
  return (
    <div className="flex flex-col pb-8">
      <div className="hero-bg px-5 pt-12 pb-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-fresh-200/20 blur-3xl" />
        <p className="text-fresh-500 text-sm font-medium mb-1">О компании</p>
        <h2 className="font-display text-3xl font-light text-slate-800">О <span className="italic text-fresh-500">FreshDrop</span></h2>
        <p className="text-ice-400 text-sm mt-2">Мы верим, что чистая вода — право каждого</p>
      </div>

      <div className="px-5 mt-6">
        <div className="bg-gradient-to-br from-fresh-50 to-sky-50 rounded-2xl border border-fresh-100 p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Heart" size={18} className="text-fresh-500" />
            <span className="font-semibold text-slate-800">Наша миссия</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            FreshDrop — экологичная служба доставки воды по подписке. Мы используем перерабатываемые бутыли, оптимизируем маршруты для снижения выбросов CO₂ и дарим удобство без компромисса с природой.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { icon: "Leaf", title: "Экология", desc: "100% переработка бутылей", bg: "bg-eco-50", color: "text-eco-600" },
            { icon: "Shield", title: "Качество", desc: "7-ступенчатая очистка", bg: "bg-fresh-50", color: "text-fresh-600" },
            { icon: "Clock", title: "Точность", desc: "Доставка в окно 2 часа", bg: "bg-sky-50", color: "text-sky-600" },
            { icon: "Headphones", title: "Поддержка", desc: "7 дней в неделю", bg: "bg-purple-50", color: "text-purple-600" },
          ].map(v => (
            <div key={v.title} className="bg-white rounded-2xl border border-ice-100 p-4">
              <div className={`w-10 h-10 rounded-xl ${v.bg} flex items-center justify-center mb-2`}>
                <Icon name={v.icon} size={18} fallback="Info" className={v.color} />
              </div>
              <div className="font-semibold text-slate-800 text-sm">{v.title}</div>
              <div className="text-xs text-ice-400 mt-0.5">{v.desc}</div>
            </div>
          ))}
        </div>

        <h3 className="font-semibold text-slate-800 mb-3">Контакты</h3>
        <div className="bg-white rounded-2xl border border-ice-100 divide-y divide-ice-50 mb-5">
          {[
            { icon: "Phone", value: "+7 800 555-35-35", sub: "Бесплатно, пн–вс 8–22" },
            { icon: "MessageCircle", value: "@freshdrop_support", sub: "Ответ за 5 мин" },
            { icon: "Mail", value: "help@freshdrop.ru", sub: "Ответ в течение часа" },
            { icon: "MapPin", value: "Москва, ул. Чистая, 1", sub: "Пн–пт 9:00–18:00" },
          ].map(c => (
            <div key={c.icon} className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-fresh-50 flex items-center justify-center flex-shrink-0">
                <Icon name={c.icon} size={18} fallback="Info" className="text-fresh-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-800">{c.value}</div>
                <div className="text-xs text-ice-400">{c.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-eco-500 to-fresh-500 rounded-2xl p-5 text-white text-center">
          <Icon name="Leaf" size={28} className="mx-auto mb-2" />
          <div className="font-bold text-lg mb-1">Эко-инициатива</div>
          <p className="text-sm opacity-90">С каждой подпиской мы сажаем дерево. Уже посажено <strong>4 823</strong> дерева.</p>
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("catalog");
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, item];
    });
  };

  const updateQty = (id: string, qty: number) =>
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));

  const removeFromCart = (id: string) =>
    setCart(prev => prev.filter(i => i.id !== id));

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const renderPage = () => {
    switch (page) {
      case "catalog": return <CatalogPage onAddToCart={addToCart} />;
      case "subscriptions": return <SubscriptionsPage onAddToCart={addToCart} />;
      case "cart": return <CartPage cart={cart} onUpdateQty={updateQty} onRemove={removeFromCart} onCheckout={() => setPage("checkout")} />;
      case "checkout": return <CheckoutPage total={total} onBack={() => setPage("cart")} />;
      case "profile": return <ProfilePage />;
      case "calculator": return <CalculatorPage onAddToCart={addToCart} />;
      case "about": return <AboutPage />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-ice-50 flex justify-center">
      <div className="w-full max-w-md relative flex flex-col" style={{ minHeight: "100svh" }}>
        <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide bg-ice-50">
          {renderPage()}
        </div>

        {page !== "checkout" && (
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md glass border-t border-white/60 px-2 py-2 z-50">
            <div className="flex">
              {navItems.map(item => {
                const isActive = page === item.id;
                const showBadge = item.id === "cart" && cartCount > 0;
                return (
                  <button
                    key={item.id}
                    onClick={() => setPage(item.id)}
                    className={`flex-1 flex flex-col items-center py-2 px-1 rounded-xl transition-all duration-200 relative ${isActive ? "text-fresh-600" : "text-ice-400"}`}
                  >
                    <div className={`relative transition-all duration-200 ${isActive ? "scale-110" : ""}`}>
                      <Icon name={item.icon} size={22} fallback="Circle" />
                      {showBadge && (
                        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold" style={{ fontSize: "9px" }}>{cartCount > 9 ? "9+" : cartCount}</span>
                        </div>
                      )}
                    </div>
                    <span className={`mt-0.5 font-medium transition-all ${isActive ? "text-fresh-600" : "text-ice-400"}`} style={{ fontSize: "10px" }}>
                      {item.label}
                    </span>
                    {isActive && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-fresh-500 rounded-full" />}
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

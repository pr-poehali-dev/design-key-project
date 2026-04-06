import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_LIVING = "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/afa6d0f2-7b3d-4886-9d67-b8541ebc1292.jpg";
const IMG_BEDROOM = "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/67602cd0-01a2-4380-9895-009cbeec1d67.jpg";
const IMG_KITCHEN = "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/6d7f6cc2-ff11-4b75-b7dd-eb6b45bbaa6f.jpg";

const NAV_LINKS = [
  { label: "О студии", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Процесс", href: "#process" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Layout", title: "Дизайн-проект", desc: "Полный проект от концепции до рабочих чертежей с авторским надзором" },
  { icon: "Home", title: "Дизайн квартиры", desc: "Индивидуальное решение для жилых пространств любой площади и стиля" },
  { icon: "Building2", title: "Коммерческие объекты", desc: "Офисы, рестораны, отели — создаём атмосферу, работающую на бизнес" },
  { icon: "Pencil", title: "Концепция интерьера", desc: "Стилевое направление, мудборд, цветовая палитра и референсы" },
  { icon: "Sofa", title: "Подбор материалов", desc: "Комплектация мебелью, тканями, освещением и декором под ключ" },
  { icon: "Eye", title: "3D-визуализация", desc: "Фотореалистичные рендеры пространства до начала ремонта" },
];

const PORTFOLIO = [
  { img: IMG_LIVING, title: "Апартаменты на Пречистенке", area: "180 м²", style: "Современная классика" },
  { img: IMG_BEDROOM, title: "Загородный дом в Подмосковье", area: "320 м²", style: "Сканди-минимализм" },
  { img: IMG_KITCHEN, title: "Пентхаус в центре города", area: "250 м²", style: "Ар-деко" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Знакомство", desc: "Встреча, изучение объекта, обсуждение пожеланий и бюджета" },
  { num: "02", title: "Концепция", desc: "Разрабатываем несколько стилевых направлений на ваш выбор" },
  { num: "03", title: "Проектирование", desc: "Полный пакет чертежей: планировки, развёртки, спецификации" },
  { num: "04", title: "Комплектация", desc: "Подбираем мебель, материалы и декор под утверждённый бюджет" },
  { num: "05", title: "Авторский надзор", desc: "Контролируем реализацию и соответствие проекту на каждом этапе" },
];

const FAQ_ITEMS = [
  { q: "Сколько времени занимает разработка проекта?", a: "Стандартный дизайн-проект квартиры до 100 м² занимает 4–6 недель. Для больших объектов или коммерческих пространств — 8–12 недель." },
  { q: "Работаете ли вы за пределами Москвы?", a: "Да, мы реализуем проекты по всей России и за рубежом. Первоначальные встречи и замеры проводим лично, дальнейшую работу — онлайн." },
  { q: "Что входит в стоимость дизайн-проекта?", a: "Техническое задание, концепция, планировочные решения, рабочие чертежи, спецификации отделки и мебели, 3D-визуализация всех помещений." },
  { q: "Помогаете ли вы с закупкой мебели и материалов?", a: "Да, мы предлагаем услугу полной комплектации. Работаем с проверенными поставщиками и получаем профессиональные скидки, которые передаём клиентам." },
  { q: "Возможен ли авторский надзор на этапе ремонта?", a: "Обязательно. Авторский надзор — стандартная часть наших услуг. Выезжаем на объект по графику и по необходимости, согласовываем изменения онлайн." },
];

const BLOG_POSTS = [
  { tag: "Тренды", title: "Японский минимализм в городской квартире: как достичь баланса", date: "15 марта 2026" },
  { tag: "Материалы", title: "Натуральный камень vs. искусственный: что выбрать для интерьера", date: "28 февраля 2026" },
  { tag: "Советы", title: "Как расставить свет в квартире: 7 правил от наших дизайнеров", date: "10 февраля 2026" },
];

const OBJECT_TYPES = [
  { label: "Квартира", multiplier: 1 },
  { label: "Дом / Коттедж", multiplier: 1.2 },
  { label: "Офис", multiplier: 1.15 },
  { label: "Ресторан / Кафе", multiplier: 1.35 },
  { label: "Апартаменты", multiplier: 1.1 },
];

const SERVICE_TYPES = [
  { label: "Концепция", price: 800 },
  { label: "Дизайн-проект", price: 1500 },
  { label: "Проект + надзор", price: 2200 },
  { label: "Под ключ", price: 3500 },
];

function useIntersection(ref: React.RefObject<Element>, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [area, setArea] = useState(80);
  const [objectType, setObjectType] = useState(0);
  const [serviceType, setServiceType] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const price = Math.round(area * SERVICE_TYPES[serviceType].price * OBJECT_TYPES[objectType].multiplier);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal overflow-x-hidden">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-display text-2xl font-light tracking-[0.2em] text-charcoal">
            FORMA
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="font-body text-sm tracking-wide text-[hsl(30,10%,45%)] hover:text-charcoal transition-colors">
                {l.label}
              </button>
            ))}
          </nav>
          <button onClick={() => scrollTo("#contacts")}
            className="hidden md:block bg-charcoal text-cream px-5 py-2 text-sm font-body tracking-wide hover:bg-[hsl(38,60%,55%)] transition-colors">
            Консультация
          </button>
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-cream border-t border-border px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className="text-left font-body text-sm text-charcoal py-1">
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_LIVING} alt="Interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[hsl(30,15%,12%)]/55" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="max-w-2xl">
            <p className="font-body text-xs tracking-[0.35em] text-gold uppercase mb-6 animate-fade-in">
              Студия дизайна интерьера
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-light text-[hsl(40,30%,97%)] leading-none mb-8"
              style={{ animation: "fadeUp 0.8s 0.1s ease both" }}>
              Пространства,<br />
              <em className="italic text-[hsl(42,65%,75%)]">в которых хочется жить</em>
            </h1>
            <p className="font-body text-base text-[hsl(40,30%,97%)]/75 leading-relaxed mb-10 max-w-lg"
              style={{ animation: "fadeUp 0.8s 0.25s ease both" }}>
              Создаём интерьеры с характером — от концепции до последнего штриха. Каждый проект уникален и отражает вашу личность.
            </p>
            <div className="flex flex-wrap gap-4" style={{ animation: "fadeUp 0.8s 0.4s ease both" }}>
              <button onClick={() => scrollTo("#portfolio")}
                className="bg-[hsl(38,60%,55%)] text-[hsl(30,15%,12%)] px-8 py-3.5 font-body text-sm tracking-wide hover:bg-[hsl(38,60%,48%)] transition-colors">
                Смотреть проекты
              </button>
              <button onClick={() => scrollTo("#calculator")}
                className="border border-[hsl(40,30%,97%)]/60 text-[hsl(40,30%,97%)] px-8 py-3.5 font-body text-sm tracking-wide hover:bg-[hsl(40,30%,97%)]/10 transition-colors">
                Рассчитать стоимость
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <Icon name="ChevronDown" size={20} className="text-[hsl(40,30%,97%)]/50" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-[hsl(40,30%,97%)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="font-body text-xs tracking-[0.3em] text-[hsl(38,60%,55%)] uppercase mb-4 section-line">О студии</p>
              <h2 className="font-display text-5xl font-light text-[hsl(30,15%,12%)] leading-tight mb-6">
                Десять лет безупречного вкуса
              </h2>
              <p className="font-body text-base text-[hsl(30,10%,45%)] leading-relaxed mb-6">
                FORMA — московская студия интерьерного дизайна с командой из 12 специалистов. Мы верим, что хороший интерьер — это не набор красивых предметов, а целостная история, которую хозяин рассказывает своим гостям.
              </p>
              <p className="font-body text-base text-[hsl(30,10%,45%)] leading-relaxed mb-8">
                За 10 лет мы реализовали более 200 проектов — от уютных квартир до крупных коммерческих объектов. Работаем по всей России и за рубежом.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                {[["200+", "проектов"], ["10", "лет опыта"], ["12", "дизайнеров"]].map(([n, l]) => (
                  <div key={n}>
                    <div className="font-display text-4xl font-light text-[hsl(38,60%,55%)]">{n}</div>
                    <div className="font-body text-xs text-[hsl(30,10%,55%)] mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection className="relative">
              <img src={IMG_BEDROOM} alt="О студии" className="w-full h-[480px] object-cover" />
              <div className="absolute -bottom-6 -left-6 bg-[hsl(38,60%,55%)] p-6 max-w-[200px]">
                <p className="font-display text-2xl font-light text-[hsl(30,15%,12%)]">"Детали решают всё"</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-[hsl(38,20%,93%)]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] text-[hsl(38,60%,55%)] uppercase mb-4">Что мы делаем</p>
            <h2 className="font-display text-5xl font-light text-[hsl(30,15%,12%)]">Услуги</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {SERVICES.map((s, i) => (
              <AnimatedSection key={i}>
                <div className="bg-[hsl(40,30%,97%)] p-8 h-full hover:bg-[hsl(38,20%,90%)] transition-colors group cursor-default">
                  <div className="w-10 h-10 border border-border flex items-center justify-center mb-6 group-hover:border-[hsl(38,60%,55%)] transition-colors">
                    <Icon name={s.icon as "Layout" | "Home" | "Building2" | "Pencil" | "Sofa" | "Eye"} size={18} className="text-[hsl(30,10%,45%)] group-hover:text-[hsl(38,60%,55%)] transition-colors" fallback="Home" />
                  </div>
                  <h3 className="font-display text-xl font-medium text-[hsl(30,15%,12%)] mb-3">{s.title}</h3>
                  <p className="font-body text-sm text-[hsl(30,10%,50%)] leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-[hsl(40,30%,97%)]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="flex items-end justify-between mb-12">
            <div>
              <p className="font-body text-xs tracking-[0.3em] text-[hsl(38,60%,55%)] uppercase mb-4">Наши работы</p>
              <h2 className="font-display text-5xl font-light text-[hsl(30,15%,12%)]">Портфолио</h2>
            </div>
            <button className="hidden md:block font-body text-sm text-[hsl(30,10%,45%)] border-b border-[hsl(30,10%,45%)] pb-0.5 hover:text-[hsl(30,15%,12%)] hover:border-[hsl(30,15%,12%)] transition-colors">
              Все проекты →
            </button>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {PORTFOLIO.map((p, i) => (
              <AnimatedSection key={i} className="group cursor-pointer">
                <div className="overflow-hidden mb-4">
                  <img src={p.img} alt={p.title} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <p className="font-body text-xs tracking-[0.2em] text-[hsl(38,60%,55%)] uppercase mb-1">{p.style}</p>
                <h3 className="font-display text-xl font-light text-[hsl(30,15%,12%)] mb-1">{p.title}</h3>
                <p className="font-body text-sm text-[hsl(30,10%,55%)]">{p.area}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 bg-[hsl(30,15%,12%)]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-body text-xs tracking-[0.3em] text-[hsl(38,60%,55%)] uppercase mb-4">Онлайн-инструмент</p>
              <h2 className="font-display text-5xl font-light text-[hsl(40,30%,97%)] leading-tight mb-6">
                Рассчитайте стоимость вашего проекта
              </h2>
              <p className="font-body text-sm text-[hsl(40,30%,97%)]/55 leading-relaxed">
                Укажите площадь объекта, его тип и желаемый пакет услуг — мы моментально покажем ориентировочную стоимость. Финальная цена обсуждается на встрече.
              </p>
            </div>
            <div className="bg-[hsl(30,15%,16%)] p-8">
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <label className="font-body text-xs tracking-wide text-[hsl(40,30%,97%)]/60 uppercase">Площадь объекта</label>
                  <span className="font-display text-2xl font-light text-[hsl(38,60%,55%)]">{area} м²</span>
                </div>
                <input type="range" min={20} max={500} value={area} onChange={e => setArea(+e.target.value)}
                  className="w-full h-0.5 bg-[hsl(40,30%,97%)]/20 appearance-none cursor-pointer accent-[hsl(38,60%,55%)]" />
                <div className="flex justify-between mt-1">
                  <span className="font-body text-xs text-[hsl(40,30%,97%)]/30">20 м²</span>
                  <span className="font-body text-xs text-[hsl(40,30%,97%)]/30">500 м²</span>
                </div>
              </div>

              <div className="mb-8">
                <label className="font-body text-xs tracking-wide text-[hsl(40,30%,97%)]/60 uppercase mb-3 block">Тип объекта</label>
                <div className="grid grid-cols-2 gap-2">
                  {OBJECT_TYPES.map((o, i) => (
                    <button key={i} onClick={() => setObjectType(i)}
                      className={`px-3 py-2.5 text-xs font-body transition-colors ${objectType === i
                        ? "bg-[hsl(38,60%,55%)] text-[hsl(30,15%,12%)]"
                        : "bg-[hsl(40,30%,97%)]/10 text-[hsl(40,30%,97%)]/70 hover:bg-[hsl(40,30%,97%)]/20"}`}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="font-body text-xs tracking-wide text-[hsl(40,30%,97%)]/60 uppercase mb-3 block">Пакет услуг</label>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICE_TYPES.map((s, i) => (
                    <button key={i} onClick={() => setServiceType(i)}
                      className={`px-3 py-2.5 text-xs font-body transition-colors ${serviceType === i
                        ? "bg-[hsl(38,60%,55%)] text-[hsl(30,15%,12%)]"
                        : "bg-[hsl(40,30%,97%)]/10 text-[hsl(40,30%,97%)]/70 hover:bg-[hsl(40,30%,97%)]/20"}`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-[hsl(40,30%,97%)]/15 pt-6 flex items-center justify-between">
                <div>
                  <p className="font-body text-xs text-[hsl(40,30%,97%)]/50 mb-1">Ориентировочная стоимость</p>
                  <p className="font-display text-4xl font-light text-[hsl(38,60%,55%)]">
                    {price.toLocaleString("ru-RU")} ₽
                  </p>
                </div>
                <button onClick={() => scrollTo("#contacts")}
                  className="bg-[hsl(38,60%,55%)] text-[hsl(30,15%,12%)] px-6 py-3 font-body text-sm hover:bg-[hsl(38,60%,48%)] transition-colors">
                  Обсудить
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-[hsl(40,30%,97%)]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] text-[hsl(38,60%,55%)] uppercase mb-4">Как мы работаем</p>
            <h2 className="font-display text-5xl font-light text-[hsl(30,15%,12%)]">Процесс</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-5 gap-0">
            {PROCESS_STEPS.map((s, i) => (
              <AnimatedSection key={i} className="relative">
                <div className="p-6 md:p-5 border-l border-border md:border-l">
                  <p className="font-display text-5xl font-light text-[hsl(38,60%,55%)]/30 mb-4">{s.num}</p>
                  <h3 className="font-display text-lg font-medium text-[hsl(30,15%,12%)] mb-3">{s.title}</h3>
                  <p className="font-body text-sm text-[hsl(30,10%,50%)] leading-relaxed">{s.desc}</p>
                </div>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-3 z-10">
                    <Icon name="ChevronRight" size={16} className="text-[hsl(38,60%,55%)]/40" />
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-[hsl(38,20%,93%)]">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] text-[hsl(38,60%,55%)] uppercase mb-4">Вопросы и ответы</p>
            <h2 className="font-display text-5xl font-light text-[hsl(30,15%,12%)]">FAQ</h2>
          </AnimatedSection>
          <div className="divide-y divide-border">
            {FAQ_ITEMS.map((item, i) => (
              <AnimatedSection key={i}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left py-6 flex items-start justify-between gap-4 group">
                  <span className="font-display text-lg font-light text-[hsl(30,15%,12%)] group-hover:text-[hsl(38,60%,55%)] transition-colors">
                    {item.q}
                  </span>
                  <Icon name={openFaq === i ? "Minus" : "Plus"} size={18} className="text-[hsl(38,60%,55%)] flex-shrink-0 mt-1" />
                </button>
                {openFaq === i && (
                  <div className="pb-6">
                    <p className="font-body text-sm text-[hsl(30,10%,45%)] leading-relaxed">{item.a}</p>
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24 bg-[hsl(40,30%,97%)]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="flex items-end justify-between mb-12">
            <div>
              <p className="font-body text-xs tracking-[0.3em] text-[hsl(38,60%,55%)] uppercase mb-4">Журнал</p>
              <h2 className="font-display text-5xl font-light text-[hsl(30,15%,12%)]">Блог</h2>
            </div>
            <button className="hidden md:block font-body text-sm text-[hsl(30,10%,45%)] border-b border-[hsl(30,10%,45%)] pb-0.5 hover:text-[hsl(30,15%,12%)] transition-colors">
              Все статьи →
            </button>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => (
              <AnimatedSection key={i} className="group cursor-pointer">
                <div className="bg-[hsl(38,20%,93%)] h-48 mb-5 flex items-center justify-center group-hover:bg-[hsl(38,20%,88%)] transition-colors">
                  <Icon name="BookOpen" size={32} className="text-[hsl(38,60%,55%)]/40" />
                </div>
                <p className="font-body text-xs tracking-[0.2em] text-[hsl(38,60%,55%)] uppercase mb-2">{post.tag}</p>
                <h3 className="font-display text-xl font-light text-[hsl(30,15%,12%)] leading-snug mb-3 group-hover:text-[hsl(38,60%,55%)] transition-colors">
                  {post.title}
                </h3>
                <p className="font-body text-xs text-[hsl(30,10%,55%)]">{post.date}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[hsl(30,15%,12%)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <AnimatedSection>
              <p className="font-body text-xs tracking-[0.3em] text-[hsl(38,60%,55%)] uppercase mb-4">Свяжитесь с нами</p>
              <h2 className="font-display text-5xl font-light text-[hsl(40,30%,97%)] leading-tight mb-8">
                Начнём создавать ваш интерьер
              </h2>
              <div className="space-y-5">
                {[
                  { icon: "Phone", text: "+7 (495) 000-00-00" },
                  { icon: "Mail", text: "hello@forma-studio.ru" },
                  { icon: "MapPin", text: "Москва, Пречистенский пер., 5" },
                  { icon: "Clock", text: "Пн–Пт, 9:00 — 19:00" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-4">
                    <div className="w-8 h-8 border border-[hsl(38,60%,55%)]/30 flex items-center justify-center flex-shrink-0">
                      <Icon name={icon as "Phone" | "Mail" | "MapPin" | "Clock"} size={14} className="text-[hsl(38,60%,55%)]" fallback="Info" />
                    </div>
                    <span className="font-body text-sm text-[hsl(40,30%,97%)]/70">{text}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <form onSubmit={e => e.preventDefault()} className="space-y-4">
                <input
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  placeholder="Ваше имя"
                  className="w-full bg-transparent border border-[hsl(40,30%,97%)]/20 px-4 py-3 font-body text-sm text-[hsl(40,30%,97%)] placeholder-[hsl(40,30%,97%)]/35 focus:outline-none focus:border-[hsl(38,60%,55%)] transition-colors"
                />
                <input
                  value={formData.phone}
                  onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                  placeholder="Телефон"
                  className="w-full bg-transparent border border-[hsl(40,30%,97%)]/20 px-4 py-3 font-body text-sm text-[hsl(40,30%,97%)] placeholder-[hsl(40,30%,97%)]/35 focus:outline-none focus:border-[hsl(38,60%,55%)] transition-colors"
                />
                <textarea
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder="Расскажите о вашем объекте"
                  rows={4}
                  className="w-full bg-transparent border border-[hsl(40,30%,97%)]/20 px-4 py-3 font-body text-sm text-[hsl(40,30%,97%)] placeholder-[hsl(40,30%,97%)]/35 focus:outline-none focus:border-[hsl(38,60%,55%)] transition-colors resize-none"
                />
                <button type="submit"
                  className="w-full bg-[hsl(38,60%,55%)] text-[hsl(30,15%,12%)] py-3.5 font-body text-sm tracking-wide hover:bg-[hsl(38,60%,48%)] transition-colors">
                  Отправить заявку
                </button>
                <p className="font-body text-xs text-[hsl(40,30%,97%)]/30 text-center">
                  Отвечаем в течение одного рабочего дня
                </p>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[hsl(30,15%,8%)] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-xl font-light tracking-[0.2em] text-[hsl(40,30%,97%)]/60">FORMA</span>
          <p className="font-body text-xs text-[hsl(40,30%,97%)]/30">© 2026 FORMA Interior Studio. Все права защищены.</p>
          <div className="flex gap-6">
            {["Instagram", "Telegram", "Pinterest"].map(s => (
              <button key={s} className="font-body text-xs text-[hsl(40,30%,97%)]/40 hover:text-[hsl(38,60%,55%)] transition-colors">{s}</button>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;

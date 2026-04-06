import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_PROCESS = "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/7b882352-dada-4fbc-b04a-d1444e58173b.jpg";
const IMG_RESULT = "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/865e73e5-3f27-4287-97a0-c8469635b0f6.jpg";

const STEPS = [
  { n: "01", title: "Замер и консультация", desc: "Выезд в Москве и СПб или онлайн-консультация по видео и планам для других городов. Снимаем замеры, слушаем ваши пожелания и бюджет." },
  { n: "02", title: "Концепция и 3D", desc: "2–3 варианта стиля, планировка, 3D-визуализация основных зон. Вы видите будущий интерьер до начала ремонта." },
  { n: "03", title: "Техническая документация", desc: "Чертежи, развёртки, схемы электрики и сантехники, раскладка плитки — всё, что нужно строителям." },
  { n: "04", title: "Подбор материалов и мебели", desc: "Подбираем качественные материалы, мебель и свет, контролируем сроки поставки и закупки." },
  { n: "05", title: "Ремонт и авторский надзор", desc: "Контроль качества, сроков и смет по ремонту — вы получаете законченный интерьер без косяков." },
  { n: "06", title: "Комплектация и декор", desc: "Мебель, текстиль, шторы, декор, зелень — всё до мелочей, чтобы вы сразу могли въезжать." },
  { n: "07", title: "Финальная уборка и переезд", desc: "Готовый интерьер, чистый и удобный, с чек-листом по уходу и эксплуатации." },
];

const FEATURES = [
  { icon: "Users", title: "Один контакт вместо десятков", desc: "Вы работаете с одной командой от начала и до конца, а не разделяете ответственность между дизайнером, прорабом, сметчиком и поставщиками." },
  { icon: "Receipt", title: "Чёткий бюджет и сроки", desc: "Мы прописываем ориентировочный бюджет и этапы работ, чтобы вы не сталкивались с внезапными доплатами." },
  { icon: "MapPin", title: "Под ключ для всей России", desc: "Работаем в Москве, других крупных городах и удалённо с клиентами по всей стране." },
  { icon: "Fingerprint", title: "Индивидуальный подход", desc: "Не шаблонные решения. Интерьер учитывает ваш образ жизни, привычки и финансовые возможности." },
  { icon: "ShieldCheck", title: "Гарантия результата", desc: "Мы не «сдаём» проект и уходим. Мы работаем до тех пор, пока вы довольны результатом." },
];

const REVIEWS = [
  { text: "«Не ожидала, что можно доверить весь процесс от замера до переезда одной команде. Сэкономила уйму времени и нервов, интерьер получился даже лучше, чем в 3D.»", author: "Наталья К.", city: "Москва" },
  { text: "«Сначала думала, что будет дорого, но потом поняла: цена — это не только дизайн, а ещё куча сэкономленного времени и стресса.»", author: "Елена М.", city: "Санкт-Петербург" },
  { text: "«У меня был офис и два объекта. Студия взяла всё на себя: от документации до мебели и техники. Справилась идеально.»", author: "Дмитрий В.", city: "Екатеринбург" },
];

const FAQ = [
  { q: "Сколько стоит дизайн интерьера под ключ в России?", a: "Стоимость зависит от площади, формата объекта и выбранного уровня материалов. После замера или онлайн-консультации мы готовим детальный расчёт с разбивкой по этапам." },
  { q: "Могу ли я выбрать бюджет и уровень материалов?", a: "Да, мы предлагаем несколько вариантов решений по цене и материалам, и вы выбираете комфортный уровень." },
  { q: "Как происходит замер — выезд или онлайн?", a: "В Москве и других крупных городах возможен выездной замер. Для других городов — онлайн: по фото, видео и планам." },
  { q: "Сколько длится процесс от замера до переезда?", a: "Для квартиры — от 3 до 6 месяцев, для дома или коммерческого объекта — от 4 до 9 месяцев. Точные сроки прописываются в договоре." },
];

const PROBLEMS = [
  "Собирать миллионы чертежей и смет",
  "Связываться с разными подрядчиками и прорабами",
  "Переплачивать за ошибки на этапе ремонта",
  "«Доделывать» интерьер потом, докупая мебель и декор",
];

function useVisible(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useVisible();
  return (
    <div ref={ref} className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
      }}>
      {children}
    </div>
  );
}

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", type: "Квартира" });
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-display text-lg tracking-wide text-foreground">Студия интерьера</span>
          <nav className="hidden md:flex items-center gap-7">
            {[["О нас","about"],["Процесс","process"],["Преимущества","features"],["Отзывы","reviews"],["FAQ","faq"]].map(([l,id]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l}
              </button>
            ))}
          </nav>
          <button onClick={() => scrollTo("contact")}
            className="hidden md:block font-body text-sm bg-foreground text-background px-5 py-2 hover:bg-[hsl(36,55%,62%)] hover:text-background transition-colors">
            Записаться
          </button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-3">
            {[["О нас","about"],["Процесс","process"],["Преимущества","features"],["Отзывы","reviews"],["FAQ","faq"],["Контакт","contact"]].map(([l,id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left font-body text-sm py-1">{l}</button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_RESULT} alt="Интерьер под ключ" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/72" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "128px" }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-body text-xs tracking-[0.3em] text-[hsl(36,55%,62%)] uppercase mb-5"
              style={{ animation: "fadeUp 0.7s 0.1s ease both" }}>
              Дизайн интерьера под ключ
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-medium text-foreground leading-[1.1] mb-6"
              style={{ animation: "fadeUp 0.7s 0.2s ease both" }}>
              От замера<br />
              <em className="italic font-normal text-[hsl(36,55%,62%)]">до переезда</em><br />
              без стрессов
            </h1>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8 max-w-md"
              style={{ animation: "fadeUp 0.7s 0.35s ease both" }}>
              Один контакт — один проект. Мы берём на себя весь процесс: замер, проектирование, ремонт, комплектацию и финальную уборку. Вам остаётся только въезжать.
            </p>
            <div className="flex flex-wrap gap-3" style={{ animation: "fadeUp 0.7s 0.5s ease both" }}>
              <button onClick={() => scrollTo("contact")}
                className="bg-[hsl(36,55%,62%)] text-background font-body text-sm px-7 py-3.5 hover:bg-[hsl(36,55%,55%)] transition-colors">
                Заказать замер
              </button>
              <button onClick={() => scrollTo("contact")}
                className="border border-border font-body text-sm text-foreground px-7 py-3.5 hover:border-[hsl(36,55%,62%)] hover:text-[hsl(36,55%,62%)] transition-colors">
                Просчитать бюджет
              </button>
            </div>
          </div>

          <div className="hidden md:grid grid-cols-2 gap-px bg-border"
            style={{ animation: "fadeUp 0.7s 0.4s ease both" }}>
            {[["200+","проектов реализовано"],["7","шагов под ключ"],["3–6","месяцев на квартиру"],["Вся","Россия"]].map(([n, l]) => (
              <div key={n} className="bg-card p-6">
                <div className="font-display text-4xl font-medium text-[hsl(36,55%,62%)] mb-1">{n}</div>
                <div className="font-body text-xs text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <Icon name="ChevronDown" size={18} className="text-muted-foreground" />
        </div>
      </section>

      {/* PROBLEM */}
      <section id="about" className="py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="font-body text-xs tracking-[0.3em] text-[hsl(36,55%,62%)] uppercase mb-5 section-rule">Проблема</p>
            <h2 className="font-display text-4xl font-medium text-foreground leading-tight mb-6">
              Сколько ещё вы будете делать всё сами?
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-5">Вы устали от того, что нужно:</p>
            <ul className="space-y-3 mb-8">
              {PROBLEMS.map((p, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-sm text-foreground/75">
                  <span className="text-[hsl(36,55%,62%)] mt-0.5 flex-shrink-0">—</span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="border-l-2 border-[hsl(36,55%,62%)] pl-5 py-1">
              <p className="font-body text-sm text-foreground font-medium">Мы работаем по принципу <span className="text-[hsl(36,55%,62%)]">«один контакт, один проект»</span> — ведём от замера до сдачи и переезда.</p>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="relative">
            <img src={IMG_PROCESS} alt="Процесс работы" className="w-full h-[420px] object-cover" />
            <div className="absolute top-6 -right-2 md:-right-4 bg-[hsl(36,55%,62%)] px-5 py-3">
              <p className="font-body text-xs text-background font-medium">Авторский надзор на каждом этапе</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <p className="font-body text-xs tracking-[0.3em] text-[hsl(36,55%,62%)] uppercase mb-4 section-rule">Как мы работаем</p>
            <h2 className="font-display text-4xl font-medium text-foreground">7 шагов вашего интерьера</h2>
          </Reveal>
          <div className="divide-y divide-border">
            {STEPS.map((s, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="grid md:grid-cols-[80px_1fr_1fr] gap-4 py-7 group hover:bg-card transition-colors px-2">
                  <span className="font-display text-3xl font-light text-[hsl(36,55%,62%)]/35 group-hover:text-[hsl(36,55%,62%)] transition-colors">{s.n}</span>
                  <h3 className="font-display text-xl font-medium text-foreground self-center">{s.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed self-center">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-10 p-6 border border-[hsl(36,55%,62%)]/30 bg-card">
            <p className="font-body text-sm text-foreground">
              <span className="text-[hsl(36,55%,62%)] font-medium">Итог:</span> вы получаете не просто «дизайн-проект», а готовый интерьер, в который можно сразу въезжать и жить.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <p className="font-body text-xs tracking-[0.3em] text-[hsl(36,55%,62%)] uppercase mb-4 section-rule">Почему мы</p>
            <h2 className="font-display text-4xl font-medium text-foreground">Почему клиенты в России выбирают нас</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {FEATURES.map((f, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="bg-background p-7 h-full group hover:bg-card transition-colors">
                  <div className="w-9 h-9 border border-border flex items-center justify-center mb-5 group-hover:border-[hsl(36,55%,62%)] transition-colors">
                    <Icon name={f.icon as "Users" | "Receipt" | "MapPin" | "Fingerprint" | "ShieldCheck"} size={16} className="text-muted-foreground group-hover:text-[hsl(36,55%,62%)] transition-colors" fallback="Star" />
                  </div>
                  <h3 className="font-display text-lg font-medium text-foreground mb-3">{f.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOR WHOM */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <Reveal delay={0.1} className="relative order-2 md:order-1">
            <img src={IMG_RESULT} alt="Готовый интерьер" className="w-full h-[380px] object-cover" />
          </Reveal>
          <Reveal className="order-1 md:order-2">
            <p className="font-body text-xs tracking-[0.3em] text-[hsl(36,55%,62%)] uppercase mb-5 section-rule">Для кого</p>
            <h2 className="font-display text-4xl font-medium text-foreground leading-tight mb-6">
              Для тех, кто ценит своё время
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-5">Работаем с жилыми объектами (квартиры, дома) и коммерческими проектами (офисы, коворкинги, заведения) по всей России. Идеально для тех, кто:</p>
            <ul className="space-y-4">
              {[
                "Хочет современный и удобный интерьер, а не «дизайн ради фото»",
                "Не хочет тратить месяцы на поиски и согласования",
                "Готов доверить проект команде, которая работает под ключ",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 border border-[hsl(36,55%,62%)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={11} className="text-[hsl(36,55%,62%)]" />
                  </div>
                  <span className="font-body text-sm text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-body text-sm text-muted-foreground mt-5">
              Вы не теряете контроль — вы получаете чёткий план, сроки и бюджет.
            </p>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-12">
            <p className="font-body text-xs tracking-[0.3em] text-[hsl(36,55%,62%)] uppercase mb-4 section-rule">Отзывы</p>
            <h2 className="font-display text-4xl font-medium text-foreground">Что говорят клиенты</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {REVIEWS.map((r, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-background p-7 h-full flex flex-col justify-between">
                  <p className="font-body text-sm text-foreground/80 leading-relaxed italic mb-6">{r.text}</p>
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">{r.author}</p>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">{r.city}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="mb-12">
            <p className="font-body text-xs tracking-[0.3em] text-[hsl(36,55%,62%)] uppercase mb-4 section-rule">Вопросы</p>
            <h2 className="font-display text-4xl font-medium text-foreground">Часто задаваемые вопросы</h2>
          </Reveal>
          <div className="divide-y divide-border">
            {FAQ.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left py-6 flex items-start justify-between gap-4 group">
                  <span className="font-display text-lg font-medium text-foreground group-hover:text-[hsl(36,55%,62%)] transition-colors">
                    {item.q}
                  </span>
                  <Icon name={openFaq === i ? "Minus" : "Plus"} size={16} className="text-[hsl(36,55%,62%)] flex-shrink-0 mt-1.5" />
                </button>
                {openFaq === i && (
                  <div className="pb-6" style={{ animation: "fadeUp 0.3s ease both" }}>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <Reveal>
            <p className="font-body text-xs tracking-[0.3em] text-[hsl(36,55%,62%)] uppercase mb-5 section-rule">Начать проект</p>
            <h2 className="font-display text-4xl font-medium text-foreground leading-tight mb-6">
              Готовы начать уже сейчас?
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-6">Напишите нам — в течение 24 часов мы подготовим:</p>
            <ul className="space-y-3 mb-8">
              {["Бесплатный предварительный расчёт бюджета","План первого этапа работ","Список документов, которые нужно подготовить"].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 border border-[hsl(36,55%,62%)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={11} className="text-[hsl(36,55%,62%)]" />
                  </div>
                  <span className="font-body text-sm text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-3 pt-6 border-t border-border">
              {[
                { icon: "Phone", text: "+7 (495) 000-00-00" },
                { icon: "Mail", text: "info@studio-design.ru" },
                { icon: "MapPin", text: "Москва, Санкт-Петербург, вся Россия" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon name={icon as "Phone" | "Mail" | "MapPin"} size={14} className="text-[hsl(36,55%,62%)]" fallback="Info" />
                  <span className="font-body text-sm text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={e => e.preventDefault()} className="space-y-4">
              <div>
                <label className="font-body text-xs text-muted-foreground tracking-wide uppercase block mb-2">Ваше имя</label>
                <input
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Как вас зовут?"
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-[hsl(36,55%,62%)] transition-colors"
                />
              </div>
              <div>
                <label className="font-body text-xs text-muted-foreground tracking-wide uppercase block mb-2">Телефон</label>
                <input
                  value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-[hsl(36,55%,62%)] transition-colors"
                />
              </div>
              <div>
                <label className="font-body text-xs text-muted-foreground tracking-wide uppercase block mb-2">Тип объекта</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Квартира", "Дом", "Офис", "Другое"].map(t => (
                    <button key={t} type="button" onClick={() => setForm(p => ({ ...p, type: t }))}
                      className={`py-2.5 font-body text-xs transition-colors ${form.type === t
                        ? "bg-[hsl(36,55%,62%)] text-background"
                        : "border border-border text-muted-foreground hover:border-[hsl(36,55%,62%)] hover:text-foreground"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit"
                className="w-full bg-[hsl(36,55%,62%)] text-background font-body text-sm py-3.5 hover:bg-[hsl(36,55%,55%)] transition-colors mt-2">
                Записаться на консультацию
              </button>
              <p className="font-body text-xs text-muted-foreground text-center">
                Нажимая кнопку, вы соглашаетесь с Политикой обработки персональных данных
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-base tracking-wide text-foreground/60">Студия дизайна интерьера</span>
          <p className="font-body text-xs text-muted-foreground">© 2026 Дизайн интерьера под ключ по всей России</p>
          <p className="font-body text-xs text-muted-foreground">Москва · Санкт-Петербург · Другие города РФ</p>
        </div>
      </footer>

    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_PROCESS = "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/7b882352-dada-4fbc-b04a-d1444e58173b.jpg";
const IMG_RESULT = "https://cdn.poehali.dev/files/28643067-fd58-47f9-8b71-0dd9454bfeb2.JPG";

const STEPS = [
  { n: "01", title: "Замер и анализ", desc: "Бесплатный или расчётный выезд (онлайн/офлайн), диагностика планировки, пожеланий, бюджета." },
  { n: "02", title: "Концепция и 3D", desc: "2–3 стилистических направления, планировка, 3D-визуализация основных зон. Вы видите результат до ремонта." },
  { n: "03", title: "Техническая документация", desc: "Развёртки стен, раскладка плитки, схемы электрики, сантехники и света." },
  { n: "04", title: "Подбор материалов и мебели", desc: "Trade-снабжение, закупки, контроль сроков поставок, работа с брендами." },
  { n: "05", title: "Ремонт и авторский надзор", desc: "Контроль качества и сроков, решение живых вопросов на площадке." },
  { n: "06", title: "Комплектация и декор", desc: "Мебель, текстиль, свет, аксессуары, зелень — всё до мелочей." },
  { n: "07", title: "Финальная уборка и переезд", desc: "Готовый интерьер, чистый и удобный, с картой и чек-листом по уходу." },
];

const FEATURES = [
  { icon: "Users", title: "Один контакт вместо десяти", desc: "Вы говорите только с нами — мы решаем всё за кулисами. Никакой беготни между подрядчиками." },
  { icon: "Receipt", title: "Чёткий бюджет и сроки", desc: "Никаких «вдруг появится» лишних расходов. Всё прописано до старта." },
  { icon: "Fingerprint", title: "Индивидуальный подход", desc: "Мы не шаблонизируем, а создаём интерьер, который отражает ваш характер и образ жизни." },
  { icon: "ClipboardList", title: "Прозрачный процесс", desc: "Вы видите этапы, сроки, чек-лист и отчёт на каждом шаге." },
  { icon: "ShieldCheck", title: "Гарантия результата", desc: "Мы не сдаём проект «как есть», а корректируем до полного согласия." },
  { icon: "Sparkles", title: "Красота в деталях", desc: "Каждый материал, светильник и аксессуар подбирается вручную — чтобы интерьер жил и радовал годами." },
];

const REVIEWS = [
  { text: "Не ожидали, что можно так спокойно отдать в руки весь процесс — от замера до переезда. Итог даже лучше, чем в 3D.", author: "Наталья К.", city: "Москва", stars: 5, avatar: "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/66c8d441-b7b8-437e-b7e1-f9e6dafff2e2.jpg" },
  { text: "Сначала думали, что будет дорого, но потом поняли: экономия на стрессе и времени стоила этих денег.", author: "Елена М.", city: "Санкт-Петербург", stars: 5, avatar: "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/07c0167c-170b-4002-92ac-d9bd53534f39.jpg" },
  { text: "Не хотелось заниматься шторами, мебелью и светом — теперь и не надо. Всё сделали за нас, причём с вкусом.", author: "Дмитрий В.", city: "Франкфурт", stars: 5, avatar: "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/6796dadf-3a50-42ab-824d-8d25d2ed5cf4.jpg" },
  { text: "Студия взяла всё на себя: от замера до комплектации. Мы жили в другом городе — ни разу не пожалели. Дом получился таким, как я мечтала: светлым, удобным и очень домашним.", author: "Ольга С.", city: "Краснодар", stars: 5, avatar: "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/8c9d364d-6357-4e35-8837-c112a4ca008b.jpg" },
  { text: "Студия сначала показала 3D, потом всё сопровождала до конца. Квартира получилась намного более продуманной, чем я планировала. Главное — не пришлось ничего доделывать после ремонта.", author: "Екатерина В.", city: "Москва", stars: 5, avatar: "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/aaff633c-b642-4bdc-8f0e-f03452f5bc45.jpg" },
  { text: "Студия предложила решения, о которых мы даже не думали — открытую лестницу со светом, панорамное окно в гостиной. Каждая деталь на месте, ничего лишнего.", author: "Михаил С.", city: "Подмосковье", stars: 5, avatar: "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/77b1b0ff-f23a-424f-b645-f1e9b6f229ac.jpg" },
];

const FAQ = [
  { q: "Сколько стоит дизайн интерьера под ключ?", a: "Стоимость зависит от формата объекта, площади и сложности. После замера мы готовим детальный расчёт с разбивкой по этапам." },
  { q: "Могу ли я контролировать бюджет и выбирать материалы?", a: "Да. Мы даём несколько вариантов решений по цене и материалам, вы выбираете комфортный для себя уровень." },
  { q: "Как происходит замер — онлайн или выезд?", a: "Мы проводим выездной замер в Москве и Франкфурте, а также онлайн-консультации по видео и планам для других городов." },
  { q: "Сколько длится процесс от замера до переезда?", a: "Для квартиры — от 3 до 6 месяцев, для коммерческих объектов — от 4 до 9 месяцев. Точный срок фиксируем в договоре." },
];

const CALC_OBJECTS = [
  { label: "Квартира", mult: 1.0 },
  { label: "Дом / Коттедж", mult: 1.25 },
  { label: "Офис", mult: 1.15 },
  { label: "Ресторан / Кафе", mult: 1.4 },
  { label: "Апартаменты", mult: 1.1 },
];

const CALC_PACKAGES = [
  { label: "Концепция", pricePerSqm: 900, desc: "Стиль, мудборд, планировка, 3D" },
  { label: "Дизайн-проект", pricePerSqm: 1600, desc: "+ Чертежи, развёртки, спецификации" },
  { label: "Проект + надзор", pricePerSqm: 2400, desc: "+ Авторский надзор на ремонте" },
  { label: "Под ключ", pricePerSqm: 3800, desc: "+ Комплектация, закупка, переезд" },
];

const PROBLEMS = [
  "Общаться с кучей подрядчиков",
  "Переплачивать за «промежуточные» ошибки",
  "«Дорабатывать» интерьер уже после ремонта",
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

function useParallax(strength = 0.18) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(center * strength);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [strength]);
  return { ref, offset };
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

function GoldLine({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useVisible();
  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={`underline-gold ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </span>
  );
}

const NADSOR_PHOTOS = [
  "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/df61c9a3-ea6b-4688-b72d-cb2fb09d3af0.jpeg",
  "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/f78081bb-6384-4da1-9890-3bae50de289c.jpeg",
  "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/95900c7c-bbd9-4c36-a4cd-c8aa5ca44731.jpeg",
  "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/419a14f8-8865-4968-9246-728b56d3d8d7.JPG",
  "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/a5cc70f3-2bb8-43bf-9813-3eb514a02820.JPG",
  "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/e62a7bd0-ef9a-4921-bdd7-f291c221ad48.jpg",
];

function BeforeAfterSlider({ before, after, className = "aspect-[4/3]" }: { before: string; after: string; className?: string }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none cursor-ew-resize ${className}`}
      onMouseDown={() => { dragging.current = true; }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onMouseMove={e => { if (dragging.current) move(e.clientX); }}
      onTouchMove={e => move(e.touches[0].clientX)}
    >
      <img src={after} alt="После" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt="До" className="absolute inset-0 h-full object-cover" style={{ width: containerRef.current?.offsetWidth ?? "100vw", maxWidth: "none" }} />
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-gold shadow-lg" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-gold flex items-center justify-center shadow-xl">
          <Icon name="ChevronsLeftRight" size={16} className="text-charcoal" />
        </div>
      </div>
      <div className="absolute top-3 left-3 bg-black/60 text-white font-body text-xs px-2 py-1">До</div>
      <div className="absolute top-3 right-3 bg-gold text-charcoal font-body text-xs px-2 py-1 font-medium">После</div>
    </div>
  );
}

function MissionPhoto() {
  const { ref, offset } = useParallax(0.08);
  return (
    <div ref={ref} className="w-full overflow-hidden">
      <img
        src="https://cdn.poehali.dev/files/45ced571-529d-4290-8de8-f372a15d4a5b.jpg"
        alt="Анастасия Белецкая — основатель Студии ДА"
        className="w-full object-contain"
        style={{ transform: `translateY(${offset}px)`, willChange: "transform" }}
        loading="lazy"
      />
    </div>
  );
}

const TRACK = {
  url: "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/6d9a530b-1c28-4c32-8c0c-e7a6314fb969.mp3",
  title: "Музыка про дизайн и ремонт",
  artist: "Студия дизайна интерьера",
};

function MiniPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); } else { a.play(); }
    setPlaying(!playing);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-4 border border-border bg-background px-5 py-4 mt-8">
      <audio
        ref={audioRef}
        src={TRACK.url}
        onTimeUpdate={() => {
          const a = audioRef.current;
          if (a) setProgress(a.currentTime);
        }}
        onLoadedMetadata={() => {
          const a = audioRef.current;
          if (a) setDuration(a.duration);
        }}
        onEnded={() => setPlaying(false)}
      />
      <button
        onClick={toggle}
        className="w-10 h-10 flex-shrink-0 border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
        aria-label={playing ? "Пауза" : "Играть"}
      >
        <Icon name={playing ? "Pause" : "Play"} size={16} className="text-gold" />
      </button>
      <div className="flex-1 min-w-0">
        <p className="font-body text-xs font-medium text-foreground truncate">{TRACK.title}</p>
        <p className="font-body text-xs text-muted-foreground truncate">{TRACK.artist}</p>
        <div className="mt-2 relative h-px bg-border cursor-pointer"
          onClick={(e) => {
            const a = audioRef.current;
            if (!a || !duration) return;
            const rect = e.currentTarget.getBoundingClientRect();
            a.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
          }}>
          <div
            className="absolute top-0 left-0 h-px bg-gold transition-all"
            style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }}
          />
        </div>
      </div>
      <span className="font-body text-xs text-muted-foreground flex-shrink-0">
        {duration ? `${fmt(progress)} / ${fmt(duration)}` : "—:—"}
      </span>
      <Icon name="Music" size={14} className="text-muted-foreground flex-shrink-0" />
    </div>
  );
}

function PromoPopup({ onClose, onCta }: { onClose: () => void; onCta: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/75" />
      <div
        className="relative bg-background border border-border max-w-md w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ animation: "fadeUp 0.4s ease both" }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10">
          <Icon name="X" size={16} />
        </button>

        <div className="bg-gold px-8 py-7 text-[hsl(var(--charcoal))]">
          <p className="font-body text-xs tracking-[0.3em] uppercase mb-2 opacity-80">Специальное предложение</p>
          <h2 className="font-display text-4xl font-medium leading-tight mb-1">Скидка 10%</h2>
          <p className="font-display text-lg font-light opacity-90">на дизайн-проект</p>
        </div>

        <div className="px-8 py-7">
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
            Закажите проект <span className="text-foreground font-medium">прямо сейчас</span> — и получите скидку 10% на любой пакет услуг. Предложение действует только для новых клиентов и ограничено по времени.
          </p>

          <ul className="space-y-2 mb-7">
            {["Бесплатный предварительный расчёт", "3D-визуализация в подарок", "Личный дизайнер на весь проект"].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-4 h-4 border border-gold flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={10} className="text-gold" />
                </div>
                <span className="font-body text-xs text-foreground/80">{item}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={onCta}
            className="w-full bg-gold text-background font-body text-sm py-3.5 hover:bg-[hsl(40,55%,44%)] transition-colors mb-3"
          >
            Получить скидку 10%
          </button>
          <button onClick={onClose} className="w-full font-body text-xs text-muted-foreground hover:text-foreground transition-colors py-1">
            Нет, спасибо
          </button>
        </div>
      </div>
    </div>
  );
}

function PrivacyModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="relative bg-background border border-border max-w-2xl w-full max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ animation: "fadeUp 0.3s ease both" }}
      >
        <div className="flex items-center justify-between px-8 py-5 border-b border-border">
          <h2 className="font-display text-xl font-medium text-foreground">Политика конфиденциальности</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:text-gold transition-colors">
            <Icon name="X" size={18} className="text-muted-foreground" />
          </button>
        </div>
        <div className="overflow-y-auto px-8 py-6 space-y-5 font-body text-sm text-muted-foreground leading-relaxed">
          <p className="text-foreground font-medium">Последнее обновление: апрель 2026 г.</p>

          <section>
            <h3 className="font-medium text-foreground mb-2">1. Общие положения</h3>
            <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей, которые оставляют заявку на сайте Студии дизайна и архитектуры Анастасии Белецкой («Студия ДА»). Обработка персональных данных осуществляется в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».</p>
          </section>

          <section>
            <h3 className="font-medium text-foreground mb-2">2. Какие данные мы собираем</h3>
            <p>При заполнении формы на сайте мы собираем следующие персональные данные:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Имя и фамилия</li>
              <li>Номер телефона</li>
              <li>Адрес электронной почты</li>
              <li>Информация о проекте (тип объекта, сообщение)</li>
            </ul>
          </section>

          <section>
            <h3 className="font-medium text-foreground mb-2">3. Цели обработки данных</h3>
            <p>Ваши данные используются исключительно для:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Связи с вами по вопросам вашей заявки</li>
              <li>Подготовки предварительного расчёта стоимости проекта</li>
              <li>Консультации по услугам студии</li>
            </ul>
          </section>

          <section>
            <h3 className="font-medium text-foreground mb-2">4. Передача данных третьим лицам</h3>
            <p>Мы не передаём ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством Российской Федерации. Данные не используются в рекламных целях и не продаются.</p>
          </section>

          <section>
            <h3 className="font-medium text-foreground mb-2">5. Хранение и защита данных</h3>
            <p>Персональные данные хранятся на защищённых серверах и обрабатываются ограниченным кругом сотрудников. Мы принимаем необходимые технические и организационные меры для защиты ваших данных от несанкционированного доступа.</p>
          </section>

          <section>
            <h3 className="font-medium text-foreground mb-2">6. Срок хранения</h3>
            <p>Данные хранятся в течение 3 лет с момента получения заявки, либо до момента отзыва согласия.</p>
          </section>

          <section>
            <h3 className="font-medium text-foreground mb-2">7. Ваши права</h3>
            <p>Вы вправе в любое время:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Запросить доступ к своим данным</li>
              <li>Потребовать исправления или удаления данных</li>
              <li>Отозвать согласие на обработку</li>
            </ul>
            <p className="mt-2">Для этого направьте запрос на почту: <span className="text-foreground">Studioda.1@yandex.ru</span></p>
          </section>

          <section>
            <h3 className="font-medium text-foreground mb-2">8. Контакты</h3>
            <p>Студия дизайна и архитектуры Анастасии Белецкой («Студия ДА»)<br />Телефон: 8 908 992-12-47<br />Email: Studioda.1@yandex.ru<br />Москва, Россия</p>
          </section>
        </div>
        <div className="px-8 py-5 border-t border-border">
          <button onClick={onClose}
            className="w-full bg-gold text-background font-body text-sm py-3 hover:bg-[hsl(40,55%,44%)] transition-colors">
            Понятно, закрыть
          </button>
        </div>
      </div>
    </div>
  );
}

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="Star" size={13}
          className={i < stars ? "text-gold fill-[hsl(var(--gold))]" : "text-border"} />
      ))}
    </div>
  );
}

function ReviewsGrid() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(REVIEWS.length / perPage);
  const visible = REVIEWS.slice(page * perPage, page * perPage + perPage);

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-px bg-border">
        {visible.map((r, i) => (
          <div key={i} className="bg-background p-7 flex flex-col gap-4">
            <StarRating stars={r.stars} />
            <p className="font-body text-sm text-foreground/80 leading-relaxed flex-1">"{r.text}"</p>
            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <img src={r.avatar} alt={r.author} className="w-10 h-10 rounded-full object-cover flex-shrink-0" loading="lazy" />
              <div>
                <p className="font-body text-sm font-medium text-foreground">{r.author}</p>
                <p className="font-body text-xs text-muted-foreground">{r.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {pages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="font-body text-xs text-muted-foreground">{page * perPage + 1}–{Math.min(page * perPage + perPage, REVIEWS.length)} из {REVIEWS.length} отзывов</p>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
              className="w-9 h-9 border border-border flex items-center justify-center hover:border-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
              <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
            </button>
            <button onClick={() => setPage(p => Math.min(pages - 1, p + 1))} disabled={page === pages - 1}
              className="w-9 h-9 border border-border flex items-center justify-center hover:border-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function NadsorStrip({ photos }: { photos: string[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const moved = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    moved.current = false;
    startX.current = e.pageX - (stripRef.current?.offsetLeft ?? 0);
    scrollLeft.current = stripRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || !stripRef.current) return;
    const x = e.pageX - stripRef.current.offsetLeft;
    const walk = x - startX.current;
    if (Math.abs(walk) > 3) moved.current = true;
    stripRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const onMouseUp = () => { dragging.current = false; };

  return (
    <>
      <div
        ref={stripRef}
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {photos.map((src, i) => (
          <button
            key={i}
            className="flex-shrink-0 focus:outline-none"
            onClick={() => { if (!moved.current) setLightbox(i); }}
          >
            <img
              src={src}
              alt={`Авторский надзор ${i + 1}`}
              className="w-24 h-16 object-cover opacity-75 hover:opacity-100 transition-opacity"
              loading="lazy"
              draggable={false}
            />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/70 hover:text-gold transition-colors"
            onClick={() => setLightbox(null)}
          >
            <Icon name="X" size={22} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/70 hover:text-gold transition-colors"
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i - 1 + photos.length) % photos.length : null); }}
          >
            <Icon name="ChevronLeft" size={28} />
          </button>
          <img
            src={photos[lightbox]}
            alt={`Авторский надзор ${lightbox + 1}`}
            className="max-h-[85vh] max-w-full object-contain"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/70 hover:text-gold transition-colors"
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i + 1) % photos.length : null); }}
          >
            <Icon name="ChevronRight" size={28} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setLightbox(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === lightbox ? "bg-gold" : "bg-white/30"}`} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const PORTFOLIO = [
  { category: "apartment", title: "Квартира 80 м², Москва", desc: "Современный минимализм с функциональной кухней-гостиной и скрытыми зонами хранения. Проект под ключ: от замера до комплектации.", imgs: ["https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/2857c0b1-9dd4-4268-ba37-4968d4984948.jpg"] },
  { category: "house", title: "Дом 250 м², Владивосток. Садгород", desc: "Тёплый современный дом с высокими потолками, кухней-столовой и зоной отдыха у камина. Полный цикл: от замера до мебели.", imgs: [
    "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/c00082a6-6651-44e7-8839-b271318c2494.JPG",
    "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/6c5f368d-4d56-4ba5-8edd-190b264d4f4d.JPG",
    "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/3e4b5d5c-dc3c-448b-b736-f7a8b589392c.JPG",
    "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/94633c51-24ce-4d34-824a-3743aa526307.JPG",
    "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/c980794f-4b63-464c-a855-504961d96ea0.JPG",
  ]},
  { category: "house", title: "Дом в коттеджном посёлке", desc: "Функциональный интерьер под семью с детьми, акцент на безопасности, зоне хранения и комфортном пространстве.", imgs: ["https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/d2a097fc-9b5c-4eb7-998e-a83ed81da19b.jpg"] },
  { category: "office", title: "Офис стартапа, 120 м²", desc: "Современный open-space с кабинетами, переговорной и зоной отдыха. Интерьер для продуктивности и командной атмосферы.", imgs: ["https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/9121f40c-d821-4954-a4ef-30f2f8e748df.jpg"] },
  { category: "commercial", title: "Заведение в центре города", desc: "Уникальный концептуальный интерьер с продуманным освещением, зонированием и сценарием прохода гостей.", imgs: ["https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/ef0d2f3e-c88d-474c-a85d-d87854d5baea.jpg"] },
  { category: "commercial", title: "Бутик одежды", desc: "Интерьер, который подчёркивает бренд и создаёт комфортную атмосферу для покупателей и примерок.", imgs: ["https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/3f31d253-9c83-4ea2-b720-1c25a434d68a.jpg"] },
  { category: "commercial", title: "Автоцентр — дизайн-проект и авторское сопровождение", desc: "Разработка концепции и полное авторское сопровождение строительства автоцентра: шоу-рум, клиентская зона, технические помещения.", imgs: ["https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/files/9121f40c-d821-4954-a4ef-30f2f8e748df.jpg"] },
  { category: "commercial", title: "Геокупол «Купол неба» — дизайн-проект и авторский надзор", desc: "Концепция интерьера геодезического купола: кольцевые светильники, прозрачные стулья, природный камень снаружи и воздушное пространство внутри.", imgs: [
    "https://cdn.poehali.dev/files/6760a717-58ff-410c-872f-ebb3193cdb97.jpg",
    "https://cdn.poehali.dev/files/60ac5cc8-eedd-4d33-9f7d-2db5ac0a6526.jpg",
    "https://cdn.poehali.dev/files/3447984f-46fa-4eff-9a79-0e43cbba8bfc.jpg",
    "https://cdn.poehali.dev/files/267f8c0f-53a2-4cb6-a643-dff07f311c38.jpg",
    "https://cdn.poehali.dev/files/59f11c28-bbd2-4e01-b29e-58de187356c6.jpg",
  ]},
  { category: "apartment", title: "Квартира в голубом — Полетаева 23А", desc: "Элегантный интерьер с голубыми фасадами кухни, мраморным фартуком с синими прожилками, живописной гостиной с тропическим фотообоем и стильной прихожей.", imgs: [
    "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/8c140b90-5f9c-48a2-bca0-c5eec766798b.JPG",
    "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/68dc3b5f-1224-4eea-83be-6befa5d0dbde.JPG",
    "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/745dd1e2-ec26-4fdc-82bf-f66e5e78e6d0.JPG",
    "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/98cabc23-e111-4039-936c-f4e4b592ff9f.JPG",
    "https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/2dd785d8-8903-40c5-898e-ee5575b893ae.JPG",
  ]},
];

const PORTFOLIO_FILTERS = [
  { key: "all", label: "Все проекты" },
  { key: "apartment", label: "Квартиры" },
  { key: "house", label: "Дома" },
  { key: "office", label: "Офисы" },
  { key: "commercial", label: "Коммерческие" },
];

function PortfolioCard({ p, delay }: { p: typeof PORTFOLIO[0]; delay: number }) {
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const multi = p.imgs.length > 1;
  const { ref, visible } = useVisible();

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") setIdx(i => (i + 1) % p.imgs.length);
      if (e.key === "ArrowLeft") setIdx(i => (i - 1 + p.imgs.length) % p.imgs.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, p.imgs.length]);

  return (
    <>
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center"
            onClick={() => setLightbox(false)}
          >
            <Icon name="X" size={24} />
          </button>
          {multi && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center"
              onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + p.imgs.length) % p.imgs.length); }}
            >
              <Icon name="ChevronLeft" size={32} />
            </button>
          )}
          <img
            src={p.imgs[idx]}
            alt={p.title}
            className="max-h-[88vh] max-w-full object-contain"
            onClick={e => e.stopPropagation()}
          />
          {multi && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center"
              onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % p.imgs.length); }}
            >
              <Icon name="ChevronRight" size={32} />
            </button>
          )}
          {multi && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {p.imgs.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setIdx(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? "bg-gold" : "bg-white/30"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <Reveal delay={delay}>
      <div className="bg-background group overflow-hidden">
        <div ref={ref} className="relative overflow-hidden aspect-[4/3] cursor-zoom-in" onClick={() => setLightbox(true)}>
          <img
            src={p.imgs[idx]}
            alt={p.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            style={{
              transform: visible ? "translateY(0)" : "translateY(40px)",
              opacity: visible ? 1 : 0,
              transition: `transform 0.8s ${delay + 0.1}s cubic-bezier(0.4,0,0.2,1), opacity 0.8s ${delay + 0.1}s ease`,
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <Icon name="ZoomIn" size={28} className="text-white opacity-0 group-hover:opacity-80 transition-opacity drop-shadow-lg" />
          </div>
          {multi && (
            <>
              <button
                onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + p.imgs.length) % p.imgs.length); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 flex items-center justify-center transition-colors z-10"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              <button
                onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % p.imgs.length); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 flex items-center justify-center transition-colors z-10"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {p.imgs.map((_, i) => (
                  <button key={i} onClick={e => { e.stopPropagation(); setIdx(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? "bg-gold" : "bg-white/50"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="p-6">
          <h3 className="font-display text-lg font-medium text-foreground mb-2">{p.title}</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
        </div>
      </div>
      </Reveal>
    </>
  );
}

function PortfolioSection() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? PORTFOLIO : PORTFOLIO.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="mb-10">
          <p className="font-body text-xs tracking-[0.3em] text-gold uppercase mb-4 section-rule">Портфолио</p>
          <h2 className="font-display text-4xl font-medium text-foreground mb-3">Наши проекты по типам объектов</h2>
          <p className="font-body text-sm text-muted-foreground max-w-xl">Выберите категорию, чтобы посмотреть реальные примеры интерьера от замера до переезда.</p>
        </Reveal>

        <div className="flex flex-wrap gap-2 mb-10">
          {PORTFOLIO_FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`font-body text-xs px-4 py-2 border transition-colors ${filter === f.key ? "bg-gold text-background border-gold" : "border-border text-muted-foreground hover:border-gold hover:text-foreground"}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {filtered.map((p, i) => (
            <PortfolioCard key={p.title} p={p} delay={i * 0.06} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="inline-block font-body text-sm border border-border px-8 py-3 text-foreground hover:border-gold hover:text-gold transition-colors">
            Обсудить ваш проект
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "Квартира", message: "" });
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [menuOpen, setMenuOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("promo_shown");
    if (shown) return;
    const t = setTimeout(() => {
      setPromoOpen(true);
      sessionStorage.setItem("promo_shown", "1");
    }, 10000);
    return () => clearTimeout(t);
  }, []);

  const SUBMIT_URL = "https://functions.poehali.dev/9d0bc1fe-55c4-4633-80f9-4e76e866bf34";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setFormState("loading");
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, object_type: form.type, message: form.message, promo: promoApplied ? "скидка_10%" : undefined }),
      });
      if (res.ok) {
        setFormState("success");
        setForm({ name: "", phone: "", email: "", type: "Квартира", message: "" });
        // @ts-expect-error ym is injected by Yandex Metrika
        if (typeof ym !== "undefined") ym(108514213, "reachGoal", "form_submit");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const [calcArea, setCalcArea] = useState(70);
  const [calcObj, setCalcObj] = useState(0);
  const [calcPkg, setCalcPkg] = useState(1);
  const calcPrice = Math.round(calcArea * CALC_PACKAGES[calcPkg].pricePerSqm * CALC_OBJECTS[calcObj].mult);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-gold/20 bg-charcoal/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex flex-col leading-tight">
            <span className="font-display text-base tracking-widest text-gold">Студия ДА</span>
            <span className="font-body text-[9px] tracking-[0.2em] text-white/40 uppercase">Анастасия Белецкая</span>
          </div>
          <nav className="hidden md:flex items-center gap-7">
            {[["О нас","about"],["Процесс","process"],["Преимущества","features"],["Портфолио","portfolio"],["Отзывы","reviews"],["Калькулятор","calculator"],["FAQ","faq"]].map(([l,id]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="font-body text-sm text-white/60 hover:text-gold transition-colors">
                {l}
              </button>
            ))}
          </nav>
          <button onClick={() => scrollTo("contact")}
            className="hidden md:block font-body text-sm border border-gold/50 text-gold px-5 py-2 hover:bg-gold hover:text-charcoal transition-colors">
            Записаться
          </button>
          <button className="md:hidden text-white/70" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-charcoal border-t border-gold/20 px-6 py-4 flex flex-col gap-3">
            {[["О нас","about"],["Процесс","process"],["Преимущества","features"],["Портфолио","portfolio"],["Отзывы","reviews"],["Калькулятор","calculator"],["FAQ","faq"],["Контакт","contact"]].map(([l,id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left font-body text-sm py-1 text-white/60 hover:text-gold transition-colors">{l}</button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section aria-label="Главный экран" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_RESULT} alt="Готовый интерьер квартиры под ключ — студия дизайна" className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <p className="font-body text-xs tracking-[0.3em] text-gold uppercase mb-5"
              style={{ animation: "fadeUp 0.7s 0.1s ease both" }}>
              Студия дизайна и архитектуры Анастасии Белецкой
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-medium text-white leading-[1.1] mb-6"
              style={{ animation: "fadeUp 0.7s 0.2s ease both" }}>
              От замера<br />
              <em className="italic font-normal text-gold"><GoldLine>до переезда</GoldLine></em><br />
              без стресса
            </h1>
            <p className="font-body text-base text-white/80 leading-relaxed mb-8 max-w-md"
              style={{ animation: "fadeUp 0.7s 0.35s ease both" }}>
              Без догадок и лишних звонков. Единая точка ответственности — мы берём весь процесс от замера до финальной уборки. Вам остаётся только наслаждаться готовым интерьером.
            </p>
            <div className="flex flex-wrap gap-3" style={{ animation: "fadeUp 0.7s 0.5s ease both" }}>
              <button onClick={() => scrollTo("contact")}
                className="bg-gold text-background font-body text-sm px-7 py-3.5 hover:bg-[hsl(40,55%,44%)] transition-colors">
                Заказать замер
              </button>
              <button onClick={() => scrollTo("calculator")}
                className="border border-white/60 font-body text-sm text-white px-7 py-3.5 hover:border-[hsl(var(--gold))] hover:text-[hsl(var(--gold))] transition-colors">
                Просчитать бюджет
              </button>
            </div>
          </div>

          {/* Десктоп: сетка 2×2 */}
          <div className="hidden md:block stats-border"
            style={{ animation: "fadeUp 0.7s 0.4s ease both" }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <rect x="1" y="1" width="98" height="98" rx="0" />
            </svg>
            <div className="grid grid-cols-2 gap-px bg-white/10">
              {[["400+","проектов реализовано"],["22","года опыта"],["3–6","месяцев на квартиру"],["Вся","Россия"]].map(([n, l]) => (
                <div key={n} className="bg-black/35 backdrop-blur-md p-8">
                  <div className="font-display text-6xl font-medium text-gold mb-2 leading-none">{n}</div>
                  <div className="font-body text-sm text-white/80 tracking-wide">{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Мобайл: горизонтальная полоса */}
          <div className="grid grid-cols-2 gap-px bg-white/10 md:hidden mt-2"
            style={{ animation: "fadeUp 0.7s 0.4s ease both" }}>
            {[["400+","проектов"],["22","года опыта"],["3–6 мес","на квартиру"],["Вся РФ","и Европа"]].map(([n, l]) => (
              <div key={n} className="bg-black/40 backdrop-blur-sm px-4 py-3">
                <div className="font-display text-2xl font-medium text-gold mb-0.5">{n}</div>
                <div className="font-body text-xs text-white/70">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <Icon name="ChevronDown" size={18} className="text-muted-foreground" />
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section id="mission" aria-label="Миссия и ценности студии" className="py-14">
        <div className="max-w-6xl mx-auto px-6">

          {/* Верхние две колонки: фото + текст миссии и ценности */}
          <div className="grid md:grid-cols-2 gap-16 items-start mb-10">

            {/* Левая: фото */}
            <Reveal className="relative">
              <div className="relative">
                <MissionPhoto />
                <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-t border-border px-7 py-5">
                  <p className="font-display text-xl font-medium text-foreground">Анастасия Белецкая</p>
                  <p className="font-body text-xs tracking-[0.2em] text-gold uppercase mt-1">Основатель и главный архитектор Студии ДА</p>
                </div>
                <div className="absolute top-6 -left-3 w-6 h-24 bg-gold" />
              </div>
            </Reveal>

            {/* Правая: миссия + ценности */}
            <Reveal delay={0.15}>
              <p className="font-body text-xs tracking-[0.3em] text-gold uppercase mb-5 section-rule">Наша миссия</p>
              <h2 className="font-display text-4xl font-medium text-foreground leading-tight mb-7">
                <GoldLine>Создавать пространство,</GoldLine><br />
                <em className="italic font-normal text-gold">которое меняет жизнь</em>
              </h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
                Мы верим, что дом — это не просто стены и мебель. Это среда, которая влияет на ваше настроение, здоровье и отношения каждый день. Миссия Студии ДА — создавать и реализовывать интерьеры, применяя новые технологии и тенденции, учитываем потребности заказчика. Мы создаём дружескую атмосферу, стремясь к идеальному результату!
              </p>

              <p className="font-body text-xs tracking-[0.3em] text-gold uppercase mb-6 section-rule">Наши ценности</p>
              <ul className="space-y-5">
                {[
                  { icon: "Gem",            title: "Честность",          desc: "Прозрачный бюджет, чёткие сроки и никаких скрытых расходов — с первой встречи до переезда." },
                  { icon: "HeartHandshake", title: "Забота о клиенте",   desc: "Мы слышим вас, а не навязываем тренды. Каждое решение — под ваш образ жизни." },
                  { icon: "Layers",         title: "Внимание к деталям", desc: "Красота рождается в деталях: в фактуре плитки, высоте светильника, ширине шва паркета." },
                  { icon: "Leaf",           title: "Ответственность",    desc: "Мы берём проект до конца — не пропадаем после согласования, а сопровождаем до финальной уборки." },
                ].map((v, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-9 h-9 border border-gold/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={v.icon as "Gem"} size={15} className="text-gold icon-spin" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-foreground mb-0.5">{v.title}</p>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Нижняя полоса на всю ширину */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 gap-px bg-gold/20">
              {[
                { icon: "Wrench", title: "Техническая и моральная поддержка", desc: "Помогаем клиенту на протяжении всего ремонта — от первого вопроса до финальной уборки." },
                { icon: "PackageCheck", title: "Комплексный подход", desc: "От покупки материалов до переезда — берём на себя весь путь обустройства пространства." },
              ].map((v, i) => (
                <div key={i} className="flex items-center gap-5 p-6 bg-card">
                  <div className="w-12 h-12 border border-gold/40 flex items-center justify-center flex-shrink-0">
                    <Icon name={v.icon as "Wrench"} size={20} className="text-gold icon-spin" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-medium text-foreground mb-1">{v.title}</p>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      {/* PROBLEM */}
      <section id="about" aria-label="Проблемы при ремонте без дизайнера" className="py-14 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="font-body text-xs tracking-[0.3em] text-gold uppercase mb-5 section-rule">Проблема</p>
            <h2 className="font-display text-4xl font-medium text-foreground leading-tight mb-6">
              Вы до сих пор <GoldLine>делаете всё сами?</GoldLine>
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-5">Вы устали:</p>
            <ul className="space-y-3 mb-8">
              {PROBLEMS.map((p, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-sm text-foreground/75">
                  <span className="text-gold mt-0.5 flex-shrink-0">—</span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="border-l-2 border-gold pl-5 py-1">
              <p className="font-body text-sm text-foreground font-medium">Мы работаем по принципу <span className="text-gold">«единая точка ответственности»</span> — ведём проект от замера до сдачи и переезда.</p>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-col gap-3">
            <div className="relative">
              <BeforeAfterSlider
                before="https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/df61c9a3-ea6b-4688-b72d-cb2fb09d3af0.jpeg"
                after="https://cdn.poehali.dev/projects/0c6d90d6-19cc-4261-a25d-08b53a5d1acd/bucket/76c7a718-422e-468a-b4df-e6f248d71d34.jpeg"
              />
              <div className="absolute bottom-3 left-3 bg-gold/90 text-charcoal font-body text-xs px-3 py-1.5 font-medium">
                Авторский надзор на каждом этапе
              </div>
            </div>
            <NadsorStrip photos={NADSOR_PHOTOS} />
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" aria-label="Этапы работы студии дизайна интерьера" className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <p className="font-body text-xs tracking-[0.3em] text-gold uppercase mb-4 section-rule">Как мы работаем</p>
            <h2 className="font-display text-4xl font-medium text-foreground">Процесс создания <GoldLine>вашего интерьера</GoldLine></h2>
          </Reveal>
          <div className="divide-y divide-border">
            {STEPS.map((s, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="grid md:grid-cols-[80px_1fr_1fr] gap-4 py-7 group hover:bg-card transition-colors px-2">
                  <span className="font-display text-3xl font-light text-gold/50 group-hover:text-gold transition-colors">{s.n}</span>
                  <h3 className="font-display text-xl font-medium text-foreground self-center">{s.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed self-center">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-10 p-6 border border-gold/30 bg-card">
            <p className="font-body text-sm text-foreground">
              <span className="text-gold font-medium">Итог:</span> вы получаете не просто «дизайн-проект», а готовый интерьер, в который можно сразу въезжать и жить.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" aria-label="Преимущества студии дизайна интерьера" className="py-14 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <p className="font-body text-xs tracking-[0.3em] text-gold uppercase mb-4 section-rule">Почему мы</p>
            <h2 className="font-display text-4xl font-medium text-foreground">Почему клиенты <GoldLine>в России выбирают нас</GoldLine></h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {FEATURES.map((f, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="bg-background p-7 h-full group hover:bg-card transition-colors">
                  <div className="w-9 h-9 border border-border flex items-center justify-center mb-5 group-hover:border-gold transition-colors">
                    <Icon name={f.icon as "Users" | "Receipt" | "Fingerprint" | "ClipboardList" | "ShieldCheck"} size={16} className="text-muted-foreground group-hover:text-gold transition-colors" fallback="Star" />
                  </div>
                  <h3 className="font-display text-lg font-medium text-foreground mb-3">{f.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <PortfolioSection />

      {/* FOR WHOM */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <Reveal delay={0.1} className="relative order-2 md:order-1">
            <img src={IMG_RESULT} alt="Готовый дизайн интерьера квартиры — результат работы студии" className="w-full h-[380px] object-cover" loading="lazy" />
          </Reveal>
          <Reveal className="order-1 md:order-2">
            <p className="font-body text-xs tracking-[0.3em] text-gold uppercase mb-5 section-rule">Для кого</p>
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
                  <div className="w-5 h-5 border border-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={11} className="text-gold" />
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
      <section id="reviews" aria-label="Отзывы клиентов студии дизайна интерьера" className="py-14 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-12">
            <p className="font-body text-xs tracking-[0.3em] text-gold uppercase mb-4 section-rule">Отзывы</p>
            <h2 className="font-display text-4xl font-medium text-foreground">Что говорят <GoldLine>клиенты</GoldLine></h2>
          </Reveal>
          <ReviewsGrid />
          <MiniPlayer />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-label="Частые вопросы о дизайне интерьера" className="py-14">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="mb-12">
            <p className="font-body text-xs tracking-[0.3em] text-gold uppercase mb-4 section-rule">Вопросы</p>
            <h2 className="font-display text-4xl font-medium text-foreground"><GoldLine>Часто задаваемые</GoldLine> вопросы</h2>
          </Reveal>
          <div className="divide-y divide-border">
            {FAQ.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left py-6 flex items-start justify-between gap-4 group">
                  <span className="font-display text-lg font-medium text-foreground group-hover:text-gold transition-colors">
                    {item.q}
                  </span>
                  <Icon name={openFaq === i ? "Minus" : "Plus"} size={16} className="text-gold flex-shrink-0 mt-1.5" />
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

      {/* CALCULATOR */}
      <section id="calculator" aria-label="Калькулятор стоимости дизайна интерьера" className="py-14 border-y border-gold/20 bg-charcoal">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <p className="font-body text-xs tracking-[0.3em] text-gold uppercase mb-4 section-rule-dark">Онлайн-расчёт</p>
            <h2 className="font-display text-4xl font-medium text-white">Рассчитайте стоимость проекта</h2>
          </Reveal>

          <Reveal className="grid md:grid-cols-2 gap-12 items-start">
            {/* Controls */}
            <div className="space-y-8">
              {/* Area */}
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="font-body text-xs tracking-[0.25em] text-white/50 uppercase">Площадь объекта</label>
                  <span className="font-display text-3xl font-medium text-gold">{calcArea} м²</span>
                </div>
                <input
                  type="range" min={20} max={600} step={5} value={calcArea}
                  onChange={e => setCalcArea(+e.target.value)}
                  className="w-full h-px appearance-none cursor-pointer accent-gold"
                  style={{ background: `linear-gradient(to right, hsl(var(--gold)) ${((calcArea - 20) / 580) * 100}%, rgba(255,255,255,0.15) ${((calcArea - 20) / 580) * 100}%)` }}
                />
                <div className="flex justify-between mt-2">
                  <span className="font-body text-xs text-white/30">20 м²</span>
                  <span className="font-body text-xs text-white/30">600 м²</span>
                </div>
              </div>

              {/* Object */}
              <div>
                <label className="font-body text-xs tracking-[0.25em] text-white/50 uppercase block mb-3">Тип объекта</label>
                <div className="grid grid-cols-2 gap-2">
                  {CALC_OBJECTS.map((o, i) => (
                    <button key={i} onClick={() => setCalcObj(i)}
                      className={`py-2.5 px-3 font-body text-xs transition-colors text-left ${calcObj === i
                        ? "bg-gold text-charcoal font-medium"
                        : "border border-white/20 text-white/50 hover:border-gold hover:text-gold"}`}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Package */}
              <div>
                <label className="font-body text-xs tracking-[0.25em] text-white/50 uppercase block mb-3">Пакет услуг</label>
                <div className="space-y-2">
                  {CALC_PACKAGES.map((p, i) => (
                    <button key={i} onClick={() => setCalcPkg(i)}
                      className={`w-full py-3 px-4 font-body text-sm transition-colors flex items-center justify-between ${calcPkg === i
                        ? "bg-gold text-charcoal"
                        : "border border-white/20 text-white/50 hover:border-gold hover:text-gold"}`}>
                      <span className="font-medium">{p.label}</span>
                      <span className={`text-xs ${calcPkg === i ? "text-charcoal/70" : "text-white/30"}`}>{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="bg-white/5 border border-gold/30 p-8 sticky top-20">
              <p className="font-body text-xs tracking-[0.25em] text-white/40 uppercase mb-6">Ориентировочная стоимость</p>

              <div className="mb-8">
                <div className="font-display text-6xl font-medium text-gold leading-none mb-2">
                  {calcPrice.toLocaleString("ru-RU")}
                </div>
                <div className="font-body text-xl text-white/40">рублей</div>
              </div>

              <div className="space-y-3 mb-8 pb-8 border-b border-white/10">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-white/40">Площадь</span>
                  <span className="text-white/80">{calcArea} м²</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-white/40">Тип объекта</span>
                  <span className="text-white/80">{CALC_OBJECTS[calcObj].label}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-white/40">Пакет</span>
                  <span className="text-white/80">{CALC_PACKAGES[calcPkg].label}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-white/40">Ставка за м²</span>
                  <span className="text-white/80">{(CALC_PACKAGES[calcPkg].pricePerSqm * CALC_OBJECTS[calcObj].mult).toLocaleString("ru-RU")} ₽</span>
                </div>
              </div>

              <p className="font-body text-xs text-white/30 mb-5 leading-relaxed">
                Расчёт ориентировочный. Точная стоимость определяется после замера и обсуждения деталей.
              </p>

              <button onClick={() => scrollTo("contact")}
                className="w-full bg-gold text-charcoal font-body text-sm py-3.5 hover:bg-[hsl(40,55%,44%)] transition-colors">
                Обсудить проект
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-14 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <Reveal>
            <p className="font-body text-xs tracking-[0.3em] text-gold uppercase mb-5 section-rule">Начать проект</p>
            <h2 className="font-display text-4xl font-medium text-foreground leading-tight mb-6">
              Хотите <GoldLine>свой интерьер</GoldLine> уже сегодня?
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-6">Отправьте запрос — за 24 часа мы подготовим:</p>
            <ul className="space-y-3 mb-8">
              {["Бесплатный предварительный расчёт бюджета","План первого этапа работ","Список документов, которые нужно подготовить"].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 border border-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={11} className="text-gold" />
                  </div>
                  <span className="font-body text-sm text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-3 pt-6 border-t border-border">
              {[
                { icon: "Phone", text: "8 908 992-12-47" },
                { icon: "Mail", text: "Studioda.1@yandex.ru" },
                { icon: "MapPin", text: "Москва, Санкт-Петербург, вся Россия" },
                { icon: "Building2", text: "Головной офис: Владивосток, ул. Некрасовская 52а, офис 307" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon name={icon as "Phone" | "Mail" | "MapPin" | "Building2"} size={14} className="text-gold" fallback="Info" />
                  <span className="font-body text-sm text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {formState === "success" ? (
              <div className="border border-gold p-10 flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 border border-gold flex items-center justify-center">
                  <Icon name="Check" size={22} className="text-gold" />
                </div>
                <h3 className="font-display text-2xl font-medium text-foreground">Заявка принята!</h3>
                <p className="font-body text-sm text-muted-foreground max-w-xs">
                  Мы свяжемся с вами в течение 24 часов и подготовим предварительный расчёт.
                </p>
                <button onClick={() => setFormState("idle")}
                  className="font-body text-xs text-muted-foreground underline underline-offset-4 mt-2">
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {promoApplied && (
                  <div className="flex items-center gap-3 bg-gold/10 border border-gold/40 px-4 py-3">
                    <Icon name="Tag" size={14} className="text-gold flex-shrink-0" />
                    <p className="font-body text-xs text-foreground">Скидка <span className="font-semibold text-gold">10%</span> применена — укажите промокод <span className="font-semibold">САЙТ10</span> при общении с менеджером</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs text-muted-foreground tracking-wide uppercase block mb-2">Ваше имя *</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Как вас зовут?"
                      className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground tracking-wide uppercase block mb-2">Телефон *</label>
                    <input
                      required
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-body text-xs text-muted-foreground tracking-wide uppercase block mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-xs text-muted-foreground tracking-wide uppercase block mb-2">Тип объекта</label>
                  <div className="grid grid-cols-4 gap-2">
                    {["Квартира", "Дом", "Офис", "Другое"].map(t => (
                      <button key={t} type="button" onClick={() => setForm(p => ({ ...p, type: t }))}
                        className={`py-2.5 font-body text-xs transition-colors ${form.type === t
                          ? "bg-gold text-background"
                          : "border border-border text-muted-foreground hover:border-gold hover:text-foreground"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-body text-xs text-muted-foreground tracking-wide uppercase block mb-2">Сообщение</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="Расскажите о вашем проекте: площадь, пожелания, сроки..."
                    rows={3}
                    className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>
                {formState === "error" && (
                  <p className="font-body text-xs text-red-500">Что-то пошло не так. Попробуйте ещё раз или позвоните нам.</p>
                )}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div
                    onClick={() => setAgreed(v => !v)}
                    className={`w-4 h-4 flex-shrink-0 mt-0.5 border flex items-center justify-center transition-colors cursor-pointer ${agreed ? "bg-gold border-gold" : "border-border group-hover:border-gold"}`}
                  >
                    {agreed && <Icon name="Check" size={10} className="text-background" />}
                  </div>
                  <span className="font-body text-xs text-muted-foreground leading-relaxed">
                    Я согласен(а) на обработку персональных данных в соответствии с{" "}
                    <button type="button" onClick={() => setPrivacyOpen(true)}
                      className="text-gold underline underline-offset-2 hover:text-[hsl(40,55%,38%)] transition-colors">
                      Политикой конфиденциальности
                    </button>
                  </span>
                </label>
                <button type="submit" disabled={formState === "loading" || !agreed}
                  className="w-full bg-gold text-background font-body text-sm py-3.5 hover:bg-[hsl(40,55%,44%)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {formState === "loading" ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Отправляем...
                    </>
                  ) : "Записаться на консультацию"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal border-t border-gold/20 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-display text-xl tracking-widest text-gold">Студия ДА</span>
            <span className="font-body text-[10px] tracking-[0.25em] text-white/40 uppercase mt-1">С заботой о вас и вашем пространстве</span>
          </div>
          <p className="font-body text-xs text-white/30">© 2026 Студия дизайна и архитектуры Анастасии Белецкой</p>
          <button onClick={() => setPrivacyOpen(true)} className="font-body text-xs text-white/40 hover:text-gold transition-colors underline underline-offset-2">
            Политика конфиденциальности
          </button>
        </div>
      </footer>

      {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}
      {promoOpen && (
        <PromoPopup
          onClose={() => setPromoOpen(false)}
          onCta={() => { setPromoOpen(false); setPromoApplied(true); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100); }}
        />
      )}
    </div>
  );
}
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  Menu,
  Play,
  Settings,
  X,
  Tv,
  Bookmark,
  Sparkles,
  Users
} from 'lucide-react'
import './styles.css'

const LATEST_RELEASE_URL = 'https://github.com/Erzkanzler2k/plenka/releases/latest'
const APK_DOWNLOAD_URL = 'https://github.com/Erzkanzler2k/plenka/releases/latest/download/Plenka-v2.2-release.apk'

const features = [
  { number: '01', title: 'Свайп-лента', text: 'Случайные фильмы и сериалы по вашим фильтрам. Нравится — вправо, не нравится — влево. Ошиблись? Есть отмена последнего свайпа.' },
  { number: '02', title: 'Мульти-фильтры', text: 'Выбирайте сразу несколько жанров, тип (фильмы/сериалы), минимальный рейтинг и годы. Умная лента подстраивается под ваши лайки.' },
  { number: '03', title: 'Поиск по фильмам и персонам', text: 'Поиск по названиям, актёрам и режиссёрам с полной фильмографией и биографией персон.' },
  { number: '04', title: 'Плеер, PiP и таймкоды', text: 'Нативное воспроизведение, режим «Картинка в картинке» (PiP), запоминание позиции просмотра и переключение серий.' },
  { number: '05', title: 'Подборки по настроению', text: 'Разделы «Фильмы», «Топ-250», «Сериалы» и быстрые чипы настроений: «Для вечера», «Экшен», «Для ума», «Полегче».' },
  { number: '06', title: 'Библиотека и списки', text: 'Избранное, список «Буду смотреть» и детальная история просмотров с полосой прогресса.' },
]

const filterGroups = [
  { key: 'type', label: 'Тип', options: ['Всё', 'Фильмы', 'Сериалы'] },
  { key: 'rating', label: 'Минимальный рейтинг', options: ['Любой', '6+', '7+', '8+'] },
  { key: 'year', label: 'Годы', options: ['Все', 'с 2020', 'с 2010', 'с 2000'] },
]

const genres = ['Боевик', 'Комедия', 'Драма', 'Ужасы', 'Фантастика', 'Криминал', 'Приключения', 'Мультфильм', 'Триллер', 'Детектив']

const faqs = [
  ['Откуда Пленка берет фильмы?', 'Каталог, поиск, персоны и детали работают на TMDB — без дневных лимитов запросов. Часть каталога сохранена офлайн и доступна без сети.'],
  ['На какой платформе работает приложение?', 'Пленка доступна для Android 8.0 и выше. Поддерживаются телефоны и планшеты.'],
  ['Можно ли смотреть фильмы внутри приложения?', 'Да. Встроенный плеер автоматически подбирает и перехватывает потоки, поддерживает Picture-in-Picture (PiP) и продолжает просмотр с сохранённой секунды.'],
  ['Как работают умные рекомендации?', 'Приложение анализирует жанры ваших лайков и подмешивает подходящее кино в колоду, сохраняя при этом разнообразие.'],
  ['Где посмотреть исходный код и обновления?', 'Проект полностью открыт и публикуется на GitHub с готовыми релизными APK-файлами.'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [picked, setPicked] = useState({ type: 'Всё', rating: 'Любой', year: 'Все', genres: ['Боевик', 'Фантастика'] })

  const download = () => {
    window.open(APK_DOWNLOAD_URL, '_blank')
    setToast(true)
    window.setTimeout(() => setToast(false), 4000)
  }

  const closeMenu = () => setMenuOpen(false)
  const pick = (key, value) => setPicked((p) => ({ ...p, [key]: value }))
  const toggleGenre = (g) => setPicked((p) => {
    const list = p.genres || []
    return { ...p, genres: list.includes(g) ? list.filter((item) => item !== g) : [...list, g] }
  })

  return (
    <div className="site-shell">
      <header className="site-header">
        <nav className="container nav" aria-label="Основная навигация">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="Пленка, на главную">
            <span className="brand-mark">П</span><span>Плёнка</span>
          </a>
          <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
            <a href="#features" onClick={closeMenu}>Возможности</a>
            <a href="#filters" onClick={closeMenu}>Фильтры</a>
            <a href="#screens" onClick={closeMenu}>Экраны</a>
            <a href="#faq" onClick={closeMenu}>FAQ</a>
            <button className="nav-mobile-close" onClick={closeMenu} aria-label="Закрыть меню"><X size={19} /></button>
          </div>
          <button className="nav-download" onClick={download}>Скачать APK v2.2 <ArrowUpRight size={16} /></button>
          <button className="nav-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-topline"><span>ПЛЕНКА v2.2 / ANDROID 8+</span><span>Помощник в выборе фильма</span><span>КАТАЛОГ НА TMDB</span></div>
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="kicker"><span />Кино без долгого поиска</p>
              <h1>Мы поможем<br />выбрать фильм<br />ВАМ!</h1>
              <p className="hero-lead">Свайпайте карточки, настраивайте мульти-жанры и смотрите внутри приложения. Режим «Картинка в картинке» (PiP), трейлеры, страницы актёров и умные подборки настроений.</p>
              <div className="hero-actions">
                <button className="button button-gradient" onClick={download}>Скачать APK (v2.2) <ArrowUpRight size={18} /></button>
                <a className="under-link" href={LATEST_RELEASE_URL} target="_blank" rel="noreferrer">Релиз на GitHub <ArrowUpRight size={16} /></a>
              </div>
            </div>
            <div className="hero-phone-wrap">
              <div className="phone" aria-label="Экран приложения Пленка">
                <div className="phone-status"><span>9:41</span><span>•••</span></div>
                <div className="phone-appbar"><span className="phone-logo">Плёнка</span><Settings size={17} /></div>
                <div className="phone-card">
                  <img src="/app-screens/poster-card.png" alt="Карточка фильма Матрица, 1999, рейтинг 8.2" />
                  <span className="phone-stamp phone-stamp-like">НРАВИТСЯ</span>
                  <span className="phone-stamp phone-stamp-nope">НЕ НРАВИТСЯ</span>
                </div>
                <div className="phone-actions">
                  <span className="phone-action phone-action-no"><X size={22} /></span>
                  <span className="phone-action phone-action-watch"><Play size={24} fill="currentColor" /></span>
                  <span className="phone-action phone-action-yes"><Heart size={26} fill="currentColor" /></span>
                </div>
              </div>
              <div className="hero-phone-caption"><span>Свайп-лента</span><strong>Матрица · 1999</strong><span>Рейтинг 8.2</span></div>
            </div>
          </div>
          <div className="hero-bottomline"><span>ПЛЕНКА / ПРИЛОЖЕНИЕ ДЛЯ КИНО</span><span className="scroll-line" /><span>↓</span></div>
        </section>

        <div className="marquee" aria-label="Возможности Пленки"><div className="marquee-track"><span>свайпайте</span><b>✳</b><span>мульти-жанры</span><b>✳</b><span>персоны</span><b>✳</b><span>смотрите в PiP</span><b>✳</b><span>трейлеры</span><b>✳</b><span>буду смотреть</span><b>✳</b><span>настроения</span></div></div>

        <section className="manifesto container" id="features">
          <div className="section-number">02 <span>/</span> ЧТО ВНУТРИ</div>
          <div className="manifesto-grid"><h2>Не просто<br />каталог.<br /><i>Ваш способ выбрать.</i></h2><div className="manifesto-copy"><p>Все сценарии ведут к удобному просмотру: умная случайная лента, мульти-фильтры, поиск по фильмам и персонам, история с таймкодами и плеер с режимом «Картинка в картинке».</p><a className="under-link" href="#filters">Настроить подборку <ArrowUpRight size={16} /></a></div></div>
          <div className="feature-grid">{features.map((feature) => <article className="feature-card" key={feature.number}><div className="feature-top"><span>{feature.number}</span><b>✦</b></div><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div>
        </section>

        <section className="filters-demo container" id="filters">
          <div className="section-number">03 <span>/</span> МУЛЬТИ-ФИЛЬТРЫ</div>
          <div className="section-heading"><h2>Соберите<br /><i>свой вечер</i></h2><p>Комбинируйте сразу несколько жанров<br />и критериев.</p></div>
          <div className="sheet">
            {filterGroups.map((group) => (
              <div className="sheet-group" key={group.key}>
                <span className="sheet-label">{group.label}</span>
                <div className="chip-row">{group.options.map((option) => <button key={option} className={`chip ${picked[group.key] === option ? 'chip-active' : ''}`} onClick={() => pick(group.key, option)} aria-pressed={picked[group.key] === option}>{option}</button>)}</div>
              </div>
            ))}
            <div className="sheet-group">
              <span className="sheet-label">Жанры {picked.genres.length > 0 && `(${picked.genres.length})`}</span>
              <div className="chip-row">{genres.map((genre) => <button key={genre} className={`chip ${picked.genres.includes(genre) ? 'chip-active' : ''}`} onClick={() => toggleGenre(genre)} aria-pressed={picked.genres.includes(genre)}>{genre}</button>)}</div>
            </div>
            <button className="button button-gradient sheet-apply" onClick={download}>Скачать приложение <ArrowUpRight size={17} /></button>
            <p className="sheet-hint"><span className="green-dot" />В приложении эти фильтры собирают ленту из каталога TMDB</p>
          </div>
        </section>

        <section className="app-gallery container" id="screens">
          <div className="section-number">04 <span>/</span> ЭКРАНЫ</div>
          <div className="gallery-heading"><h2>Как выглядит<br /><i>Пленка</i></h2><p>Фирменная афишная типографика<br />и неон на глубоком фоне.</p></div>
          <div className="gallery-track">
            <figure><img src="/app-screens/poster-card.png" alt="Карточка фильма в свайп-ленте" /><figcaption><b>01</b><span>Карточка фильма</span></figcaption></figure>
            <figure><img src="/app-screens/filters.png" alt="Экран фильтров подборки" /><figcaption><b>02</b><span>Фильтры</span></figcaption></figure>
            <figure><img src="/app-screens/typography.png" alt="Фирменная типографика Пленки" /><figcaption><b>03</b><span>Типографика</span></figcaption></figure>
          </div>
        </section>

        <section className="devices" id="devices"><div className="container devices-inner"><div><p className="kicker"><span />Релиз v2.2 для Android</p><h2>Кино<br /><i>в кармане.</i></h2><p className="devices-copy">Пленка работает на Android 8.0 и выше: свайп-лента с мульти-жанрами, поиск по персонам, трейлеры, избранное, история с таймкодами и встроенный плеер с PiP.</p><button className="button button-light" onClick={download}>Скачать APK v2.2 <ArrowUpRight size={18} /></button></div><div className="device-list"><div><span className="device-badge">TMDB</span><span>Каталог</span><small>Фильмы, сериалы и персоны</small></div><div><span className="device-badge">PiP</span><span>Плеер</span><small>Картинка в картинке</small></div><div><span className="device-badge">8.0+</span><span>Android</span><small>Минимальная версия</small></div></div></div></section>

        <section className="faq container" id="faq">
          <div className="section-number">05 <span>/</span> ЧАСТЫЕ ВОПРОСЫ</div>
          <div className="faq-layout"><h2>Всё<br /><i>понятно.</i></h2><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? 'faq-item-open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown size={18} /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-inner"><a className="brand" href="#top"><span className="brand-mark">П</span><span>Плёнка</span></a><span>Мы поможем выбрать фильм вам.</span><div><a href="#features">Возможности</a><a href="#filters">Фильтры</a><a href="#faq">FAQ</a><a href={LATEST_RELEASE_URL} target="_blank" rel="noreferrer">GitHub</a></div><small>© 2026</small></div></footer>
      {toast && <div className="toast" role="status"><Check size={17} /> Начинается загрузка APK v2.2</div>}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)

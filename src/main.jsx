import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import './styles.css'

const RELEASE_URL = 'https://github.com/Erzkanzler2k/plenka/releases/latest'
const APK_URL = 'https://github.com/Erzkanzler2k/plenka/releases/latest/download/Plenka-v2.2.31-release.apk'
const image = (name) => `${import.meta.env.BASE_URL}app-screens/${name}`

const features = [
  ['Свайпай', 'Открывай фильмы и сериалы один за другим. Оставляй то, что хочется посмотреть вечером.'],
  ['Выбирай', 'Фильтры по жанру, типу, рейтингу и году превращают случайную подборку в твой вечер.'],
  ['Продолжай', 'Прогресс сохраняется. История, избранное и следующая серия всегда под рукой.'],
]

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="Плёнка — на главную">
      <span className="brand-mark" aria-hidden="true"><span /></span>
      <span>Плёнка</span>
    </a>
  )
}

function DownloadButton({ className = '' }) {
  const [toast, setToast] = useState(false)
  const download = () => {
    window.open(APK_URL, '_blank', 'noopener,noreferrer')
    setToast(true)
    window.setTimeout(() => setToast(false), 3200)
  }
  return (
    <>
      <button className={`download ${className}`} onClick={download}>
        <span>Скачать для Android</span>
        <span className="download-arrow" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={1.8} /></span>
      </button>
      {toast && <div className="toast" role="status">Открываем загрузку APK…</div>}
    </>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell" id="top">
      <header className="header">
        <div className="container header-inner">
          <Logo />
          <nav className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`} aria-label="Основная навигация">
            <a href="#watch" onClick={closeMenu}>Как работает</a>
            <a href="#screens" onClick={closeMenu}>Экраны</a>
            <a href="#download" onClick={closeMenu}>Скачать</a>
            <button className="nav-close" onClick={closeMenu} aria-label="Закрыть меню"><X size={19} /></button>
          </nav>
          <div className="header-actions">
            <a className="github-link" href={RELEASE_URL} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
            <DownloadButton />
            <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Открыть меню"><Menu size={21} /></button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-copy">
            <p className="eyebrow">Плёнка · Android 8.0+</p>
            <h1>Кино,<br /><em>которое</em><br />хочется смотреть.</h1>
            <p className="hero-text">Свайпай, выбирай и продолжай с того места, где остановился. Без регистрации и лишних настроек.</p>
            <div className="hero-cta"><DownloadButton className="download-large" /><a className="quiet-link" href="#screens">Посмотреть экраны <ArrowUpRight size={15} /></a></div>
          </div>
          <div className="hero-reel" aria-label="Скриншоты приложения">
            <div className="reel-back reel-back-one"><img src={image('player.jpg')} alt="Экран плеера" /></div>
            <div className="reel-back reel-back-two"><img src={image('details.jpg')} alt="Карточка фильма" /></div>
            <div className="reel-front"><img src={image('swipe.jpg')} alt="Экран свайпов" /><span className="reel-caption">Твой следующий фильм уже ждёт</span></div>
            <span className="reel-light" aria-hidden="true" />
          </div>
        </section>

        <div className="ticker" aria-hidden="true"><div>Смотри фильмы · Ищи персон · Составляй ленту · Продолжай с того места · Смотри фильмы · Ищи персон · Составляй ленту · Продолжай с того места ·</div></div>

        <section className="watch container" id="watch">
          <div className="section-intro"><p className="eyebrow">Всё начинается с одного вечера</p><h2>Меньше выбора.<br /><em>Больше просмотра.</em></h2></div>
          <div className="feature-list">
            {features.map(([title, text], index) => <article className="feature-row" key={title}><span className="feature-index">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="screens container" id="screens">
          <div className="section-intro"><p className="eyebrow">Один интерфейс для всего</p><h2>От первого кадра<br /><em>до последней серии.</em></h2></div>
          <div className="screen-grid">
            <figure className="screen-shot screen-shot-wide"><img src={image('popular.jpg')} alt="Экран popular" /><figcaption>Популярное</figcaption></figure>
            <figure className="screen-shot"><img src={image('catalog.jpg')} alt="Каталог фильмов" /><figcaption>Каталог</figcaption></figure>
            <figure className="screen-shot"><img src={image('search.jpg')} alt="Поиск фильмов и персон" /><figcaption>Поиск</figcaption></figure>
            <figure className="screen-shot screen-shot-wide"><img src={image('player.jpg')} alt="Встроенный плеер" /><figcaption>Плеер</figcaption></figure>
          </div>
        </section>

        <section className="download-band" id="download">
          <div className="container download-inner"><div><p className="eyebrow">Плёнка уже в твоём телефоне</p><h2>Выбирай,<br /><em>что посмотреть.</em></h2></div><DownloadButton className="download-large" /></div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-inner"><Logo /><span>Помогаем выбрать фильм.</span><a href={RELEASE_URL} target="_blank" rel="noreferrer">Релизы <ArrowUpRight size={14} /></a></div></footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)

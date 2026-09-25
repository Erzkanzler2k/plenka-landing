import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const APK_URL = 'https://github.com/Erzkanzler2k/plenka/releases/latest/download/Plenka-v2.2.31-release.apk'
const RELEASE_URL = 'https://github.com/Erzkanzler2k/plenka/releases/latest'
const asset = (name) => `${import.meta.env.BASE_URL}app-screens/${name}`

const frames = [
  { file: 'swipe.png', label: 'Свайпы', index: '01' },
  { file: 'popular.png', label: 'Популярное', index: '02' },
  { file: 'catalog.png', label: 'Каталог', index: '03' },
  { file: 'search.png', label: 'Поиск', index: '04' },
]

const posters = [
  { file: 'posters/poster-1.png', title: 'Человек-паук' },
  { file: 'posters/poster-2.png', title: 'Обитель зла' },
  { file: 'posters/poster-3.png', title: 'На краю Оук-стрит' },
  { file: 'posters/poster-4.png', title: 'Хитрый Койот' },
  { file: 'posters/poster-5.png', title: 'Одиссея' },
]

function Logo() {
  return <a className="logo" href="#top" aria-label="Плёнка — на главную"><span className="logo-mark"><i /></span><span>Плёнка</span></a>
}

function DownloadLink() {
  return <a className="download-cta" href={APK_URL} target="_blank" rel="noreferrer"><span>Скачать APK</span><span className="download-cta-icon" aria-hidden="true">↗</span></a>
}

function App() {
  const [menu, setMenu] = useState(false)
  const closeMenu = () => setMenu(false)

  return <div className="page" id="top">
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Навигация">
          <a href="#frames">Кадры</a>
          <a href={RELEASE_URL} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </nav>
        <div className="header-status"><span className="status-dot" />Android / v2.2.31</div>
        <button className={`menu-toggle ${menu ? 'is-active' : ''}`} onClick={() => setMenu((open) => !open)} aria-label={menu ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menu}><span /><span /></button>
      </div>
    </header>

    <div className={`mobile-menu ${menu ? 'is-open' : ''}`} aria-hidden={!menu}>
      <div className="mobile-menu-top"><span>Навигация</span><button onClick={closeMenu} aria-label="Закрыть меню">×</button></div>
      <nav aria-label="Мобильная навигация">
        <a href="#frames" onClick={closeMenu}>Кадры <span aria-hidden="true">↘</span></a>
        <a href={RELEASE_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>GitHub <span aria-hidden="true">↗</span></a>
      </nav>
      <div className="mobile-menu-footer">Плёнка / Android / 2.2.31</div>
    </div>

    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-shell">
          <div className="hero-topline"><span>01 / 04</span><span>Приложение для Android</span><span>Смотри в своём ритме</span></div>
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">Кино без лишнего шума</p>
              <h1 id="hero-title">Плёнка</h1>
              <p className="hero-description">Фильмы, сериалы и аниме — в одном приложении. Свайпай, выбирай и продолжай с того места, где остановился.</p>
              <DownloadLink />
            </div>
            <div className="cinema-stage" aria-label="Реальные экраны приложения Плёнка">
              <div className="stage-coordinates">40° 42′ 46″ N<br />73° 59′ 38″ E</div>
              <div className="stage-red-block" />
              <div className="stage-rule stage-rule-top" />
              <div className="stage-rule stage-rule-bottom" />
              <div className="screen-frame frame-primary">
                <div className="frame-inner"><img src={asset('catalog.png')} alt="Каталог фильмов в приложении Плёнка" /></div>
                <span className="frame-index">01</span>
              </div>
              <div className="screen-frame frame-secondary">
                <div className="frame-inner"><img src={asset('swipe.png')} alt="Экран свайпов в приложении Плёнка" /></div>
                <span className="frame-index">02</span>
              </div>
              <div className="stage-caption"><span>Реальный экран</span><span>Не макет</span></div>
            </div>
          </div>
          <div className="hero-foot"><span>Листай кадры</span><span>Плёнка / 2026</span><span>↓</span></div>
        </div>
      </section>

      <section className="contact-sheet" id="frames" aria-labelledby="frames-title">
        <div className="wrap">
          <div className="sheet-heading">
            <p className="eyebrow">Реальные экраны / 04</p>
            <h2 id="frames-title">Внутри Плёнки</h2>
            <p>Один интерфейс для всех историй. Никаких лишних настроек — только понятный путь от «хочу» до «смотрю».</p>
          </div>

          <div className="film-sheet">
            <div className="film-sheet-label label-left">Каталог / 2026</div>
            <div className="film-sheet-label label-right">Плёнка / 02</div>
            {frames.map((frame, index) => <figure className={`sheet-shot shot-${index + 1}`} key={frame.file}>
              <div className="shot-window"><img src={asset(frame.file)} alt={`${frame.label} в приложении Плёнка`} /></div>
              <figcaption><span>{frame.index}</span><strong>{frame.label}</strong></figcaption>
            </figure>)}
            <div className="sheet-cross cross-one" /><div className="sheet-cross cross-two" />
          </div>

          <div className="poster-reel">
            <div className="reel-heading"><span>Постеры из каталога</span><span>05 / 05</span></div>
            <div className="reel-track">{posters.map((poster) => <figure className="reel-poster" key={poster.file}><img src={asset(poster.file)} alt={poster.title} /><figcaption>{poster.title}</figcaption></figure>)}</div>
          </div>
        </div>
      </section>

      <section className="closing" aria-label="Плёнка">
        <div className="wrap closing-inner">
          <p>Следующий фильм уже на экране.</p>
          <h2>Смотри<br /><em>в своём ритме.</em></h2>
          <span className="closing-mark">Плёнка / Android</span>
        </div>
      </section>
    </main>

    <footer className="site-footer">
      <div className="wrap footer-inner"><Logo /><span>Приложение дляAndroid</span><a href={RELEASE_URL} target="_blank" rel="noreferrer">Релизы <span aria-hidden="true">↗</span></a></div>
    </footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)

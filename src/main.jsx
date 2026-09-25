import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react'
import './styles.css'

const RELEASE_URL = 'https://github.com/Erzkanzler2k/plenka/releases/latest'
const APK_URL = 'https://github.com/Erzkanzler2k/plenka/releases/latest/download/Plenka-v2.2.31-release.apk'
const asset = (name) => `${import.meta.env.BASE_URL}app-screens/${name}`

const scenes = [
  { name: 'Свайпы', image: 'swipe.png', text: 'Один фильм — одно решение.' },
  { name: 'Популярное', image: 'popular.png', text: 'Подборки, которые хочется открыть.' },
  { name: 'Каталог', image: 'catalog.png', text: 'Всё, что хочется посмотреть.' },
  { name: 'Поиск', image: 'search.png', text: 'Находи фильмы и персон.' },
]

function Logo() {
  return <a className="logo" href="#top" aria-label="Плёнка — на главную"><span className="logo-mark"><i /></span><span>Плёнка</span></a>
}

function Download({ large = false }) {
  const [done, setDone] = useState(false)
  const open = () => {
    window.open(APK_URL, '_blank', 'noopener,noreferrer')
    setDone(true)
    window.setTimeout(() => setDone(false), 2800)
  }
  return <><button className={`download ${large ? 'download-large' : ''}`} onClick={open}><span>Скачать APK</span><span className="download-icon"><ArrowUpRight size={16} /></span></button>{done && <span className="download-note" role="status">Загрузка начинается…</span>}</>
}

function App() {
  const [menu, setMenu] = useState(false)
  return <div className="page" id="top">
    <header className="topbar">
      <div className="wrap topbar-inner">
        <Logo />
        <nav className={menu ? 'menu menu-open' : 'menu'} aria-label="Навигация">
          <a href="#inside" onClick={() => setMenu(false)}>Внутри</a>
          <a href="#scenes" onClick={() => setMenu(false)}>Кадры</a>
          <a href="#download" onClick={() => setMenu(false)}>Скачать</a>
          <button className="close-menu" onClick={() => setMenu(false)} aria-label="Закрыть меню"><X size={20} /></button>
        </nav>
        <div className="top-actions"><a href={RELEASE_URL} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a><Download /><button className="menu-toggle" onClick={() => setMenu(true)} aria-label="Открыть меню"><Menu size={20} /></button></div>
      </div>
    </header>

    <main>
      <section className="hero wrap">
        <div className="hero-backdrop" aria-hidden="true"><img src={asset('swipe.png')} alt="" /></div>
        <div className="hero-content">
          <p className="kicker">Плёнка / Android 8.0+</p>
          <h1>Начни<br /><span>с кадра.</span></h1>
          <p className="hero-lead">Свайпай фильмы, собирай свою ленту и продолжай с того места, где остановился.</p>
          <div className="hero-actions"><Download large /><a className="text-link" href="#inside">Как это работает <ArrowDown size={15} /></a></div>
        </div>
        <div className="hero-stamp" aria-hidden="true"><span>СВЕЖИЙ</span><strong>КАДР</strong><small>каждый раз</small></div>
        <div className="hero-foot"><span>Фильмы / Сериалы / Аниме</span><span>PiP · История · Продолжение</span><span>Листай вниз ↓</span></div>
      </section>

      <div className="ribbon" aria-hidden="true"><div>СВАЙПАЙ&nbsp;&nbsp; · &nbsp;&nbsp;ВЫБИРАЙ&nbsp;&nbsp; · &nbsp;&nbsp;СМОТРИ&nbsp;&nbsp; · &nbsp;&nbsp;СВАЙПАЙ&nbsp;&nbsp; · &nbsp;&nbsp;ВЫБИРАЙ&nbsp;&nbsp; · &nbsp;&nbsp;СМОТРИ&nbsp;&nbsp;</div></div>

      <section className="inside wrap" id="inside">
        <div className="section-title"><p className="kicker">Не приложение-набор функций</p><h2>Три шага.<br /><em>Один вечер.</em></h2></div>
        <div className="inside-list">
          <article><span>01</span><div><h3>Выбери настроение</h3><p>Фильмы, сериалы и аниме — с фильтрами, которые действительно помогают сузить выбор.</p></div></article>
          <article><span>02</span><div><h3>Поймай кадр</h3><p>Свайп-лента показывает следующий фильм. Нравится — оставляй. Не нравится — идём дальше.</p></div></article>
          <article><span>03</span><div><h3>Продолжи историю</h3><p>Прогресс, серии и избранное сохраняются. Можно закрыть приложение и вернуться позже.</p></div></article>
        </div>
      </section>

      <section className="scenes wrap" id="scenes">
        <div className="scenes-head"><div><p className="kicker">Реальный интерфейс</p><h2>Кадр за кадром.</h2></div><p>Один интерфейс для выбора, просмотра и возвращения.</p></div>
        <div className="scene-grid">{scenes.map((scene, index) => <figure className={index === 0 ? 'scene scene-first' : 'scene'} key={scene.name}><div><img src={asset(scene.image)} alt={scene.name} /></div><figcaption><strong>{scene.name}</strong><span>{scene.text}</span></figcaption></figure>)}</div>
      </section>

      <section className="download-section" id="download"><div className="wrap download-content"><p className="kicker">Твой следующий фильм</p><h2>Уже ждёт<br /><em>в кармане.</em></h2><Download large /><small>Без аккаунта. Без рекламы. Android 8.0 и выше.</small></div></section>
    </main>

    <footer className="footer wrap"><Logo /><span>Помогаем выбрать фильм.</span><a href={RELEASE_URL} target="_blank" rel="noreferrer">Все релизы <ArrowUpRight size={14} /></a></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)

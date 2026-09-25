import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import './styles.css'

const APK_URL = 'https://github.com/Erzkanzler2k/plenka/releases/latest/download/Plenka-v2.2.31-release.apk'
const RELEASE_URL = 'https://github.com/Erzkanzler2k/plenka/releases/latest'
const asset = (name) => `${import.meta.env.BASE_URL}app-screens/${name}`

const posters = [
  { file: 'posters/poster-1.png', title: 'Человек-паук', className: 'poster-a' },
  { file: 'posters/poster-2.png', title: 'Обитель зла', className: 'poster-b' },
  { file: 'posters/poster-3.png', title: 'На краю Оук-стрит', className: 'poster-c' },
  { file: 'posters/poster-4.png', title: 'Хитрый Койот', className: 'poster-d' },
  { file: 'posters/poster-5.png', title: 'Одиссея', className: 'poster-e' },
]

function Logo() {
  return <a className="logo" href="#top" aria-label="Плёнка — на главную"><span className="logo-mark"><i /></span><span>Плёнка</span></a>
}

function App() {
  const [menu, setMenu] = useState(false)
  const [toast, setToast] = useState(false)
  const download = () => {
    window.open(APK_URL, '_blank', 'noopener,noreferrer')
    setToast(true)
    window.setTimeout(() => setToast(false), 2600)
  }
  return <div className="page" id="top">
    <header className="topbar"><div className="wrap topbar-inner"><Logo /><nav className={menu ? 'menu menu-open' : 'menu'}><a href="#posters" onClick={() => setMenu(false)}>Постеры</a><a href={RELEASE_URL} target="_blank" rel="noreferrer" onClick={() => setMenu(false)}>GitHub</a><button className="close" onClick={() => setMenu(false)} aria-label="Закрыть меню"><X size={19} /></button></nav><div className="top-actions"><button className="download" onClick={download}><span>Скачать APK</span><span className="download-icon"><ArrowUpRight size={16} /></span></button><button className="menu-button" onClick={() => setMenu(true)} aria-label="Открыть меню"><Menu size={20} /></button></div></div></header>
    <main>
      <section className="poster-hall wrap" id="posters">
        <div className="hall-copy"><p className="overline">Плёнка / Android 8.0+</p><h1>Начни<br /><em>с кадра.</em></h1><p>Свайпай фильмы, собирай ленту и продолжай с того места, где остановился.</p><button className="download hall-download" onClick={download}><span>Скачать APK</span><span className="download-icon"><ArrowUpRight size={18} /></span></button></div>
        <div className="poster-wall" aria-label="Постеры фильмов">{posters.map((poster) => <figure className={`poster ${poster.className}`} key={poster.file}><img src={asset(poster.file)} alt={poster.title} /><figcaption>{poster.title}</figcaption></figure>)}<div className="poster-note">Настоящие кадры<br />из Плёнки</div></div>
        <div className="hall-bottom"><span>Фильмы</span><span>Сериалы</span><span>Аниме</span><span>Смотри в своём ритме</span></div>
      </section>
      <section className="after-hall wrap"><div className="after-line" /><div className="after-content"><p>Не ищи следующий фильм часами.</p><h2>Просто начни<br /><em>с одного кадра.</em></h2><button className="download" onClick={download}><span>Скачать APK</span><span className="download-icon"><ArrowUpRight size={16} /></span></button></div><div className="after-image"><img src={asset('swipe.png')} alt="Экран свайпов Плёнки" /></div></section>
    </main>
    <footer className="footer wrap"><Logo /><span>Помогаем выбрать фильм.</span><a href={RELEASE_URL} target="_blank" rel="noreferrer">Релизы <ArrowUpRight size={14} /></a></footer>
    {toast && <div className="toast" role="status">Загрузка начинается…</div>}
  </div>
}

createRoot(document.getElementById('root')).render(<App />)

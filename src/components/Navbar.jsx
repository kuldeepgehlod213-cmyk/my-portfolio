import { NAV } from '../data'

export default function Navbar({ theme, onToggleTheme }) {
  const light = theme === 'light' || (!theme && matchMedia('(prefers-color-scheme:light)').matches)
  return (
    <nav>
      <b>KG</b>
      <div>
        {NAV.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        <button id="th" className="ghost" aria-label="Toggle light or dark theme" onClick={onToggleTheme}>{light ? '☀' : '☾'}</button>
      </div>
    </nav>
  )
}

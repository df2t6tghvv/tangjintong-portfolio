import { useEffect, useState } from 'react'
import { navLinks } from '../data/content'
import { useContent } from '../context/ContentContext'

/** 顶部导航：滚动加玻璃底、当前节高亮、移动端折叠菜单、页内编辑开关 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [open, setOpen] = useState(false)
  const { content, editMode, setEditMode } = useContent()
  const profile = content.profile
  const ui = content.ui
  const links = content.navLinks

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = navLinks.map((l) => l.id)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="shell nav__inner">
        <a className="nav__logo" href="#hero" onClick={() => setOpen(false)}>
          <span
            className="nav__logo-mark"
            data-edit="ui.nav.logo"
            contentEditable={editMode}
            suppressContentEditableWarning
          >
            {ui.nav.logo}
          </span>
          <span className="nav__logo-name">
            <b data-edit="profile.name" contentEditable={editMode} suppressContentEditableWarning>
              {profile.name}
            </b>
            <em data-edit="ui.nav.brand" contentEditable={editMode} suppressContentEditableWarning>
              {ui.nav.brand}
            </em>
          </span>
        </a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="主导航">
          {links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav__link ${active === l.id ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className="nav__link-en" data-edit={`navLinks.${i}.en`} contentEditable={editMode} suppressContentEditableWarning>
                {l.en}
              </span>
              <span className="nav__link-cn" data-edit={`navLinks.${i}.label`} contentEditable={editMode} suppressContentEditableWarning>
                {l.label}
              </span>
            </a>
          ))}
          <button
            className={`nav__edit ${editMode ? 'is-on' : ''}`}
            aria-label={editMode ? '退出页内编辑' : '开启页内编辑'}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? '编辑中' : '✎ 编辑'}
          </button>
          <a className="btn nav__cta" href="#contact" onClick={() => setOpen(false)}>
            <span data-edit="ui.nav.cta" contentEditable={editMode} suppressContentEditableWarning>
              {ui.nav.cta}
            </span>
            <span className="arr">→</span>
          </a>
        </nav>

        <button
          className={`nav__burger ${open ? 'is-open' : ''}`}
          aria-label="切换菜单"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

import { useEffect, useState } from 'react'
import { navLinks } from '../data/content'
import { useContent } from '../context/ContentContext'

/** 右侧翻页指示点 */
export default function DotNav() {
  const [active, setActive] = useState('hero')
  const { content, editMode } = useContent()

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
    <div className="dotnav" aria-hidden="true">
      {content.navLinks.map((l, i) => (
        <a
          key={l.id}
          href={`#${l.id}`}
          className={`dotnav__item ${active === l.id ? 'is-active' : ''}`}
          title={l.label}
        >
          <span className="dotnav__num">0{i + 1}</span>
          <span className="dotnav__dot" />
          <span className="dotnav__label" data-edit={`navLinks.${i}.label`} contentEditable={editMode} suppressContentEditableWarning>
            {l.label}
          </span>
        </a>
      ))}
    </div>
  )
}

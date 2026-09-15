import { navLinks } from '../data/content'
import { useContent } from '../context/ContentContext'

/** 页尾 —— 联系方式 + 页脚（编辑模式下联系方式可直接修改，href 自动按标签重建） */
export default function Footer() {
  const year = new Date().getFullYear()
  const { content, editMode } = useContent()
  const { contacts, profile, ui } = content

  const hrefFor = (c) => {
    const label = c.label || ''
    if (label.includes('电话') || label.includes('PHONE')) {
      return `tel:${String(c.value || '').replace(/[^\d+]/g, '')}`
    }
    if (label.includes('邮箱') || label.includes('EMAIL')) {
      return `mailto:${String(c.value || '').trim()}`
    }
    return null
  }

  return (
    <section id="contact" className="section contact">
      <div className="grid-bg" />
      <div className="shell contact__inner">
        {/* 大 CTA */}
        <div className="contact__cta reveal">
          <p className="contact__eyebrow">
            <span className="hero__eyebrow-dot" />
            <span data-edit="ui.contact.eyebrow" contentEditable={editMode} suppressContentEditableWarning>
              {ui.contact.eyebrow}
            </span>
          </p>
          <h2 className="contact__title">
            <span data-edit="ui.contact.title1" contentEditable={editMode} suppressContentEditableWarning>
              {ui.contact.title1}
            </span>
            <br />
            <span data-edit="ui.contact.title2" contentEditable={editMode} suppressContentEditableWarning>
              {ui.contact.title2}
            </span>
          </h2>
          <a className="btn btn--solid contact__btn" href={`mailto:${contacts[1]?.value || ''}`}>
            <span data-edit="ui.contact.btn" contentEditable={editMode} suppressContentEditableWarning>
              {ui.contact.btn}
            </span>{' '}
            <span className="arr">→</span>
          </a>
        </div>

        {/* 联系方式卡片 */}
        <div className="contact__cards">
          {contacts.map((c, i) => {
            const href = hrefFor(c)
            return (
              <div className={`c-card reveal reveal-d${i}`} key={c.label}>
                <span
                  className="c-card__label"
                  data-edit={`contacts.${i}.label`}
                  contentEditable={editMode}
                  suppressContentEditableWarning
                >
                  {c.label}
                </span>
                {href ? (
                  <a
                    className="c-card__value"
                    href={href}
                    data-edit={`contacts.${i}.value`}
                    contentEditable={editMode}
                    suppressContentEditableWarning
                  >
                    {c.value}
                  </a>
                ) : (
                  <span
                    className="c-card__value"
                    data-edit={`contacts.${i}.value`}
                    contentEditable={editMode}
                    suppressContentEditableWarning
                  >
                    {c.value}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 页脚 */}
      <div className="contact__foot">
        <div className="shell contact__foot-inner">
          <span className="contact__copy">
            <em data-edit="ui.contact.copyPrefix" contentEditable={editMode} suppressContentEditableWarning>
              {ui.contact.copyPrefix}
            </em>{' '}
            {year}{' '}
            <b data-edit="profile.name" contentEditable={editMode} suppressContentEditableWarning>
              {profile.name}
            </b>
            <i>·</i>{' '}
            <b data-edit="profile.role" contentEditable={editMode} suppressContentEditableWarning>
              {profile.role}
            </b>
          </span>
          <nav className="contact__nav" aria-label="页脚导航">
            {content.navLinks.map((l, i) => (
              <a key={l.id} href={`#${l.id}`} data-edit={`navLinks.${i}.label`} contentEditable={editMode} suppressContentEditableWarning>
                {l.label}
              </a>
            ))}
          </nav>
          <a className="contact__top" href="#hero" data-edit="ui.contact.top" contentEditable={editMode} suppressContentEditableWarning>
            {ui.contact.top}
          </a>
        </div>
      </div>
    </section>
  )
}

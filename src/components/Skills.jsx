import { useContent } from '../context/ContentContext'
import { useInView } from '../hooks/useInView'

function Bar({ name, en, value, start, delay, editMode, path }) {
  const [ref, inView] = useInView()
  return (
    <div className="bar" ref={ref}>
      <div className="bar__head">
        <span className="bar__name" data-edit={`${path}.name`} contentEditable={editMode} suppressContentEditableWarning>
          {name}
        </span>
        <span className="bar__en" data-edit={`${path}.en`} contentEditable={editMode} suppressContentEditableWarning>
          {en}
        </span>
        <span
          className="bar__val"
          data-edit={`${path}.value`}
          data-edit-parse="int"
          contentEditable={editMode}
          suppressContentEditableWarning
        >
          {value}%
        </span>
      </div>
      <div className="bar__track">
        <i
          className={start && inView ? 'is-in' : ''}
          style={{ width: start && inView ? `${value}%` : '0%', transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  )
}

function Ring({ name, value, start, delay, editMode, path }) {
  const [ref, inView] = useInView()
  const r = 40
  const c = 2 * Math.PI * r
  return (
    <div className="ring reveal" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd200" />
            <stop offset="100%" stopColor="#ff8a00" />
          </linearGradient>
        </defs>
        <circle className="ring__track" cx="50" cy="50" r={r} />
        <circle
          className={`ring__fill ${start && inView ? 'is-in' : ''}`}
          cx="50"
          cy="50"
          r={r}
          strokeDasharray={c}
          strokeDashoffset={start && inView ? c * (1 - value / 100) : c}
          style={{ transitionDelay: `${delay}ms` }}
        />
      </svg>
      <div className="ring__num">
        <b
          data-edit={`${path}.value`}
          data-edit-parse="int"
          contentEditable={editMode}
          suppressContentEditableWarning
        >
          {start && inView ? value : 0}%
        </b>
        <span data-edit={`${path}.name`} contentEditable={editMode} suppressContentEditableWarning>
          {name}
        </span>
      </div>
    </div>
  )
}

/** 个人优势 —— 能力可视化 */
export default function Skills() {
  const [barsRef, barsIn] = useInView()
  const [ringsRef, ringsIn] = useInView()
  const { content, editMode } = useContent()
  const { advantages, designSkills, softwareSkills, aiTools, ui } = content

  return (
    <section id="skills" className="section skills">
      <div className="grid-bg" />
      <div className="shell">
        <div className="section-head">
          <span className="section-index" data-edit="ui.skills.index" contentEditable={editMode} suppressContentEditableWarning>
            {ui.skills.index}
          </span>
          <h2 className="section-title">
            <span data-edit="ui.skills.title" contentEditable={editMode} suppressContentEditableWarning>
              {ui.skills.title}
            </span>
            <span className="en" data-edit="ui.skills.en" contentEditable={editMode} suppressContentEditableWarning>
              {ui.skills.en}
            </span>
          </h2>
          <span className="section-rule" />
        </div>

        {/* 优势卡片 */}
        <div className="skills__cards">
          {advantages.map((a, i) => (
            <div className={`adv reveal reveal-d${i % 4}`} key={a.title}>
              <span className="adv__icon">{a.icon}</span>
              <h3 data-edit={`advantages.${i}.title`} contentEditable={editMode} suppressContentEditableWarning>
                {a.title}
              </h3>
              <p data-edit={`advantages.${i}.desc`} contentEditable={editMode} suppressContentEditableWarning>
                {a.desc}
              </p>
              <span className="adv__idx">0{i + 1}</span>
            </div>
          ))}
        </div>

        {/* 可视化三栏 */}
        <div className="skills__panel">
          <div className="skills__col reveal" ref={barsRef}>
            <h4 className="skills__col-title">
              <span data-edit="ui.skills.design" contentEditable={editMode} suppressContentEditableWarning>
                {ui.skills.design}
              </span>{' '}
              <em data-edit="ui.skills.designEn" contentEditable={editMode} suppressContentEditableWarning>
                {ui.skills.designEn}
              </em>
            </h4>
            {designSkills.map((s, i) => (
              <Bar key={s.name} {...s} start={barsIn} delay={i * 90} editMode={editMode} path={`designSkills.${i}`} />
            ))}
          </div>

          <div className="skills__col reveal reveal-d1" ref={ringsRef}>
            <h4 className="skills__col-title">
              <span data-edit="ui.skills.software" contentEditable={editMode} suppressContentEditableWarning>
                {ui.skills.software}
              </span>{' '}
              <em data-edit="ui.skills.softwareEn" contentEditable={editMode} suppressContentEditableWarning>
                {ui.skills.softwareEn}
              </em>
            </h4>
            <div className="rings">
              {softwareSkills.map((s, i) => (
                <Ring key={s.name} {...s} start={ringsIn} delay={i * 80} editMode={editMode} path={`softwareSkills.${i}`} />
              ))}
            </div>
          </div>

          <div className="skills__col reveal reveal-d2">
            <h4 className="skills__col-title">
              <span data-edit="ui.skills.ai" contentEditable={editMode} suppressContentEditableWarning>
                {ui.skills.ai}
              </span>{' '}
              <em data-edit="ui.skills.aiEn" contentEditable={editMode} suppressContentEditableWarning>
                {ui.skills.aiEn}
              </em>
            </h4>
            <div className="ai-grid">
              {aiTools.map((t, i) => (
                <div className="ai-chip reveal" key={t.name} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="ai-chip__head">
                    <b data-edit={`aiTools.${i}.name`} contentEditable={editMode} suppressContentEditableWarning>
                      {t.name}
                    </b>
                    <span data-edit={`aiTools.${i}.level`} data-edit-parse="int" contentEditable={editMode} suppressContentEditableWarning>
                      {t.level}%
                    </span>
                  </div>
                  <div className="ai-chip__track">
                    <i style={{ width: `${t.level}%` }} />
                  </div>
                  <span className="ai-chip__tag" data-edit={`aiTools.${i}.tag`} contentEditable={editMode} suppressContentEditableWarning>
                    {t.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

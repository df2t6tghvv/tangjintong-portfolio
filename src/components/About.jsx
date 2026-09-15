import { useContent } from '../context/ContentContext'
import { useCountUp, useInView } from '../hooks/useInView'
import Mascot from './Mascot'

function Stat({ value, suffix, label, start, delay, editMode, path }) {
  const n = useCountUp(value, start, 1500)
  return (
    <div className="stat reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div className="stat__num">
        <span data-edit={`${path}.value`} contentEditable={editMode} suppressContentEditableWarning>
          {n}
        </span>
        <em data-edit={`${path}.suffix`} contentEditable={editMode} suppressContentEditableWarning>
          {suffix}
        </em>
      </div>
      <div className="stat__label" data-edit={`${path}.label`} contentEditable={editMode} suppressContentEditableWarning>
        {label}
      </div>
    </div>
  )
}

/** 个人经历 —— 人物照片 / 自我介绍 / 教育实习 / 项目数据 */
export default function About() {
  const [statsRef, statsIn] = useInView()
  const [expRef, expIn] = useInView()
  const { content, editMode } = useContent()
  const { profile, education, experiences, ui } = content

  return (
    <section id="about" className="section about">
      <div className="grid-bg" />
      <div className="shell about__shell">
        <div className="section-head">
          <span className="section-index" data-edit="ui.about.index" contentEditable={editMode} suppressContentEditableWarning>
            {ui.about.index}
          </span>
          <h2 className="section-title">
            <span data-edit="ui.about.title" contentEditable={editMode} suppressContentEditableWarning>
              {ui.about.title}
            </span>
            <span className="en" data-edit="ui.about.en" contentEditable={editMode} suppressContentEditableWarning>
              {ui.about.en}
            </span>
          </h2>
          <span className="section-rule" />
        </div>

        {/* 中部滚动区：照片 + 介绍 / 教育 / 实习 */}
        <div className="about__scroll">
          <div className="about__grid">
            {/* 左：IP 形象 / 人物照片 */}
            <div className="about__portrait reveal">
              <div className="portrait-frame">
                {profile.ipMascotVideo || profile.ipMascot ? (
                  <Mascot profile={profile} />
                ) : (
                  <img
                    src={profile.portrait}
                    alt={profile.name}
                    data-edit-img="profile.portrait"
                    loading="lazy"
                  />
                )}
                <span className="portrait-frame__corner c-tl" />
                <span className="portrait-frame__corner c-br" />
              </div>
              <div className="portrait-card portrait-card--1">
                <b data-edit="education.school" contentEditable={editMode} suppressContentEditableWarning>
                  {education.school}
                </b>
                <span data-edit="education.major" contentEditable={editMode} suppressContentEditableWarning>
                  {education.major}
                </span>
              </div>
              <div className="portrait-card portrait-card--2">
                <b data-edit="ui.about.cardTitle" contentEditable={editMode} suppressContentEditableWarning>
                  {ui.about.cardTitle}
                </b>
                <span data-edit="ui.about.cardTools" contentEditable={editMode} suppressContentEditableWarning>
                  {ui.about.cardTools}
                </span>
              </div>
            </div>

            {/* 右：介绍 + 经历 */}
            <div className="about__main">
              <p className="about__name reveal reveal-d1">
                <span data-edit="profile.name" contentEditable={editMode} suppressContentEditableWarning>
                  {profile.name}
                </span>
                <span
                  className="about__name-en"
                  data-edit="profile.nameEn"
                  contentEditable={editMode}
                  suppressContentEditableWarning
                >
                  {profile.nameEn}
                </span>
              </p>

              <div className="about__intro reveal reveal-d2">
                {profile.intro.map((t, i) => (
                  <p
                    key={i}
                    data-edit={`profile.intro.${i}`}
                    contentEditable={editMode}
                    suppressContentEditableWarning
                  >
                    {t}
                  </p>
                ))}
              </div>

              <div className="about__edu reveal reveal-d3">
                <span className="about__edu-tag" data-edit="ui.about.eduTag" contentEditable={editMode} suppressContentEditableWarning>
                  {ui.about.eduTag}
                </span>
                <div className="about__edu-row">
                  <b data-edit="education.school" contentEditable={editMode} suppressContentEditableWarning>
                    {education.school}
                  </b>
                  <span
                    className="about__edu-major"
                    data-edit="education.major"
                    contentEditable={editMode}
                    suppressContentEditableWarning
                  >
                    {education.major}
                  </span>
                  <span
                    className="about__edu-period"
                    data-edit="education.period"
                    contentEditable={editMode}
                    suppressContentEditableWarning
                  >
                    {education.period}
                  </span>
                </div>
                <p
                  className="about__edu-courses"
                >
                  <span data-edit="ui.about.eduPrefix" contentEditable={editMode} suppressContentEditableWarning>
                    {ui.about.eduPrefix}
                  </span>
                  <span
                    data-edit="education.courses"
                    contentEditable={editMode}
                    suppressContentEditableWarning
                  >
                    {education.courses}
                  </span>
                </p>
              </div>

              <div className="about__exp reveal reveal-d4" ref={expRef}>
                <span className="about__exp-tag" data-edit="ui.about.expTag" contentEditable={editMode} suppressContentEditableWarning>
                  {ui.about.expTag}
                </span>
                <div className={`timeline ${expIn ? 'is-in' : ''}`}>
                  {experiences.map((e, i) => (
                    <div className="tl-item" key={e.company}>
                      <span className="tl-line" />
                      <span className="tl-dot" />
                      <div className="tl-head">
                        <span
                          className="tl-period"
                          data-edit={`experiences.${i}.period`}
                          contentEditable={editMode}
                          suppressContentEditableWarning
                        >
                          {e.period}
                        </span>
                        <span
                          className="tl-company"
                          data-edit={`experiences.${i}.company`}
                          contentEditable={editMode}
                          suppressContentEditableWarning
                        >
                          {e.company}
                        </span>
                        <span
                          className="tl-role"
                          data-edit={`experiences.${i}.role`}
                          contentEditable={editMode}
                          suppressContentEditableWarning
                        >
                          {e.role}
                        </span>
                      </div>
                      <ul className="tl-points">
                        {e.points.map((p, j) => (
                          <li
                            key={j}
                            data-edit={`experiences.${i}.points.${j}`}
                            contentEditable={editMode}
                            suppressContentEditableWarning
                          >
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部固定：项目数据 */}
        <div className="about__stats" ref={statsRef}>
          {profile.stats.map((s, i) => (
            <Stat
              key={s.label}
              {...s}
              start={statsIn}
              delay={i * 90}
              editMode={editMode}
              path={`profile.stats.${i}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

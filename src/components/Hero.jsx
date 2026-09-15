import HeroCanvas from './HeroCanvas'
import { useContent } from '../context/ContentContext'

/**
 * 首页 Hero —— 大标题 + 动态视频背景（未配置视频时使用 Canvas 粒子动画）
 * 编辑模式下所有文字可直接修改（data-edit 对应 content.js 路径）
 */
export default function Hero() {
  const { content, editMode } = useContent()
  const profile = content.profile
  const ui = content.ui
  const hasVideo = Boolean(profile.heroVideo)
  const en = (profile.nameEn || ' ').split(' ')
  const en0 = en[0] || ''
  const en1 = en[1] || ''

  return (
    <section id="hero" className="section hero scanlines">
      {/* 动态背景 */}
      <div className="hero__bg">
        {hasVideo ? (
          <video
            className="hero__video"
            src={profile.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            poster=""
          />
        ) : (
          <HeroCanvas />
        )}
        <div className="hero__veil" />
      </div>
      <div className="grid-bg" />

      {/* 内容 */}
      <div className="shell hero__content">
        <p className="hero__eyebrow reveal is-in">
          <span className="hero__eyebrow-dot" />
          <span data-edit="ui.hero.eyebrow" contentEditable={editMode} suppressContentEditableWarning>
            {ui.hero.eyebrow}
          </span>{' '}
          <span data-edit="profile.city" contentEditable={editMode} suppressContentEditableWarning>
            {profile.city}
          </span>
        </p>

        <h1 className="hero__title">
          <span
            className="hero__title-en reveal is-in"
            data-edit="profile.nameEn"
            contentEditable={editMode}
            suppressContentEditableWarning
          >
            {en0}
            {en1 && <i> {en1}</i>}
          </span>
          <span
            className="hero__title-cn reveal is-in reveal-d1"
            data-edit="profile.name"
            contentEditable={editMode}
            suppressContentEditableWarning
          >
            {profile.name}
          </span>
          <span className="hero__title-role reveal is-in reveal-d2">
            <span data-edit="profile.role" contentEditable={editMode} suppressContentEditableWarning>
              {profile.role}
            </span>
            <em data-edit="profile.roleEn" contentEditable={editMode} suppressContentEditableWarning>
              {profile.roleEn}
            </em>
          </span>
        </h1>

        <p
          className="hero__slogan reveal is-in reveal-d3"
          data-edit="profile.slogan"
          contentEditable={editMode}
          suppressContentEditableWarning
        >
          {profile.slogan}
        </p>

        <div className="hero__actions reveal is-in reveal-d4">
          <a className="btn btn--solid" href="#works">
            <span data-edit="ui.hero.viewWorks" contentEditable={editMode} suppressContentEditableWarning>
              {ui.hero.viewWorks}
            </span>{' '}
            <span className="arr">↓</span>
          </a>
          <a className="btn" href="#about">
            <span data-edit="ui.hero.aboutMe" contentEditable={editMode} suppressContentEditableWarning>
              {ui.hero.aboutMe}
            </span>{' '}
            <span className="arr">→</span>
          </a>
        </div>
      </div>

      {/* 底部信息条 */}
      <div className="shell hero__footer">
        <div className="hero__meta">
          <span data-edit="profile.school" contentEditable={editMode} suppressContentEditableWarning>
            {profile.school}
          </span>
          <span className="hero__meta-sep">/</span>
          <span data-edit="profile.period" contentEditable={editMode} suppressContentEditableWarning>
            {profile.period}
          </span>
        </div>
        <a className="hero__scroll" href="#about">
          <span
            className="hero__scroll-text"
            data-edit="ui.hero.scroll"
            contentEditable={editMode}
            suppressContentEditableWarning
          >
            {ui.hero.scroll}
          </span>
          <span className="hero__scroll-line">
            <i />
          </span>
        </a>
      </div>

      {/* 装饰大背景字 */}
      <div
        className="hero__watermark"
        aria-hidden="true"
        data-edit="ui.hero.watermark"
        contentEditable={editMode}
        suppressContentEditableWarning
      >
        {ui.hero.watermark}
      </div>
    </section>
  )
}

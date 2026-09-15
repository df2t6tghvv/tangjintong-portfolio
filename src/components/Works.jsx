import { useEffect, useMemo, useRef, useState } from 'react'
import { workCategories } from '../data/content'
import { useContent } from '../context/ContentContext'
import { useInView } from '../hooks/useInView'

/**
 * 项目展示 —— 横向滚动作品墙（3:4 竖版卡片）
 *  - 滚轮：鼠标在作品屏任意位置滚动，作品即左右滑动（无需点按钮）
 *  - 拖拽：按住卡片左右拖动也可以滑动作品
 *  - 点击图片放大查看（灯箱）
 *  - 每张图片下方展示 200 字以内设计说明
 *  - 编辑模式下可改标题/年份/标签/说明/分类，点击图片换图
 */
export default function Works() {
  const [cat, setCat] = useState('all')
  const [lightbox, setLightbox] = useState(null)
  const [gridRef, gridIn] = useInView()
  const { content, editMode, update } = useContent()
  const works = content.works
  const ui = content.ui
  const scrollRef = useRef(null)
  const sectionRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 })

  const list = useMemo(
    () => (cat === 'all' ? works : works.filter((w) => w.category === cat)),
    [cat, works],
  )

  /* 滚轮 → 横向滚动：绑定到整个作品屏，鼠标在屏内任何位置滚动都左右滑作品；
     到达首/尾后放行页面纵向翻页 */
  useEffect(() => {
    const sec = sectionRef.current
    if (!sec) return
    const onWheel = (e) => {
      const el = scrollRef.current
      if (!el) return
      const max = el.scrollWidth - el.clientWidth
      if (max <= 0) return
      const delta = e.deltaY + e.deltaX
      const atStart = el.scrollLeft <= 0
      const atEnd = el.scrollLeft >= max - 1
      if (delta > 0 && atEnd) return
      if (delta < 0 && atStart) return
      e.preventDefault()
      el.scrollLeft += delta
    }
    sec.addEventListener('wheel', onWheel, { passive: false })
    return () => sec.removeEventListener('wheel', onWheel)
  }, [list])

  /* 拖拽横向滑动 */
  const onDragStart = (e) => {
    if (e.button !== 0 || editMode) return
    const el = scrollRef.current
    if (!el) return
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: 0 }
    el.classList.add('is-dragging')
  }
  const onDragMove = (e) => {
    const d = drag.current
    const el = scrollRef.current
    if (!d.active || !el) return
    const dx = e.clientX - d.startX
    d.moved = Math.max(d.moved, Math.abs(dx))
    el.scrollLeft = d.startLeft - dx
  }
  const onDragEnd = () => {
    drag.current.active = false
    scrollRef.current?.classList.remove('is-dragging')
  }

  const openLightbox = (w) => {
    if (drag.current.moved > 6) return // 刚拖拽过，不视为点击
    setLightbox({ ...w, idx: works.findIndex((x) => x.id === w.id) })
  }

  const scrollBy = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 600), behavior: 'smooth' })
  }

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setLightbox(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightbox])

  const catName = (key) =>
    workCategories.find((c) => c.key === key)?.label.replace('全部作品', '作品') || ''

  return (
    <section id="works" className="section works" ref={sectionRef}>
      <div className="grid-bg" />
      <div className="shell works__shell">
        <div className="section-head">
          <span className="section-index" data-edit="ui.works.index" contentEditable={editMode} suppressContentEditableWarning>
            {ui.works.index}
          </span>
          <h2 className="section-title">
            <span data-edit="ui.works.title" contentEditable={editMode} suppressContentEditableWarning>
              {ui.works.title}
            </span>
            <span className="en" data-edit="ui.works.en" contentEditable={editMode} suppressContentEditableWarning>
              {ui.works.en}
            </span>
          </h2>
          <span className="section-rule" />
        </div>

        {/* 筛选 + 横向滚动提示 */}
        <div className="works__filters reveal">
          {workCategories.map((c, ci) => (
            <button
              key={c.key}
              className={`chip ${cat === c.key ? 'is-active' : ''}`}
              onClick={() => !editMode && setCat(c.key)}
            >
              <span
                data-edit={`workCategories.${ci}.label`}
                contentEditable={editMode}
                suppressContentEditableWarning
              >
                {c.label}
              </span>
              <em>
                {c.key === 'all' ? works.length : works.filter((w) => w.category === c.key).length}
              </em>
            </button>
          ))}
          <span className="works__hint">
            <i>↔</i>{' '}
            <span data-edit="ui.works.hint" contentEditable={editMode} suppressContentEditableWarning>
              {ui.works.hint}
            </span>
          </span>
        </div>

        {/* 横向滚动轨道 */}
        <div className="works__rail">
          <button
            className="works__arrow works__arrow--prev"
            aria-label="向左滚动"
            onClick={() => scrollBy(-1)}
          >
            ←
          </button>
          <button
            className="works__arrow works__arrow--next"
            aria-label="向右滚动"
            onClick={() => scrollBy(1)}
          >
            →
          </button>

          <div
            className="works__scroll"
            ref={(node) => {
              scrollRef.current = node
              gridRef.current = node
            }}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
          >
            <div className="works__grid">
              {list.map((w, i) => {
                const idx = works.findIndex((x) => x.id === w.id)
                return (
                  <article
                    key={w.id}
                    className={`work-card reveal ${gridIn ? 'is-in' : ''}`}
                    style={{ transitionDelay: `${(i % 6) * 60}ms` }}
                  >
                    <div
                      className="work-card__media"
                      onClick={() => openLightbox(w)}
                    >
                      <img
                        src={w.file}
                        alt={w.title}
                        data-edit-img={`works.${idx}.file`}
                        loading="lazy"
                      />
                      <span className="work-card__index">{String(i + 1).padStart(2, '0')}</span>
                      <span className="work-card__view" data-edit="ui.works.view">
                        {ui.works.view}
                      </span>
                    </div>
                    <div className="work-card__info">
                      <div className="work-card__head">
                        <h3
                          data-edit={`works.${idx}.title`}
                          contentEditable={editMode}
                          suppressContentEditableWarning
                        >
                          {w.title}
                        </h3>
                        <span
                          className="work-card__year"
                          data-edit={`works.${idx}.year`}
                          contentEditable={editMode}
                          suppressContentEditableWarning
                        >
                          {w.year}
                        </span>
                      </div>
                      {editMode ? (
                        <select
                          className="work-card__cat-edit"
                          value={w.category}
                          onChange={(e) => update(`works.${idx}.category`, e.target.value)}
                        >
                          {workCategories.map((c) => (
                            <option key={c.key} value={c.key}>
                              {c.label.replace('全部作品', '全部')}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p
                          className="work-card__tag"
                          data-edit={`works.${idx}.tag`}
                          contentEditable={editMode}
                          suppressContentEditableWarning
                        >
                          {w.tag}
                        </p>
                      )}
                      <p
                        className="work-card__note"
                        data-edit={`works.${idx}.note`}
                        contentEditable={editMode}
                        suppressContentEditableWarning
                      >
                        {w.note}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 灯箱 */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox__media">
              <img src={lightbox.file} alt={lightbox.title} />
            </div>
            <div className="lightbox__meta">
              <span className="lightbox__cat">{catName(lightbox.category)}</span>
              <h3
                data-edit={`works.${lightbox.idx}.title`}
                contentEditable={editMode}
                suppressContentEditableWarning
              >
                {lightbox.title}
              </h3>
              <p className="lightbox__tag">
                <span
                  data-edit={`works.${lightbox.idx}.tag`}
                  contentEditable={editMode}
                  suppressContentEditableWarning
                >
                  {lightbox.tag}
                </span>{' '}
                ·{' '}
                <span
                  data-edit={`works.${lightbox.idx}.year`}
                  contentEditable={editMode}
                  suppressContentEditableWarning
                >
                  {lightbox.year}
                </span>
              </p>
              <p
                className="lightbox__note"
                data-edit={`works.${lightbox.idx}.note`}
                contentEditable={editMode}
                suppressContentEditableWarning
              >
                {lightbox.note}
              </p>
              <p
                className="lightbox__desc"
                data-edit={`works.${lightbox.idx}.desc`}
                contentEditable={editMode}
                suppressContentEditableWarning
              >
                {lightbox.desc}
              </p>
            </div>
            <button className="lightbox__close" onClick={() => setLightbox(null)} aria-label="关闭">
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

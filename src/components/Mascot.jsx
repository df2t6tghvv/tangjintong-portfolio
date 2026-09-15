import { useRef } from 'react'
import { useContent } from '../context/ContentContext'

/**
 * IP 形象 —— 循环视频/形象图 + 互动动作
 *  - 悬停：高亮光晕 + 提示气泡「戳我一下」
 *  - 点击：弹跳反应 + 金色光环扩散
 *  - 编辑模式下禁用互动（点击留给换图）
 */
export default function Mascot({ profile }) {
  const wrapRef = useRef(null)
  const { content, editMode } = useContent()
  const ui = content.ui

  const onMove = (e) => {
    if (editMode) return
    const el = wrapRef.current
    if (!el) return
    el.classList.add('is-hover')
  }

  const onLeave = () => {
    const el = wrapRef.current
    if (!el) return
    el.classList.remove('is-hover')
  }

  const onClick = () => {
    if (editMode) return
    const el = wrapRef.current
    if (!el) return
    el.classList.remove('is-boing')
    void el.offsetWidth // 强制 reflow 以重放动画
    el.classList.add('is-boing')
    window.setTimeout(() => el.classList.remove('is-boing'), 750)
  }

  const media = profile.ipMascotVideo ? (
    <video
      className="mascot"
      src={profile.ipMascotVideo}
      alt={`${profile.name} · ${profile.ipName}`}
      data-edit-img="profile.ipMascot"
      autoPlay
      loop
      muted
      playsInline
    />
  ) : (
    <img
      className="mascot"
      src={profile.ipMascot}
      alt={`${profile.name} · ${profile.ipName}`}
      data-edit-img="profile.ipMascot"
      loading="lazy"
    />
  )

  return (
    <div
      className="mascot-interact"
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <span className="mascot-halo" aria-hidden="true" />
      {media}
      <span className="mascot-pop" aria-hidden="true" data-edit="ui.mascot.pop" contentEditable={editMode} suppressContentEditableWarning>
        {ui.mascot.pop}
      </span>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useContent } from '../context/ContentContext'

/**
 * 页内编辑工具栏（底部悬浮）+ 全局编辑事件绑定
 *  - 文字：点击直接编辑，失焦写入 content
 *  - 图片：点击弹出文件选择，替换后写入 IndexedDB 并即时生效
 *  - Esc 退出编辑模式
 */
export default function EditorBar() {
  const { content, editMode, setEditMode, update, replaceImage, save, reset } = useContent()
  const [toast, setToast] = useState('')

  const flash = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2600)
  }

  /* 全局绑定：blur 提交文字、click 换图、Esc 退出 */
  useEffect(() => {
    if (!editMode) return
    const onBlur = (e) => {
      const el = e.target.closest ? e.target.closest('[data-edit]') : null
      if (!el || !el.isContentEditable) return
      const p = el.getAttribute('data-edit')
      if (p) {
        let val = el.textContent.replace(/\s+/g, ' ').trim()
        if (el.getAttribute('data-edit-parse') === 'int') {
          val = parseInt(val, 10)
          if (Number.isNaN(val)) val = 0
        }
        update(p, val)
      }
    }
    const onClick = (e) => {
      const el = e.target.closest ? e.target.closest('[data-edit-img]') : null
      if (!el) return
      e.preventDefault()
      e.stopPropagation()
      const p = el.getAttribute('data-edit-img')
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = async () => {
        const f = input.files && input.files[0]
        if (!f) return
        const ok = await replaceImage(p, f)
        if (ok) {
          // 换了 IP 形象图后，旧的动画视频不再匹配，回退为形象图浮动动画
          if (p === 'profile.ipMascot') update('profile.ipMascotVideo', '')
          flash('图片已更换，保存后刷新仍生效')
        }
      }
      input.click()
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setEditMode(false)
    }
    /* 链接/按钮内的可编辑文字：点击时阻止默认导航，避免焦点被重置 */
    const onEditClick = (e) => {
      const el = e.target.closest ? e.target.closest('[data-edit]') : null
      if (el && el.isContentEditable) e.preventDefault()
    }
    document.addEventListener('blur', onBlur, true)
    document.addEventListener('click', onClick, true)
    document.addEventListener('click', onEditClick, true)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('blur', onBlur, true)
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('click', onEditClick, true)
      window.removeEventListener('keydown', onKey)
    }
  }, [editMode, update, replaceImage, setEditMode])

  if (!editMode) return null

  const onSave = async () => {
    const ok = await save()
    flash(ok ? '已保存 · 刷新页面后修改仍然生效' : '保存失败，请检查浏览器存储权限')
  }
  const onReset = async () => {
    if (window.confirm('确定恢复为默认内容？当前所有页内修改（含换图）将被清除。')) {
      await reset()
      flash('已恢复默认内容')
    }
  }

  return (
    <div className="editor-bar">
      <span className="editor-bar__hint">
        <i />
        编辑模式：点击文字直接修改 · 点击图片可更换（{content.profile?.name || ''} 的作品集）
      </span>
      <button className="editor-bar__btn editor-bar__btn--solid" onClick={onSave}>
        保存修改
      </button>
      <button className="editor-bar__btn editor-bar__btn--ghost" onClick={onReset}>
        重置默认
      </button>
      <button className="editor-bar__btn editor-bar__btn--ghost" onClick={() => setEditMode(false)}>
        退出编辑
      </button>
      {toast && <span className="editor-bar__toast">{toast}</span>}
    </div>
  )
}

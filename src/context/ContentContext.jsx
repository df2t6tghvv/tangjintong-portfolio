import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import * as defaults from '../data/content'
import * as store from '../lib/contentStorage'

const Ctx = createContext(null)

/* 按路径读写对象（路径如 "profile.stats.1.label"） */
export function getPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj)
}
function setPath(obj, path, val) {
  const keys = path.split('.')
  const last = keys.pop()
  let o = obj
  for (const k of keys) {
    if (o[k] == null || typeof o[k] !== 'object') o[k] = {}
    o = o[k]
  }
  o[last] = val
}

/* 递归找出与默认值不同的叶子（string / number），供保存使用；图片 dataURL 跳过（走 IndexedDB） */
function diffLeafs(a, b, prefix = '', out = {}) {
  if (a === b) return out
  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
    if (typeof b === 'string' && b.startsWith('data:image/')) return out
    if (typeof b === 'string' || typeof b === 'number') out[prefix] = b
    return out
  }
  for (const k of Object.keys(a)) {
    if (k in b) diffLeafs(a[k], b[k], prefix ? `${prefix}.${k}` : k, out)
  }
  return out
}

const clone = (o) => JSON.parse(JSON.stringify(o))

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => clone(defaults))
  const [editMode, setEditMode] = useState(false)
  const [dirty, setDirty] = useState(false)

  /* 挂载时加载本地覆盖（文本 + 图片） */
  useEffect(() => {
    let alive = true
    ;(async () => {
      const [imgs] = await Promise.all([store.loadImages()])
      if (!alive) return
      const text = store.loadTextOverrides()
      const next = clone(defaults)
      Object.entries(text).forEach(([p, v]) => setPath(next, p, v))
      imgs.forEach(({ path, dataURL }) => setPath(next, path, dataURL))
      setContent(next)
    })()
    return () => {
      alive = false
    }
  }, [])

  /* 编辑模式下给 body 加样式钩子 */
  useEffect(() => {
    document.body.classList.toggle('editing', editMode)
    return () => document.body.classList.remove('editing')
  }, [editMode])

  const update = useCallback((path, value) => {
    setContent((c) => {
      const next = clone(c)
      setPath(next, path, value)
      return next
    })
    setDirty(true)
  }, [])

  const replaceImage = useCallback(
    async (path, file) => {
      const maxBytes = 2.5 * 1024 * 1024
      if (file.size > maxBytes) {
        window.alert(
          `图片超过 2.5MB，请压缩后再换（当前 ${(file.size / 1024 / 1024).toFixed(1)}MB）`,
        )
        return false
      }
      const dataURL = await store.readFileAsDataURL(file)
      await store.saveImage(path, dataURL)
      update(path, dataURL)
      return true
    },
    [update],
  )

  const save = useCallback(async () => {
    const text = diffLeafs(defaults, content)
    return store.saveTextOverrides(text)
  }, [content])

  const reset = useCallback(async () => {
    await Promise.all([store.clearImages(), Promise.resolve(store.clearTextOverrides())])
    setContent(clone(defaults))
    setDirty(false)
  }, [])

  const value = useMemo(
    () => ({ content, editMode, dirty, setEditMode, update, replaceImage, save, reset }),
    [content, editMode, dirty, update, replaceImage, save, reset],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useContent = () => useContext(Ctx)

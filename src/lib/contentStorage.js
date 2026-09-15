/**
 * 页内编辑 —— 持久化存储
 *  - 文本覆盖：localStorage（路径 → 新值）
 *  - 图片覆盖：IndexedDB（路径 → dataURL，容量更大）
 * 路径形如 "profile.name"、"works.2.title"，与 content.js 结构对应。
 */

const LS_KEY = 'tjt-portfolio-edits-v1'
const DB_NAME = 'tjt-portfolio-edits'
const STORE = 'images'

/* ---------- localStorage：文本 ---------- */
export function loadTextOverrides() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveTextOverrides(map) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(map))
    return true
  } catch {
    return false
  }
}

export function clearTextOverrides() {
  localStorage.removeItem(LS_KEY)
}

/* ---------- IndexedDB：图片 ---------- */
function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function loadImages() {
  try {
    const db = await openDb()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly')
      const rq = tx.objectStore(STORE).getAll()
      rq.onsuccess = () => resolve(rq.result || [])
      rq.onerror = () => reject(rq.error)
    })
  } catch {
    return []
  }
}

export async function saveImage(path, dataURL) {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).put({ path, dataURL }, path)
    tx.oncomplete = () => resolve(true)
    tx.onerror = () => reject(tx.error)
  })
}

export async function clearImages() {
  try {
    const db = await openDb()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite')
      tx.objectStore(STORE).clear()
      tx.oncomplete = () => resolve(true)
      tx.onerror = () => reject(tx.error)
    })
  } catch {
    return true
  }
}

/* ---------- 通用工具 ---------- */
export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = () => resolve(fr.result)
    fr.onerror = () => reject(fr.error)
    fr.readAsDataURL(file)
  })
}

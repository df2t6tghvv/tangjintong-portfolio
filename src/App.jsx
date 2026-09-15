import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Works from './components/Works'
import Skills from './components/Skills'
import Footer from './components/Footer'
import DotNav from './components/DotNav'
import EditorBar from './components/EditorBar'
import { ContentProvider } from './context/ContentContext'

function Site() {
  // 全局入场动画：统一为所有 .reveal 元素添加 .is-in（含筛选后动态渲染的元素）
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'))
      return
    }
    const tracked = new Set()
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    const scan = () => {
      document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => {
        if (!tracked.has(el)) {
          tracked.add(el)
          obs.observe(el)
        }
      })
    }
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      obs.disconnect()
      mo.disconnect()
    }
  }, [])

  return (
    <div className="app">
      <Navbar />
      <DotNav />
      <main>
        <Hero />
        <About />
        <Works />
        <Skills />
        <Footer />
      </main>
      <EditorBar />
    </div>
  )
}

export default function App() {
  return (
    <ContentProvider>
      <Site />
    </ContentProvider>
  )
}

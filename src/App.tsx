import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import Preloader from './components/Preloader'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Films from './pages/Films'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { initSmoothScroll, scrollToTop } from './lib/smooth'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    scrollToTop()
  }, [pathname])
  return null
}

export default function App() {
  useEffect(() => initSmoothScroll(), [])

  return (
    <>
      <Preloader />
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:category" element={<Portfolio />} />
          <Route path="/album/*" element={<Navigate to="/portfolio" replace />} />
          <Route path="/films" element={<Films />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
      <div className="grain" aria-hidden />
    </>
  )
}

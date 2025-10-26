import { useEffect } from 'react'

export const useScrollOptimization = () => {
  useEffect(() => {
    // Optimize scroll performance
    const optimizeScroll = () => {
      // Add smooth scrolling class to html
      document.documentElement.classList.add('smooth-scroll')
      
      // Optimize images for lazy loading
      const images = document.querySelectorAll('img')
      images.forEach(img => {
        if (!img.loading) {
          img.loading = 'lazy'
        }
      })
      
      // Add GPU acceleration to animated elements
      const animatedElements = document.querySelectorAll('[class*="animate"], [class*="transition"]')
      animatedElements.forEach(el => {
        (el as HTMLElement).classList.add('gpu-accelerated')
      })
    }

    // Run optimization after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeScroll)
    } else {
      optimizeScroll()
    }

    // Throttle scroll events
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('DOMContentLoaded', optimizeScroll)
    }
  }, [])
}
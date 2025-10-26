'use client'

import { useEffect } from 'react'

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Optimize scroll performance
    const optimizePerformance = () => {
      // Add smooth scrolling
      document.documentElement.style.scrollBehavior = 'smooth'
      
      // Enable hardware acceleration for body
      document.body.style.transform = 'translate3d(0, 0, 0)'
      document.body.style.willChange = 'scroll-position'
      
      // Optimize images
      const images = document.querySelectorAll('img')
      images.forEach(img => {
        if (!img.loading) img.loading = 'lazy'
        img.style.transform = 'translate3d(0, 0, 0)'
      })
      
      // Add GPU acceleration to animated elements
      const animatedElements = document.querySelectorAll('[class*="animate"], [class*="transition"], [class*="hover"]')
      animatedElements.forEach(el => {
        const element = el as HTMLElement
        element.style.transform = 'translate3d(0, 0, 0)'
        element.style.willChange = 'transform'
      })
    }

    // Throttled scroll handler
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          ticking = false
        })
        ticking = true
      }
    }

    // Run optimizations
    optimizePerformance()
    
    // Add passive scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}
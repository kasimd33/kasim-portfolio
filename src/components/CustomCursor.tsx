'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', mouseMove)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: 'hsl(var(--primary))',
      mixBlendMode: 'difference' as const,
    },
    text: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: 'hsl(var(--primary))',
      mixBlendMode: 'difference' as const,
    },
  }

  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).matches(
          'a, button, h1, h2, h3, p, span, li, [role="button"]'
        )
      ) {
        setCursorVariant('text')
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).matches(
          'a, button, h1, h2, h3, p, span, li, [role="button"]'
        )
      ) {
        setCursorVariant('default')
      }
    }

    document.body.addEventListener('mouseenter', handleMouseEnter, true)
    document.body.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      document.body.removeEventListener('mouseenter', handleMouseEnter, true)
      document.body.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
      variants={variants}
      animate={cursorVariant}
      transition={{
        x: { duration: 0.05, ease: 'linear' },
        y: { duration: 0.05, ease: 'linear' },
        height: { duration: 0.2, ease: 'circOut' },
        width: { duration: 0.2, ease: 'circOut' },
      }}
    />
  )
}

export default CustomCursor

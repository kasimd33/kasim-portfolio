 'use client'

import { useState, useEffect } from 'react'
import { HoverButton } from '@/components/ui/hover-button'
import { ArrowDown, Download, ExternalLink } from 'lucide-react'
import { DottedSurface } from '@/components/ui/dotted-surface'
import { ShaderAnimation } from '@/components/ui/shader-animation'
import { FadeContent } from '@/components/ui/FadeContent'
import ProfileCard from '@/components/ui/ProfileCard'
import siteData from '@/data/siteData.json'
import Image from 'next/image'

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  const roles = siteData.hero.roles
  const currentRole = roles[currentRoleIndex]

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentRole.length) {
          setDisplayText(currentRole.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentRole.substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        } else {
          setIsDeleting(false)
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, currentRole, currentRoleIndex, roles])

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDownloadResume = () => {
    window.open('https://drive.google.com/file/d/1nWtjJ4I4-8FqB0ovF7ZjudHj_qnAZtj6/view?usp=drive_link', '_blank')
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-0 -mt-2">

      
      {/* Shader Animation Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <ShaderAnimation />
      </div>
      
      {/* Dark Overlay for better text readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/40 z-10"
      />
      
      {/* Radial Gradient Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--foreground)/.05),transparent_70%)] z-15"
      />
      
      <div className="responsive-container relative z-30 section-padding">
        <div className="responsive-grid lg:grid-cols-2 items-center max-w-7xl mx-auto">
          {/* Left side - Main content */}
          <div className="text-center lg:text-left lg:order-1 order-2">
          {/* Greeting */}
          <FadeContent duration={600} className="mb-4">
            <span className="text-sm md:text-base font-semibold text-foreground/80 tracking-wide uppercase accent-text">
              Hello, I'm
            </span>
          </FadeContent>

          {/* Name */}
          <FadeContent duration={600} delay={100} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 lg:mb-6 tracking-tight">
            <span className="relative z-10 text-high-contrast hero-name bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              {siteData.hero.name}
            </span>
          </FadeContent>

          {/* Typewriter Role */}
          <FadeContent duration={600} delay={200} className="h-8 sm:h-10 md:h-12 mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0 relative z-10">
            <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-primary drop-shadow-2xl font-heading">
              {displayText}
              <span className="inline-block w-1 h-6 sm:h-8 md:h-10 bg-primary ml-2 drop-shadow-lg animate-pulse" />
            </span>
          </FadeContent>

          {/* Tagline */}
          <FadeContent duration={600} delay={300} className="text-base sm:text-lg md:text-xl text-high-contrast mb-8 lg:mb-10 max-w-3xl mx-auto lg:mx-0 relative z-10 font-medium leading-relaxed">
            {siteData.hero.tagline}
          </FadeContent>

          {/* CTA Buttons */}
          <FadeContent duration={600} delay={400} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center mb-8 lg:mb-12">
            <HoverButton
              onClick={() => scrollToSection('#projects')}
              className="btn-responsive font-medium w-full sm:w-auto"
            >
              {siteData.hero.primaryCTA}
            </HoverButton>

            <HoverButton
              onClick={handleDownloadResume}
              className="btn-responsive font-medium w-full sm:w-auto"
            >
              {siteData.hero.secondaryCTA}
            </HoverButton>
          </FadeContent>

          {/* Social Links */}
          <FadeContent duration={600} delay={500} className="flex gap-3 sm:gap-4 justify-center lg:justify-start mb-8 lg:mb-12">
            {Object.entries(siteData.social).map(([platform, url]) => {
              const getIcon = () => {
                switch(platform) {
                  case 'github':
                    return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C20.565 21.795 24 17.31 24 12C24 5.37 18.63 0 12 0Z"/></svg>
                  case 'linkedin':
                    return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  case 'twitter':
                    return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  case 'email':
                    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  default:
                    return <div className="w-5 h-5 bg-current rounded"></div>
                }
              }
              
              return (
                <a
                  key={platform}
                  href={platform === 'email' ? 'mailto:kasi47837@gmail.com?subject=Contact from Portfolio&body=Hi Kasim,' : url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full glass shadow-md hover:shadow-lg hover:scale-110 hover:-translate-y-1 hover:rotate-3 transition-all duration-300 backdrop-blur-sm text-gray-300 hover:text-white"
                  aria-label={`Visit ${platform}`}
                >
                  {getIcon()}
                </a>
              )
            })}
          </FadeContent>
          </div>
          
          {/* Right side - Profile Card */}
          <div className="flex justify-center items-center lg:order-2 order-1 mb-8 lg:mb-0">
            <FadeContent duration={800} delay={600}>
              <ProfileCard
                name={siteData.hero.name}
                title={siteData.hero.roles[0]}
                handle="kasim_dev"
                status="Available for work"
                contactText="Contact Me"
                avatarUrl="/images/profile.jpg-removebg-preview.png"
                onContactClick={() => {
                  window.open('mailto:kasi47837@gmail.com?subject=Contact from Portfolio&body=Hi Kasim,', '_blank');
                }}
              />
            </FadeContent>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <FadeContent duration={600} delay={800} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div
          className="cursor-pointer animate-bounce hover:scale-110 transition-transform duration-200"
          onClick={() => scrollToSection('#about')}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </FadeContent>
    </section>
  )
}

export default Hero
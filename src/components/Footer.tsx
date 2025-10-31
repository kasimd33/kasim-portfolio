'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react'
import siteData from '@/data/siteData.json'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ]

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail
  }

  return (
    <footer className="bg-background border-t w-full max-w-full overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        <div className="py-8 sm:py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs sm:text-sm">KS</span>
                </div>
                <span className="font-semibold text-base sm:text-lg">{siteData.hero.name}</span>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 max-w-sm">
                {siteData.hero.tagline}
              </p>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {Object.entries(siteData.social).map(([platform, url]) => {
                  if (platform === 'email') return null
                  const Icon = socialIcons[platform as keyof typeof socialIcons]
                  return (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 sm:p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Visit ${platform}`}
                    >
                      {Icon ? (
                        <Icon className="w-4 h-4 sm:w-4 sm:h-4" />
                      ) : (
                        <img 
                          src={`/icons/${platform}.svg`} 
                          alt={platform}
                          className="w-4 h-4 sm:w-4 sm:h-4"
                          loading="lazy"
                        />
                      )}
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors inline-block py-1 min-h-[32px] flex items-center"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sm:col-span-2 md:col-span-1"
            >
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Get in Touch</h3>
              <div className="space-y-1.5 sm:space-y-2">
                <p className="text-sm sm:text-base text-muted-foreground break-words">
                  <a href={`mailto:${siteData.social.email}`} className="hover:text-primary transition-colors">
                    {siteData.social.email}
                  </a>
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Ballari, Karnataka, 583101
                </p>
              </div>
              <div className="mt-3 sm:mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(siteData.site.resumeUrl, '_blank')}
                  className="h-10 min-h-[44px] text-sm w-full sm:w-auto"
                >
                  Download Resume
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-muted-foreground text-xs sm:text-sm text-center sm:text-left"
            >
              © {currentYear} {siteData.hero.name}. All rights reserved.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="h-10 min-h-[44px] px-4 text-sm"
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Back to Top
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
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
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4">
        <div className="py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">AC</span>
                </div>
                <span className="font-semibold text-lg">{siteData.hero.name}</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-sm">
                {siteData.hero.tagline}
              </p>
              <div className="flex gap-3">
                {Object.entries(siteData.social).map(([platform, url]) => {
                  if (platform === 'email') return null
                  const Icon = socialIcons[platform as keyof typeof socialIcons]
                  return (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Visit ${platform}`}
                    >
                      {Icon ? (
                        <Icon className="w-4 h-4" />
                      ) : (
                        <img 
                          src={`/icons/${platform}.svg`} 
                          alt={platform}
                          className="w-4 h-4"
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
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
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
            >
              <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <a href={`mailto:${siteData.social.email}`} className="hover:text-primary transition-colors">
                    {siteData.social.email}
                  </a>
                </p>
                <p className="text-muted-foreground">
                  San Francisco, CA
                </p>
              </div>
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(siteData.site.resumeUrl, '_blank')}
                  className="h-10"
                >
                  Download Resume
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-muted-foreground text-sm"
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
                className="h-10 px-4"
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
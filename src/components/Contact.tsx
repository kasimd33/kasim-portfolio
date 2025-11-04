'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import siteData from '@/data/siteData.json'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitted(true)
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
      })
      
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: siteData.contact.email,
      href: `mailto:${siteData.contact.email}`
    },
    {
      icon: Phone,
      label: 'Phone',
      value: siteData.contact.phone,
      href: `tel:${siteData.contact.phone.replace(/\s/g, '')}`
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Ballari, Karnataka, 583101',
      href: siteData.contact.location
    }
  ]

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-secondary/5 w-full max-w-full overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              {siteData.contact.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-xl card-hover glass">
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send a Message</h3>
                  
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 sm:py-12"
                    >
                      <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-3 sm:mb-4" />
                      <h4 className="text-lg sm:text-xl font-semibold mb-2">Message Sent!</h4>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        Thank you for reaching out. I'll get back to you soon.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      {siteData.contact.formFields.map((field) => (
                        <div key={field.name} className="space-y-1.5 sm:space-y-2">
                          <Label htmlFor={field.name} className="text-xs sm:text-sm font-medium">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </Label>
                          {field.type === 'textarea' ? (
                            <Textarea
                              id={field.name}
                              name={field.name}
                              value={formData[field.name as keyof typeof formData]}
                              onChange={handleInputChange}
                              placeholder={field.placeholder}
                              required={field.required}
                              rows={5}
                              className="resize-none text-sm sm:text-base min-h-[120px]"
                            />
                          ) : (
                            <Input
                              id={field.name}
                              name={field.name}
                              type={field.type}
                              value={formData[field.name as keyof typeof formData]}
                              onChange={handleInputChange}
                              placeholder={field.placeholder}
                              required={field.required}
                              className="text-sm sm:text-base h-11 sm:h-12"
                            />
                          )}
                        </div>
                      ))}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 min-h-[48px] text-sm sm:text-base font-medium bg-gradient-to-r from-primary to-primary/90 btn-glow"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Quick Contact Info */}
              <Card className="border-0 shadow-xl card-hover glass">
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Information</h3>
                  
                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    {contactInfo.map((info, index) => (
                      <motion.a
                        key={info.label}
                        href={info.href}
                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-accent transition-colors group min-h-[60px]"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div 
                          className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors shadow-lg ring-2 ring-primary/10 flex-shrink-0"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </motion.div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm sm:text-base">{info.label}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">{info.value}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="border-0 shadow-xl card-hover glass">
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Connect on Social</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {Object.entries(siteData.social).map(([platform, url]) => {
                      if (platform === 'email') return null
                      
                      return (
                        <motion.a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-lg border hover:bg-accent transition-colors group glass backdrop-blur-sm min-h-[56px]"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div 
                            className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors shadow-lg ring-2 ring-primary/10 flex-shrink-0"
                            whileHover={{ scale: 1.1, rotate: 15 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <img 
                              src={`/icons/${platform}.svg`} 
                              alt={platform}
                              className="w-4 h-4 sm:w-5 sm:h-5"
                              loading="lazy"
                            />
                          </motion.div>
                          <span className="font-medium capitalize text-sm sm:text-base">{platform}</span>
                        </motion.a>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/5 to-secondary/5 card-hover glass">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <motion.div 
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-primary/30 to-primary/20 rounded-full flex items-center justify-center shadow-lg ring-2 ring-primary/20 flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </motion.div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base">Response Time</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        I typically respond within 24-48 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Briefcase } from 'lucide-react'
import siteData from '@/data/siteData.json'

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const timelineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: 'easeInOut',
        delay: 0.5,
      },
    },
  }

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Work <span className="text-primary">Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional journey and the places I've worked
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              variants={timelineVariants}
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 transform md:-translate-x-1/2 origin-top"
            />

            {/* Experience Items */}
            <div className="space-y-12">
              {siteData.experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    variants={itemVariants}
                    className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform md:-translate-x-1/2 z-10"
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Content Card */}
                  <motion.div
                    variants={itemVariants}
                    className={`ml-16 md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'
                    }`}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-6">
                        {/* Header */}
                        <div className={`flex items-center gap-2 mb-3 ${
                          index % 2 === 0 ? 'md:justify-end' : ''
                        }`}>
                          <Briefcase className="w-5 h-5 text-primary" />
                          <h3 className="text-xl font-bold">{exp.position}</h3>
                        </div>

                        {/* Company and Location */}
                        <div className={`space-y-1 mb-4 ${
                          index % 2 === 0 ? 'md:text-right' : ''
                        }`}>
                          <p className="text-primary font-semibold">{exp.company}</p>
                          <div className={`flex items-center gap-2 text-sm text-muted-foreground ${
                            index % 2 === 0 ? 'md:justify-end' : ''
                          }`}>
                            <Calendar className="w-4 h-4" />
                            <span>{exp.period}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Achievements */}
                        <div className="space-y-2">
                          <p className="font-semibold text-sm">Key Achievements:</p>
                          <div className={`flex flex-wrap gap-2 ${
                            index % 2 === 0 ? 'md:justify-end' : ''
                          }`}>
                            {exp.achievements.map((achievement, achIndex) => (
                              <Badge 
                                key={achIndex} 
                                variant="secondary" 
                                className="text-xs"
                              >
                                {achievement}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <motion.div
            variants={itemVariants}
            className="mt-20"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Education</h3>
            
            <div className="space-y-8">
              {siteData.education.map((edu) => (
                <motion.div
                  key={edu.id}
                  variants={itemVariants}
                  className="relative"
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h4 className="text-xl font-bold mb-2">{edu.degree}</h4>
                          <p className="text-primary font-semibold mb-1">{edu.institution}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{edu.period}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1 md:text-right">
                          <p className="text-muted-foreground mb-3">{edu.description}</p>
                          <div className="flex flex-wrap gap-2 md:justify-end">
                            {edu.achievements.map((achievement, index) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="text-xs"
                              >
                                {achievement}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
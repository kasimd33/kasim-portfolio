'use client'

import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, GraduationCap, Award } from 'lucide-react'
import FadeContent from '@/components/ui/FadeContent'
import { DotScreenShader } from '@/components/ui/dot-shader-background'
import siteData from '@/data/siteData.json'

const About = () => {

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-background w-full max-w-full overflow-hidden">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 max-w-full">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeContent blur={true} duration={800} className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              About <span className="animated-gradient-text">Me</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Get to know more about my background, skills, and journey
            </p>
          </FadeContent>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
            {/* Left Column - Photo and Bio */}
            <FadeContent blur={true} duration={1000} delay={200} className="space-y-8">
              {/* Profile Card */}
              <Card className="overflow-hidden modern-card">
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Profile Image */}
                    <div className="aspect-square flex items-center justify-center relative overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 rounded-2xl">
                        <DotScreenShader />
                      </div>
                      <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden backdrop-blur-sm shadow-2xl ring-4 ring-primary/20 relative z-10 hover:scale-105 hover:rotate-2 transition-transform duration-300">
                        <img 
                          src="/images/profile.jpg.jpg" 
                          alt="Kasim SK Profile Photo" 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    
                    {/* Quick Info */}
                    <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                        <span className="font-medium text-sm sm:text-base">Information Science Student</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                        <span className="font-medium text-sm sm:text-base">Full-Stack Developer</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bio */}
              <div className="space-y-3 sm:space-y-4">
                {siteData.about.bio.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeContent>

            {/* Right Column - Skills */}
            <FadeContent blur={true} duration={1000} delay={400} className="space-y-4 sm:space-y-6">
              <Card className="modern-card glass">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                    <span className="w-2 h-8 bg-gradient-to-b from-primary to-primary/60 rounded-full shadow-lg"></span>
                    Technical Skills
                  </h3>
                  
                  <div className="space-y-4 sm:space-y-6">
                    {siteData.about.skills.map((skill, index) => (
                      <div
                        key={skill.name}
                        className="space-y-1.5 sm:space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-xs sm:text-sm">{skill.name}</span>
                          <span className="text-xs sm:text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="relative">
                          <Progress 
                            value={skill.level} 
                            className="h-2 bg-secondary"
                            style={{
                              background: `linear-gradient(to right, hsl(var(--primary)) ${skill.level}%, hsl(var(--secondary)) ${skill.level}%)`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education Card */}
              <Card className="modern-card glass">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                    <div className="hover:rotate-12 hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    Education
                  </h3>
                  
                  {siteData.education.map((edu) => (
                    <div key={edu.id} className="space-y-2 sm:space-y-3">
                      <div>
                        <h4 className="font-semibold text-base sm:text-lg">{edu.degree}</h4>
                        <p className="text-primary font-medium text-sm sm:text-base">{edu.institution}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{edu.period}</p>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{edu.description}</p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {edu.achievements.map((achievement, index) => (
                          <Badge key={index} variant="secondary" className="text-xs break-words max-w-full">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeContent>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
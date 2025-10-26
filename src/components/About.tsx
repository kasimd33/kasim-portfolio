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
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeContent blur={true} duration={800} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              About <span className="animated-gradient-text">Me</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get to know more about my background, skills, and journey
            </p>
          </FadeContent>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden backdrop-blur-sm shadow-2xl ring-4 ring-primary/20 relative z-10 hover:scale-105 hover:rotate-2 transition-transform duration-300">
                        <img 
                          src="/images/profile.jpg.jpg" 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Quick Info */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <span className="font-medium">Information Science Student</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        <span className="font-medium">Full-Stack Developer</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bio */}
              <div className="space-y-4">
                {siteData.about.bio.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeContent>

            {/* Right Column - Skills */}
            <FadeContent blur={true} duration={1000} delay={400} className="space-y-6">
              <Card className="modern-card glass">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-2 h-8 bg-gradient-to-b from-primary to-primary/60 rounded-full shadow-lg"></span>
                    Technical Skills
                  </h3>
                  
                  <div className="space-y-6">
                    {siteData.about.skills.map((skill, index) => (
                      <div
                        key={skill.name}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
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
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <div className="hover:rotate-12 hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    Education
                  </h3>
                  
                  {siteData.education.map((edu) => (
                    <div key={edu.id} className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-lg">{edu.degree}</h4>
                        <p className="text-primary font-medium">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.period}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{edu.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.map((achievement, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
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
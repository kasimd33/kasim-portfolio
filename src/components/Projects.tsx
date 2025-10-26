'use client'

import { useState, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Star } from 'lucide-react'
import FadeContent from '@/components/ui/FadeContent'
import ElectricBorder from '@/components/ui/ElectricBorder'
import siteData from '@/data/siteData.json'

interface ProjectCardProps {
  project: typeof siteData.projects[0]
  index: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    setIsHovered(false)
  }

  return (
    <FadeContent
      blur={true}
      duration={800}
      delay={index * 100}
      className="group"
    >
      <ElectricBorder
        color="#7df9ff"
        speed={0.5}
        chaos={0.3}
        thickness={1}
        style={{ borderRadius: 16 }}
      >
        <Card
          ref={cardRef}
          className="overflow-hidden modern-card cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.15s ease-out, box-shadow 0.3s ease-out',
          }}
        >
        {/* Project Image */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10">
          <div className="absolute inset-0 bg-pattern opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/20 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-xl ring-2 ring-primary/20 hover:scale-110 hover:rotate-3 transition-transform duration-300">
              <Star className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary text-primary-foreground shadow-lg">
                Featured
              </Badge>
            </div>
          )}

          {/* Overlay on hover */}
          <div
            className={`absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="flex gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-full shadow-lg btn-glow hover:scale-110 hover:rotate-2 active:scale-95 transition-transform duration-200"
                aria-label="View live demo"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass text-foreground rounded-full shadow-lg backdrop-blur-sm hover:scale-110 hover:-rotate-2 active:scale-95 transition-transform duration-200"
                aria-label="View source code"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Project Title */}
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div
            className={`flex gap-3 transition-all duration-200 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          >
            <Button
              size="sm"
              onClick={() => window.open(project.liveUrl, '_blank')}
              className="btn-modern flex-1 h-10"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(project.repoUrl, '_blank')}
              className="flex-1 h-10 glass backdrop-blur-sm hover:bg-primary/5"
            >
              <Github className="w-4 h-4 mr-2" />
              Code
            </Button>
          </div>
        </CardContent>
        </Card>
      </ElectricBorder>
    </FadeContent>
  )
}

const Projects = () => {
  const featuredProjects = siteData.projects.filter(p => p.featured)
  const otherProjects = siteData.projects.filter(p => !p.featured)

  return (
    <section id="projects" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeContent blur={true} duration={800} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Featured <span className="animated-gradient-text">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A selection of my recent work and personal projects
            </p>
          </FadeContent>

          {/* Featured Projects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <div>
              <FadeContent blur={true} duration={600} className="text-2xl font-bold mb-8 text-center">
                Other Projects
              </FadeContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={featuredProjects.length + index} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* View All Projects Button */}
          <FadeContent blur={true} duration={600} delay={300} className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open(siteData.social.github, '_blank')}
              className="h-12 px-8 hover:scale-105 transition-transform duration-200"
            >
              <Github className="w-5 h-5 mr-2" />
              View All Projects on GitHub
            </Button>
          </FadeContent>
        </div>
      </div>
    </section>
  )
}

export default Projects
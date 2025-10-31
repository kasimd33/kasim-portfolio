import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'

const About = dynamic(() => import('@/components/About'))
const Projects = dynamic(() => import('@/components/Projects'))
const Experience = dynamic(() => import('@/components/Experience'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground bg-pattern overflow-x-hidden w-full max-w-full">
      <Header />
      {/* add top padding so fixed header doesn't overlap content */}
      <main id="main" className="pt-20 md:pt-24 w-full max-w-full overflow-x-hidden">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
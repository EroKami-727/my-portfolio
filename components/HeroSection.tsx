'use client'

import { motion } from 'motion/react'
import { Button } from './ui/button'
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react'

export function HeroSection() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl sm:text-6xl lg:text-7xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Hi, I&apos;m{' '}
            <span className="text-primary">Harsha</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A passionate full-stack developer creating beautiful, functional, and user-centered digital experiences.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button 
              onClick={scrollToProjects}
              size="lg"
              className="min-w-[140px]"
            >
              View My Work
            </Button>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              variant="ghost" 
              onClick={scrollToProjects}
              className="w-10 h-10 p-0 rounded-full"
            >
              <ArrowDown className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
// components/ProjectList.tsx
'use client' // This is the most important line!

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'

// Define the Project type
type Project = {
  id: string;
  title: string;
  description: string;
  stacks: string[];
  imageUrl?: string;
  liveDemoUrl?: string;
  githubUrl?: string;
};

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="group"
        >
          <Card className="h-full flex flex-col overflow-hidden border-border hover:shadow-lg transition-all duration-300">
            <div className="relative overflow-hidden">
              <ImageWithFallback
                src={project.imageUrl || ''}
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                {project.liveDemoUrl && (
                  <Button asChild size="sm" variant="secondary">
                    <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" /> Live Demo
                    </Link>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button asChild size="sm" variant="secondary">
                    <Link href={project.githubUrl === 'coming-soon' ? '/coming-soon' : project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" /> Code
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <CardDescription className="text-sm h-20">
                {project.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="mt-auto">
              <div className="flex flex-wrap gap-2">
                {project.stacks.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
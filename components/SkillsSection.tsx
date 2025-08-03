'use client'

import { motion } from 'motion/react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Code, Database, Palette, Globe } from 'lucide-react'

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: Code,
    skills: ['React', 'Vue.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'SASS', 'Webpack']
  },
  {
    title: 'Backend Development',
    icon: Database,
    skills: ['Node.js', 'Python', 'Django', 'Express.js', 'PostgreSQL', 'MongoDB', 'Redis']
  },
  {
    title: 'Design & UX',
    icon: Palette,
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'UI/UX Design', 'Wireframing']
  },
  {
    title: 'Tools & Deployment',
    icon: Globe,
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Netlify', 'CI/CD', 'Linux']
  }
]

const progressSkills = [
  { name: 'JavaScript/TypeScript', level: 95 },
  { name: 'React/Next.js', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'UI/UX Design', level: 85 },
  { name: 'Database Design', level: 80 }
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I&apos;m passionate about learning new technologies and constantly improving my skills 
            to deliver the best solutions for every project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {category.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-2xl mb-8 text-center">Technical Proficiency</h3>
          <div className="space-y-6">
            {progressSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
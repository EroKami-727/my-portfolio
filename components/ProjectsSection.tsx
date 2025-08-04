// components/ProjectsSection.tsx
import { getProjects } from '@/app/add/actions'
import { ProjectList } from './ProjectList' // Import our new client component

// This remains an async Server Component for data fetching
export async function ProjectsSection() {
  const projects = await getProjects();

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in web development, 
            UI/UX design, and problem-solving.
          </p>
        </div>

        {/* We now render the Client Component and pass the fetched data to it */}
        <ProjectList projects={JSON.parse(JSON.stringify(projects))} />
      </div>
    </section>
  )
}
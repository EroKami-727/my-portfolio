// app/add/page.tsx
import { cookies } from 'next/headers'
import { PasswordForm } from './PasswordForm'
import { AdminDashboard } from './AdminDashboard'
import { getProjects } from './actions'
import { ThemeProvider } from '@/components/theme-provider' // Corrected path
import { Toaster } from '@/components/ui/sonner'

export default async function AddPage() {
  const cookieStore = await cookies() // Added await here
  const isAuthenticated = cookieStore.get('admin-auth')?.value === 'true'

  if (!isAuthenticated) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <PasswordForm />
                <Toaster richColors />
            </div>
        </ThemeProvider>
    );
  }

  const projects = await getProjects();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <main className="min-h-screen bg-background">
            <AdminDashboard projects={JSON.parse(JSON.stringify(projects))} />
        </main>
        <Toaster richColors />
    </ThemeProvider>
  )
}
'use client'

import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4 md:mb-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>by Alex Portfolio</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2024 Alex Portfolio. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
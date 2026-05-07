'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Sidebar, MobileSidebar } from './Sidebar'
import { useIsMobile } from '@/hooks/use-mobile'

interface SidebarContextType {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within an AppLayout')
  }
  return context
}

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useIsMobile()
  
  const toggleSidebar = () => setSidebarOpen((prev) => !prev)

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen, toggleSidebar }}>
      <div className="flex min-h-screen min-h-dvh bg-background">
        {/* Desktop Sidebar - hidden on mobile */}
        {!isMobile && <Sidebar />}
        
        {/* Mobile Sidebar Sheet */}
        {isMobile && (
          <MobileSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
        )}
        
        {/* Main Content */}
        <div className="flex flex-1 flex-col md:pl-64">
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarContext.Provider>
  )
}

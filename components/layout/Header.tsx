'use client'

import { Bell, Search, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface HeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  onMenuClick?: () => void
}

export function Header({ title, subtitle, actions, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 md:h-16 items-center gap-3 md:gap-4 border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 md:hidden shrink-0"
        onClick={onMenuClick}
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Title Section */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm md:text-base font-semibold text-foreground leading-tight truncate">{title}</h1>
        {subtitle && (
          <p className="text-[10px] md:text-xs text-muted-foreground truncate hidden sm:block">{subtitle}</p>
        )}
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Search - hidden on mobile */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar empresa..."
            className="h-8 w-52 pl-8 text-sm bg-secondary border-transparent focus:border-border"
          />
        </div>

        {/* Mobile Search Button */}
        <Button variant="ghost" size="icon" className="h-8 w-8 lg:hidden">
          <Search className="h-4 w-4" />
          <span className="sr-only">Buscar</span>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="sr-only">Notificaciones</span>
        </Button>

        {/* Additional Actions */}
        {actions && <div className="hidden sm:flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  )
}

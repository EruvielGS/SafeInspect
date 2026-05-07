'use client'

import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  Search,
  ShieldCheck,
  Bell,
  BookOpen,
  BarChart3,
  Users,
  Settings,
  Triangle,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Empresas', href: '/empresas', icon: Building2 },
  { label: 'Procesos', href: '/procesos', icon: ClipboardList, badge: 8 },
  { label: 'Inspecciones', href: '/inspecciones', icon: Search },
  { label: 'Verificaciones', href: '/verificaciones', icon: ShieldCheck },
  { label: 'Notificaciones', href: '/notificaciones', icon: Bell },
  { label: 'Catálogos', href: '/catalogos', icon: BookOpen },
  { label: 'Reportes', href: '/reportes', icon: BarChart3 },
  { label: 'Usuarios', href: '/usuarios', icon: Users },
  { label: 'Configuración', href: '/configuracion', icon: Settings },
]

function SidebarBrand() {
  return (
    <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
        <Triangle className="h-5 w-5 text-white fill-white" />
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-sidebar-foreground">Protección Civil</p>
        <p className="text-xs text-sidebar-foreground/60">Navojoa, Sonora</p>
      </div>
    </div>
  )
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation()

  return (
    <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
      <ul className="space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <li key={item.href}>
              <Link
                to={item.href}
                onClick={onNavigate}
                className={cn(
                  'group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-sidebar-accent text-white'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'
                )}
              >
                <item.icon
                  className={cn(
                    'h-4 w-4 shrink-0 transition-colors',
                    isActive
                      ? 'text-sidebar-primary'
                      : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80'
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge !== undefined && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-primary px-1.5 text-[10px] font-semibold text-white">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <ChevronRight className="h-3.5 w-3.5 text-sidebar-primary" />
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function SidebarFooter() {
  return (
    <div className="border-t border-sidebar-border px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold text-sidebar-foreground">
          JP
        </div>
        <div className="flex-1 leading-tight min-w-0">
          <p className="truncate text-sm font-medium text-sidebar-foreground">Juan Pérez</p>
          <p className="truncate text-xs text-sidebar-foreground/50">Administrador</p>
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col bg-sidebar text-sidebar-foreground md:flex">
      <SidebarBrand />
      <SidebarNav />
      <SidebarFooter />
    </aside>
  )
}

interface MobileSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  const handleNavigate = () => {
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="left" 
        className="w-72 p-0 bg-sidebar text-sidebar-foreground border-sidebar-border"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Menú de navegación</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col">
          <SidebarBrand />
          <SidebarNav onNavigate={handleNavigate} />
          <SidebarFooter />
        </div>
      </SheetContent>
    </Sheet>
  )
}

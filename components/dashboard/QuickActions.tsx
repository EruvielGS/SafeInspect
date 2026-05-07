import { Link } from 'react-router-dom'
import { Bell, Search, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const ACTIONS = [
  {
    label: 'Nueva notificación',
    href: '/procesos/nuevo',
    icon: Bell,
    variant: 'default' as const,
    className: 'bg-primary text-primary-foreground hover:bg-primary/90',
  },
  {
    label: 'Programar inspección',
    href: '/inspecciones',
    icon: Search,
    variant: 'outline' as const,
    className: 'border-primary/30 text-primary hover:bg-primary/5',
  },
  {
    label: 'Generar reporte',
    href: '/reportes',
    icon: FileText,
    variant: 'outline' as const,
    className: 'border-primary/30 text-primary hover:bg-primary/5',
  },
]

export function QuickActions() {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-foreground">Acciones rápidas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {ACTIONS.map((action) => (
          <Link key={action.href} to={action.href}>
            <Button
              variant={action.variant}
              size="sm"
              className={`gap-2 text-xs ${action.className}`}
            >
              <action.icon className="h-3.5 w-3.5" />
              {action.label}
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

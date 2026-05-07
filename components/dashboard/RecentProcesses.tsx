'use client'

import { Link } from 'react-router-dom'
import { ArrowRight, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { PROCESOS, ETIQUETAS_REQUERIMIENTO } from '@/lib/mock-data'

export function RecentProcesses() {
  const recent = PROCESOS.slice(0, 5)

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold text-foreground">Últimos procesos</CardTitle>
        <Link to="/procesos">
          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground">
            Ver todos
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/60">
          {recent.map((proceso) => (
            <div
              key={proceso.id}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/40"
            >
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {proceso.empresa.nombre}
                </p>
                <p className="text-xs text-muted-foreground">
                  {ETIQUETAS_REQUERIMIENTO[proceso.tipoRequerimiento]} ·{' '}
                  {proceso.inspector.nombre}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <StatusBadge estado={proceso.estado} />
                <span className="hidden text-xs text-muted-foreground sm:block">
                  {proceso.fechaActualizacion}
                </span>
                <Link to={`/procesos/${proceso.id}`}>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Eye className="h-3.5 w-3.5" />
                    <span className="sr-only">Ver proceso</span>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

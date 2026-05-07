'use client'

import { Link } from 'react-router-dom'
import { AppLayout, useSidebar } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bell, Plus, ArrowRight } from 'lucide-react'
import { PROCESOS, ETIQUETAS_REQUERIMIENTO } from '@/lib/mock-data'

function NotificacionesContent() {
  const { toggleSidebar } = useSidebar()
  const notificaciones = PROCESOS.filter((p) => p.notificacion)

  return (
    <>
      <Header
        title="Notificaciones"
        subtitle="Historial de notificaciones de inspección"
        onMenuClick={toggleSidebar}
        actions={
          <Link to="/procesos/nuevo">
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nueva notificación</span>
              <span className="sm:hidden">Nueva</span>
            </Button>
          </Link>
        }
      />
      <div className="p-4 md:p-6 space-y-3">
        {notificaciones.map((proceso) => (
          <Card key={proceso.id} className="border-border/60 shadow-sm">
            <CardContent className="p-3 md:p-4 space-y-3 md:space-y-0 md:flex md:items-center md:gap-4">
              {/* Mobile Layout */}
              <div className="flex items-start gap-3 md:hidden">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <Bell className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{proceso.empresa.nombre}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {ETIQUETAS_REQUERIMIENTO[proceso.tipoRequerimiento]} · Orden: {proceso.notificacion!.ordenInspeccionNo}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {proceso.notificacion!.fechaProgramada} · {proceso.notificacion!.hora}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {proceso.notificacion!.medioNotificacion}
                  </p>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <Bell className="h-4 w-4 text-blue-600" />
              </div>
              <div className="hidden md:block flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">{proceso.empresa.nombre}</p>
                <p className="text-xs text-muted-foreground">
                  {ETIQUETAS_REQUERIMIENTO[proceso.tipoRequerimiento]} ·
                  Orden: {proceso.notificacion!.ordenInspeccionNo}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Fecha programada: {proceso.notificacion!.fechaProgramada} a las {proceso.notificacion!.hora}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground">
                  {proceso.notificacion!.medioNotificacion}
                </span>
              </div>

              {/* Action button */}
              <Link to={`/procesos/${proceso.id}`} className="block md:shrink-0">
                <Button variant="outline" size="sm" className="w-full md:w-auto gap-1.5 text-xs h-8">
                  Ver proceso
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default function NotificacionesPage() {
  return (
    <AppLayout>
      <NotificacionesContent />
    </AppLayout>
  )
}

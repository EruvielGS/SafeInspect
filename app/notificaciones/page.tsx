import { Link } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bell, Plus } from 'lucide-react'
import { PROCESOS, ETIQUETAS_REQUERIMIENTO } from '@/lib/mock-data'

export default function NotificacionesPage() {
  const notificaciones = PROCESOS.filter((p) => p.notificacion)

  return (
    <AppLayout>
      <Header
        title="Notificaciones"
        subtitle="Historial de notificaciones de inspección"
        actions={
          <Link to="/procesos/nuevo">
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Nueva notificación
            </Button>
          </Link>
        }
      />
      <div className="p-6 space-y-3">
        {notificaciones.map((proceso) => (
          <Card key={proceso.id} className="border-border/60 shadow-sm">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <Bell className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">{proceso.empresa.nombre}</p>
                <p className="text-xs text-muted-foreground">
                  {ETIQUETAS_REQUERIMIENTO[proceso.tipoRequerimiento]} ·
                  Orden: {proceso.notificacion!.ordenInspeccionNo}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Fecha programada: {proceso.notificacion!.fechaProgramada} a las {proceso.notificacion!.hora}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground">
                  {proceso.notificacion!.medioNotificacion}
                </span>
                <Link to={`/procesos/${proceso.id}`}>
                  <Button variant="outline" size="sm" className="text-xs">
                    Ver proceso
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  )
}

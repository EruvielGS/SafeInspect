import { Link } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ArrowRight } from 'lucide-react'
import { PROCESOS, ETIQUETAS_REQUERIMIENTO } from '@/lib/mock-data'

export default function VerificacionesPage() {
  const verificaciones = PROCESOS.filter(
    (p) => p.estado === 'verificacion' || p.estado === 'cumple' || p.estado === 'no_cumple'
  )

  return (
    <AppLayout>
      <Header
        title="Verificaciones"
        subtitle="Actas de verificación y resultados de cumplimiento"
      />
      <div className="p-6 space-y-3">
        {verificaciones.map((proceso) => (
          <Card key={proceso.id} className="border-border/60 shadow-sm">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">{proceso.empresa.nombre}</p>
                <p className="text-xs text-muted-foreground">
                  {ETIQUETAS_REQUERIMIENTO[proceso.tipoRequerimiento]} · Inspector: {proceso.inspector.nombre}
                </p>
                {proceso.verificacion && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Fecha verificación: {proceso.verificacion.fechaVerificacion}
                    {proceso.verificacion.tipoSancion && ` · Sanción: ${proceso.verificacion.tipoSancion}`}
                  </p>
                )}
              </div>
              <StatusBadge estado={proceso.estado} />
              <Link to={`/procesos/${proceso.id}/verificacion`}>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  Ver verificación
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  )
}

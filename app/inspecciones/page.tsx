import { Link } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ArrowRight } from 'lucide-react'
import { PROCESOS, ETIQUETAS_REQUERIMIENTO } from '@/lib/mock-data'

export default function InspeccionesPage() {
  const inspecciones = PROCESOS.filter(
    (p) => p.estado === 'inspeccion' || p.inspeccion
  )

  return (
    <AppLayout>
      <Header
        title="Inspecciones"
        subtitle="Actas circunstanciadas de inspección"
      />
      <div className="p-6 space-y-3">
        {inspecciones.map((proceso) => (
          <Card key={proceso.id} className="border-border/60 shadow-sm">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">{proceso.empresa.nombre}</p>
                <p className="text-xs text-muted-foreground">
                  {ETIQUETAS_REQUERIMIENTO[proceso.tipoRequerimiento]} · Inspector: {proceso.inspector.nombre}
                </p>
                {proceso.inspeccion && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Expediente: {proceso.inspeccion.expediente} · Fecha: {proceso.inspeccion.fecha}
                  </p>
                )}
              </div>
              <StatusBadge estado={proceso.estado} />
              <Link to={`/procesos/${proceso.id}/inspeccion`}>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  Ver inspección
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

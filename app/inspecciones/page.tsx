'use client'

import { Link } from 'react-router-dom'
import { AppLayout, useSidebar } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ArrowRight, Search } from 'lucide-react'
import { PROCESOS, ETIQUETAS_REQUERIMIENTO } from '@/lib/mock-data'

function InspeccionesContent() {
  const { toggleSidebar } = useSidebar()
  const inspecciones = PROCESOS.filter(
    (p) => p.estado === 'inspeccion' || p.inspeccion
  )

  return (
    <>
      <Header
        title="Inspecciones"
        subtitle="Actas circunstanciadas de inspección"
        onMenuClick={toggleSidebar}
      />
      <div className="p-4 md:p-6 space-y-3">
        {inspecciones.map((proceso) => (
          <Card key={proceso.id} className="border-border/60 shadow-sm">
            <CardContent className="p-3 md:p-4 space-y-3 md:space-y-0 md:flex md:items-center md:gap-4">
              {/* Mobile: Icon + Info */}
              <div className="flex items-start gap-3 md:hidden">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100">
                  <Search className="h-4 w-4 text-violet-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm text-foreground truncate">{proceso.empresa.nombre}</p>
                    <StatusBadge estado={proceso.estado} size="sm" />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {ETIQUETAS_REQUERIMIENTO[proceso.tipoRequerimiento]} · {proceso.inspector.nombre}
                  </p>
                  {proceso.inspeccion && (
                    <p className="text-[10px] text-muted-foreground">
                      Exp: {proceso.inspeccion.expediente} · {proceso.inspeccion.fecha}
                    </p>
                  )}
                </div>
              </div>

              {/* Desktop: Full layout */}
              <div className="hidden md:flex md:flex-1 md:min-w-0">
                <div className="min-w-0 flex-1">
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
              </div>

              <div className="hidden md:block">
                <StatusBadge estado={proceso.estado} />
              </div>

              {/* Action button */}
              <Link to={`/procesos/${proceso.id}/inspeccion`} className="block md:shrink-0">
                <Button variant="outline" size="sm" className="w-full md:w-auto gap-1.5 text-xs h-8">
                  Ver inspección
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

export default function InspeccionesPage() {
  return (
    <AppLayout>
      <InspeccionesContent />
    </AppLayout>
  )
}

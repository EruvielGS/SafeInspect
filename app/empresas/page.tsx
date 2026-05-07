'use client'

import { AppLayout, useSidebar } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { Card, CardContent } from '@/components/ui/card'
import { Building2, MapPin, Phone, User } from 'lucide-react'
import { EMPRESAS } from '@/lib/mock-data'

function EmpresasContent() {
  const { toggleSidebar } = useSidebar()

  return (
    <>
      <Header
        title="Empresas"
        subtitle="Directorio de establecimientos registrados"
        onMenuClick={toggleSidebar}
      />
      <div className="p-4 md:p-6">
        <div className="grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EMPRESAS.map((empresa) => (
            <Card key={empresa.id} className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-5 space-y-2 md:space-y-3">
                <div className="flex items-start gap-2">
                  <div className="flex h-8 w-8 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm font-semibold text-foreground leading-tight truncate">{empresa.nombre}</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground">{empresa.giro}</p>
                  </div>
                </div>
                <div className="space-y-1 md:space-y-1.5 text-[10px] md:text-xs text-muted-foreground">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                    <span className="leading-relaxed line-clamp-2">{empresa.direccion}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="h-3 w-3 shrink-0" />
                    <span className="truncate">{empresa.representante}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3 shrink-0" />
                    <span>{empresa.telefono}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default function EmpresasPage() {
  return (
    <AppLayout>
      <EmpresasContent />
    </AppLayout>
  )
}

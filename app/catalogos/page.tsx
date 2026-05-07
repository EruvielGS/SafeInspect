'use client'

import { AppLayout, useSidebar } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const CATALOGOS = [
  { titulo: 'Tipos de requerimiento', items: ['Protección Civil', 'Bomberos', 'Seguridad', 'Sanidad', 'Ecología', 'Otro'] },
  { titulo: 'Grados de riesgo', items: ['Bajo', 'Medio', 'Alto'] },
  { titulo: 'Medios de notificación', items: ['Correo electrónico', 'Visita personal', 'Teléfono', 'Oficio'] },
  { titulo: 'Tipos de sanción', items: ['Apercibimiento', 'Multa menor', 'Multa mayor', 'Clausura parcial', 'Clausura total'] },
]

function CatalogosContent() {
  const { toggleSidebar } = useSidebar()

  return (
    <>
      <Header 
        title="Catálogos" 
        subtitle="Configuración de catálogos del sistema" 
        onMenuClick={toggleSidebar}
      />
      <div className="p-4 md:p-6 grid gap-3 md:gap-4 sm:grid-cols-2">
        {CATALOGOS.map((cat) => (
          <Card key={cat.titulo} className="border-border/60 shadow-sm">
            <CardHeader className="pb-2 px-4 md:px-6">
              <CardTitle className="text-xs md:text-sm font-semibold">{cat.titulo}</CardTitle>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
              <ul className="space-y-1">
                {cat.items.map((item) => (
                  <li key={item} className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/40 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default function CatalogosPage() {
  return (
    <AppLayout>
      <CatalogosContent />
    </AppLayout>
  )
}

import { AppLayout } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const CATALOGOS = [
  { titulo: 'Tipos de requerimiento', items: ['Protección Civil', 'Bomberos', 'Seguridad', 'Sanidad', 'Ecología', 'Otro'] },
  { titulo: 'Grados de riesgo', items: ['Bajo', 'Medio', 'Alto'] },
  { titulo: 'Medios de notificación', items: ['Correo electrónico', 'Visita personal', 'Teléfono', 'Oficio'] },
  { titulo: 'Tipos de sanción', items: ['Apercibimiento', 'Multa menor', 'Multa mayor', 'Clausura parcial', 'Clausura total'] },
]

export default function CatalogosPage() {
  return (
    <AppLayout>
      <Header title="Catálogos" subtitle="Configuración de catálogos del sistema" />
      <div className="p-6 grid gap-4 sm:grid-cols-2">
        {CATALOGOS.map((cat) => (
          <Card key={cat.titulo} className="border-border/60 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">{cat.titulo}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {cat.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/40 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  )
}

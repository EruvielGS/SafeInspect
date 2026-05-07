import { AppLayout } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { Card, CardContent } from '@/components/ui/card'
import { INSPECTORES } from '@/lib/mock-data'
import { Shield } from 'lucide-react'

export default function UsuariosPage() {
  return (
    <AppLayout>
      <Header title="Usuarios" subtitle="Gestión de inspectores y administradores" />
      <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INSPECTORES.map((inspector) => (
          <Card key={inspector.id} className="border-border/60 shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                {inspector.nombre.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{inspector.nombre}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Shield className="h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Inspector</p>
                </div>
                <p className="text-xs text-muted-foreground">ID: {inspector.idIne}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  )
}

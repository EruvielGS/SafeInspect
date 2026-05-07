'use client'

import { AppLayout, useSidebar } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function ConfiguracionContent() {
  const { toggleSidebar } = useSidebar()

  return (
    <>
      <Header 
        title="Configuración" 
        subtitle="Ajustes generales del sistema" 
        onMenuClick={toggleSidebar}
      />
      <div className="p-4 md:p-6 max-w-xl space-y-4 md:space-y-6">
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-3 px-4 md:px-6">
            <CardTitle className="text-xs md:text-sm font-semibold">Información de la institución</CardTitle>
          </CardHeader>
          <CardContent className="px-4 md:px-6 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs md:text-sm">Nombre de la institución</Label>
              <Input defaultValue="Coordinación Municipal de Protección Civil" className="text-xs md:text-sm h-9 md:h-10" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs md:text-sm">Municipio</Label>
              <Input defaultValue="Navojoa" className="text-xs md:text-sm h-9 md:h-10" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs md:text-sm">Estado</Label>
              <Input defaultValue="Sonora" className="text-xs md:text-sm h-9 md:h-10" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs md:text-sm">Dirección</Label>
              <Input defaultValue="Av. Rayón #205 Ote., Col. Centro, Navojoa, Sonora" className="text-xs md:text-sm h-9 md:h-10" />
            </div>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs md:text-sm">
              Guardar cambios
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default function ConfiguracionPage() {
  return (
    <AppLayout>
      <ConfiguracionContent />
    </AppLayout>
  )
}

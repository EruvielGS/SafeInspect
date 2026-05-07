import { AppLayout } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ConfiguracionPage() {
  return (
    <AppLayout>
      <Header title="Configuración" subtitle="Ajustes generales del sistema" />
      <div className="p-6 max-w-xl space-y-6">
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Información de la institución</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-sm">Nombre de la institución</Label>
              <Input defaultValue="Coordinación Municipal de Protección Civil" className="text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Municipio</Label>
              <Input defaultValue="Navojoa" className="text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Estado</Label>
              <Input defaultValue="Sonora" className="text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Dirección</Label>
              <Input defaultValue="Av. Rayón #205 Ote., Col. Centro, Navojoa, Sonora" className="text-sm" />
            </div>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Guardar cambios
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

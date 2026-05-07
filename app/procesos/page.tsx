import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { AppLayout } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { ProcesosList } from '@/components/procesos/ProcesosList'
import { Button } from '@/components/ui/button'

export default function ProcesosPage() {
  return (
    <AppLayout>
      <Header
        title="Listado de procesos"
        subtitle="Gestión de notificaciones, inspecciones y verificaciones"
        actions={
          <Link to="/procesos/nuevo">
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Nuevo proceso
            </Button>
          </Link>
        }
      />
      <div className="p-6">
        <ProcesosList />
      </div>
    </AppLayout>
  )
}

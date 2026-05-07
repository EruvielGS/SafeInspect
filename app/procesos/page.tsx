'use client'

import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { AppLayout, useSidebar } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { ProcesosList } from '@/components/procesos/ProcesosList'
import { Button } from '@/components/ui/button'

function ProcesosContent() {
  const { toggleSidebar } = useSidebar()

  return (
    <>
      <Header
        title="Listado de procesos"
        subtitle="Gestión de notificaciones, inspecciones y verificaciones"
        onMenuClick={toggleSidebar}
        actions={
          <Link to="/procesos/nuevo">
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nuevo proceso</span>
              <span className="sm:hidden">Nuevo</span>
            </Button>
          </Link>
        }
      />
      <div className="p-4 md:p-6">
        <ProcesosList />
      </div>
    </>
  )
}

export default function ProcesosPage() {
  return (
    <AppLayout>
      <ProcesosContent />
    </AppLayout>
  )
}

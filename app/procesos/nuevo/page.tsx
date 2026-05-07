'use client'

import { AppLayout, useSidebar } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { NotificacionForm } from '@/components/notificacion/NotificacionForm'
import { StepIndicator } from '@/components/shared/StepIndicator'

function NuevoProcesoContent() {
  const { toggleSidebar } = useSidebar()

  return (
    <>
      <Header
        title="Nuevo proceso"
        subtitle="Paso 1 de 3 — Notificación de Inspección"
        onMenuClick={toggleSidebar}
      />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="flex justify-center">
          <StepIndicator currentEstado="notificacion" />
        </div>
        <NotificacionForm />
      </div>
    </>
  )
}

export default function NuevoProcesoPage() {
  return (
    <AppLayout>
      <NuevoProcesoContent />
    </AppLayout>
  )
}

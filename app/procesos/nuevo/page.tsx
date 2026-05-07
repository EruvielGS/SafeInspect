import { AppLayout } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { NotificacionForm } from '@/components/notificacion/NotificacionForm'
import { StepIndicator } from '@/components/shared/StepIndicator'

export default function NuevoProcesoPage() {
  return (
    <AppLayout>
      <Header
        title="Nuevo proceso"
        subtitle="Paso 1 de 3 — Notificación de Inspección"
      />
      <div className="p-6 space-y-6">
        <div className="flex justify-center">
          <StepIndicator currentEstado="notificacion" />
        </div>
        <NotificacionForm />
      </div>
    </AppLayout>
  )
}

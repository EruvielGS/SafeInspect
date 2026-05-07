import { AppLayout } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { VerificacionForm } from '@/components/verificacion/VerificacionForm'
import { StepIndicator } from '@/components/shared/StepIndicator'
import { useParams } from 'react-router-dom'

export default function VerificacionPage() {
  const { id } = useParams<{ id: string }>()
  return (
    <AppLayout>
      <Header
        title="Verificación"
        subtitle="Paso 3 de 3 — Acta de Verificación"
      />
      <div className="p-6 space-y-6">
        <div className="flex justify-center">
          <StepIndicator currentEstado="verificacion" />
        </div>
        <VerificacionForm procesoId={id} />
      </div>
    </AppLayout>
  )
}

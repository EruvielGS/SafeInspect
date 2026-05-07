import { AppLayout } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { InspeccionForm } from '@/components/inspeccion/InspeccionForm'
import { StepIndicator } from '@/components/shared/StepIndicator'
import { useParams } from 'react-router-dom'

export default function InspeccionPage() {
  const { id } = useParams<{ id: string }>()
  return (
    <AppLayout>
      <Header
        title="Inspección"
        subtitle="Paso 2 de 3 — Acta Circunstanciada de Inspección"
      />
      <div className="p-6 space-y-6">
        <div className="flex justify-center">
          <StepIndicator currentEstado="inspeccion" />
        </div>
        <InspeccionForm procesoId={id} />
      </div>
    </AppLayout>
  )
}

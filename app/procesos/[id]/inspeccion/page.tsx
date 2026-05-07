'use client'

import { AppLayout, useSidebar } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { InspeccionForm } from '@/components/inspeccion/InspeccionForm'
import { StepIndicator } from '@/components/shared/StepIndicator'
import { useParams } from 'react-router-dom'

function InspeccionContent() {
  const { toggleSidebar } = useSidebar()
  const { id } = useParams<{ id: string }>()

  return (
    <>
      <Header
        title="Inspección"
        subtitle="Paso 2 de 3 — Acta Circunstanciada de Inspección"
        onMenuClick={toggleSidebar}
      />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="flex justify-center">
          <StepIndicator currentEstado="inspeccion" />
        </div>
        <InspeccionForm procesoId={id} />
      </div>
    </>
  )
}

export default function InspeccionPage() {
  return (
    <AppLayout>
      <InspeccionContent />
    </AppLayout>
  )
}

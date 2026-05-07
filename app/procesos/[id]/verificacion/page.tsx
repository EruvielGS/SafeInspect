'use client'

import { AppLayout, useSidebar } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { VerificacionForm } from '@/components/verificacion/VerificacionForm'
import { StepIndicator } from '@/components/shared/StepIndicator'
import { useParams } from 'react-router-dom'

function VerificacionContent() {
  const { toggleSidebar } = useSidebar()
  const { id } = useParams<{ id: string }>()

  return (
    <>
      <Header
        title="Verificación"
        subtitle="Paso 3 de 3 — Acta de Verificación"
        onMenuClick={toggleSidebar}
      />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="flex justify-center">
          <StepIndicator currentEstado="verificacion" />
        </div>
        <VerificacionForm procesoId={id} />
      </div>
    </>
  )
}

export default function VerificacionPage() {
  return (
    <AppLayout>
      <VerificacionContent />
    </AppLayout>
  )
}

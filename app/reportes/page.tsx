'use client'

import { AppLayout, useSidebar } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { ProcessPieChart, InspeccionesBarChart } from '@/components/dashboard/ProcessChart'

function ReportesContent() {
  const { toggleSidebar } = useSidebar()

  return (
    <>
      <Header 
        title="Reportes" 
        subtitle="Estadísticas y análisis del sistema de inspecciones" 
        onMenuClick={toggleSidebar}
      />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <StatsCards />
        <div className="grid gap-4 md:grid-cols-2">
          <ProcessPieChart />
          <InspeccionesBarChart />
        </div>
      </div>
    </>
  )
}

export default function ReportesPage() {
  return (
    <AppLayout>
      <ReportesContent />
    </AppLayout>
  )
}

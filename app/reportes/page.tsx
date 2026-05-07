import { AppLayout } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { ProcessPieChart, InspeccionesBarChart } from '@/components/dashboard/ProcessChart'

export default function ReportesPage() {
  return (
    <AppLayout>
      <Header title="Reportes" subtitle="Estadísticas y análisis del sistema de inspecciones" />
      <div className="p-6 space-y-6">
        <StatsCards />
        <div className="grid gap-4 lg:grid-cols-2">
          <ProcessPieChart />
          <InspeccionesBarChart />
        </div>
      </div>
    </AppLayout>
  )
}

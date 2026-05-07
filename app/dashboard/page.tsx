import { AppLayout } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { ProcessPieChart, InspeccionesBarChart } from '@/components/dashboard/ProcessChart'
import { ProcessFlow } from '@/components/dashboard/ProcessFlow'
import { RecentProcesses } from '@/components/dashboard/RecentProcesses'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

export default function DashboardPage() {
  return (
    <AppLayout>
      <Header
        title="Dashboard"
        subtitle="Coordinación Municipal de Protección Civil — Navojoa, Sonora"
        actions={
          <Link to="/procesos/nuevo">
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Nuevo proceso
            </Button>
          </Link>
        }
      />

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <StatsCards />

        {/* Middle row: charts + flow */}
        <div className="grid gap-4 lg:grid-cols-3">
          <ProcessPieChart />
          <InspeccionesBarChart />
          <ProcessFlow />
        </div>

        {/* Bottom row: recent processes + quick actions */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentProcesses />
          </div>
          <QuickActions />
        </div>
      </div>
    </AppLayout>
  )
}

'use client'

import { AppLayout, useSidebar } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { ProcessPieChart, InspeccionesBarChart } from '@/components/dashboard/ProcessChart'
import { ProcessFlow } from '@/components/dashboard/ProcessFlow'
import { RecentProcesses } from '@/components/dashboard/RecentProcesses'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

function DashboardContent() {
  const { toggleSidebar } = useSidebar()

  return (
    <>
      <Header
        title="Dashboard"
        subtitle="Coordinación Municipal de Protección Civil — Navojoa, Sonora"
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

      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* KPI Cards */}
        <StatsCards />

        {/* Quick Actions - Mobile First */}
        <div className="md:hidden">
          <QuickActions />
        </div>

        {/* Middle row: charts + flow */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ProcessPieChart />
          <InspeccionesBarChart />
          <div className="md:col-span-2 lg:col-span-1">
            <ProcessFlow />
          </div>
        </div>

        {/* Bottom row: recent processes + quick actions */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentProcesses />
          </div>
          <div className="hidden md:block">
            <QuickActions />
          </div>
        </div>
      </div>
    </>
  )
}

export default function DashboardPage() {
  return (
    <AppLayout>
      <DashboardContent />
    </AppLayout>
  )
}

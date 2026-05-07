'use client'

import { Building2, ClipboardCheck, CheckCircle2, XCircle, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { STATS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface StatCard {
  label: string
  value: number
  sublabel: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  iconBg: string
  trend?: string
}

const CARDS: StatCard[] = [
  {
    label: 'Empresas registradas',
    value: STATS.totalEmpresas,
    sublabel: 'Total en sistema',
    icon: Building2,
    color: 'text-blue-600',
    iconBg: 'bg-blue-100',
    trend: '+4 este mes',
  },
  {
    label: 'Procesos en curso',
    value: STATS.procesosEsteMes,
    sublabel: 'Este mes',
    icon: ClipboardCheck,
    color: 'text-violet-600',
    iconBg: 'bg-violet-100',
    trend: '+12% vs anterior',
  },
  {
    label: 'Cumplen',
    value: STATS.cumplen,
    sublabel: 'Verificados',
    icon: CheckCircle2,
    color: 'text-green-600',
    iconBg: 'bg-green-100',
    trend: '82% tasa cumplimiento',
  },
  {
    label: 'No cumplen',
    value: STATS.noCumplen,
    sublabel: 'Requieren acción',
    icon: XCircle,
    color: 'text-red-500',
    iconBg: 'bg-red-100',
    trend: '18% en incumplimiento',
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {CARDS.map((card, i) => (
        <Card
          key={i}
          className="overflow-hidden border-border/60 shadow-sm transition-shadow duration-200 hover:shadow-md"
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                  {card.label}
                </p>
                <p className={cn('mt-1 text-3xl font-bold tracking-tight', card.color)}>
                  {card.value}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{card.sublabel}</p>
              </div>
              <div className={cn('rounded-xl p-2.5', card.iconBg)}>
                <card.icon className={cn('h-5 w-5', card.color)} />
              </div>
            </div>
            {card.trend && (
              <div className="mt-3 flex items-center gap-1.5 border-t border-border/50 pt-3">
                <TrendingUp className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{card.trend}</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

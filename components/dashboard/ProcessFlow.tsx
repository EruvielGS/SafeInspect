import { Bell, Search, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const STEPS = [
  {
    number: 1,
    label: 'Notificar',
    description: 'Se notifica a la empresa sobre el requerimiento a cumplir.',
    icon: Bell,
    color: 'bg-blue-500',
    ring: 'ring-blue-200',
  },
  {
    number: 2,
    label: 'Inspección',
    description: 'Se realiza la inspección para verificar el cumplimiento.',
    icon: Search,
    color: 'bg-violet-500',
    ring: 'ring-violet-200',
  },
  {
    number: 3,
    label: 'Verificar',
    description: 'Se verifica si cumplen con los requerimientos.',
    icon: ShieldCheck,
    color: 'bg-green-500',
    ring: 'ring-green-200',
  },
]

export function ProcessFlow() {
  return (
    <Card className="border-border/60 shadow-sm h-full">
      <CardHeader className="pb-3 px-4 md:px-6">
        <CardTitle className="text-xs md:text-sm font-semibold text-foreground">Flujo del proceso</CardTitle>
      </CardHeader>
      <CardContent className="px-4 md:px-6">
        <div className="flex items-start gap-0">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-1 flex-col items-center">
              {/* Connector line + circle */}
              <div className="flex w-full items-center">
                <div className={cn('h-px flex-1', i === 0 ? 'bg-transparent' : 'bg-border')} />
                <div
                  className={cn(
                    'relative flex h-8 w-8 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-full text-white ring-2 md:ring-4',
                    step.color,
                    step.ring
                  )}
                >
                  <step.icon className="h-3.5 w-3.5 md:h-5 md:w-5" />
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 md:h-4 md:w-4 items-center justify-center rounded-full bg-background border border-border text-[8px] md:text-[9px] font-bold text-foreground">
                    {step.number}
                  </span>
                </div>
                <div className={cn('h-px flex-1', i === STEPS.length - 1 ? 'bg-transparent' : 'bg-border')} />
              </div>
              {/* Label */}
              <div className="mt-2 md:mt-3 px-0.5 md:px-1 text-center">
                <p className="text-[10px] md:text-xs font-semibold text-foreground">{step.label}</p>
                <p className="mt-0.5 md:mt-1 text-[9px] md:text-[11px] leading-relaxed text-muted-foreground hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

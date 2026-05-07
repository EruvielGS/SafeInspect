import { Bell, Search, ShieldCheck, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EstadoProceso } from '@/lib/types'

const STEPS = [
  { key: 'notificacion', label: 'Notificación', shortLabel: 'Notif.', icon: Bell, step: 1 },
  { key: 'inspeccion', label: 'Inspección', shortLabel: 'Insp.', icon: Search, step: 2 },
  { key: 'verificacion', label: 'Verificación', shortLabel: 'Verif.', icon: ShieldCheck, step: 3 },
] as const

const STEP_ORDER: Record<EstadoProceso, number> = {
  notificacion: 1,
  inspeccion: 2,
  verificacion: 3,
  cumple: 4,
  no_cumple: 4,
}

interface StepIndicatorProps {
  currentEstado: EstadoProceso
  className?: string
}

export function StepIndicator({ currentEstado, className }: StepIndicatorProps) {
  const currentStep = STEP_ORDER[currentEstado]

  return (
    <div className={cn('flex items-center', className)}>
      {STEPS.map((step, i) => {
        const isDone = currentStep > step.step
        const isActive = currentStep === step.step

        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-7 w-7 md:h-9 md:w-9 items-center justify-center rounded-full border-2 transition-all duration-300',
                  isDone
                    ? 'border-green-500 bg-green-500 text-white'
                    : isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-muted-foreground'
                )}
              >
                {isDone ? (
                  <Check className="h-3 w-3 md:h-4 md:w-4" />
                ) : (
                  <step.icon className="h-3 w-3 md:h-4 md:w-4" />
                )}
              </div>
              <div className="mt-1 md:mt-1.5 text-center">
                <span
                  className={cn(
                    'text-[9px] md:text-[11px] font-medium',
                    isActive ? 'text-primary' : isDone ? 'text-green-600' : 'text-muted-foreground'
                  )}
                >
                  <span className="hidden sm:inline">{step.label}</span>
                  <span className="sm:hidden">{step.shortLabel}</span>
                </span>
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  'mx-1.5 md:mx-2 h-0.5 w-8 sm:w-12 md:w-16 flex-1 transition-colors duration-300',
                  currentStep > step.step ? 'bg-green-400' : 'bg-border'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

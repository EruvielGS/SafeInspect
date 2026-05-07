import { Bell, Search, ShieldCheck, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EstadoProceso } from '@/lib/types'

const STEPS = [
  { key: 'notificacion', label: 'Notificación', icon: Bell, step: 1 },
  { key: 'inspeccion', label: 'Inspección', icon: Search, step: 2 },
  { key: 'verificacion', label: 'Verificación', icon: ShieldCheck, step: 3 },
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
                  'flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300',
                  isDone
                    ? 'border-green-500 bg-green-500 text-white'
                    : isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-muted-foreground'
                )}
              >
                {isDone ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <step.icon className="h-4 w-4" />
                )}
              </div>
              <div className="mt-1.5 text-center">
                <span
                  className={cn(
                    'text-[11px] font-medium',
                    isActive ? 'text-primary' : isDone ? 'text-green-600' : 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  'mx-2 h-0.5 w-16 flex-1 transition-colors duration-300',
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

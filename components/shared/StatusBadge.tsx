import { cn } from '@/lib/utils'
import type { EstadoProceso } from '@/lib/types'

const CONFIG: Record<
  EstadoProceso,
  { label: string; className: string }
> = {
  notificacion: {
    label: 'Notificación',
    className: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  inspeccion: {
    label: 'Inspección',
    className: 'bg-violet-100 text-violet-700 border-violet-200',
  },
  verificacion: {
    label: 'Verificación',
    className: 'bg-orange-100 text-orange-700 border-orange-200',
  },
  cumple: {
    label: 'Cumple',
    className: 'bg-green-100 text-green-700 border-green-200',
  },
  no_cumple: {
    label: 'No cumple',
    className: 'bg-red-100 text-red-700 border-red-200',
  },
}

interface StatusBadgeProps {
  estado: EstadoProceso
  className?: string
}

export function StatusBadge({ estado, className }: StatusBadgeProps) {
  const config = CONFIG[estado]
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}

'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  FileText,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  AlertTriangle,
  Flag,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { INSPECTORES } from '@/lib/mock-data'
import type { ResultadoVerificacion } from '@/lib/types'

const schema = z.object({
  expediente: z.string().min(1, 'Requerido'),
  fechaVerificacion: z.string().min(1, 'Requerido'),
  inspectorId: z.string().min(1, 'Requerido'),
  observacionesGenerales: z.string().min(10, 'Agrega observaciones generales'),
  resultado: z.enum(['cumple', 'no_cumple']),
  tipoSancion: z.string().optional(),
  fechaLimite: z.string().optional(),
  fechaProximaRevision: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const TIPOS_SANCION = [
  { value: 'apercibimiento', label: 'Apercibimiento' },
  { value: 'multa_menor', label: 'Multa menor' },
  { value: 'multa_mayor', label: 'Multa mayor' },
  { value: 'clausura_parcial', label: 'Clausura parcial' },
  { value: 'clausura_total', label: 'Clausura total' },
]

export function VerificacionForm({ procesoId }: { procesoId?: string }) {
  const navigate = useNavigate()
  const [resultado, setResultado] = useState<ResultadoVerificacion>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('[v0] Verificación finalizada:', data)
    navigate('/procesos')
  }

  const handleSetResultado = (r: 'cumple' | 'no_cumple') => {
    setResultado(r)
    setValue('resultado', r)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5 max-w-3xl mx-auto">
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-0 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-green-500 text-white text-[10px] md:text-xs font-bold">
              3
            </div>
            <CardTitle className="text-sm md:text-base font-semibold">Acta de Verificación</CardTitle>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 text-[10px] md:text-xs h-8">
            <FileText className="h-3 w-3 md:h-3.5 md:w-3.5" />
            <span className="hidden sm:inline">Generar</span> PDF
          </Button>
        </CardHeader>

        <CardContent className="pt-4 md:pt-5 space-y-4 md:space-y-6 px-4 md:px-6">
          {/* Datos generales */}
          <div>
            <h3 className="mb-2 md:mb-3 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Datos generales
            </h3>
            <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-3">
              <div className="space-y-1 md:space-y-1.5">
                <Label className="text-xs md:text-sm">
                  Fecha <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="date"
                  {...register('fechaVerificacion')}
                  className={`h-9 md:h-10 text-xs md:text-sm ${errors.fechaVerificacion ? 'border-destructive' : ''}`}
                />
              </div>

              <div className="space-y-1 md:space-y-1.5">
                <Label className="text-xs md:text-sm">
                  Inspector <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(v) => setValue('inspectorId', v)}>
                  <SelectTrigger className={`h-9 md:h-10 text-xs md:text-sm ${errors.inspectorId ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    {INSPECTORES.map((ins) => (
                      <SelectItem key={ins.id} value={ins.id}>
                        {ins.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1 md:space-y-1.5">
                <Label className="text-xs md:text-sm">
                  Expediente <span className="text-destructive">*</span>
                </Label>
                <Input
                  {...register('expediente')}
                  placeholder="EXP-2026-XXX"
                  className={`h-9 md:h-10 text-xs md:text-sm ${errors.expediente ? 'border-destructive' : ''}`}
                />
              </div>
            </div>
          </div>

          {/* Observaciones generales */}
          <div className="space-y-1 md:space-y-1.5">
            <Label className="text-xs md:text-sm">
              Observaciones generales <span className="text-destructive">*</span>
            </Label>
            <Textarea
              {...register('observacionesGenerales')}
              rows={3}
              placeholder="Se realizó la verificación de la información proporcionada..."
              className={`resize-none text-xs md:text-sm leading-relaxed ${errors.observacionesGenerales ? 'border-destructive' : ''}`}
            />
          </div>

          {/* Resultado de verificación */}
          <div>
            <h3 className="mb-2 md:mb-3 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Resultado <span className="text-destructive">*</span>
            </h3>
            {errors.resultado && (
              <p className="mb-2 text-[10px] md:text-xs text-destructive">Selecciona un resultado</p>
            )}
            <div className="grid gap-2 md:gap-3 sm:grid-cols-2">
              {/* Cumple */}
              <button
                type="button"
                onClick={() => handleSetResultado('cumple')}
                className={cn(
                  'group relative flex flex-col items-start gap-1.5 md:gap-2 rounded-xl border-2 p-3 md:p-4 text-left transition-all duration-200',
                  resultado === 'cumple'
                    ? 'border-green-500 bg-green-50 shadow-sm'
                    : 'border-border bg-card hover:border-green-300 hover:bg-green-50/40'
                )}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className={cn(
                      'h-5 w-5 md:h-6 md:w-6 transition-colors',
                      resultado === 'cumple' ? 'text-green-500' : 'text-muted-foreground group-hover:text-green-400'
                    )}
                  />
                  <span
                    className={cn(
                      'text-xs md:text-sm font-semibold transition-colors',
                      resultado === 'cumple' ? 'text-green-700' : 'text-foreground'
                    )}
                  >
                    Cumple
                  </span>
                </div>
                <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">
                  La empresa cumple con los requerimientos.
                </p>
                {resultado === 'cumple' && (
                  <div className="absolute right-2 md:right-3 top-2 md:top-3 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-green-500">
                    <CheckCircle2 className="h-2.5 w-2.5 md:h-3.5 md:w-3.5 text-white" />
                  </div>
                )}
              </button>

              {/* No cumple */}
              <button
                type="button"
                onClick={() => handleSetResultado('no_cumple')}
                className={cn(
                  'group relative flex flex-col items-start gap-1.5 md:gap-2 rounded-xl border-2 p-3 md:p-4 text-left transition-all duration-200',
                  resultado === 'no_cumple'
                    ? 'border-red-500 bg-red-50 shadow-sm'
                    : 'border-border bg-card hover:border-red-300 hover:bg-red-50/40'
                )}
              >
                <div className="flex items-center gap-2">
                  <XCircle
                    className={cn(
                      'h-5 w-5 md:h-6 md:w-6 transition-colors',
                      resultado === 'no_cumple' ? 'text-red-500' : 'text-muted-foreground group-hover:text-red-400'
                    )}
                  />
                  <span
                    className={cn(
                      'text-xs md:text-sm font-semibold transition-colors',
                      resultado === 'no_cumple' ? 'text-red-700' : 'text-foreground'
                    )}
                  >
                    No cumple
                  </span>
                </div>
                <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">
                  La empresa no cumple con los requerimientos.
                </p>
                {resultado === 'no_cumple' && (
                  <div className="absolute right-2 md:right-3 top-2 md:top-3 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-red-500">
                    <XCircle className="h-2.5 w-2.5 md:h-3.5 md:w-3.5 text-white" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Sanción (solo si no cumple) */}
          {resultado === 'no_cumple' && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 md:p-4 space-y-3 md:space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5 md:h-4 md:w-4 text-amber-600" />
                <h3 className="text-xs md:text-sm font-semibold text-amber-800">
                  Sanción administrativa
                </h3>
              </div>
              <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
                <div className="space-y-1 md:space-y-1.5">
                  <Label className="text-xs md:text-sm">Tipo de sanción</Label>
                  <Select onValueChange={(v) => setValue('tipoSancion', v)}>
                    <SelectTrigger className="bg-white h-9 md:h-10 text-xs md:text-sm">
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      {TIPOS_SANCION.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1 md:space-y-1.5">
                  <Label className="text-xs md:text-sm">Fecha límite</Label>
                  <Input
                    type="date"
                    {...register('fechaLimite')}
                    className="bg-white h-9 md:h-10 text-xs md:text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1 md:space-y-1.5">
                <Label className="text-xs md:text-sm flex items-center gap-1.5">
                  <Flag className="h-3 w-3 md:h-3.5 md:w-3.5 text-amber-600" />
                  Próxima revisión
                </Label>
                <Input
                  type="date"
                  {...register('fechaProximaRevision')}
                  className="bg-white h-9 md:h-10 text-xs md:text-sm"
                />
              </div>
            </div>
          )}

          {/* Próxima revisión (solo si cumple) */}
          {resultado === 'cumple' && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <ShieldCheck className="h-3.5 w-3.5 md:h-4 md:w-4 text-green-600" />
                <h3 className="text-xs md:text-sm font-semibold text-green-800">
                  Próxima revisión anual
                </h3>
              </div>
              <div className="space-y-1 md:space-y-1.5 max-w-xs">
                <Label className="text-xs md:text-sm">Fecha próxima revisión</Label>
                <Input
                  type="date"
                  {...register('fechaProximaRevision')}
                  className="bg-white h-9 md:h-10 text-xs md:text-sm"
                />
              </div>
            </div>
          )}

          {/* Firmas section */}
          <div className="rounded-lg border border-border/70 bg-muted/20 p-3 md:p-4">
            <h3 className="mb-3 md:mb-4 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Firmas
            </h3>
            <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
              <div className="text-center">
                <div className="mx-auto mb-2 md:mb-3 h-16 md:h-20 w-full rounded border-b-2 border-dashed border-border bg-background" />
                <p className="text-[10px] md:text-xs font-medium text-foreground">
                  Representante empresa
                </p>
                <p className="mt-0.5 text-[9px] md:text-[11px] text-muted-foreground">Nombre y firma</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-2 md:mb-3 h-16 md:h-20 w-full rounded border-b-2 border-dashed border-border bg-background" />
                <p className="text-[10px] md:text-xs font-medium text-foreground">
                  Inspector verificador
                </p>
                <p className="mt-0.5 text-[9px] md:text-[11px] text-muted-foreground">Nombre y firma</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 md:gap-3 border-t border-border/60 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/procesos')}
              className="w-full sm:w-auto text-xs md:text-sm"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || resultado === null}
              className="gap-2 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 w-full sm:w-auto text-xs md:text-sm"
            >
              <ShieldCheck className="h-3.5 w-3.5 md:h-4 md:w-4" />
              {isSubmitting ? 'Finalizando...' : 'Finalizar proceso'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

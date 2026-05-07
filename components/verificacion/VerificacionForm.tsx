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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-3xl mx-auto">
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex-row items-center justify-between pb-0">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white text-xs font-bold">
              3
            </div>
            <CardTitle className="text-base font-semibold">Acta de Verificación</CardTitle>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <FileText className="h-3.5 w-3.5" />
            Generar PDF
          </Button>
        </CardHeader>

        <CardContent className="pt-5 space-y-6">
          {/* Datos generales */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Datos generales
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label className="text-sm">
                  Fecha de verificación <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="date"
                  {...register('fechaVerificacion')}
                  className={errors.fechaVerificacion ? 'border-destructive' : ''}
                />
                {errors.fechaVerificacion && (
                  <p className="text-xs text-destructive">{errors.fechaVerificacion.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">
                  Inspector <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(v) => setValue('inspectorId', v)}>
                  <SelectTrigger className={errors.inspectorId ? 'border-destructive' : ''}>
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
                {errors.inspectorId && (
                  <p className="text-xs text-destructive">{errors.inspectorId.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">
                  No. de expediente <span className="text-destructive">*</span>
                </Label>
                <Input
                  {...register('expediente')}
                  placeholder="EXP-2026-XXX"
                  className={errors.expediente ? 'border-destructive' : ''}
                />
                {errors.expediente && (
                  <p className="text-xs text-destructive">{errors.expediente.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Observaciones generales */}
          <div className="space-y-1.5">
            <Label className="text-sm">
              Observaciones generales <span className="text-destructive">*</span>
            </Label>
            <Textarea
              {...register('observacionesGenerales')}
              rows={4}
              placeholder="Se realizó la verificación de la información proporcionada y de las condiciones encontradas durante la inspección..."
              className={`resize-none text-sm leading-relaxed ${errors.observacionesGenerales ? 'border-destructive' : ''}`}
            />
            {errors.observacionesGenerales && (
              <p className="text-xs text-destructive">{errors.observacionesGenerales.message}</p>
            )}
          </div>

          {/* Resultado de verificación */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Resultado de verificación <span className="text-destructive">*</span>
            </h3>
            {errors.resultado && (
              <p className="mb-2 text-xs text-destructive">Selecciona un resultado</p>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              {/* Cumple */}
              <button
                type="button"
                onClick={() => handleSetResultado('cumple')}
                className={cn(
                  'group relative flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all duration-200',
                  resultado === 'cumple'
                    ? 'border-green-500 bg-green-50 shadow-sm'
                    : 'border-border bg-card hover:border-green-300 hover:bg-green-50/40'
                )}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className={cn(
                      'h-6 w-6 transition-colors',
                      resultado === 'cumple' ? 'text-green-500' : 'text-muted-foreground group-hover:text-green-400'
                    )}
                  />
                  <span
                    className={cn(
                      'text-sm font-semibold transition-colors',
                      resultado === 'cumple' ? 'text-green-700' : 'text-foreground'
                    )}
                  >
                    Cumple
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  La empresa cumple con los requerimientos establecidos.
                </p>
                {resultado === 'cumple' && (
                  <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                    <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </button>

              {/* No cumple */}
              <button
                type="button"
                onClick={() => handleSetResultado('no_cumple')}
                className={cn(
                  'group relative flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all duration-200',
                  resultado === 'no_cumple'
                    ? 'border-red-500 bg-red-50 shadow-sm'
                    : 'border-border bg-card hover:border-red-300 hover:bg-red-50/40'
                )}
              >
                <div className="flex items-center gap-2">
                  <XCircle
                    className={cn(
                      'h-6 w-6 transition-colors',
                      resultado === 'no_cumple' ? 'text-red-500' : 'text-muted-foreground group-hover:text-red-400'
                    )}
                  />
                  <span
                    className={cn(
                      'text-sm font-semibold transition-colors',
                      resultado === 'no_cumple' ? 'text-red-700' : 'text-foreground'
                    )}
                  >
                    No cumple
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  La empresa no cumple con los requerimientos establecidos.
                </p>
                {resultado === 'no_cumple' && (
                  <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
                    <XCircle className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Sanción (solo si no cumple) */}
          {resultado === 'no_cumple' && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <h3 className="text-sm font-semibold text-amber-800">
                  Sanción administrativa
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-sm">Tipo de sanción</Label>
                  <Select onValueChange={(v) => setValue('tipoSancion', v)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Seleccionar sanción..." />
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
                <div className="space-y-1.5">
                  <Label className="text-sm">Fecha límite</Label>
                  <Input
                    type="date"
                    {...register('fechaLimite')}
                    className="bg-white"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm flex items-center gap-1.5">
                  <Flag className="h-3.5 w-3.5 text-amber-600" />
                  Fecha próxima revisión (verificación previa a sanción)
                </Label>
                <Input
                  type="date"
                  {...register('fechaProximaRevision')}
                  className="bg-white"
                />
              </div>
            </div>
          )}

          {/* Próxima revisión (solo si cumple) */}
          {resultado === 'cumple' && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <h3 className="text-sm font-semibold text-green-800">
                  Próxima revisión anual
                </h3>
              </div>
              <div className="space-y-1.5 max-w-xs">
                <Label className="text-sm">Fecha próxima revisión</Label>
                <Input
                  type="date"
                  {...register('fechaProximaRevision')}
                  className="bg-white"
                />
              </div>
            </div>
          )}

          {/* Firmas section */}
          <div className="rounded-lg border border-border/70 bg-muted/20 p-4">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Firmas
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="text-center">
                <div className="mx-auto mb-3 h-20 w-full rounded border-b-2 border-dashed border-border bg-background" />
                <p className="text-xs font-medium text-foreground">
                  Firma del representante de la empresa
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">Nombre y firma / ID.INE #</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 h-20 w-full rounded border-b-2 border-dashed border-border bg-background" />
                <p className="text-xs font-medium text-foreground">
                  Firma del inspector verificador responsable
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">Nombre y firma / ID.INE #</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-border/60 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/procesos')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || resultado === null}
              className="gap-2 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            >
              <ShieldCheck className="h-4 w-4" />
              {isSubmitting ? 'Finalizando...' : 'Finalizar proceso'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

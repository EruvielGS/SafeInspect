'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  FileText,
  Save,
  ChevronDown,
  ChevronUp,
  Camera,
  Paperclip,
  PenLine,
  CheckCircle2,
  XCircle,
  MinusCircle,
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
import type { GradoRiesgo } from '@/lib/types'

const schema = z.object({
  expediente: z.string().min(1, 'Requerido'),
  folio: z.string().min(1, 'Requerido'),
  fecha: z.string().min(1, 'Requerido'),
  horaInicio: z.string().min(1, 'Requerido'),
  horaFin: z.string().min(1, 'Requerido'),
  inspectorId: z.string().min(1, 'Requerido'),
  acompanante: z.string().optional(),
  representanteEmpresa: z.string().min(1, 'Requerido'),
  gradoRiesgo: z.enum(['bajo', 'medio', 'alto']),
  observacionesGenerales: z.string().min(5, 'Agrega observaciones'),
  diasParaCumplir: z.string().min(1, 'Requerido'),
  fechaVerificacion: z.string().min(1, 'Requerido'),
  horaVerificacion: z.string().min(1, 'Requerido'),
})

type FormData = z.infer<typeof schema>

type ItemValue = 'si' | 'no' | 'na'

interface CheckItem {
  id: string
  label: string
  value: ItemValue
}

interface Seccion {
  id: string
  titulo: string
  items: CheckItem[]
  expanded: boolean
}

const INITIAL_SECCIONES: Seccion[] = [
  {
    id: 'pc',
    titulo: 'II. Protección Civil',
    expanded: true,
    items: [
      { id: 'pc-1', label: 'Cuenta con Unidad Interna de Protección Civil', value: 'na' },
      { id: 'pc-2', label: 'Cuenta con Plan Interno', value: 'na' },
      { id: 'pc-3', label: 'Manual de Contingencias', value: 'na' },
      { id: 'pc-4', label: 'Dictamen Eléctrico', value: 'na' },
      { id: 'pc-5', label: 'Dictamen Estructural', value: 'na' },
    ],
  },
  {
    id: 'bomberos',
    titulo: 'III. Bomberos',
    expanded: true,
    items: [
      { id: 'b-1', label: 'Extintores', value: 'na' },
      { id: 'b-2', label: 'Lámparas de Emergencia', value: 'na' },
      { id: 'b-3', label: 'Detectores de Humo', value: 'na' },
      { id: 'b-4', label: 'Señalización de Evacuación', value: 'na' },
    ],
  },
]

const GRADO_CONFIG: Record<GradoRiesgo, { label: string; color: string; active: string }> = {
  bajo: { label: 'Bajo', color: 'border-green-300 text-green-700', active: 'bg-green-500 text-white border-green-500' },
  medio: { label: 'Medio', color: 'border-amber-300 text-amber-700', active: 'bg-amber-500 text-white border-amber-500' },
  alto: { label: 'Alto', color: 'border-red-300 text-red-700', active: 'bg-red-500 text-white border-red-500' },
}

function TriStateButton({
  value,
  onChange,
}: {
  value: ItemValue
  onChange: (v: ItemValue) => void
}) {
  return (
    <div className="flex items-center gap-1">
      {(['si', 'no', 'na'] as ItemValue[]).map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={cn(
            'flex h-7 w-10 items-center justify-center rounded border text-[11px] font-medium transition-all duration-150',
            value === v
              ? v === 'si'
                ? 'bg-green-500 border-green-500 text-white'
                : v === 'no'
                ? 'bg-red-500 border-red-500 text-white'
                : 'bg-muted-foreground border-muted-foreground text-white'
              : 'border-border bg-background text-muted-foreground hover:bg-muted/60'
          )}
        >
          {v === 'si' ? 'SI' : v === 'no' ? 'NO' : 'N/A'}
        </button>
      ))}
    </div>
  )
}

export function InspeccionForm({ procesoId }: { procesoId?: string }) {
  const navigate = useNavigate()
  const [secciones, setSecciones] = useState<Seccion[]>(INITIAL_SECCIONES)
  const [gradoRiesgo, setGradoRiesgo] = useState<GradoRiesgo>('bajo')
  const [observacionesSecciones, setObservacionesSecciones] = useState<Record<string, string>>({})

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      gradoRiesgo: 'bajo',
      diasParaCumplir: '30',
    },
  })

  const toggleSeccion = (id: string) => {
    setSecciones((prev) =>
      prev.map((s) => (s.id === id ? { ...s, expanded: !s.expanded } : s))
    )
  }

  const updateItemValue = (seccionId: string, itemId: string, value: ItemValue) => {
    setSecciones((prev) =>
      prev.map((s) =>
        s.id === seccionId
          ? {
              ...s,
              items: s.items.map((item) =>
                item.id === itemId ? { ...item, value } : item
              ),
            }
          : s
      )
    )
  }

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('[v0] Inspección guardada:', { ...data, secciones, gradoRiesgo })
    navigate('/procesos')
  }

  const getSummary = (seccion: Seccion) => {
    const si = seccion.items.filter((i) => i.value === 'si').length
    const no = seccion.items.filter((i) => i.value === 'no').length
    return { si, no, total: seccion.items.length }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-3xl mx-auto">
      {/* Main card */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex-row items-center justify-between pb-0">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500 text-white text-xs font-bold">
              2
            </div>
            <CardTitle className="text-base font-semibold">
              Acta Circunstanciada de Inspección
            </CardTitle>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Save className="h-3.5 w-3.5" />
              Guardar borrador
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <FileText className="h-3.5 w-3.5" />
              Generar PDF
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-5 space-y-6">
          {/* I. Datos generales */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              I. Datos generales
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-1.5">
                <Label className="text-sm">
                  Fecha <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="date"
                  {...register('fecha')}
                  className={errors.fecha ? 'border-destructive' : ''}
                />
                {errors.fecha && <p className="text-xs text-destructive">{errors.fecha.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">
                  Hora inicio <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="time"
                  {...register('horaInicio')}
                  className={errors.horaInicio ? 'border-destructive' : ''}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">
                  Hora fin <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="time"
                  {...register('horaFin')}
                  className={errors.horaFin ? 'border-destructive' : ''}
                />
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
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">
                  Folio <span className="text-destructive">*</span>
                </Label>
                <Input
                  {...register('folio')}
                  placeholder="XXX"
                  className={errors.folio ? 'border-destructive' : ''}
                />
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
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">Acompañante / Testigo</Label>
                <Input
                  {...register('acompanante')}
                  placeholder="Nombre del testigo"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-sm">
                  Representante de la empresa <span className="text-destructive">*</span>
                </Label>
                <Input
                  {...register('representanteEmpresa')}
                  placeholder="Nombre del representante"
                  className={errors.representanteEmpresa ? 'border-destructive' : ''}
                />
                {errors.representanteEmpresa && (
                  <p className="text-xs text-destructive">{errors.representanteEmpresa.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Secciones de checklist */}
          {secciones.map((seccion) => {
            const { si, no, total } = getSummary(seccion)
            return (
              <div key={seccion.id} className="rounded-lg border border-border/70 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleSeccion(seccion.id)}
                  className="flex w-full items-center justify-between bg-muted/40 px-4 py-3 hover:bg-muted/60 transition-colors"
                >
                  <span className="text-sm font-semibold text-foreground">{seccion.titulo}</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {si}
                      </span>
                      <span className="flex items-center gap-1 text-red-500">
                        <XCircle className="h-3.5 w-3.5" />
                        {no}
                      </span>
                      <span className="text-muted-foreground">/ {total}</span>
                    </div>
                    {seccion.expanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {seccion.expanded && (
                  <div className="divide-y divide-border/50">
                    {seccion.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 px-4 py-3"
                      >
                        <span className="text-sm text-foreground leading-relaxed flex-1">
                          {item.label}
                        </span>
                        <TriStateButton
                          value={item.value}
                          onChange={(v) => updateItemValue(seccion.id, item.id, v)}
                        />
                      </div>
                    ))}

                    {/* Grado de riesgo — only for PC section */}
                    {seccion.id === 'pc' && (
                      <div className="flex items-center gap-4 px-4 py-3 bg-muted/20">
                        <span className="text-sm font-medium text-foreground">Grado de Riesgo:</span>
                        <div className="flex gap-2">
                          {(Object.entries(GRADO_CONFIG) as [GradoRiesgo, typeof GRADO_CONFIG['bajo']][]).map(
                            ([key, cfg]) => (
                              <button
                                key={key}
                                type="button"
                                onClick={() => {
                                  setGradoRiesgo(key)
                                  setValue('gradoRiesgo', key)
                                }}
                                className={cn(
                                  'rounded-full border px-4 py-1 text-xs font-semibold transition-all duration-150',
                                  gradoRiesgo === key ? cfg.active : cfg.color + ' bg-background hover:bg-muted/60'
                                )}
                              >
                                {cfg.label}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Observaciones de sección */}
                    <div className="px-4 py-3">
                      <Label className="text-xs text-muted-foreground mb-1.5 block">
                        Observaciones de esta sección
                      </Label>
                      <Textarea
                        value={observacionesSecciones[seccion.id] ?? ''}
                        onChange={(e) =>
                          setObservacionesSecciones((prev) => ({
                            ...prev,
                            [seccion.id]: e.target.value,
                          }))
                        }
                        rows={2}
                        placeholder="Observaciones específicas..."
                        className="resize-none text-sm leading-relaxed"
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {/* Observaciones generales */}
          <div className="space-y-1.5">
            <Label className="text-sm">
              Observaciones generales <span className="text-destructive">*</span>
            </Label>
            <Textarea
              {...register('observacionesGenerales')}
              rows={3}
              placeholder="Observaciones generales de la inspección..."
              className={`resize-none text-sm leading-relaxed ${errors.observacionesGenerales ? 'border-destructive' : ''}`}
            />
            {errors.observacionesGenerales && (
              <p className="text-xs text-destructive">{errors.observacionesGenerales.message}</p>
            )}
          </div>

          {/* Plazo para cumplir */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label className="text-sm">
                Días para cumplir <span className="text-destructive">*</span>
              </Label>
              <Input
                type="number"
                min="1"
                max="365"
                {...register('diasParaCumplir')}
                className={errors.diasParaCumplir ? 'border-destructive' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">
                Fecha de verificación <span className="text-destructive">*</span>
              </Label>
              <Input
                type="date"
                {...register('fechaVerificacion')}
                className={errors.fechaVerificacion ? 'border-destructive' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">
                Hora <span className="text-destructive">*</span>
              </Label>
              <Input
                type="time"
                {...register('horaVerificacion')}
                className={errors.horaVerificacion ? 'border-destructive' : ''}
              />
            </div>
          </div>

          {/* Evidencias */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Evidencias fotográficas
            </h3>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" className="gap-2 text-xs">
                <Paperclip className="h-3.5 w-3.5" />
                Agregar evidencia
              </Button>
              <Button type="button" variant="outline" size="sm" className="gap-2 text-xs">
                <Camera className="h-3.5 w-3.5" />
                Tomar foto
              </Button>
              <Button type="button" variant="outline" size="sm" className="gap-2 text-xs">
                <PenLine className="h-3.5 w-3.5" />
                Firmas
              </Button>
            </div>
          </div>

          {/* Firmas section */}
          <div className="rounded-lg border border-border/70 bg-muted/20 p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Firmas
            </h3>
            <div className="grid gap-6 sm:grid-cols-3">
              {['Por la empresa', 'Inspector responsable', 'Testigo'].map((label) => (
                <div key={label} className="text-center">
                  <div className="mx-auto mb-2 h-16 w-full rounded border-b-2 border-dashed border-border bg-background" />
                  <p className="text-xs font-medium text-foreground">{label}</p>
                  <p className="text-[11px] text-muted-foreground">Nombre y firma</p>
                </div>
              ))}
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
              disabled={isSubmitting}
              className="gap-2 bg-violet-600 text-white hover:bg-violet-700"
            >
              <CheckCircle2 className="h-4 w-4" />
              {isSubmitting ? 'Guardando...' : 'Finalizar inspección'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

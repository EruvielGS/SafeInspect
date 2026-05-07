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
    <div className="flex items-center gap-0.5 md:gap-1">
      {(['si', 'no', 'na'] as ItemValue[]).map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={cn(
            'flex h-6 w-8 md:h-7 md:w-10 items-center justify-center rounded border text-[10px] md:text-[11px] font-medium transition-all duration-150',
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5 max-w-3xl mx-auto">
      {/* Main card */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-0 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-violet-500 text-white text-[10px] md:text-xs font-bold">
              2
            </div>
            <CardTitle className="text-sm md:text-base font-semibold">
              Acta Circunstanciada de Inspección
            </CardTitle>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="gap-1.5 text-[10px] md:text-xs flex-1 sm:flex-none h-8">
              <Save className="h-3 w-3 md:h-3.5 md:w-3.5" />
              <span className="hidden sm:inline">Guardar</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-[10px] md:text-xs flex-1 sm:flex-none h-8">
              <FileText className="h-3 w-3 md:h-3.5 md:w-3.5" />
              PDF
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-4 md:pt-5 space-y-4 md:space-y-6 px-4 md:px-6">
          {/* I. Datos generales */}
          <div>
            <h3 className="mb-2 md:mb-3 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              I. Datos generales
            </h3>
            <div className="grid gap-3 md:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-1 md:space-y-1.5">
                <Label className="text-xs md:text-sm">
                  Fecha <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="date"
                  {...register('fecha')}
                  className={`h-9 md:h-10 text-xs md:text-sm ${errors.fecha ? 'border-destructive' : ''}`}
                />
              </div>

              <div className="space-y-1 md:space-y-1.5">
                <Label className="text-xs md:text-sm">
                  Hora inicio <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="time"
                  {...register('horaInicio')}
                  className={`h-9 md:h-10 text-xs md:text-sm ${errors.horaInicio ? 'border-destructive' : ''}`}
                />
              </div>

              <div className="space-y-1 md:space-y-1.5">
                <Label className="text-xs md:text-sm">
                  Hora fin <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="time"
                  {...register('horaFin')}
                  className={`h-9 md:h-10 text-xs md:text-sm ${errors.horaFin ? 'border-destructive' : ''}`}
                />
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

              <div className="space-y-1 md:space-y-1.5">
                <Label className="text-xs md:text-sm">
                  Folio <span className="text-destructive">*</span>
                </Label>
                <Input
                  {...register('folio')}
                  placeholder="XXX"
                  className={`h-9 md:h-10 text-xs md:text-sm ${errors.folio ? 'border-destructive' : ''}`}
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

              <div className="space-y-1 md:space-y-1.5 col-span-2 sm:col-span-1">
                <Label className="text-xs md:text-sm">Testigo</Label>
                <Input
                  {...register('acompanante')}
                  placeholder="Nombre del testigo"
                  className="h-9 md:h-10 text-xs md:text-sm"
                />
              </div>

              <div className="space-y-1 md:space-y-1.5 col-span-2">
                <Label className="text-xs md:text-sm">
                  Representante empresa <span className="text-destructive">*</span>
                </Label>
                <Input
                  {...register('representanteEmpresa')}
                  placeholder="Nombre del representante"
                  className={`h-9 md:h-10 text-xs md:text-sm ${errors.representanteEmpresa ? 'border-destructive' : ''}`}
                />
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
                  className="flex w-full items-center justify-between bg-muted/40 px-3 md:px-4 py-2.5 md:py-3 hover:bg-muted/60 transition-colors"
                >
                  <span className="text-xs md:text-sm font-semibold text-foreground">{seccion.titulo}</span>
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs">
                      <span className="flex items-center gap-0.5 md:gap-1 text-green-600">
                        <CheckCircle2 className="h-3 w-3 md:h-3.5 md:w-3.5" />
                        {si}
                      </span>
                      <span className="flex items-center gap-0.5 md:gap-1 text-red-500">
                        <XCircle className="h-3 w-3 md:h-3.5 md:w-3.5" />
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
                        className="flex items-center justify-between gap-2 md:gap-4 px-3 md:px-4 py-2.5 md:py-3"
                      >
                        <span className="text-xs md:text-sm text-foreground leading-relaxed flex-1">
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
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4 px-3 md:px-4 py-2.5 md:py-3 bg-muted/20">
                        <span className="text-xs md:text-sm font-medium text-foreground">Grado de Riesgo:</span>
                        <div className="flex gap-1.5 md:gap-2">
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
                                  'rounded-full border px-3 md:px-4 py-0.5 md:py-1 text-[10px] md:text-xs font-semibold transition-all duration-150',
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
                    <div className="px-3 md:px-4 py-2.5 md:py-3">
                      <Label className="text-[10px] md:text-xs text-muted-foreground mb-1 md:mb-1.5 block">
                        Observaciones
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
                        className="resize-none text-xs md:text-sm leading-relaxed"
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {/* Observaciones generales */}
          <div className="space-y-1 md:space-y-1.5">
            <Label className="text-xs md:text-sm">
              Observaciones generales <span className="text-destructive">*</span>
            </Label>
            <Textarea
              {...register('observacionesGenerales')}
              rows={3}
              placeholder="Observaciones generales de la inspección..."
              className={`resize-none text-xs md:text-sm leading-relaxed ${errors.observacionesGenerales ? 'border-destructive' : ''}`}
            />
          </div>

          {/* Plazo para cumplir */}
          <div className="grid gap-3 md:gap-4 grid-cols-3">
            <div className="space-y-1 md:space-y-1.5">
              <Label className="text-xs md:text-sm">
                Días <span className="text-destructive">*</span>
              </Label>
              <Input
                type="number"
                min="1"
                max="365"
                {...register('diasParaCumplir')}
                className={`h-9 md:h-10 text-xs md:text-sm ${errors.diasParaCumplir ? 'border-destructive' : ''}`}
              />
            </div>
            <div className="space-y-1 md:space-y-1.5">
              <Label className="text-xs md:text-sm">
                Fecha verif. <span className="text-destructive">*</span>
              </Label>
              <Input
                type="date"
                {...register('fechaVerificacion')}
                className={`h-9 md:h-10 text-xs md:text-sm ${errors.fechaVerificacion ? 'border-destructive' : ''}`}
              />
            </div>
            <div className="space-y-1 md:space-y-1.5">
              <Label className="text-xs md:text-sm">
                Hora <span className="text-destructive">*</span>
              </Label>
              <Input
                type="time"
                {...register('horaVerificacion')}
                className={`h-9 md:h-10 text-xs md:text-sm ${errors.horaVerificacion ? 'border-destructive' : ''}`}
              />
            </div>
          </div>

          {/* Evidencias */}
          <div>
            <h3 className="mb-2 md:mb-3 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Evidencias
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" className="gap-1.5 text-[10px] md:text-xs h-8">
                <Paperclip className="h-3 w-3 md:h-3.5 md:w-3.5" />
                Agregar
              </Button>
              <Button type="button" variant="outline" size="sm" className="gap-1.5 text-[10px] md:text-xs h-8">
                <Camera className="h-3 w-3 md:h-3.5 md:w-3.5" />
                Foto
              </Button>
              <Button type="button" variant="outline" size="sm" className="gap-1.5 text-[10px] md:text-xs h-8">
                <PenLine className="h-3 w-3 md:h-3.5 md:w-3.5" />
                Firmas
              </Button>
            </div>
          </div>

          {/* Firmas section */}
          <div className="rounded-lg border border-border/70 bg-muted/20 p-3 md:p-4">
            <h3 className="mb-2 md:mb-3 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Firmas
            </h3>
            <div className="grid gap-4 md:gap-6 grid-cols-3">
              {['Por la empresa', 'Inspector', 'Testigo'].map((label) => (
                <div key={label} className="text-center">
                  <div className="mx-auto mb-1.5 md:mb-2 h-12 md:h-16 w-full rounded border-b-2 border-dashed border-border bg-background" />
                  <p className="text-[9px] md:text-xs font-medium text-foreground truncate">{label}</p>
                </div>
              ))}
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
              disabled={isSubmitting}
              className="gap-2 bg-violet-600 text-white hover:bg-violet-700 w-full sm:w-auto text-xs md:text-sm"
            >
              <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
              {isSubmitting ? 'Guardando...' : 'Finalizar inspección'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

'use client'

import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FileText, Send, X } from 'lucide-react'
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
import { EMPRESAS, INSPECTORES } from '@/lib/mock-data'

const schema = z.object({
  empresaId: z.string().min(1, 'Selecciona una empresa'),
  tipoRequerimiento: z.string().min(1, 'Selecciona un tipo de requerimiento'),
  inspectorId: z.string().min(1, 'Selecciona un inspector'),
  fechaProgramada: z.string().min(1, 'Selecciona una fecha'),
  hora: z.string().min(1, 'Ingresa la hora'),
  medioNotificacion: z.string().min(1, 'Selecciona un medio'),
  descripcion: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  observaciones: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const TIPOS_REQUERIMIENTO = [
  { value: 'proteccion_civil', label: 'Protección Civil' },
  { value: 'bomberos', label: 'Bomberos' },
  { value: 'seguridad', label: 'Seguridad' },
  { value: 'sanidad', label: 'Sanidad' },
  { value: 'ecologia', label: 'Ecología' },
  { value: 'otro', label: 'Otro' },
]

const MEDIOS = [
  { value: 'correo', label: 'Correo electrónico' },
  { value: 'visita', label: 'Visita personal' },
  { value: 'telefono', label: 'Teléfono' },
  { value: 'oficio', label: 'Oficio' },
]

export function NotificacionForm() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      descripcion:
        'Se notifica a la empresa sobre la visita de inspección en cumplimiento a los Títulos Sexto y Octavo de la Ley de Protección Civil para el Estado de Sonora.',
    },
  })

  const selectedEmpresaId = watch('empresaId')
  const selectedEmpresa = EMPRESAS.find((e) => e.id === selectedEmpresaId)

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('[v0] Notificación enviada:', data)
    navigate('/procesos')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6 max-w-3xl mx-auto">
      {/* Header card */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-0 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-blue-500 text-white text-[10px] md:text-xs font-bold">
              1
            </div>
            <CardTitle className="text-sm md:text-base font-semibold">Notificación de Inspección</CardTitle>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 text-[10px] md:text-xs h-8">
            <FileText className="h-3 w-3 md:h-3.5 md:w-3.5" />
            <span className="hidden sm:inline">Generar</span> PDF
          </Button>
        </CardHeader>

        <CardContent className="pt-4 md:pt-5 space-y-4 md:space-y-5 px-4 md:px-6">
          {/* Datos de la empresa */}
          <div>
            <h3 className="mb-2 md:mb-3 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Datos de la empresa
            </h3>
            <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
              <div className="space-y-1 md:space-y-1.5">
                <Label htmlFor="empresaId" className="text-xs md:text-sm">
                  Empresa <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(v) => setValue('empresaId', v)}>
                  <SelectTrigger id="empresaId" className={`h-9 md:h-10 text-xs md:text-sm ${errors.empresaId ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Seleccionar empresa..." />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPRESAS.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.empresaId && (
                  <p className="text-[10px] md:text-xs text-destructive">{errors.empresaId.message}</p>
                )}
              </div>

              <div className="space-y-1 md:space-y-1.5">
                <Label className="text-xs md:text-sm">Dirección</Label>
                <Input
                  value={selectedEmpresa?.direccion ?? ''}
                  readOnly
                  placeholder="Se autocompletará"
                  className="bg-muted/40 text-xs md:text-sm h-9 md:h-10"
                />
              </div>

              <div className="space-y-1 md:space-y-1.5">
                <Label className="text-xs md:text-sm">Representante</Label>
                <Input
                  value={selectedEmpresa?.representante ?? ''}
                  readOnly
                  placeholder="—"
                  className="bg-muted/40 text-xs md:text-sm h-9 md:h-10"
                />
              </div>

              <div className="space-y-1 md:space-y-1.5">
                <Label className="text-xs md:text-sm">Teléfono</Label>
                <Input
                  value={selectedEmpresa?.telefono ?? ''}
                  readOnly
                  placeholder="—"
                  className="bg-muted/40 text-xs md:text-sm h-9 md:h-10"
                />
              </div>
            </div>
          </div>

          {/* Requerimiento */}
          <div>
            <h3 className="mb-2 md:mb-3 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Requerimiento
            </h3>
            <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
              <div className="space-y-1 md:space-y-1.5">
                <Label className="text-xs md:text-sm">
                  Tipo de requerimiento <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(v) => setValue('tipoRequerimiento', v)}>
                  <SelectTrigger className={`h-9 md:h-10 text-xs md:text-sm ${errors.tipoRequerimiento ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOS_REQUERIMIENTO.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.tipoRequerimiento && (
                  <p className="text-[10px] md:text-xs text-destructive">{errors.tipoRequerimiento.message}</p>
                )}
              </div>

              <div className="space-y-1 md:space-y-1.5">
                <Label className="text-xs md:text-sm">
                  Inspector <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(v) => setValue('inspectorId', v)}>
                  <SelectTrigger className={`h-9 md:h-10 text-xs md:text-sm ${errors.inspectorId ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Asignar inspector..." />
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
                  <p className="text-[10px] md:text-xs text-destructive">{errors.inspectorId.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Programación */}
          <div>
            <h3 className="mb-2 md:mb-3 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Programación de visita
            </h3>
            <div className="grid gap-3 md:gap-4 grid-cols-2 sm:grid-cols-3">
              <div className="space-y-1 md:space-y-1.5 col-span-2 sm:col-span-1">
                <Label className="text-xs md:text-sm">
                  Fecha <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="date"
                  {...register('fechaProgramada')}
                  className={`h-9 md:h-10 text-xs md:text-sm ${errors.fechaProgramada ? 'border-destructive' : ''}`}
                />
                {errors.fechaProgramada && (
                  <p className="text-[10px] md:text-xs text-destructive">{errors.fechaProgramada.message}</p>
                )}
              </div>

              <div className="space-y-1 md:space-y-1.5">
                <Label className="text-xs md:text-sm">
                  Hora <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="time"
                  {...register('hora')}
                  className={`h-9 md:h-10 text-xs md:text-sm ${errors.hora ? 'border-destructive' : ''}`}
                />
                {errors.hora && (
                  <p className="text-[10px] md:text-xs text-destructive">{errors.hora.message}</p>
                )}
              </div>

              <div className="space-y-1 md:space-y-1.5">
                <Label className="text-xs md:text-sm">
                  Medio <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(v) => setValue('medioNotificacion', v)}>
                  <SelectTrigger className={`h-9 md:h-10 text-xs md:text-sm ${errors.medioNotificacion ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    {MEDIOS.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.medioNotificacion && (
                  <p className="text-[10px] md:text-xs text-destructive">{errors.medioNotificacion.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-1 md:space-y-1.5">
            <Label className="text-xs md:text-sm">
              Descripción <span className="text-destructive">*</span>
            </Label>
            <Textarea
              {...register('descripcion')}
              rows={3}
              placeholder="Descripción del motivo de la inspección..."
              className={`resize-none text-xs md:text-sm leading-relaxed ${errors.descripcion ? 'border-destructive' : ''}`}
            />
            {errors.descripcion && (
              <p className="text-[10px] md:text-xs text-destructive">{errors.descripcion.message}</p>
            )}
          </div>

          <div className="space-y-1 md:space-y-1.5">
            <Label className="text-xs md:text-sm">Observaciones</Label>
            <Textarea
              {...register('observaciones')}
              rows={2}
              placeholder="Observaciones adicionales (opcional)..."
              className="resize-none text-xs md:text-sm leading-relaxed"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 md:gap-3 border-t border-border/60 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/procesos')}
              className="gap-1.5 w-full sm:w-auto text-xs md:text-sm"
            >
              <X className="h-3.5 w-3.5 md:h-4 md:w-4" />
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto text-xs md:text-sm"
            >
              <Send className="h-3.5 w-3.5 md:h-4 md:w-4" />
              {isSubmitting ? 'Enviando...' : 'Enviar notificación'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

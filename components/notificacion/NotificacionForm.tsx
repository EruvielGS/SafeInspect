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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
      {/* Header card */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex-row items-center justify-between pb-0">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white text-xs font-bold">
              1
            </div>
            <CardTitle className="text-base font-semibold">Notificación de Inspección</CardTitle>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <FileText className="h-3.5 w-3.5" />
            Generar PDF
          </Button>
        </CardHeader>

        <CardContent className="pt-5 space-y-5">
          {/* Datos de la empresa */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Datos de la empresa
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="empresaId" className="text-sm">
                  Empresa <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(v) => setValue('empresaId', v)}>
                  <SelectTrigger id="empresaId" className={errors.empresaId ? 'border-destructive' : ''}>
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
                  <p className="text-xs text-destructive">{errors.empresaId.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">Dirección</Label>
                <Input
                  value={selectedEmpresa?.direccion ?? ''}
                  readOnly
                  placeholder="Se autocompletará al seleccionar empresa"
                  className="bg-muted/40 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">Representante</Label>
                <Input
                  value={selectedEmpresa?.representante ?? ''}
                  readOnly
                  placeholder="—"
                  className="bg-muted/40 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">Teléfono</Label>
                <Input
                  value={selectedEmpresa?.telefono ?? ''}
                  readOnly
                  placeholder="—"
                  className="bg-muted/40 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Requerimiento */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Requerimiento
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-sm">
                  Tipo de requerimiento <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(v) => setValue('tipoRequerimiento', v)}>
                  <SelectTrigger className={errors.tipoRequerimiento ? 'border-destructive' : ''}>
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
                  <p className="text-xs text-destructive">{errors.tipoRequerimiento.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">
                  Inspector <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(v) => setValue('inspectorId', v)}>
                  <SelectTrigger className={errors.inspectorId ? 'border-destructive' : ''}>
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
                  <p className="text-xs text-destructive">{errors.inspectorId.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Programación */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Programación de visita
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label className="text-sm">
                  Fecha programada <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="date"
                  {...register('fechaProgramada')}
                  className={errors.fechaProgramada ? 'border-destructive' : ''}
                />
                {errors.fechaProgramada && (
                  <p className="text-xs text-destructive">{errors.fechaProgramada.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">
                  Hora <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="time"
                  {...register('hora')}
                  className={errors.hora ? 'border-destructive' : ''}
                />
                {errors.hora && (
                  <p className="text-xs text-destructive">{errors.hora.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">
                  Medio de notificación <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(v) => setValue('medioNotificacion', v)}>
                  <SelectTrigger className={errors.medioNotificacion ? 'border-destructive' : ''}>
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
                  <p className="text-xs text-destructive">{errors.medioNotificacion.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-1.5">
            <Label className="text-sm">
              Descripción <span className="text-destructive">*</span>
            </Label>
            <Textarea
              {...register('descripcion')}
              rows={3}
              placeholder="Descripción del motivo de la inspección..."
              className={`resize-none text-sm leading-relaxed ${errors.descripcion ? 'border-destructive' : ''}`}
            />
            {errors.descripcion && (
              <p className="text-xs text-destructive">{errors.descripcion.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">Observaciones</Label>
            <Textarea
              {...register('observaciones')}
              rows={2}
              placeholder="Observaciones adicionales (opcional)..."
              className="resize-none text-sm leading-relaxed"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-border/60 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/procesos')}
              className="gap-1.5"
            >
              <X className="h-4 w-4" />
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Enviando...' : 'Enviar notificación'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

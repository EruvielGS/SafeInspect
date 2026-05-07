import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Phone,
  MapPin,
  User,
  Calendar,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { StepIndicator } from '@/components/shared/StepIndicator';
import { PROCESOS, ETIQUETAS_REQUERIMIENTO } from '@/lib/mock-data';

interface Props {
  params: Promise<{ id: string }>
}

export default function ProcesoDetailPage() {
  const { id = '' } = useParams<{ id: string }>()
  const proceso = PROCESOS.find((p) => p.id === id) ?? PROCESOS[0]

  const nextStepConfig = {
    notificacion: { label: 'Iniciar Inspección', href: `/procesos/${id}/inspeccion`, color: 'bg-violet-600 hover:bg-violet-700' },
    inspeccion: { label: 'Ir a Verificación', href: `/procesos/${id}/verificacion`, color: 'bg-green-600 hover:bg-green-700' },
    verificacion: null,
    cumple: null,
    no_cumple: null,
  }
  const nextStep = nextStepConfig[proceso.estado]

  return (
    <AppLayout>
      <Header
        title={proceso.empresa.nombre}
        subtitle={`Proceso ${proceso.id} · ${ETIQUETAS_REQUERIMIENTO[proceso.tipoRequerimiento]}`}
        actions={
          nextStep && (
            <Link to={nextStep.href}>
              <Button size="sm" className={`gap-2 text-white ${nextStep.color}`}>
                {nextStep.label}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          )
        }
      />

      <div className="p-6 space-y-6 max-w-4xl">
        {/* Back */}
        <Link to="/procesos">
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground -ml-1">
            <ArrowLeft className="h-4 w-4" />
            Volver a procesos
          </Button>
        </Link>

        {/* Step indicator */}
        <div className="flex justify-center">
          <StepIndicator currentEstado={proceso.estado} />
        </div>

        {/* Status & info */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Empresa */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Building2 className="h-4 w-4 text-primary" />
                Datos de la empresa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium">{proceso.empresa.nombre}</p>
                  <p className="text-xs text-muted-foreground">{proceso.empresa.giro}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {proceso.empresa.direccion}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-muted-foreground text-xs">{proceso.empresa.representante}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-muted-foreground text-xs">{proceso.empresa.telefono}</p>
              </div>
            </CardContent>
          </Card>

          {/* Proceso info */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <FileText className="h-4 w-4 text-primary" />
                Información del proceso
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">Estado actual</span>
                <StatusBadge estado={proceso.estado} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">Tipo</span>
                <span className="text-xs font-medium">
                  {ETIQUETAS_REQUERIMIENTO[proceso.tipoRequerimiento]}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">Inspector</span>
                <span className="text-xs font-medium">{proceso.inspector.nombre}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Creado
                </span>
                <span className="text-xs">{proceso.fechaCreacion}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Actualizado
                </span>
                <span className="text-xs">{proceso.fechaActualizacion}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notificación summary */}
        {proceso.notificacion && (
          <Card className="border-border/60 shadow-sm border-l-4 border-l-blue-400">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                    1
                  </span>
                  Notificación
                </CardTitle>
                <span className="text-xs text-muted-foreground">{proceso.notificacion.fechaProgramada}</span>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-1.5">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {proceso.notificacion.descripcion}
              </p>
              <div className="flex gap-4 pt-1 text-xs text-muted-foreground">
                <span>Orden: {proceso.notificacion.ordenInspeccionNo}</span>
                <span>Hora: {proceso.notificacion.hora}</span>
                <span>Medio: {proceso.notificacion.medioNotificacion}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Inspección summary */}
        {proceso.inspeccion && (
          <Card className="border-border/60 shadow-sm border-l-4 border-l-violet-400">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-[10px] font-bold text-white">
                    2
                  </span>
                  Inspección
                </CardTitle>
                <span className="text-xs text-muted-foreground">{proceso.inspeccion.fecha}</span>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {proceso.inspeccion.observacionesGenerales}
              </p>
              <div className="flex gap-4 pt-1 text-xs">
                <span className="text-muted-foreground">
                  Expediente: {proceso.inspeccion.expediente}
                </span>
                <span
                  className={
                    proceso.inspeccion.gradoRiesgo === 'alto'
                      ? 'text-red-600 font-semibold'
                      : proceso.inspeccion.gradoRiesgo === 'medio'
                      ? 'text-amber-600 font-semibold'
                      : 'text-green-600 font-semibold'
                  }
                >
                  Riesgo: {proceso.inspeccion.gradoRiesgo.charAt(0).toUpperCase() + proceso.inspeccion.gradoRiesgo.slice(1)}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Verificación summary */}
        {proceso.verificacion && (
          <Card className="border-border/60 shadow-sm border-l-4 border-l-green-400">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white">
                    3
                  </span>
                  Verificación
                </CardTitle>
                <span className="text-xs text-muted-foreground">
                  {proceso.verificacion.fechaVerificacion}
                </span>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {proceso.verificacion.observacionesGenerales}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <StatusBadge
                  estado={proceso.verificacion.resultado === 'cumple' ? 'cumple' : 'no_cumple'}
                />
                {proceso.verificacion.tipoSancion && (
                  <span className="text-xs text-amber-600">
                    Sanción: {proceso.verificacion.tipoSancion}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action buttons */}
        {nextStep && (
          <div className="flex justify-end">
            <Link to={nextStep.href}>
              <Button className={`gap-2 text-white ${nextStep.color}`}>
                {nextStep.label}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  )
}

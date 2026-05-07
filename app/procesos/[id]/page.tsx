'use client'

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
import { AppLayout, useSidebar } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { StepIndicator } from '@/components/shared/StepIndicator';
import { PROCESOS, ETIQUETAS_REQUERIMIENTO } from '@/lib/mock-data';

function ProcesoDetailContent() {
  const { toggleSidebar } = useSidebar()
  const { id = '' } = useParams<{ id: string }>()
  const proceso = PROCESOS.find((p) => p.id === id) ?? PROCESOS[0]

  const nextStepConfig = {
    notificacion: { label: 'Iniciar Inspección', shortLabel: 'Inspección', href: `/procesos/${id}/inspeccion`, color: 'bg-violet-600 hover:bg-violet-700' },
    inspeccion: { label: 'Ir a Verificación', shortLabel: 'Verificación', href: `/procesos/${id}/verificacion`, color: 'bg-green-600 hover:bg-green-700' },
    verificacion: null,
    cumple: null,
    no_cumple: null,
  }
  const nextStep = nextStepConfig[proceso.estado]

  return (
    <>
      <Header
        title={proceso.empresa.nombre}
        subtitle={`Proceso ${proceso.id} · ${ETIQUETAS_REQUERIMIENTO[proceso.tipoRequerimiento]}`}
        onMenuClick={toggleSidebar}
        actions={
          nextStep && (
            <Link to={nextStep.href}>
              <Button size="sm" className={`gap-1.5 text-white ${nextStep.color}`}>
                <span className="hidden sm:inline">{nextStep.label}</span>
                <span className="sm:hidden">{nextStep.shortLabel}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          )
        }
      />

      <div className="p-4 md:p-6 space-y-4 md:space-y-6 max-w-4xl">
        {/* Back */}
        <Link to="/procesos">
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground -ml-1 text-xs md:text-sm">
            <ArrowLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Volver a procesos</span>
            <span className="sm:hidden">Volver</span>
          </Button>
        </Link>

        {/* Step indicator */}
        <div className="flex justify-center">
          <StepIndicator currentEstado={proceso.estado} />
        </div>

        {/* Status & info */}
        <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
          {/* Empresa */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-2 px-4 md:px-6">
              <CardTitle className="flex items-center gap-2 text-xs md:text-sm font-semibold">
                <Building2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                Datos de la empresa
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 md:px-6 space-y-2 md:space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Building2 className="mt-0.5 h-3 w-3 md:h-3.5 md:w-3.5 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="font-medium text-xs md:text-sm truncate">{proceso.empresa.nombre}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground">{proceso.empresa.giro}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3 w-3 md:h-3.5 md:w-3.5 shrink-0 text-muted-foreground" />
                <p className="text-muted-foreground text-[10px] md:text-xs leading-relaxed">
                  {proceso.empresa.direccion}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-3 w-3 md:h-3.5 md:w-3.5 text-muted-foreground" />
                <p className="text-muted-foreground text-[10px] md:text-xs truncate">{proceso.empresa.representante}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3 md:h-3.5 md:w-3.5 text-muted-foreground" />
                <p className="text-muted-foreground text-[10px] md:text-xs">{proceso.empresa.telefono}</p>
              </div>
            </CardContent>
          </Card>

          {/* Proceso info */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-2 px-4 md:px-6">
              <CardTitle className="flex items-center gap-2 text-xs md:text-sm font-semibold">
                <FileText className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                Información del proceso
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 md:px-6 space-y-2 md:space-y-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground text-[10px] md:text-xs">Estado actual</span>
                <StatusBadge estado={proceso.estado} size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-[10px] md:text-xs">Tipo</span>
                <span className="text-[10px] md:text-xs font-medium">
                  {ETIQUETAS_REQUERIMIENTO[proceso.tipoRequerimiento]}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-[10px] md:text-xs">Inspector</span>
                <span className="text-[10px] md:text-xs font-medium truncate max-w-32">{proceso.inspector.nombre}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-[10px] md:text-xs flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Creado
                </span>
                <span className="text-[10px] md:text-xs">{proceso.fechaCreacion}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-[10px] md:text-xs flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Actualizado
                </span>
                <span className="text-[10px] md:text-xs">{proceso.fechaActualizacion}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notificación summary */}
        {proceso.notificacion && (
          <Card className="border-border/60 shadow-sm border-l-4 border-l-blue-400">
            <CardHeader className="pb-2 px-4 md:px-6">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xs md:text-sm font-semibold">
                  <span className="flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-blue-500 text-[8px] md:text-[10px] font-bold text-white">
                    1
                  </span>
                  Notificación
                </CardTitle>
                <span className="text-[10px] md:text-xs text-muted-foreground">{proceso.notificacion.fechaProgramada}</span>
              </div>
            </CardHeader>
            <CardContent className="px-4 md:px-6 text-sm space-y-1.5">
              <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">
                {proceso.notificacion.descripcion}
              </p>
              <div className="flex flex-wrap gap-2 md:gap-4 pt-1 text-[10px] md:text-xs text-muted-foreground">
                <span>Orden: {proceso.notificacion.ordenInspeccionNo}</span>
                <span>Hora: {proceso.notificacion.hora}</span>
                <span className="hidden sm:inline">Medio: {proceso.notificacion.medioNotificacion}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Inspección summary */}
        {proceso.inspeccion && (
          <Card className="border-border/60 shadow-sm border-l-4 border-l-violet-400">
            <CardHeader className="pb-2 px-4 md:px-6">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xs md:text-sm font-semibold">
                  <span className="flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-violet-500 text-[8px] md:text-[10px] font-bold text-white">
                    2
                  </span>
                  Inspección
                </CardTitle>
                <span className="text-[10px] md:text-xs text-muted-foreground">{proceso.inspeccion.fecha}</span>
              </div>
            </CardHeader>
            <CardContent className="px-4 md:px-6 text-sm space-y-2">
              <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">
                {proceso.inspeccion.observacionesGenerales}
              </p>
              <div className="flex flex-wrap gap-2 md:gap-4 pt-1 text-[10px] md:text-xs">
                <span className="text-muted-foreground">
                  Exp: {proceso.inspeccion.expediente}
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
            <CardHeader className="pb-2 px-4 md:px-6">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xs md:text-sm font-semibold">
                  <span className="flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-green-500 text-[8px] md:text-[10px] font-bold text-white">
                    3
                  </span>
                  Verificación
                </CardTitle>
                <span className="text-[10px] md:text-xs text-muted-foreground">
                  {proceso.verificacion.fechaVerificacion}
                </span>
              </div>
            </CardHeader>
            <CardContent className="px-4 md:px-6 text-sm space-y-2">
              <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">
                {proceso.verificacion.observacionesGenerales}
              </p>
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <StatusBadge
                  estado={proceso.verificacion.resultado === 'cumple' ? 'cumple' : 'no_cumple'}
                  size="sm"
                />
                {proceso.verificacion.tipoSancion && (
                  <span className="text-[10px] md:text-xs text-amber-600">
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
              <Button className={`gap-2 text-white ${nextStep.color} text-xs md:text-sm`}>
                {nextStep.label}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default function ProcesoDetailPage() {
  return (
    <AppLayout>
      <ProcesoDetailContent />
    </AppLayout>
  )
}

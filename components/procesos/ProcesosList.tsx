'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Eye, PenLine, MoreHorizontal, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { PROCESOS, ETIQUETAS_REQUERIMIENTO } from '@/lib/mock-data'
import type { EstadoProceso } from '@/lib/types'

const NEXT_STEP: Partial<Record<EstadoProceso, { label: string; href: (id: string) => string }>> = {
  notificacion: { label: 'Ir a Inspección', href: (id) => `/procesos/${id}/inspeccion` },
  inspeccion: { label: 'Ir a Verificación', href: (id) => `/procesos/${id}/verificacion` },
}

export function ProcesosList() {
  const [search, setSearch] = useState('')
  const [filterEstado, setFilterEstado] = useState<string>('todos')

  const filtered = PROCESOS.filter((p) => {
    const matchSearch =
      p.empresa.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.inspector.nombre.toLowerCase().includes(search.toLowerCase())
    const matchEstado = filterEstado === 'todos' || p.estado === filterEstado
    return matchSearch && matchEstado
  })

  return (
    <Card className="border-border/60 shadow-sm">
      {/* Filters */}
      <CardHeader className="flex-row flex-wrap items-center gap-3 pb-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar empresa o inspector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-9 text-sm"
          />
        </div>
        <Select value={filterEstado} onValueChange={setFilterEstado}>
          <SelectTrigger className="h-9 w-44 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="notificacion">Notificación</SelectItem>
            <SelectItem value="inspeccion">Inspección</SelectItem>
            <SelectItem value="verificacion">Verificación</SelectItem>
            <SelectItem value="cumple">Cumple</SelectItem>
            <SelectItem value="no_cumple">No cumple</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground ml-auto">
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
        </span>
      </CardHeader>

      <CardContent className="p-0">
        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 border-b border-border/70 bg-muted/30 px-4 py-2.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Empresa</span>
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Proceso</span>
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Estado</span>
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground hidden lg:block">Fecha</span>
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground hidden sm:block">Inspector</span>
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Acciones</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border/50">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No se encontraron procesos con los filtros aplicados.
            </div>
          ) : (
            filtered.map((proceso) => {
              const nextStep = NEXT_STEP[proceso.estado]
              return (
                <div
                  key={proceso.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 px-4 py-3 transition-colors hover:bg-muted/30"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {proceso.empresa.nombre}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {proceso.empresa.direccion}
                    </p>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {ETIQUETAS_REQUERIMIENTO[proceso.tipoRequerimiento]}
                  </span>

                  <StatusBadge estado={proceso.estado} />

                  <span className="hidden text-xs text-muted-foreground lg:block">
                    {proceso.fechaActualizacion}
                  </span>

                  <span className="hidden truncate text-xs text-muted-foreground sm:block">
                    {proceso.inspector.nombre}
                  </span>

                  <div className="flex items-center gap-1 justify-end">
                    <Link to={`/procesos/${proceso.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-3.5 w-3.5" />
                        <span className="sr-only">Ver</span>
                      </Button>
                    </Link>
                    {nextStep && (
                      <Link to={nextStep.href(proceso.id)}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-primary hover:text-primary"
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                          <span className="sr-only">{nextStep.label}</span>
                        </Button>
                      </Link>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                          <span className="sr-only">Opciones</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="text-sm">
                        <DropdownMenuItem asChild>
                          <Link to={`/procesos/${proceso.id}`} className="flex items-center gap-2">
                            <Eye className="h-3.5 w-3.5" />
                            Ver detalle
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <PenLine className="h-3.5 w-3.5" />
                          Editar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export type EstadoProceso =
  | 'notificacion'
  | 'inspeccion'
  | 'verificacion'
  | 'cumple'
  | 'no_cumple'

export type TipoRequerimiento =
  | 'proteccion_civil'
  | 'bomberos'
  | 'seguridad'
  | 'sanidad'
  | 'ecologia'
  | 'otro'

export type GradoRiesgo = 'bajo' | 'medio' | 'alto'

export type ResultadoVerificacion = 'cumple' | 'no_cumple' | null

export interface Empresa {
  id: string
  nombre: string
  direccion: string
  representante: string
  telefono: string
  giro: string
  razonSocial: string
}

export interface Inspector {
  id: string
  nombre: string
  idIne: string
}

export interface Notificacion {
  id: string
  procesoId: string
  empresaId: string
  tipoRequerimiento: TipoRequerimiento
  descripcion: string
  fechaProgramada: string
  hora: string
  medioNotificacion: string
  observaciones: string
  ordenInspeccionNo: string
  firmadoPorEmpresa: boolean
  firmadoPorInspector: boolean
  creadoEn: string
}

export interface ItemInspeccion {
  id: string
  descripcion: string
  valor: 'si' | 'no' | 'na'
  observaciones?: string
}

export interface SeccionInspeccion {
  id: string
  titulo: string
  items: ItemInspeccion[]
}

export interface Inspeccion {
  id: string
  procesoId: string
  empresaId: string
  expediente: string
  folio: string
  fecha: string
  horaInicio: string
  horaFin: string
  inspectorId: string
  acompanante: string
  representanteEmpresa: string
  secciones: SeccionInspeccion[]
  gradoRiesgo: GradoRiesgo
  observacionesGenerales: string
  diasParaCumplir: number
  fechaVerificacion: string
  horaVerificacion: string
  evidencias: string[]
  creadoEn: string
}

export interface Verificacion {
  id: string
  procesoId: string
  empresaId: string
  expediente: string
  fechaVerificacion: string
  inspectorId: string
  observacionesGenerales: string
  resultado: ResultadoVerificacion
  tipoSancion?: string
  fechaLimite?: string
  fechaProximaRevision?: string
  firmadoPorEmpresa: boolean
  firmadoPorInspector: boolean
  creadoEn: string
}

export interface Proceso {
  id: string
  empresa: Empresa
  estado: EstadoProceso
  tipoRequerimiento: TipoRequerimiento
  inspector: Inspector
  fechaCreacion: string
  fechaActualizacion: string
  notificacion?: Notificacion
  inspeccion?: Inspeccion
  verificacion?: Verificacion
}

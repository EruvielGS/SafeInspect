import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardPage from '../app/dashboard/page'
import EmpresasPage from '../app/empresas/page'
import ProcesosPage from '../app/procesos/page'
import NuevoProcesosPage from '../app/procesos/nuevo/page'
import ProcesoDetailPage from '../app/procesos/[id]/page'
import InspeccionPage from '../app/procesos/[id]/inspeccion/page'
import VerificacionPage from '../app/procesos/[id]/verificacion/page'
import InspeccionesPage from '../app/inspecciones/page'
import VerificacionesPage from '../app/verificaciones/page'
import NotificacionesPage from '../app/notificaciones/page'
import CatalogosPage from '../app/catalogos/page'
import ReportesPage from '../app/reportes/page'
import UsuariosPage from '../app/usuarios/page'
import ConfiguracionPage from '../app/configuracion/page'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/empresas" element={<EmpresasPage />} />
        <Route path="/procesos" element={<ProcesosPage />} />
        <Route path="/procesos/nuevo" element={<NuevoProcesosPage />} />
        <Route path="/procesos/:id" element={<ProcesoDetailPage />} />
        <Route path="/procesos/:id/inspeccion" element={<InspeccionPage />} />
        <Route path="/procesos/:id/verificacion" element={<VerificacionPage />} />
        <Route path="/inspecciones" element={<InspeccionesPage />} />
        <Route path="/verificaciones" element={<VerificacionesPage />} />
        <Route path="/notificaciones" element={<NotificacionesPage />} />
        <Route path="/catalogos" element={<CatalogosPage />} />
        <Route path="/reportes" element={<ReportesPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/configuracion" element={<ConfiguracionPage />} />
      </Routes>
    </BrowserRouter>
  )
}

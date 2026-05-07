import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../app/dashboard/page';
import EmpresasPage from '../app/empresas/page';
import ProcesosPage from '../app/procesos/page';
import NuevoProcesosPage from '../app/procesos/nuevo/page';
import ProcesoDetailPage from '../app/procesos/[id]/page';
import InspeccionPage from '../app/procesos/[id]/inspeccion/page';
import VerificacionPage from '../app/procesos/[id]/verificacion/page';
import InspeccionesPage from '../app/inspecciones/page';
import VerificacionesPage from '../app/verificaciones/page';
import NotificacionesPage from '../app/notificaciones/page';
import CatalogosPage from '../app/catalogos/page';
import ReportesPage from '../app/reportes/page';
import UsuariosPage from '../app/usuarios/page';
import ConfiguracionPage from '../app/configuracion/page';
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/dashboard", replace: true }) }), _jsx(Route, { path: "/dashboard", element: _jsx(DashboardPage, {}) }), _jsx(Route, { path: "/empresas", element: _jsx(EmpresasPage, {}) }), _jsx(Route, { path: "/procesos", element: _jsx(ProcesosPage, {}) }), _jsx(Route, { path: "/procesos/nuevo", element: _jsx(NuevoProcesosPage, {}) }), _jsx(Route, { path: "/procesos/:id", element: _jsx(ProcesoDetailPage, {}) }), _jsx(Route, { path: "/procesos/:id/inspeccion", element: _jsx(InspeccionPage, {}) }), _jsx(Route, { path: "/procesos/:id/verificacion", element: _jsx(VerificacionPage, {}) }), _jsx(Route, { path: "/inspecciones", element: _jsx(InspeccionesPage, {}) }), _jsx(Route, { path: "/verificaciones", element: _jsx(VerificacionesPage, {}) }), _jsx(Route, { path: "/notificaciones", element: _jsx(NotificacionesPage, {}) }), _jsx(Route, { path: "/catalogos", element: _jsx(CatalogosPage, {}) }), _jsx(Route, { path: "/reportes", element: _jsx(ReportesPage, {}) }), _jsx(Route, { path: "/usuarios", element: _jsx(UsuariosPage, {}) }), _jsx(Route, { path: "/configuracion", element: _jsx(ConfiguracionPage, {}) })] }) }));
}

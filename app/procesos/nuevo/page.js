import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { NotificacionForm } from '@/components/notificacion/NotificacionForm';
import { StepIndicator } from '@/components/shared/StepIndicator';
export default function NuevoProcesoPage() {
    return (_jsxs(AppLayout, { children: [_jsx(Header, { title: "Nuevo proceso", subtitle: "Paso 1 de 3 \u2014 Notificaci\u00F3n de Inspecci\u00F3n" }), _jsxs("div", { className: "p-6 space-y-6", children: [_jsx("div", { className: "flex justify-center", children: _jsx(StepIndicator, { currentEstado: "notificacion" }) }), _jsx(NotificacionForm, {})] })] }));
}

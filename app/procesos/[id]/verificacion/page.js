import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { VerificacionForm } from '@/components/verificacion/VerificacionForm';
import { StepIndicator } from '@/components/shared/StepIndicator';
import { useParams } from 'react-router-dom';
export default function VerificacionPage() {
    const { id } = useParams();
    return (_jsxs(AppLayout, { children: [_jsx(Header, { title: "Verificaci\u00F3n", subtitle: "Paso 3 de 3 \u2014 Acta de Verificaci\u00F3n" }), _jsxs("div", { className: "p-6 space-y-6", children: [_jsx("div", { className: "flex justify-center", children: _jsx(StepIndicator, { currentEstado: "verificacion" }) }), _jsx(VerificacionForm, { procesoId: id })] })] }));
}

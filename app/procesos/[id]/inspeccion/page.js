import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { InspeccionForm } from '@/components/inspeccion/InspeccionForm';
import { StepIndicator } from '@/components/shared/StepIndicator';
import { useParams } from 'react-router-dom';
export default function InspeccionPage() {
    const { id } = useParams();
    return (_jsxs(AppLayout, { children: [_jsx(Header, { title: "Inspecci\u00F3n", subtitle: "Paso 2 de 3 \u2014 Acta Circunstanciada de Inspecci\u00F3n" }), _jsxs("div", { className: "p-6 space-y-6", children: [_jsx("div", { className: "flex justify-center", children: _jsx(StepIndicator, { currentEstado: "inspeccion" }) }), _jsx(InspeccionForm, { procesoId: id })] })] }));
}

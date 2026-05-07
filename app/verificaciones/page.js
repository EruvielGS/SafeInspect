import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ArrowRight } from 'lucide-react';
import { PROCESOS, ETIQUETAS_REQUERIMIENTO } from '@/lib/mock-data';
export default function VerificacionesPage() {
    const verificaciones = PROCESOS.filter((p) => p.estado === 'verificacion' || p.estado === 'cumple' || p.estado === 'no_cumple');
    return (_jsxs(AppLayout, { children: [_jsx(Header, { title: "Verificaciones", subtitle: "Actas de verificaci\u00F3n y resultados de cumplimiento" }), _jsx("div", { className: "p-6 space-y-3", children: verificaciones.map((proceso) => (_jsx(Card, { className: "border-border/60 shadow-sm", children: _jsxs(CardContent, { className: "flex items-center gap-4 p-4", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-medium text-sm text-foreground", children: proceso.empresa.nombre }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [ETIQUETAS_REQUERIMIENTO[proceso.tipoRequerimiento], " \u00B7 Inspector: ", proceso.inspector.nombre] }), proceso.verificacion && (_jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: ["Fecha verificaci\u00F3n: ", proceso.verificacion.fechaVerificacion, proceso.verificacion.tipoSancion && ` · Sanción: ${proceso.verificacion.tipoSancion}`] }))] }), _jsx(StatusBadge, { estado: proceso.estado }), _jsx(Link, { to: `/procesos/${proceso.id}/verificacion`, children: _jsxs(Button, { variant: "outline", size: "sm", className: "gap-1.5 text-xs", children: ["Ver verificaci\u00F3n", _jsx(ArrowRight, { className: "h-3.5 w-3.5" })] }) })] }) }, proceso.id))) })] }));
}

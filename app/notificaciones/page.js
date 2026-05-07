import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Plus } from 'lucide-react';
import { PROCESOS, ETIQUETAS_REQUERIMIENTO } from '@/lib/mock-data';
export default function NotificacionesPage() {
    const notificaciones = PROCESOS.filter((p) => p.notificacion);
    return (_jsxs(AppLayout, { children: [_jsx(Header, { title: "Notificaciones", subtitle: "Historial de notificaciones de inspecci\u00F3n", actions: _jsx(Link, { to: "/procesos/nuevo", children: _jsxs(Button, { size: "sm", className: "gap-2 bg-primary text-primary-foreground hover:bg-primary/90", children: [_jsx(Plus, { className: "h-4 w-4" }), "Nueva notificaci\u00F3n"] }) }) }), _jsx("div", { className: "p-6 space-y-3", children: notificaciones.map((proceso) => (_jsx(Card, { className: "border-border/60 shadow-sm", children: _jsxs(CardContent, { className: "flex items-center gap-4 p-4", children: [_jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100", children: _jsx(Bell, { className: "h-4 w-4 text-blue-600" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-medium text-sm text-foreground", children: proceso.empresa.nombre }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [ETIQUETAS_REQUERIMIENTO[proceso.tipoRequerimiento], " \u00B7 Orden: ", proceso.notificacion.ordenInspeccionNo] }), _jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: ["Fecha programada: ", proceso.notificacion.fechaProgramada, " a las ", proceso.notificacion.hora] })] }), _jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [_jsx("span", { className: "text-xs text-muted-foreground", children: proceso.notificacion.medioNotificacion }), _jsx(Link, { to: `/procesos/${proceso.id}`, children: _jsx(Button, { variant: "outline", size: "sm", className: "text-xs", children: "Ver proceso" }) })] })] }) }, proceso.id))) })] }));
}

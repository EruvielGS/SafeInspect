'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { ArrowRight, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { PROCESOS, ETIQUETAS_REQUERIMIENTO } from '@/lib/mock-data';
export function RecentProcesses() {
    const recent = PROCESOS.slice(0, 5);
    return (_jsxs(Card, { className: "border-border/60 shadow-sm", children: [_jsxs(CardHeader, { className: "flex-row items-center justify-between pb-2", children: [_jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "\u00DAltimos procesos" }), _jsx(Link, { to: "/procesos", children: _jsxs(Button, { variant: "ghost", size: "sm", className: "h-7 gap-1 text-xs text-muted-foreground", children: ["Ver todos", _jsx(ArrowRight, { className: "h-3 w-3" })] }) })] }), _jsx(CardContent, { className: "p-0", children: _jsx("div", { className: "divide-y divide-border/60", children: recent.map((proceso) => (_jsxs("div", { className: "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/40", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "truncate text-sm font-medium text-foreground", children: proceso.empresa.nombre }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [ETIQUETAS_REQUERIMIENTO[proceso.tipoRequerimiento], " \u00B7", ' ', proceso.inspector.nombre] })] }), _jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [_jsx(StatusBadge, { estado: proceso.estado }), _jsx("span", { className: "hidden text-xs text-muted-foreground sm:block", children: proceso.fechaActualizacion }), _jsx(Link, { to: `/procesos/${proceso.id}`, children: _jsxs(Button, { variant: "ghost", size: "icon", className: "h-7 w-7", children: [_jsx(Eye, { className: "h-3.5 w-3.5" }), _jsx("span", { className: "sr-only", children: "Ver proceso" })] }) })] })] }, proceso.id))) }) })] }));
}

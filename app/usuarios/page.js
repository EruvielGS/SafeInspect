import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { INSPECTORES } from '@/lib/mock-data';
import { Shield } from 'lucide-react';
export default function UsuariosPage() {
    return (_jsxs(AppLayout, { children: [_jsx(Header, { title: "Usuarios", subtitle: "Gesti\u00F3n de inspectores y administradores" }), _jsx("div", { className: "p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: INSPECTORES.map((inspector) => (_jsx(Card, { className: "border-border/60 shadow-sm", children: _jsxs(CardContent, { className: "flex items-center gap-4 p-5", children: [_jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0", children: inspector.nombre.split(' ').map(n => n[0]).slice(0, 2).join('') }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-foreground", children: inspector.nombre }), _jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [_jsx(Shield, { className: "h-3 w-3 text-muted-foreground" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Inspector" })] }), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["ID: ", inspector.idIne] })] })] }) }, inspector.id))) })] }));
}

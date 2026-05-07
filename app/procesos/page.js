import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { ProcesosList } from '@/components/procesos/ProcesosList';
import { Button } from '@/components/ui/button';
export default function ProcesosPage() {
    return (_jsxs(AppLayout, { children: [_jsx(Header, { title: "Listado de procesos", subtitle: "Gesti\u00F3n de notificaciones, inspecciones y verificaciones", actions: _jsx(Link, { to: "/procesos/nuevo", children: _jsxs(Button, { size: "sm", className: "gap-2 bg-primary text-primary-foreground hover:bg-primary/90", children: [_jsx(Plus, { className: "h-4 w-4" }), "Nuevo proceso"] }) }) }), _jsx("div", { className: "p-6", children: _jsx(ProcesosList, {}) })] }));
}

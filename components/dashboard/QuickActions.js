import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Bell, Search, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
const ACTIONS = [
    {
        label: 'Nueva notificación',
        href: '/procesos/nuevo',
        icon: Bell,
        variant: 'default',
        className: 'bg-primary text-primary-foreground hover:bg-primary/90',
    },
    {
        label: 'Programar inspección',
        href: '/inspecciones',
        icon: Search,
        variant: 'outline',
        className: 'border-primary/30 text-primary hover:bg-primary/5',
    },
    {
        label: 'Generar reporte',
        href: '/reportes',
        icon: FileText,
        variant: 'outline',
        className: 'border-primary/30 text-primary hover:bg-primary/5',
    },
];
export function QuickActions() {
    return (_jsxs(Card, { className: "border-border/60 shadow-sm", children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Acciones r\u00E1pidas" }) }), _jsx(CardContent, { className: "flex flex-wrap gap-2", children: ACTIONS.map((action) => (_jsx(Link, { to: action.href, children: _jsxs(Button, { variant: action.variant, size: "sm", className: `gap-2 text-xs ${action.className}`, children: [_jsx(action.icon, { className: "h-3.5 w-3.5" }), action.label] }) }, action.href))) })] }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const CATALOGOS = [
    { titulo: 'Tipos de requerimiento', items: ['Protección Civil', 'Bomberos', 'Seguridad', 'Sanidad', 'Ecología', 'Otro'] },
    { titulo: 'Grados de riesgo', items: ['Bajo', 'Medio', 'Alto'] },
    { titulo: 'Medios de notificación', items: ['Correo electrónico', 'Visita personal', 'Teléfono', 'Oficio'] },
    { titulo: 'Tipos de sanción', items: ['Apercibimiento', 'Multa menor', 'Multa mayor', 'Clausura parcial', 'Clausura total'] },
];
export default function CatalogosPage() {
    return (_jsxs(AppLayout, { children: [_jsx(Header, { title: "Cat\u00E1logos", subtitle: "Configuraci\u00F3n de cat\u00E1logos del sistema" }), _jsx("div", { className: "p-6 grid gap-4 sm:grid-cols-2", children: CATALOGOS.map((cat) => (_jsxs(Card, { className: "border-border/60 shadow-sm", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-semibold", children: cat.titulo }) }), _jsx(CardContent, { children: _jsx("ul", { className: "space-y-1", children: cat.items.map((item) => (_jsxs("li", { className: "text-sm text-muted-foreground flex items-center gap-2", children: [_jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary/40 shrink-0" }), item] }, item))) }) })] }, cat.titulo))) })] }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
export default function ConfiguracionPage() {
    return (_jsxs(AppLayout, { children: [_jsx(Header, { title: "Configuraci\u00F3n", subtitle: "Ajustes generales del sistema" }), _jsx("div", { className: "p-6 max-w-xl space-y-6", children: _jsxs(Card, { className: "border-border/60 shadow-sm", children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(CardTitle, { className: "text-sm font-semibold", children: "Informaci\u00F3n de la instituci\u00F3n" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { className: "text-sm", children: "Nombre de la instituci\u00F3n" }), _jsx(Input, { defaultValue: "Coordinaci\u00F3n Municipal de Protecci\u00F3n Civil", className: "text-sm" })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { className: "text-sm", children: "Municipio" }), _jsx(Input, { defaultValue: "Navojoa", className: "text-sm" })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { className: "text-sm", children: "Estado" }), _jsx(Input, { defaultValue: "Sonora", className: "text-sm" })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { className: "text-sm", children: "Direcci\u00F3n" }), _jsx(Input, { defaultValue: "Av. Ray\u00F3n #205 Ote., Col. Centro, Navojoa, Sonora", className: "text-sm" })] }), _jsx(Button, { size: "sm", className: "bg-primary text-primary-foreground hover:bg-primary/90", children: "Guardar cambios" })] })] }) })] }));
}

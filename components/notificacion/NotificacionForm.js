'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileText, Send, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { EMPRESAS, INSPECTORES } from '@/lib/mock-data';
const schema = z.object({
    empresaId: z.string().min(1, 'Selecciona una empresa'),
    tipoRequerimiento: z.string().min(1, 'Selecciona un tipo de requerimiento'),
    inspectorId: z.string().min(1, 'Selecciona un inspector'),
    fechaProgramada: z.string().min(1, 'Selecciona una fecha'),
    hora: z.string().min(1, 'Ingresa la hora'),
    medioNotificacion: z.string().min(1, 'Selecciona un medio'),
    descripcion: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
    observaciones: z.string().optional(),
});
const TIPOS_REQUERIMIENTO = [
    { value: 'proteccion_civil', label: 'Protección Civil' },
    { value: 'bomberos', label: 'Bomberos' },
    { value: 'seguridad', label: 'Seguridad' },
    { value: 'sanidad', label: 'Sanidad' },
    { value: 'ecologia', label: 'Ecología' },
    { value: 'otro', label: 'Otro' },
];
const MEDIOS = [
    { value: 'correo', label: 'Correo electrónico' },
    { value: 'visita', label: 'Visita personal' },
    { value: 'telefono', label: 'Teléfono' },
    { value: 'oficio', label: 'Oficio' },
];
export function NotificacionForm() {
    var _a, _b, _c;
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            descripcion: 'Se notifica a la empresa sobre la visita de inspección en cumplimiento a los Títulos Sexto y Octavo de la Ley de Protección Civil para el Estado de Sonora.',
        },
    });
    const selectedEmpresaId = watch('empresaId');
    const selectedEmpresa = EMPRESAS.find((e) => e.id === selectedEmpresaId);
    const onSubmit = (data) => __awaiter(this, void 0, void 0, function* () {
        // Simulate API call
        yield new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('[v0] Notificación enviada:', data);
        navigate('/procesos');
    });
    return (_jsx("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6 max-w-3xl mx-auto", children: _jsxs(Card, { className: "border-border/60 shadow-sm", children: [_jsxs(CardHeader, { className: "flex-row items-center justify-between pb-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white text-xs font-bold", children: "1" }), _jsx(CardTitle, { className: "text-base font-semibold", children: "Notificaci\u00F3n de Inspecci\u00F3n" })] }), _jsxs(Button, { variant: "outline", size: "sm", className: "gap-1.5 text-xs", children: [_jsx(FileText, { className: "h-3.5 w-3.5" }), "Generar PDF"] })] }), _jsxs(CardContent, { className: "pt-5 space-y-5", children: [_jsxs("div", { children: [_jsx("h3", { className: "mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Datos de la empresa" }), _jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsxs(Label, { htmlFor: "empresaId", className: "text-sm", children: ["Empresa ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsxs(Select, { onValueChange: (v) => setValue('empresaId', v), children: [_jsx(SelectTrigger, { id: "empresaId", className: errors.empresaId ? 'border-destructive' : '', children: _jsx(SelectValue, { placeholder: "Seleccionar empresa..." }) }), _jsx(SelectContent, { children: EMPRESAS.map((emp) => (_jsx(SelectItem, { value: emp.id, children: emp.nombre }, emp.id))) })] }), errors.empresaId && (_jsx("p", { className: "text-xs text-destructive", children: errors.empresaId.message }))] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { className: "text-sm", children: "Direcci\u00F3n" }), _jsx(Input, { value: (_a = selectedEmpresa === null || selectedEmpresa === void 0 ? void 0 : selectedEmpresa.direccion) !== null && _a !== void 0 ? _a : '', readOnly: true, placeholder: "Se autocompletar\u00E1 al seleccionar empresa", className: "bg-muted/40 text-sm" })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { className: "text-sm", children: "Representante" }), _jsx(Input, { value: (_b = selectedEmpresa === null || selectedEmpresa === void 0 ? void 0 : selectedEmpresa.representante) !== null && _b !== void 0 ? _b : '', readOnly: true, placeholder: "\u2014", className: "bg-muted/40 text-sm" })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { className: "text-sm", children: "Tel\u00E9fono" }), _jsx(Input, { value: (_c = selectedEmpresa === null || selectedEmpresa === void 0 ? void 0 : selectedEmpresa.telefono) !== null && _c !== void 0 ? _c : '', readOnly: true, placeholder: "\u2014", className: "bg-muted/40 text-sm" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Requerimiento" }), _jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsxs(Label, { className: "text-sm", children: ["Tipo de requerimiento ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsxs(Select, { onValueChange: (v) => setValue('tipoRequerimiento', v), children: [_jsx(SelectTrigger, { className: errors.tipoRequerimiento ? 'border-destructive' : '', children: _jsx(SelectValue, { placeholder: "Seleccionar..." }) }), _jsx(SelectContent, { children: TIPOS_REQUERIMIENTO.map((t) => (_jsx(SelectItem, { value: t.value, children: t.label }, t.value))) })] }), errors.tipoRequerimiento && (_jsx("p", { className: "text-xs text-destructive", children: errors.tipoRequerimiento.message }))] }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs(Label, { className: "text-sm", children: ["Inspector ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsxs(Select, { onValueChange: (v) => setValue('inspectorId', v), children: [_jsx(SelectTrigger, { className: errors.inspectorId ? 'border-destructive' : '', children: _jsx(SelectValue, { placeholder: "Asignar inspector..." }) }), _jsx(SelectContent, { children: INSPECTORES.map((ins) => (_jsx(SelectItem, { value: ins.id, children: ins.nombre }, ins.id))) })] }), errors.inspectorId && (_jsx("p", { className: "text-xs text-destructive", children: errors.inspectorId.message }))] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Programaci\u00F3n de visita" }), _jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsxs(Label, { className: "text-sm", children: ["Fecha programada ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, Object.assign({ type: "date" }, register('fechaProgramada'), { className: errors.fechaProgramada ? 'border-destructive' : '' })), errors.fechaProgramada && (_jsx("p", { className: "text-xs text-destructive", children: errors.fechaProgramada.message }))] }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs(Label, { className: "text-sm", children: ["Hora ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, Object.assign({ type: "time" }, register('hora'), { className: errors.hora ? 'border-destructive' : '' })), errors.hora && (_jsx("p", { className: "text-xs text-destructive", children: errors.hora.message }))] }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs(Label, { className: "text-sm", children: ["Medio de notificaci\u00F3n ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsxs(Select, { onValueChange: (v) => setValue('medioNotificacion', v), children: [_jsx(SelectTrigger, { className: errors.medioNotificacion ? 'border-destructive' : '', children: _jsx(SelectValue, { placeholder: "Seleccionar..." }) }), _jsx(SelectContent, { children: MEDIOS.map((m) => (_jsx(SelectItem, { value: m.value, children: m.label }, m.value))) })] }), errors.medioNotificacion && (_jsx("p", { className: "text-xs text-destructive", children: errors.medioNotificacion.message }))] })] })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs(Label, { className: "text-sm", children: ["Descripci\u00F3n ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Textarea, Object.assign({}, register('descripcion'), { rows: 3, placeholder: "Descripci\u00F3n del motivo de la inspecci\u00F3n...", className: `resize-none text-sm leading-relaxed ${errors.descripcion ? 'border-destructive' : ''}` })), errors.descripcion && (_jsx("p", { className: "text-xs text-destructive", children: errors.descripcion.message }))] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { className: "text-sm", children: "Observaciones" }), _jsx(Textarea, Object.assign({}, register('observaciones'), { rows: 2, placeholder: "Observaciones adicionales (opcional)...", className: "resize-none text-sm leading-relaxed" }))] }), _jsxs("div", { className: "flex items-center justify-end gap-3 border-t border-border/60 pt-4", children: [_jsxs(Button, { type: "button", variant: "outline", onClick: () => navigate('/procesos'), className: "gap-1.5", children: [_jsx(X, { className: "h-4 w-4" }), "Cancelar"] }), _jsxs(Button, { type: "submit", disabled: isSubmitting, className: "gap-2 bg-primary text-primary-foreground hover:bg-primary/90", children: [_jsx(Send, { className: "h-4 w-4" }), isSubmitting ? 'Enviando...' : 'Enviar notificación'] })] })] })] }) }));
}

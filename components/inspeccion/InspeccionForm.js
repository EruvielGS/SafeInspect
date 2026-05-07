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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileText, Save, ChevronDown, ChevronUp, Camera, Paperclip, PenLine, CheckCircle2, XCircle, } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { INSPECTORES } from '@/lib/mock-data';
const schema = z.object({
    expediente: z.string().min(1, 'Requerido'),
    folio: z.string().min(1, 'Requerido'),
    fecha: z.string().min(1, 'Requerido'),
    horaInicio: z.string().min(1, 'Requerido'),
    horaFin: z.string().min(1, 'Requerido'),
    inspectorId: z.string().min(1, 'Requerido'),
    acompanante: z.string().optional(),
    representanteEmpresa: z.string().min(1, 'Requerido'),
    gradoRiesgo: z.enum(['bajo', 'medio', 'alto']),
    observacionesGenerales: z.string().min(5, 'Agrega observaciones'),
    diasParaCumplir: z.string().min(1, 'Requerido'),
    fechaVerificacion: z.string().min(1, 'Requerido'),
    horaVerificacion: z.string().min(1, 'Requerido'),
});
const INITIAL_SECCIONES = [
    {
        id: 'pc',
        titulo: 'II. Protección Civil',
        expanded: true,
        items: [
            { id: 'pc-1', label: 'Cuenta con Unidad Interna de Protección Civil', value: 'na' },
            { id: 'pc-2', label: 'Cuenta con Plan Interno', value: 'na' },
            { id: 'pc-3', label: 'Manual de Contingencias', value: 'na' },
            { id: 'pc-4', label: 'Dictamen Eléctrico', value: 'na' },
            { id: 'pc-5', label: 'Dictamen Estructural', value: 'na' },
        ],
    },
    {
        id: 'bomberos',
        titulo: 'III. Bomberos',
        expanded: true,
        items: [
            { id: 'b-1', label: 'Extintores', value: 'na' },
            { id: 'b-2', label: 'Lámparas de Emergencia', value: 'na' },
            { id: 'b-3', label: 'Detectores de Humo', value: 'na' },
            { id: 'b-4', label: 'Señalización de Evacuación', value: 'na' },
        ],
    },
];
const GRADO_CONFIG = {
    bajo: { label: 'Bajo', color: 'border-green-300 text-green-700', active: 'bg-green-500 text-white border-green-500' },
    medio: { label: 'Medio', color: 'border-amber-300 text-amber-700', active: 'bg-amber-500 text-white border-amber-500' },
    alto: { label: 'Alto', color: 'border-red-300 text-red-700', active: 'bg-red-500 text-white border-red-500' },
};
function TriStateButton({ value, onChange, }) {
    return (_jsx("div", { className: "flex items-center gap-1", children: ['si', 'no', 'na'].map((v) => (_jsx("button", { type: "button", onClick: () => onChange(v), className: cn('flex h-7 w-10 items-center justify-center rounded border text-[11px] font-medium transition-all duration-150', value === v
                ? v === 'si'
                    ? 'bg-green-500 border-green-500 text-white'
                    : v === 'no'
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'bg-muted-foreground border-muted-foreground text-white'
                : 'border-border bg-background text-muted-foreground hover:bg-muted/60'), children: v === 'si' ? 'SI' : v === 'no' ? 'NO' : 'N/A' }, v))) }));
}
export function InspeccionForm({ procesoId }) {
    const navigate = useNavigate();
    const [secciones, setSecciones] = useState(INITIAL_SECCIONES);
    const [gradoRiesgo, setGradoRiesgo] = useState('bajo');
    const [observacionesSecciones, setObservacionesSecciones] = useState({});
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            gradoRiesgo: 'bajo',
            diasParaCumplir: '30',
        },
    });
    const toggleSeccion = (id) => {
        setSecciones((prev) => prev.map((s) => (s.id === id ? Object.assign(Object.assign({}, s), { expanded: !s.expanded }) : s)));
    };
    const updateItemValue = (seccionId, itemId, value) => {
        setSecciones((prev) => prev.map((s) => s.id === seccionId
            ? Object.assign(Object.assign({}, s), { items: s.items.map((item) => item.id === itemId ? Object.assign(Object.assign({}, item), { value }) : item) }) : s));
    };
    const onSubmit = (data) => __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('[v0] Inspección guardada:', Object.assign(Object.assign({}, data), { secciones, gradoRiesgo }));
        navigate('/procesos');
    });
    const getSummary = (seccion) => {
        const si = seccion.items.filter((i) => i.value === 'si').length;
        const no = seccion.items.filter((i) => i.value === 'no').length;
        return { si, no, total: seccion.items.length };
    };
    return (_jsx("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-5 max-w-3xl mx-auto", children: _jsxs(Card, { className: "border-border/60 shadow-sm", children: [_jsxs(CardHeader, { className: "flex-row items-center justify-between pb-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-violet-500 text-white text-xs font-bold", children: "2" }), _jsx(CardTitle, { className: "text-base font-semibold", children: "Acta Circunstanciada de Inspecci\u00F3n" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "gap-1.5 text-xs", children: [_jsx(Save, { className: "h-3.5 w-3.5" }), "Guardar borrador"] }), _jsxs(Button, { variant: "outline", size: "sm", className: "gap-1.5 text-xs", children: [_jsx(FileText, { className: "h-3.5 w-3.5" }), "Generar PDF"] })] })] }), _jsxs(CardContent, { className: "pt-5 space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "I. Datos generales" }), _jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsxs(Label, { className: "text-sm", children: ["Fecha ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, Object.assign({ type: "date" }, register('fecha'), { className: errors.fecha ? 'border-destructive' : '' })), errors.fecha && _jsx("p", { className: "text-xs text-destructive", children: errors.fecha.message })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs(Label, { className: "text-sm", children: ["Hora inicio ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, Object.assign({ type: "time" }, register('horaInicio'), { className: errors.horaInicio ? 'border-destructive' : '' }))] }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs(Label, { className: "text-sm", children: ["Hora fin ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, Object.assign({ type: "time" }, register('horaFin'), { className: errors.horaFin ? 'border-destructive' : '' }))] }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs(Label, { className: "text-sm", children: ["No. de expediente ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, Object.assign({}, register('expediente'), { placeholder: "EXP-2026-XXX", className: errors.expediente ? 'border-destructive' : '' }))] }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs(Label, { className: "text-sm", children: ["Folio ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, Object.assign({}, register('folio'), { placeholder: "XXX", className: errors.folio ? 'border-destructive' : '' }))] }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs(Label, { className: "text-sm", children: ["Inspector ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsxs(Select, { onValueChange: (v) => setValue('inspectorId', v), children: [_jsx(SelectTrigger, { className: errors.inspectorId ? 'border-destructive' : '', children: _jsx(SelectValue, { placeholder: "Seleccionar..." }) }), _jsx(SelectContent, { children: INSPECTORES.map((ins) => (_jsx(SelectItem, { value: ins.id, children: ins.nombre }, ins.id))) })] })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { className: "text-sm", children: "Acompa\u00F1ante / Testigo" }), _jsx(Input, Object.assign({}, register('acompanante'), { placeholder: "Nombre del testigo" }))] }), _jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [_jsxs(Label, { className: "text-sm", children: ["Representante de la empresa ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, Object.assign({}, register('representanteEmpresa'), { placeholder: "Nombre del representante", className: errors.representanteEmpresa ? 'border-destructive' : '' })), errors.representanteEmpresa && (_jsx("p", { className: "text-xs text-destructive", children: errors.representanteEmpresa.message }))] })] })] }), secciones.map((seccion) => {
                            var _a;
                            const { si, no, total } = getSummary(seccion);
                            return (_jsxs("div", { className: "rounded-lg border border-border/70 overflow-hidden", children: [_jsxs("button", { type: "button", onClick: () => toggleSeccion(seccion.id), className: "flex w-full items-center justify-between bg-muted/40 px-4 py-3 hover:bg-muted/60 transition-colors", children: [_jsx("span", { className: "text-sm font-semibold text-foreground", children: seccion.titulo }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsxs("span", { className: "flex items-center gap-1 text-green-600", children: [_jsx(CheckCircle2, { className: "h-3.5 w-3.5" }), si] }), _jsxs("span", { className: "flex items-center gap-1 text-red-500", children: [_jsx(XCircle, { className: "h-3.5 w-3.5" }), no] }), _jsxs("span", { className: "text-muted-foreground", children: ["/ ", total] })] }), seccion.expanded ? (_jsx(ChevronUp, { className: "h-4 w-4 text-muted-foreground" })) : (_jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground" }))] })] }), seccion.expanded && (_jsxs("div", { className: "divide-y divide-border/50", children: [seccion.items.map((item) => (_jsxs("div", { className: "flex items-center justify-between gap-4 px-4 py-3", children: [_jsx("span", { className: "text-sm text-foreground leading-relaxed flex-1", children: item.label }), _jsx(TriStateButton, { value: item.value, onChange: (v) => updateItemValue(seccion.id, item.id, v) })] }, item.id))), seccion.id === 'pc' && (_jsxs("div", { className: "flex items-center gap-4 px-4 py-3 bg-muted/20", children: [_jsx("span", { className: "text-sm font-medium text-foreground", children: "Grado de Riesgo:" }), _jsx("div", { className: "flex gap-2", children: Object.entries(GRADO_CONFIG).map(([key, cfg]) => (_jsx("button", { type: "button", onClick: () => {
                                                                setGradoRiesgo(key);
                                                                setValue('gradoRiesgo', key);
                                                            }, className: cn('rounded-full border px-4 py-1 text-xs font-semibold transition-all duration-150', gradoRiesgo === key ? cfg.active : cfg.color + ' bg-background hover:bg-muted/60'), children: cfg.label }, key))) })] })), _jsxs("div", { className: "px-4 py-3", children: [_jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Observaciones de esta secci\u00F3n" }), _jsx(Textarea, { value: (_a = observacionesSecciones[seccion.id]) !== null && _a !== void 0 ? _a : '', onChange: (e) => setObservacionesSecciones((prev) => (Object.assign(Object.assign({}, prev), { [seccion.id]: e.target.value }))), rows: 2, placeholder: "Observaciones espec\u00EDficas...", className: "resize-none text-sm leading-relaxed" })] })] }))] }, seccion.id));
                        }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs(Label, { className: "text-sm", children: ["Observaciones generales ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Textarea, Object.assign({}, register('observacionesGenerales'), { rows: 3, placeholder: "Observaciones generales de la inspecci\u00F3n...", className: `resize-none text-sm leading-relaxed ${errors.observacionesGenerales ? 'border-destructive' : ''}` })), errors.observacionesGenerales && (_jsx("p", { className: "text-xs text-destructive", children: errors.observacionesGenerales.message }))] }), _jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsxs(Label, { className: "text-sm", children: ["D\u00EDas para cumplir ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, Object.assign({ type: "number", min: "1", max: "365" }, register('diasParaCumplir'), { className: errors.diasParaCumplir ? 'border-destructive' : '' }))] }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs(Label, { className: "text-sm", children: ["Fecha de verificaci\u00F3n ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, Object.assign({ type: "date" }, register('fechaVerificacion'), { className: errors.fechaVerificacion ? 'border-destructive' : '' }))] }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs(Label, { className: "text-sm", children: ["Hora ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, Object.assign({ type: "time" }, register('horaVerificacion'), { className: errors.horaVerificacion ? 'border-destructive' : '' }))] })] }), _jsxs("div", { children: [_jsx("h3", { className: "mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Evidencias fotogr\u00E1ficas" }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { type: "button", variant: "outline", size: "sm", className: "gap-2 text-xs", children: [_jsx(Paperclip, { className: "h-3.5 w-3.5" }), "Agregar evidencia"] }), _jsxs(Button, { type: "button", variant: "outline", size: "sm", className: "gap-2 text-xs", children: [_jsx(Camera, { className: "h-3.5 w-3.5" }), "Tomar foto"] }), _jsxs(Button, { type: "button", variant: "outline", size: "sm", className: "gap-2 text-xs", children: [_jsx(PenLine, { className: "h-3.5 w-3.5" }), "Firmas"] })] })] }), _jsxs("div", { className: "rounded-lg border border-border/70 bg-muted/20 p-4", children: [_jsx("h3", { className: "mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Firmas" }), _jsx("div", { className: "grid gap-6 sm:grid-cols-3", children: ['Por la empresa', 'Inspector responsable', 'Testigo'].map((label) => (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "mx-auto mb-2 h-16 w-full rounded border-b-2 border-dashed border-border bg-background" }), _jsx("p", { className: "text-xs font-medium text-foreground", children: label }), _jsx("p", { className: "text-[11px] text-muted-foreground", children: "Nombre y firma" })] }, label))) })] }), _jsxs("div", { className: "flex items-center justify-end gap-3 border-t border-border/60 pt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => navigate('/procesos'), children: "Cancelar" }), _jsxs(Button, { type: "submit", disabled: isSubmitting, className: "gap-2 bg-violet-600 text-white hover:bg-violet-700", children: [_jsx(CheckCircle2, { className: "h-4 w-4" }), isSubmitting ? 'Guardando...' : 'Finalizar inspección'] })] })] })] }) }));
}

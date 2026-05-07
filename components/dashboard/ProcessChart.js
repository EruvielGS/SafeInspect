'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { STATS } from '@/lib/mock-data';
export function ProcessPieChart() {
    return (_jsxs(Card, { className: "border-border/60 shadow-sm", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Procesos por estado" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "h-40 w-40 shrink-0", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: STATS.porEstado, cx: "50%", cy: "50%", innerRadius: 42, outerRadius: 68, paddingAngle: 2, dataKey: "valor", children: STATS.porEstado.map((entry, index) => (_jsx(Cell, { fill: entry.color, strokeWidth: 0 }, `cell-${index}`))) }), _jsx(Tooltip, { formatter: (value, name) => [value, name], contentStyle: {
                                                background: 'var(--card)',
                                                border: '1px solid var(--border)',
                                                borderRadius: '8px',
                                                fontSize: '12px',
                                            } })] }) }) }), _jsx("div", { className: "flex flex-col gap-2 min-w-0", children: STATS.porEstado.map((item, i) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-full", style: { backgroundColor: item.color } }), _jsx("span", { className: "truncate text-xs text-muted-foreground", children: item.nombre }), _jsxs("span", { className: "ml-auto text-xs font-medium text-foreground pl-2", children: [item.valor, _jsxs("span", { className: "text-muted-foreground ml-1", children: ["(", item.porcentaje, "%)"] })] })] }, i))) })] }) })] }));
}
export function InspeccionesBarChart() {
    return (_jsxs(Card, { className: "border-border/60 shadow-sm", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Inspecciones por mes" }) }), _jsx(CardContent, { children: _jsx("div", { className: "h-44", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: STATS.inspeccionesPorMes, barGap: 4, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)", vertical: false }), _jsx(XAxis, { dataKey: "mes", tick: { fontSize: 11, fill: 'var(--muted-foreground)' }, axisLine: false, tickLine: false }), _jsx(YAxis, { tick: { fontSize: 11, fill: 'var(--muted-foreground)' }, axisLine: false, tickLine: false, width: 24 }), _jsx(Tooltip, { contentStyle: {
                                        background: 'var(--card)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '8px',
                                        fontSize: '12px',
                                    } }), _jsx(Legend, { wrapperStyle: { fontSize: '11px', paddingTop: '8px' } }), _jsx(Bar, { dataKey: "inspecciones", name: "Inspecciones", fill: "var(--color-chart-1)", radius: [3, 3, 0, 0] }), _jsx(Bar, { dataKey: "verificaciones", name: "Verificaciones", fill: "var(--color-chart-4)", radius: [3, 3, 0, 0] })] }) }) }) })] }));
}

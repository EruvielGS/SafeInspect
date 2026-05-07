import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { ProcessPieChart, InspeccionesBarChart } from '@/components/dashboard/ProcessChart';
export default function ReportesPage() {
    return (_jsxs(AppLayout, { children: [_jsx(Header, { title: "Reportes", subtitle: "Estad\u00EDsticas y an\u00E1lisis del sistema de inspecciones" }), _jsxs("div", { className: "p-6 space-y-6", children: [_jsx(StatsCards, {}), _jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [_jsx(ProcessPieChart, {}), _jsx(InspeccionesBarChart, {})] })] })] }));
}

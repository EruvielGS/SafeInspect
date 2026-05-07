import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { ProcessPieChart, InspeccionesBarChart } from '@/components/dashboard/ProcessChart';
import { ProcessFlow } from '@/components/dashboard/ProcessFlow';
import { RecentProcesses } from '@/components/dashboard/RecentProcesses';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
export default function DashboardPage() {
    return (_jsxs(AppLayout, { children: [_jsx(Header, { title: "Dashboard", subtitle: "Coordinaci\u00F3n Municipal de Protecci\u00F3n Civil \u2014 Navojoa, Sonora", actions: _jsx(Link, { to: "/procesos/nuevo", children: _jsxs(Button, { size: "sm", className: "gap-2 bg-primary text-primary-foreground hover:bg-primary/90", children: [_jsx(Plus, { className: "h-4 w-4" }), "Nuevo proceso"] }) }) }), _jsxs("div", { className: "p-6 space-y-6", children: [_jsx(StatsCards, {}), _jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [_jsx(ProcessPieChart, {}), _jsx(InspeccionesBarChart, {}), _jsx(ProcessFlow, {})] }), _jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [_jsx("div", { className: "lg:col-span-2", children: _jsx(RecentProcesses, {}) }), _jsx(QuickActions, {})] })] })] }));
}

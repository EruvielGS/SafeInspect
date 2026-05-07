'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Building2, ClipboardList, Search, ShieldCheck, Bell, BookOpen, BarChart3, Users, Settings, Triangle, ChevronRight, } from 'lucide-react';
import { cn } from '@/lib/utils';
const NAV_ITEMS = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Empresas', href: '/empresas', icon: Building2 },
    { label: 'Procesos', href: '/procesos', icon: ClipboardList, badge: 8 },
    { label: 'Inspecciones', href: '/inspecciones', icon: Search },
    { label: 'Verificaciones', href: '/verificaciones', icon: ShieldCheck },
    { label: 'Notificaciones', href: '/notificaciones', icon: Bell },
    { label: 'Catálogos', href: '/catalogos', icon: BookOpen },
    { label: 'Reportes', href: '/reportes', icon: BarChart3 },
    { label: 'Usuarios', href: '/usuarios', icon: Users },
    { label: 'Configuración', href: '/configuracion', icon: Settings },
];
export function Sidebar() {
    const { pathname } = useLocation();
    return (_jsxs("aside", { className: "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground", children: [_jsxs("div", { className: "flex items-center gap-3 px-5 py-5 border-b border-sidebar-border", children: [_jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-accent", children: _jsx(Triangle, { className: "h-5 w-5 text-white fill-white" }) }), _jsxs("div", { className: "leading-tight", children: [_jsx("p", { className: "text-sm font-semibold text-sidebar-foreground", children: "Protecci\u00F3n Civil" }), _jsx("p", { className: "text-xs text-sidebar-foreground/60", children: "Navojoa, Sonora" })] })] }), _jsx("nav", { className: "flex-1 overflow-y-auto scrollbar-thin px-3 py-4", children: _jsx("ul", { className: "space-y-0.5", children: NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        return (_jsx("li", { children: _jsxs(Link, { to: item.href, className: cn('group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150', isActive
                                    ? 'bg-sidebar-accent text-white'
                                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'), children: [_jsx(item.icon, { className: cn('h-4 w-4 shrink-0 transition-colors', isActive
                                            ? 'text-sidebar-primary'
                                            : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80') }), _jsx("span", { className: "flex-1", children: item.label }), item.badge !== undefined && (_jsx("span", { className: "flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-primary px-1.5 text-[10px] font-semibold text-white", children: item.badge })), isActive && (_jsx(ChevronRight, { className: "h-3.5 w-3.5 text-sidebar-primary" }))] }) }, item.href));
                    }) }) }), _jsx("div", { className: "border-t border-sidebar-border px-4 py-3", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold text-sidebar-foreground", children: "JP" }), _jsxs("div", { className: "flex-1 leading-tight min-w-0", children: [_jsx("p", { className: "truncate text-sm font-medium text-sidebar-foreground", children: "Juan P\u00E9rez" }), _jsx("p", { className: "truncate text-xs text-sidebar-foreground/50", children: "Administrador" })] })] }) })] }));
}

'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export function Header({ title, subtitle, actions }) {
    return (_jsxs("header", { className: "sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/80 backdrop-blur-sm px-6", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h1", { className: "text-base font-semibold text-foreground leading-tight", children: title }), subtitle && (_jsx("p", { className: "text-xs text-muted-foreground", children: subtitle }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative hidden sm:block", children: [_jsx(Search, { className: "absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }), _jsx(Input, { placeholder: "Buscar empresa...", className: "h-8 w-52 pl-8 text-sm bg-secondary border-transparent focus:border-border" })] }), _jsxs(Button, { variant: "ghost", size: "icon", className: "relative h-8 w-8", children: [_jsx(Bell, { className: "h-4 w-4" }), _jsx("span", { className: "absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" }), _jsx("span", { className: "sr-only", children: "Notificaciones" })] }), actions && _jsx("div", { className: "flex items-center gap-2", children: actions })] })] }));
}

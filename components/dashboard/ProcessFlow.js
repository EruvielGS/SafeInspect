import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bell, Search, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
const STEPS = [
    {
        number: 1,
        label: 'Notificar',
        description: 'Se notifica a la empresa sobre el requerimiento a cumplir.',
        icon: Bell,
        color: 'bg-blue-500',
        ring: 'ring-blue-200',
    },
    {
        number: 2,
        label: 'Inspección',
        description: 'Se realiza la inspección para verificar el cumplimiento.',
        icon: Search,
        color: 'bg-violet-500',
        ring: 'ring-violet-200',
    },
    {
        number: 3,
        label: 'Verificar que cumplen',
        description: 'Se verifica la información y se determina si cumplen con los requerimientos.',
        icon: ShieldCheck,
        color: 'bg-green-500',
        ring: 'ring-green-200',
    },
];
export function ProcessFlow() {
    return (_jsxs(Card, { className: "border-border/60 shadow-sm", children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Flujo del proceso" }) }), _jsx(CardContent, { children: _jsx("div", { className: "flex items-start gap-0", children: STEPS.map((step, i) => (_jsxs("div", { className: "flex flex-1 flex-col items-center", children: [_jsxs("div", { className: "flex w-full items-center", children: [_jsx("div", { className: cn('h-px flex-1', i === 0 ? 'bg-transparent' : 'bg-border') }), _jsxs("div", { className: cn('relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white ring-4', step.color, step.ring), children: [_jsx(step.icon, { className: "h-5 w-5" }), _jsx("span", { className: "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background border border-border text-[9px] font-bold text-foreground", children: step.number })] }), _jsx("div", { className: cn('h-px flex-1', i === STEPS.length - 1 ? 'bg-transparent' : 'bg-border') })] }), _jsxs("div", { className: "mt-3 px-1 text-center", children: [_jsx("p", { className: "text-xs font-semibold text-foreground", children: step.label }), _jsx("p", { className: "mt-1 text-[11px] leading-relaxed text-muted-foreground", children: step.description })] })] }, i))) }) })] }));
}

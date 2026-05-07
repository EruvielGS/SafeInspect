import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bell, Search, ShieldCheck, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
const STEPS = [
    { key: 'notificacion', label: 'Notificación', icon: Bell, step: 1 },
    { key: 'inspeccion', label: 'Inspección', icon: Search, step: 2 },
    { key: 'verificacion', label: 'Verificación', icon: ShieldCheck, step: 3 },
];
const STEP_ORDER = {
    notificacion: 1,
    inspeccion: 2,
    verificacion: 3,
    cumple: 4,
    no_cumple: 4,
};
export function StepIndicator({ currentEstado, className }) {
    const currentStep = STEP_ORDER[currentEstado];
    return (_jsx("div", { className: cn('flex items-center', className), children: STEPS.map((step, i) => {
            const isDone = currentStep > step.step;
            const isActive = currentStep === step.step;
            return (_jsxs("div", { className: "flex items-center", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: cn('flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300', isDone
                                    ? 'border-green-500 bg-green-500 text-white'
                                    : isActive
                                        ? 'border-primary bg-primary text-primary-foreground'
                                        : 'border-border bg-background text-muted-foreground'), children: isDone ? (_jsx(Check, { className: "h-4 w-4" })) : (_jsx(step.icon, { className: "h-4 w-4" })) }), _jsx("div", { className: "mt-1.5 text-center", children: _jsx("span", { className: cn('text-[11px] font-medium', isActive ? 'text-primary' : isDone ? 'text-green-600' : 'text-muted-foreground'), children: step.label }) })] }), i < STEPS.length - 1 && (_jsx("div", { className: cn('mx-2 h-0.5 w-16 flex-1 transition-colors duration-300', currentStep > step.step ? 'bg-green-400' : 'bg-border') }))] }, step.key));
        }) }));
}

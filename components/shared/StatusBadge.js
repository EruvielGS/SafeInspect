import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
const CONFIG = {
    notificacion: {
        label: 'Notificación',
        className: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    inspeccion: {
        label: 'Inspección',
        className: 'bg-violet-100 text-violet-700 border-violet-200',
    },
    verificacion: {
        label: 'Verificación',
        className: 'bg-orange-100 text-orange-700 border-orange-200',
    },
    cumple: {
        label: 'Cumple',
        className: 'bg-green-100 text-green-700 border-green-200',
    },
    no_cumple: {
        label: 'No cumple',
        className: 'bg-red-100 text-red-700 border-red-200',
    },
};
export function StatusBadge({ estado, className }) {
    const config = CONFIG[estado];
    return (_jsx("span", { className: cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', config.className, className), children: config.label }));
}

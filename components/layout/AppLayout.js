import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sidebar } from './Sidebar';
export function AppLayout({ children }) {
    return (_jsxs("div", { className: "flex min-h-screen bg-background", children: [_jsx(Sidebar, {}), _jsx("div", { className: "flex flex-1 flex-col pl-64", children: _jsx("main", { className: "flex-1 overflow-auto", children: children }) })] }));
}

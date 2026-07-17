"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationWindow = RegistrationWindow;
const jsx_runtime_1 = require("react/jsx-runtime");
function RegistrationWindow() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "h-full w-full bg-white flex flex-col border-4 border-black font-sans relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-primary-yellow border-b-4 border-black p-4 flex items-center justify-between z-10 shrink-0", children: (0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-black uppercase tracking-tight", children: "SmartSphere Registration" }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 w-full h-full relative bg-gray-100 overflow-hidden", children: (0, jsx_runtime_1.jsx)("iframe", { src: "https://docs.google.com/forms/d/e/1FAIpQLSfV_TpzhDYLLs9fbe5og0uE68Dr-MxHFqMH39covV2CndsvWg/viewform?embedded=true", className: "absolute inset-0 w-full h-full border-none", title: "Registration Form", children: "Loading\u2026" }) })] }));
}

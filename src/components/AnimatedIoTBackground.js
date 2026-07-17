"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedIoTBackground = AnimatedIoTBackground;
const jsx_runtime_1 = require("react/jsx-runtime");
function AnimatedIoTBackground() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#F0EBE1] flex items-center justify-center", children: (0, jsx_runtime_1.jsx)("div", { className: "w-[200px] sm:w-[300px] md:w-[400px] transition-transform duration-700 hover:scale-105", style: {
                transform: 'perspective(1000px) rotateX(20deg) rotateY(-10deg) rotateZ(-10deg)',
                transformStyle: 'preserve-3d',
                mixBlendMode: 'multiply'
            }, children: (0, jsx_runtime_1.jsx)("img", { src: "/cartoon_pi.png", alt: "Single Board Computer", className: "w-full h-auto object-contain" }) }) }));
}

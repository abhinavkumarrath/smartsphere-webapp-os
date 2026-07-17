"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootScreen = BootScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const BootScreenIcons_1 = require("./BootScreenIcons");
function BootScreen({ onComplete }) {
    const [stage, setStage] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        // Staggered pop-in animations
        setTimeout(() => setStage(1), 300);
        setTimeout(() => setStage(2), 800);
        setTimeout(() => setStage(3), 1500);
        // Fade out and Complete (Extended to 4.5s for animations)
        setTimeout(() => {
            onComplete();
        }, 4500);
    }, [onComplete]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-0 bg-primary-yellow z-[100] flex flex-col items-center justify-center font-sans overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: `absolute top-10 left-10 transition-transform duration-500 ${stage >= 1 ? 'scale-100' : 'scale-0'}`, children: (0, jsx_runtime_1.jsx)(BootScreenIcons_1.LightBulbIcon, {}) }), (0, jsx_runtime_1.jsx)("div", { className: `absolute bottom-10 left-10 transition-transform duration-500 ${stage >= 2 ? 'scale-100' : 'scale-0'}`, children: (0, jsx_runtime_1.jsx)(BootScreenIcons_1.SmartPlugIcon, {}) }), (0, jsx_runtime_1.jsx)("div", { className: `absolute top-10 right-10 transition-transform duration-500 ${stage >= 1 ? 'scale-100' : 'scale-0'}`, children: (0, jsx_runtime_1.jsx)(BootScreenIcons_1.RoboticArmIcon, {}) }), (0, jsx_runtime_1.jsx)("div", { className: `absolute bottom-10 right-10 transition-transform duration-500 ${stage >= 2 ? 'scale-100' : 'scale-0'}`, children: (0, jsx_runtime_1.jsx)(BootScreenIcons_1.SecurityCameraIcon, {}) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-8 relative z-10", children: [(0, jsx_runtime_1.jsx)("div", { className: `w-32 h-32 border-4 border-black bg-white flex items-center justify-center overflow-hidden shadow-[8px_8px_0px_0px_#000] transition-all duration-500 ${stage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`, children: (0, jsx_runtime_1.jsx)("img", { src: "/logo.jpg", alt: "Logo", className: "w-full h-full object-cover" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-4", children: [(0, jsx_runtime_1.jsx)("h1", { className: `text-4xl sm:text-6xl font-black text-black tracking-tighter uppercase transition-all duration-500 ${stage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`, children: "SmartSphere" }), (0, jsx_runtime_1.jsx)("div", { className: `text-black font-bold text-xl uppercase border-2 border-black bg-white px-4 py-1 shadow-[4px_4px_0px_0px_#000] transition-all duration-500 ${stage >= 3 ? 'scale-100' : 'scale-0'}`, children: "Loading OS..." })] })] })] }));
}

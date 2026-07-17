"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowContainer = WindowContainer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("../lib/utils");
function WindowContainer({ title, children, icon, isOpen, isMinimized, isActive, defaultPosition = { x: 50, y: 50 }, width = "w-full max-w-lg", height = "h-auto max-h-[80vh]", onClose, onMinimize, onFocus }) {
    const [isMaximized, setIsMaximized] = (0, react_1.useState)(true);
    const [isMobile, setIsMobile] = (0, react_1.useState)(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    (0, react_1.useEffect)(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
        if (!isActive)
            onFocus();
    };
    if (!isOpen)
        return null;
    const effectiveMaximized = isMaximized || isMobile;
    return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { drag: !effectiveMaximized, dragConstraints: { left: 0, right: typeof window !== 'undefined' ? window.innerWidth - 200 : 0, top: 0, bottom: typeof window !== 'undefined' ? window.innerHeight - 100 : 0 }, dragMomentum: false, dragElastic: 0, initial: { opacity: 0, scale: 0.95, ...defaultPosition }, animate: {
            opacity: isMinimized ? 0 : 1,
            scale: isMinimized ? 0.8 : 1,
            y: isMinimized ? (typeof window !== 'undefined' ? window.innerHeight : 0) : undefined,
            zIndex: isActive ? 50 : 10
        }, transition: { type: "spring", stiffness: 400, damping: 30 }, onPointerDown: onFocus, className: (0, utils_1.cn)("absolute flex flex-col retro-window pointer-events-auto", effectiveMaximized
            ? "!fixed !inset-0 !w-auto !h-auto !transform-none !m-0 !rounded-none !border-0 !shadow-none"
            : (0, utils_1.cn)(width, height), isMinimized ? "pointer-events-none" : ""), style: { touchAction: 'none' }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "retro-window-header bg-primary-yellow", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 font-black tracking-wider flex-1 text-black", children: [icon, (0, jsx_runtime_1.jsx)("span", { children: title })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 ml-4", children: [(0, jsx_runtime_1.jsx)("button", { onPointerDown: (e) => e.stopPropagation(), onClick: onMinimize, className: "w-6 h-6 border-2 border-black bg-white hover:bg-black hover:text-white flex items-center justify-center transition-colors shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Minus, { size: 14, strokeWidth: 4 }) }), (0, jsx_runtime_1.jsx)("button", { onPointerDown: (e) => e.stopPropagation(), onClick: toggleMaximize, className: "w-6 h-6 border-2 border-black bg-white hover:bg-black hover:text-white flex items-center justify-center transition-colors shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Square, { size: 12, strokeWidth: 4 }) }), (0, jsx_runtime_1.jsx)("button", { onPointerDown: (e) => e.stopPropagation(), onClick: onClose, className: "w-6 h-6 border-2 border-black bg-primary-red hover:bg-black hover:text-primary-red text-black flex items-center justify-center transition-colors shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 14, strokeWidth: 4 }) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("bg-surface p-0 overflow-y-auto custom-scrollbar flex-1 relative z-10", isMaximized ? "" : height), children: children })] }));
}

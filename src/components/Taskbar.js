"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Taskbar = Taskbar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("../lib/utils");
function Taskbar({ windows, toggleMinimize, onOpenWindow }) {
    const [time, setTime] = (0, react_1.useState)(new Date());
    const [isStartMenuOpen, setIsStartMenuOpen] = (0, react_1.useState)(false);
    const startMenuRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            if (startMenuRef.current && !startMenuRef.current.contains(event.target)) {
                setIsStartMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleStartMenuClick = (id) => {
        if (onOpenWindow)
            onOpenWindow(id);
        setIsStartMenuOpen(false);
    };
    const isAnyWindowOpen = windows.some(w => w.isOpen && !w.isMinimized);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)("absolute left-1/2 -translate-x-1/2 h-16 sm:h-20 bg-surface border-4 border-black flex items-center px-2 sm:px-6 z-[9999] transition-all duration-500 w-[96%] sm:w-11/12 max-w-6xl", isAnyWindowOpen ? "-bottom-32 opacity-0 pointer-events-none" : "bottom-4 sm:bottom-6 shadow-[8px_8px_0px_0px_#000]"), ref: startMenuRef, children: [isStartMenuOpen && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute bottom-20 sm:bottom-28 left-0 w-full sm:w-72 bg-surface border-4 border-black shadow-[8px_8px_0px_0px_#000] flex flex-col p-2 mb-2 z-[10000] max-w-[calc(100vw-16px)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-primary-yellow border-2 border-black text-black font-black p-4 mb-2 flex items-center gap-3 text-lg", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 border-2 border-black bg-white overflow-hidden shadow-[2px_2px_0px_0px_#000]", children: (0, jsx_runtime_1.jsx)("img", { src: "/logo.jpg", alt: "Logo", className: "w-full h-full object-cover" }) }), "SmartSphere"] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2 max-h-[400px] overflow-y-auto custom-scrollbar p-1", children: [(0, jsx_runtime_1.jsxs)("button", { onClick: () => handleStartMenuClick('about'), className: "flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-cyan transition-colors text-left text-base text-black font-bold", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-6 text-center text-xl", children: "S" }), " About Club"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: () => handleStartMenuClick('inventory'), className: "flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-green transition-colors text-left text-base text-black font-bold", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Cpu, { size: 24, strokeWidth: 2.5 }), " Hardware Lab"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: () => handleStartMenuClick('team'), className: "flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-red transition-colors text-left text-base text-black font-bold", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { size: 24, strokeWidth: 2.5 }), " Core Team"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: () => handleStartMenuClick('sessions'), className: "flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-yellow transition-colors text-left text-base text-black font-bold", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CalendarDays, { size: 24, strokeWidth: 2.5 }), " Session Logs"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: () => handleStartMenuClick('projects'), className: "flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-cyan transition-colors text-left text-base text-black font-bold", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Rocket, { size: 24, strokeWidth: 2.5 }), " Innovations"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: () => handleStartMenuClick('registration'), className: "flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-green transition-colors text-left text-base text-black font-bold", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ClipboardList, { size: 24, strokeWidth: 2.5 }), " Register"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: () => handleStartMenuClick('calendar'), className: "flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-red transition-colors text-left text-base text-black font-bold", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { size: 24, strokeWidth: 2.5 }), " Events"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: () => handleStartMenuClick('music'), className: "flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-yellow transition-colors text-left text-base text-black font-bold", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Music, { size: 24, strokeWidth: 2.5 }), " Music Player"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: () => handleStartMenuClick('profile'), className: "flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-cyan transition-colors text-left text-base text-black font-bold", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.UserCircle2, { size: 24, strokeWidth: 2.5 }), " Profile"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: () => handleStartMenuClick('snake'), className: "flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-green transition-colors text-left text-base text-black font-bold", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Gamepad2, { size: 24, strokeWidth: 2.5 }), " Games"] })] })] })), (0, jsx_runtime_1.jsx)("button", { onClick: () => setIsStartMenuOpen(!isStartMenuOpen), className: (0, utils_1.cn)("flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-primary-red border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all mr-2 sm:mr-8 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shrink-0", isStartMenuOpen ? "translate-x-[2px] translate-y-[2px] shadow-none" : ""), children: (0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 border border-black overflow-hidden bg-white", children: (0, jsx_runtime_1.jsx)("img", { src: "/logo.jpg", alt: "Logo", className: "w-full h-full object-cover" }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-2 sm:gap-4 overflow-x-auto mx-2 flex-1 custom-scrollbar", children: windows.filter(w => w.isOpen).map((w) => {
                    const Icon = () => {
                        switch (w.id) {
                            case 'about': return (0, jsx_runtime_1.jsx)("span", { className: "font-bold text-xl", children: "S" });
                            case 'inventory': return (0, jsx_runtime_1.jsx)(lucide_react_1.Cpu, { size: 20, strokeWidth: 2.5 });
                            case 'team': return (0, jsx_runtime_1.jsx)(lucide_react_1.Users, { size: 20, strokeWidth: 2.5 });
                            case 'sessions': return (0, jsx_runtime_1.jsx)(lucide_react_1.CalendarDays, { size: 20, strokeWidth: 2.5 });
                            case 'projects': return (0, jsx_runtime_1.jsx)(lucide_react_1.Rocket, { size: 20, strokeWidth: 2.5 });
                            case 'calendar': return (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { size: 20, strokeWidth: 2.5 });
                            case 'music': return (0, jsx_runtime_1.jsx)(lucide_react_1.Music, { size: 20, strokeWidth: 2.5 });
                            case 'profile': return (0, jsx_runtime_1.jsx)(lucide_react_1.UserCircle2, { size: 20, strokeWidth: 2.5 });
                            case 'snake': return (0, jsx_runtime_1.jsx)(lucide_react_1.Gamepad2, { size: 20, strokeWidth: 2.5 });
                            case 'registration': return (0, jsx_runtime_1.jsx)(lucide_react_1.ClipboardList, { size: 20, strokeWidth: 2.5 });
                            default: return null;
                        }
                    };
                    return ((0, jsx_runtime_1.jsxs)("button", { onClick: () => toggleMinimize(w.id), className: (0, utils_1.cn)("flex items-center justify-center px-4 h-12 border-2 border-black font-bold text-base transition-all truncate shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none gap-2", !w.isMinimized
                            ? "min-w-[140px] max-w-[200px]"
                            : "w-14", w.isActive && !w.isMinimized
                            ? "bg-primary-yellow text-black"
                            : "bg-surface text-text-primary hover:bg-primary-cyan hover:text-black"), title: w.title, children: [(0, jsx_runtime_1.jsx)(Icon, {}), !w.isMinimized && (0, jsx_runtime_1.jsx)("span", { className: "truncate", children: w.title })] }, w.id));
                }) }), (0, jsx_runtime_1.jsx)("div", { className: "hidden sm:flex ml-auto items-center gap-4 pl-8 border-l-2 border-black h-full shrink-0", children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center px-6 py-3 border-2 border-black bg-primary-green text-black font-black text-base tabular-nums shadow-[2px_2px_0px_0px_#000]", children: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }) })] }));
}

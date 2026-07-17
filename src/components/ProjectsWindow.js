"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsWindow = ProjectsWindow;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const PROJECTS = [
    {
        id: 1,
        title: 'DefendX',
        status: 'In Progress',
        progress: 85,
        techStack: ['React', 'Node.js', 'Python', 'Machine Learning'],
        description: 'An advanced cybersecurity monitoring and defense platform developed by Team Onyx.',
        repo: 'https://github.com/abhinavkumarrath/DefendX',
        color: 'bg-primary-red'
    },
    {
        id: 2,
        title: 'Sentinelle',
        status: 'Completed',
        progress: 100,
        techStack: ['TypeScript', 'React Native', 'IoT', 'AWS'],
        description: 'A personal safety wearable device and companion application by Team Onyx.',
        repo: 'https://github.com/abhinavkumarrath/Sentinelle',
        color: 'bg-primary-cyan'
    }
];
function ProjectsWindow() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4 sm:gap-8 font-sans p-3 sm:p-6 bg-white h-full overflow-y-auto custom-scrollbar", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-primary-blue border-4 border-black p-4 sm:p-6 shadow-[8px_8px_0px_0px_#000] flex justify-between items-end flex-wrap gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-4xl font-black text-white tracking-tighter uppercase", children: "R&D Showcase" }), (0, jsx_runtime_1.jsx)("p", { className: "text-white font-bold mt-2 bg-black px-2 py-1 inline-block", children: "Active & Completed Innovations." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 text-black font-black bg-white px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_#000]", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Cpu, { size: 24, strokeWidth: 3 }), (0, jsx_runtime_1.jsxs)("span", { className: "uppercase", children: [PROJECTS.length, " PROJECTS"] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 gap-8 mt-4", children: PROJECTS.map(project => ((0, jsx_runtime_1.jsxs)("div", { className: `${project.color} border-4 border-black p-6 transition-all relative overflow-hidden shadow-[8px_8px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000]`, children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute -right-10 -bottom-10 opacity-10 transition-opacity text-black", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Cpu, { size: 200, strokeWidth: 1 }) }), (0, jsx_runtime_1.jsxs)("div", { className: "relative z-10", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-start mb-4 flex-wrap gap-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-3xl font-black text-black uppercase tracking-tight bg-white border-2 border-black px-3 py-1 shadow-[4px_4px_0px_0px_#000]", children: project.title }), (0, jsx_runtime_1.jsx)("span", { className: `px-4 py-1 text-sm font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_#000] bg-white text-black`, children: project.status })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-black font-bold text-lg mb-6 max-w-xl leading-relaxed bg-white/80 p-3 border-2 border-black backdrop-blur-sm", children: project.description }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-6 bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm mb-2 font-black uppercase", children: [(0, jsx_runtime_1.jsx)("span", { children: "Completion" }), (0, jsx_runtime_1.jsxs)("span", { children: [project.progress, "%"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "h-4 w-full bg-surface-alt border-2 border-black overflow-hidden shadow-inner", children: (0, jsx_runtime_1.jsx)("div", { className: "h-full bg-black transition-all duration-1000 ease-out", style: { width: `${project.progress}%` } }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-8", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm text-black mb-2 uppercase tracking-widest font-black bg-white inline-block px-2 border-2 border-black", children: "Tech Stack" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-3 mt-2", children: project.techStack.map(tech => ((0, jsx_runtime_1.jsx)("span", { className: "bg-white px-4 py-2 border-2 border-black text-sm font-bold text-black shadow-[2px_2px_0px_0px_#000] uppercase", children: tech }, tech))) })] }), (0, jsx_runtime_1.jsxs)("a", { href: project.repo, target: "_blank", rel: "noreferrer", className: "flex items-center gap-2 border-4 border-black bg-white px-6 py-3 text-black font-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none uppercase tracking-wider", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.GitBranch, { size: 20, strokeWidth: 3 }), (0, jsx_runtime_1.jsx)("span", { children: "View Repo" }), (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, { size: 18, strokeWidth: 3 })] })] })] })] }, project.id))) })] }));
}

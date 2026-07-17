"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamWindow = TeamWindow;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const getLinkedInUsername = (url) => {
    if (!url)
        return '';
    const match = url.match(/linkedin\.com\/in\/([^\/]+)/);
    return match ? match[1] : '';
};
const TEAM_CATEGORIES = [
    {
        title: "Founders & Leads",
        members: [
            { id: 'komal', name: 'Komal Raj', role: 'Founder & Lead', skills: ['Leadership', 'Management'], color: 'bg-primary-red', linkedin: 'https://www.linkedin.com/in/komal-raj-4b2587200/' },
            { id: 'nitish', name: 'Nitish Rajak', role: 'Founder & Lead', skills: ['Leadership', 'Operations'], color: 'bg-primary-cyan', linkedin: 'https://www.linkedin.com/in/nitish-rajak-09a6b332a/' },
            { id: 'agam', name: 'Agam Patel', role: 'Founder & Lead', skills: ['Leadership', 'Strategy'], color: 'bg-primary-yellow', linkedin: 'https://www.linkedin.com/in/agam-patel-1005b932a/' },
            { id: 'deepak', name: 'Deepak Chakrawarti', role: 'Lead', skills: ['Leadership', 'Vision'], color: 'bg-primary-green', linkedin: 'https://www.linkedin.com/in/deepak-chakrawarti-615830332/' },
        ]
    },
    {
        title: "Technical Co-Leads & Mentors",
        description: "Conduct technical sessions, prepare roadmaps, mentor members, guide projects, and lead hackathons.",
        members: [
            { id: 'abhinav', name: 'Abhinav Kumar Rath', role: 'Technical Co-Lead', skills: ['Engineering', 'Hackathons'], color: 'bg-primary-red', linkedin: 'https://www.linkedin.com/in/abhinavkumarrath' },
            { id: 'utkarsh', name: 'Utkarsh Trivedi', role: 'Technical Co-Lead', skills: ['Mentorship', 'Architecture'], color: 'bg-primary-cyan', linkedin: 'https://www.linkedin.com/in/utkarsh-trivedi-6a2165329/' },
        ]
    },
    {
        title: "Media",
        members: [
            { id: 'atharv', name: 'Atharva Sahu', role: 'Media Lead', skills: ['Photography', 'Videography', 'Editing'], color: 'bg-primary-yellow', linkedin: 'https://www.linkedin.com/in/atharva-sahu-228a11346/' },
            { id: 'samarth', name: 'Samarth', role: 'Media Lead', skills: ['Videography', 'Social'], color: 'bg-primary-green' },
        ],
        vacant: 1
    },
    {
        title: "Graphics",
        vacant: 2,
        members: []
    },
    {
        title: "Web/App",
        vacant: 2,
        members: []
    },
    {
        title: "Events & Operations",
        vacant: 2,
        members: []
    },
    {
        title: "Coordinators",
        description: "Support the core team, manage logistics, and help execute club initiatives seamlessly.",
        vacant: 2,
        members: []
    }
];
const APPLY_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSdSnWBCx4_4blbQ0Ctmb3O11EqmzCqurnkhiZb_b12Ww5jhFA/viewform";
function TeamWindow() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-6 sm:gap-10 font-sans p-3 sm:p-6 bg-surface-alt h-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-white border-4 border-black p-4 sm:p-6 shadow-[8px_8px_0px_0px_#000]", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-4xl font-black uppercase tracking-tighter", children: "Meet The Crew" }), (0, jsx_runtime_1.jsx)("p", { className: "font-bold text-gray-700 mt-2", children: "The brains behind SmartSphere." })] }), TEAM_CATEGORIES.map((category, idx) => ((0, jsx_runtime_1.jsxs)("div", { className: "mb-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-6 border-l-8 border-black pl-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-black text-black tracking-tight uppercase", children: category.title }), category.description && ((0, jsx_runtime_1.jsx)("p", { className: "text-black font-bold mt-2 text-sm max-w-2xl bg-white border-2 border-black inline-block px-3 py-1 shadow-[2px_2px_0px_0px_#000]", children: category.description }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [category.members.map((member) => {
                                const linkedinUsername = getLinkedInUsername(member.linkedin);
                                const avatarUrl = linkedinUsername
                                    ? `https://unavatar.io/linkedin/${linkedinUsername}?fallback=https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`
                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff&size=200&bold=true`;
                                return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white border-4 border-black p-6 flex flex-col hover:bg-surface-alt transition-all shadow-[8px_8px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-6 mb-6", children: [(0, jsx_runtime_1.jsx)("div", { className: `w-20 h-20 border-4 border-black ${member.color} p-1 shadow-[4px_4px_0px_0px_#000] flex-shrink-0`, children: (0, jsx_runtime_1.jsx)("img", { src: avatarUrl, alt: member.name, className: "w-full h-full object-cover bg-white border-2 border-black", onError: (e) => {
                                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff&size=200&bold=true`;
                                                        } }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-2xl font-black text-black leading-tight uppercase tracking-tight", children: member.name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 items-center mt-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "bg-black text-white px-2 py-1 text-xs font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_#000]", children: member.role }), member.linkedin && ((0, jsx_runtime_1.jsx)("a", { href: member.linkedin, target: "_blank", rel: "noopener noreferrer", className: "bg-[#0A66C2] text-white p-1 border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all", title: `Connect with ${member.name} on LinkedIn`, children: (0, jsx_runtime_1.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }), (0, jsx_runtime_1.jsx)("rect", { width: "4", height: "12", x: "2", y: "9" }), (0, jsx_runtime_1.jsx)("circle", { cx: "4", cy: "4", r: "2" })] }) }))] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2 mt-auto pt-4 border-t-4 border-black", children: member.skills.map((skill) => ((0, jsx_runtime_1.jsx)("span", { className: "bg-white px-3 py-1 text-xs font-bold text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] uppercase", children: skill }, skill))) })] }, member.id));
                            }), category.vacant && Array.from({ length: category.vacant }).map((_, vIdx) => ((0, jsx_runtime_1.jsxs)("div", { className: "border-4 border-dashed border-black bg-white p-8 flex flex-col items-center justify-center text-center hover:bg-primary-yellow transition-all group cursor-pointer shadow-[8px_8px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000]", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-black text-black mb-2 uppercase tracking-wider", children: "Vacant Position" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-bold text-gray-700 mb-6", children: "Join the Core Team" }), (0, jsx_runtime_1.jsxs)("a", { href: APPLY_LINK, target: "_blank", rel: "noopener noreferrer", className: "bg-primary-green border-4 border-black text-black px-6 py-3 text-sm font-black flex items-center gap-2 transition-all shadow-[4px_4px_0px_0px_#000] group-hover:bg-white uppercase tracking-widest", children: [(0, jsx_runtime_1.jsx)("span", { children: "Apply Now" }), (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, { size: 18, strokeWidth: 3 })] })] }, `vacant-${vIdx}`)))] })] }, idx)))] }));
}

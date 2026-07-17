"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateModal = CertificateModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const html_to_image_1 = require("html-to-image");
const jspdf_1 = require("jspdf");
const lucide_react_1 = require("lucide-react");
function CertificateModal({ isOpen, onClose, userName, certificate }) {
    const certificateRef = (0, react_1.useRef)(null);
    const [isDownloading, setIsDownloading] = (0, react_1.useState)(false);
    if (!isOpen)
        return null;
    const handleDownload = async () => {
        if (!certificateRef.current)
            return;
        setIsDownloading(true);
        // Temporarily remove transform to prevent offset/blank bugs
        const wrapper = certificateRef.current.parentElement;
        const originalTransform = wrapper ? wrapper.style.transform : '';
        if (wrapper)
            wrapper.style.transform = 'none';
        try {
            const dataUrl = await (0, html_to_image_1.toPng)(certificateRef.current, {
                quality: 1.0,
                pixelRatio: 2,
                backgroundColor: '#0f172a',
                style: {
                    transform: 'none' // Ensure no internal scaling issues during capture
                }
            });
            const pdf = new jspdf_1.jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [1024, 720]
            });
            pdf.addImage(dataUrl, 'PNG', 0, 0, 1024, 720);
            pdf.save(`${userName.replace(/\s+/g, '_')}_Certificate.pdf`);
        }
        catch (err) {
            console.error("Error generating PDF:", err);
            alert("Failed to generate PDF. Please try again.");
        }
        finally {
            if (wrapper)
                wrapper.style.transform = originalTransform;
            setIsDownloading(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "fixed inset-0 z-[100] flex items-start justify-center bg-black/95 p-4 md:p-8 overflow-y-auto custom-scrollbar", children: [(0, jsx_runtime_1.jsx)("style", { children: `@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');` }), (0, jsx_runtime_1.jsxs)("div", { className: "relative flex flex-col items-center w-full min-h-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full max-w-[1024px] flex justify-between items-center mb-6 shrink-0", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-white font-black text-xl tracking-widest uppercase text-primary-cyan drop-shadow-md", children: "Certificate Preview" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4", children: [(0, jsx_runtime_1.jsxs)("button", { onClick: handleDownload, disabled: isDownloading, className: "flex items-center gap-2 bg-gradient-to-r from-primary-cyan to-blue-500 text-white px-6 py-2 rounded font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(0,255,255,0.8)] transition-all disabled:opacity-50", children: [isDownloading ? (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "animate-spin", size: 20 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Download, { size: 20 }), isDownloading ? 'Generating...' : 'Download PDF'] }), (0, jsx_runtime_1.jsx)("button", { onClick: onClose, className: "p-2 bg-white/10 rounded text-white hover:bg-white/20 transition-colors", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 24 }) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "shrink-0 origin-top flex items-center justify-center pb-12 transition-transform", style: { transform: 'scale(min(1, calc((100vw - 40px) / 1024)))' }, children: (0, jsx_runtime_1.jsxs)("div", { ref: certificateRef, className: "w-[1024px] h-[720px] relative p-[40px] bg-slate-900 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] shrink-0", style: { fontFamily: "'Inter', sans-serif" }, children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-[20px] border-[3px] border-[#d4af37] opacity-80 pointer-events-none z-10" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-[28px] border-[1px] border-[#d4af37] opacity-50 pointer-events-none z-10" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-primary-cyan/10 rounded-full blur-[100px] pointer-events-none" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute top-[30px] left-[30px] w-[40px] h-[40px] border-t-[3px] border-l-[3px] border-[#d4af37] z-20" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute top-[30px] right-[30px] w-[40px] h-[40px] border-t-[3px] border-r-[3px] border-[#d4af37] z-20" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-[30px] left-[30px] w-[40px] h-[40px] border-b-[3px] border-l-[3px] border-[#d4af37] z-20" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-[30px] right-[30px] w-[40px] h-[40px] border-b-[3px] border-r-[3px] border-[#d4af37] z-20" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative z-30 w-full h-full flex flex-col items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-between items-center px-12 pt-6", children: [(0, jsx_runtime_1.jsx)("img", { src: "/ggits.png", alt: "College Logo", className: "h-[90px] object-contain drop-shadow-xl" }), (0, jsx_runtime_1.jsx)("img", { src: "/logo.jpg", alt: "SmartSphere Logo", className: "h-[90px] object-contain drop-shadow-xl rounded-xl" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center flex-1 w-full px-20 text-center", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-6xl font-serif text-[#d4af37] tracking-wider mb-6 drop-shadow-lg", style: { fontVariant: 'small-caps' }, children: "Certificate of Achievement" }), (0, jsx_runtime_1.jsx)("p", { className: "text-[#94a3b8] tracking-[0.3em] uppercase text-sm mb-12", children: "This is proudly presented to" }), (0, jsx_runtime_1.jsx)("div", { className: "relative w-full max-w-[700px] flex justify-center border-b border-[#334155] pb-6 mb-10", children: (0, jsx_runtime_1.jsx)("h2", { className: "text-6xl font-serif italic text-white tracking-widest drop-shadow-md", children: userName }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-[#cbd5e1] text-lg font-light max-w-[800px] leading-relaxed mb-6 uppercase tracking-[0.2em]", children: "For outstanding participation and successfully achieving the title of" }), (0, jsx_runtime_1.jsx)("div", { className: "border-y border-[#334155]/50 py-4 w-full max-w-[600px] mb-6", children: (0, jsx_runtime_1.jsx)("span", { className: "block text-4xl font-serif font-bold text-[#d4af37] tracking-wider uppercase drop-shadow-lg", children: certificate.title }) }), certificate.occasion && ((0, jsx_runtime_1.jsxs)("p", { className: "text-[#94a3b8] italic text-xl max-w-[700px] font-serif", children: ["\"", certificate.occasion, "\""] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-between items-end px-20 pb-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center w-64", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-[#e2e8f0] text-xl mb-3 font-serif italic", children: certificate.date }), (0, jsx_runtime_1.jsx)("div", { className: "w-full border-t border-[#475569] pt-3 text-center", children: (0, jsx_runtime_1.jsx)("span", { className: "text-[#94a3b8] text-xs uppercase tracking-[0.2em]", children: "Date of Award" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center w-64", children: [(0, jsx_runtime_1.jsx)("span", { id: "signature-text", className: "text-6xl mb-2 -rotate-6 opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pt-4 pb-2 px-2 inline-block leading-none", style: {
                                                                fontFamily: "'Great Vibes', cursive",
                                                                background: "linear-gradient(135deg, #bf953f 0%, #fcf6ba 40%, #b38728 80%, #fbf5b7 100%)",
                                                                WebkitBackgroundClip: "text",
                                                                WebkitTextFillColor: "transparent"
                                                            }, children: "SmartSphere" }), (0, jsx_runtime_1.jsx)("div", { className: "w-full border-t border-[#475569] pt-3 text-center", children: (0, jsx_runtime_1.jsx)("span", { className: "text-[#94a3b8] text-xs uppercase tracking-[0.2em]", children: "SmartSphere Founder" }) })] })] })] })] }) })] })] }));
}

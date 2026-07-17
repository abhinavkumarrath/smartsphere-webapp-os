"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginScreen = LoginScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const AuthContext_1 = require("./AuthContext");
function LoginScreen({ onLogin }) {
    const [isVerifying, setIsVerifying] = (0, react_1.useState)(false);
    const { signInWithGoogle } = (0, AuthContext_1.useAuth)();
    const handleGoogleLogin = async () => {
        setIsVerifying(true);
        try {
            await signInWithGoogle();
            // Simulate small delay for aesthetics before unlocking OS
            setTimeout(() => {
                onLogin();
            }, 800);
        }
        catch (err) {
            console.error('Login Failed', err);
            setIsVerifying(false);
        }
    };
    const handleGuestAccess = () => {
        setIsVerifying(true);
        setTimeout(() => {
            onLogin(); // Simply calls onLogin without setting any auth context
        }, 800);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-background z-[50] flex flex-col items-center justify-center p-4 sm:p-6 font-sans bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwgMCwgMCwgMC4wNSkiLz48L3N2Zz4=')]", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full max-w-sm bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_#000] flex flex-col items-center transform transition-transform", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-24 h-24 border-4 border-black bg-primary-yellow p-1 shadow-[4px_4px_0px_0px_#000] mb-6 overflow-hidden", children: (0, jsx_runtime_1.jsx)("img", { src: "/logo.jpg", alt: "Logo", className: "w-full h-full object-cover border-2 border-black" }) }), (0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-black text-black tracking-tight mb-1 uppercase", children: "SmartSphere" }), (0, jsx_runtime_1.jsx)("p", { className: "text-text-secondary font-bold text-sm mb-8 uppercase tracking-widest", children: "System Locked" }), isVerifying ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center h-32 gap-4 w-full", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "animate-spin text-primary-cyan", size: 40, strokeWidth: 3 }), (0, jsx_runtime_1.jsx)("span", { className: "font-bold uppercase tracking-widest text-sm", children: "Authenticating..." })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-6 w-full relative", children: [(0, jsx_runtime_1.jsxs)("button", { onClick: handleGuestAccess, className: "w-full flex items-center justify-center gap-3 bg-primary-cyan border-4 border-black py-4 font-black text-lg shadow-[4px_4px_0px_0px_#000] hover:bg-white active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase tracking-wider", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.UserCircle2, { strokeWidth: 3 }), "Guest Access"] }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-1 flex-1 bg-black" }), (0, jsx_runtime_1.jsx)("span", { className: "font-black text-sm uppercase", children: "OR" }), (0, jsx_runtime_1.jsx)("div", { className: "h-1 flex-1 bg-black" })] }), (0, jsx_runtime_1.jsxs)("button", { onClick: handleGoogleLogin, className: "w-full flex items-center justify-center gap-3 bg-white border-4 border-black py-3 font-black text-lg shadow-[4px_4px_0px_0px_#000] hover:bg-surface-alt active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all", children: [(0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 24 24", width: "24", height: "24", xmlns: "http://www.w3.org/2000/svg", children: (0, jsx_runtime_1.jsxs)("g", { transform: "matrix(1, 0, 0, 1, 27.009001, -39.238998)", children: [(0, jsx_runtime_1.jsx)("path", { fill: "#4285F4", d: "M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" }), (0, jsx_runtime_1.jsx)("path", { fill: "#34A853", d: "M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" }), (0, jsx_runtime_1.jsx)("path", { fill: "#FBBC05", d: "M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" }), (0, jsx_runtime_1.jsx)("path", { fill: "#EA4335", d: "M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" })] }) }), "Sign in with Google"] })] }))] }) }));
}

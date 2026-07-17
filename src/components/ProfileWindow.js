"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileWindow = ProfileWindow;
const jsx_runtime_1 = require("react/jsx-runtime");
const AuthContext_1 = require("./AuthContext");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const firebase_1 = require("../lib/firebase");
const firestore_1 = require("firebase/firestore");
const AdminDashboard_1 = require("./AdminDashboard");
const CertificateModal_1 = require("./CertificateModal");
function getIconComponent(iconName, className) {
    switch (iconName) {
        case 'Terminal': return (0, jsx_runtime_1.jsx)(lucide_react_1.Terminal, { className: className });
        case 'Cpu': return (0, jsx_runtime_1.jsx)(lucide_react_1.Cpu, { className: className });
        case 'Code2': return (0, jsx_runtime_1.jsx)(lucide_react_1.Code2, { className: className });
        default: return (0, jsx_runtime_1.jsx)(lucide_react_1.Award, { className: className });
    }
}
function ProfileWindow() {
    const { user, logout, isAuthenticated, signInWithGoogle } = (0, AuthContext_1.useAuth)();
    const [isVerifying, setIsVerifying] = (0, react_1.useState)(false);
    const [certificates, setCertificates] = (0, react_1.useState)([]);
    const [isLoadingCerts, setIsLoadingCerts] = (0, react_1.useState)(true);
    const [selectedCertificate, setSelectedCertificate] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        async function fetchCerts() {
            if (!user)
                return;
            try {
                const certsRef = (0, firestore_1.collection)(firebase_1.db, 'users', user.id, 'certificates');
                const q = (0, firestore_1.query)(certsRef, (0, firestore_1.orderBy)('createdAt', 'desc'));
                const querySnapshot = await (0, firestore_1.getDocs)(q);
                const fetchedCerts = [];
                querySnapshot.forEach((docSnap) => {
                    fetchedCerts.push({ id: docSnap.id, ...docSnap.data() });
                });
                setCertificates(fetchedCerts);
            }
            catch (err) {
                console.error("Failed to fetch certificates", err);
            }
            finally {
                setIsLoadingCerts(false);
            }
        }
        if (isAuthenticated && user) {
            fetchCerts();
        }
    }, [user, isAuthenticated]);
    const handleGoogleLogin = async () => {
        setIsVerifying(true);
        try {
            await signInWithGoogle();
            setIsVerifying(false);
        }
        catch (err) {
            console.error('Login Failed', err);
            setIsVerifying(false);
        }
    };
    const handleDeleteCertificate = async (certId) => {
        if (!user)
            return;
        if (!confirm('Are you sure you want to delete this certificate?'))
            return;
        try {
            await (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.db, 'users', user.id, 'certificates', certId));
            setCertificates(prev => prev.filter(c => c.id !== certId));
        }
        catch (err) {
            console.error("Failed to delete certificate", err);
            alert("Failed to delete certificate.");
        }
    };
    if (!isAuthenticated || !user) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col h-full bg-white font-sans border-4 border-black", children: [(0, jsx_runtime_1.jsxs)("div", { className: "p-6 bg-primary-cyan border-b-4 border-black", children: [(0, jsx_runtime_1.jsxs)("h2", { className: "text-3xl font-black uppercase flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.UserCircle2, { size: 32 }), " User Authentication"] }), (0, jsx_runtime_1.jsx)("p", { className: "font-bold text-black mt-2", children: "Login to access your club profile and certificates." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex flex-col items-center justify-center p-8 gap-6 bg-surface-alt", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-24 h-24 bg-gray-200 border-4 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center mb-4", children: (0, jsx_runtime_1.jsx)(lucide_react_1.UserCircle2, { size: 64, className: "text-gray-400" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4 items-center w-full max-w-sm", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-bold text-lg text-center text-gray-700", children: "Please authenticate using your Google Account." }), isVerifying ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center h-20 gap-4 w-full my-4", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "animate-spin text-primary-cyan", size: 32, strokeWidth: 3 }), (0, jsx_runtime_1.jsx)("span", { className: "font-bold uppercase tracking-widest text-xs", children: "Authenticating..." })] })) : ((0, jsx_runtime_1.jsxs)("button", { onClick: handleGoogleLogin, className: "w-full flex items-center justify-center gap-3 bg-white border-4 border-black py-3 mt-4 font-black text-lg shadow-[4px_4px_0px_0px_#000] hover:bg-surface-alt active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all", children: [(0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 24 24", width: "24", height: "24", xmlns: "http://www.w3.org/2000/svg", children: (0, jsx_runtime_1.jsxs)("g", { transform: "matrix(1, 0, 0, 1, 27.009001, -39.238998)", children: [(0, jsx_runtime_1.jsx)("path", { fill: "#4285F4", d: "M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" }), (0, jsx_runtime_1.jsx)("path", { fill: "#34A853", d: "M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" }), (0, jsx_runtime_1.jsx)("path", { fill: "#FBBC05", d: "M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" }), (0, jsx_runtime_1.jsx)("path", { fill: "#EA4335", d: "M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" })] }) }), "Sign in with Google"] }))] })] })] }));
    }
    const isCoreTeam = user.role === 'Founder' || user.role === 'Core Team Member';
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col h-full bg-surface-alt font-sans overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "p-6 bg-white border-b-4 border-black flex flex-col md:flex-row gap-6 md:items-center shadow-[0_4px_0_0_#000] z-10 relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-24 h-24 border-4 border-black shadow-[4px_4px_0px_0px_#000] bg-gray-100 overflow-hidden shrink-0", children: (0, jsx_runtime_1.jsx)("img", { src: user.picture, alt: user.name, className: "w-full h-full object-cover" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-4xl font-black uppercase tracking-tight", children: user.name }), (0, jsx_runtime_1.jsx)("p", { className: "font-bold text-gray-600 font-mono text-sm mt-1", children: user.email }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 mt-3 flex-wrap", children: [(0, jsx_runtime_1.jsx)("span", { className: `text-xs font-bold px-2 py-1 uppercase ${isCoreTeam ? 'bg-primary-yellow text-black' : 'bg-black text-white'}`, children: user.role }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-bold px-2 py-1 bg-white border-2 border-black uppercase shadow-[2px_2px_0px_0px_#000]", children: ["Member since ", user.joinDate] })] })] }), (0, jsx_runtime_1.jsx)("button", { onClick: logout, className: "p-3 bg-primary-red border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none self-start md:self-center", title: "Logout", children: (0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { className: "text-black", strokeWidth: 2.5 }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 overflow-y-auto custom-scrollbar p-6", children: [isCoreTeam && (0, jsx_runtime_1.jsx)(AdminDashboard_1.AdminDashboard, {}), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-2xl font-black uppercase mb-6 flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Award, { className: "text-primary-yellow", size: 28 }), " Club Certificates"] }), isLoadingCerts ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000]", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "animate-spin text-primary-cyan", size: 24 }), (0, jsx_runtime_1.jsx)("span", { className: "font-bold uppercase tracking-widest text-sm", children: "Fetching certificates..." })] })) : certificates.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "p-8 bg-white border-4 border-black border-dashed flex flex-col items-center justify-center gap-4 text-gray-500", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Award, { size: 48, className: "opacity-50" }), (0, jsx_runtime_1.jsx)("p", { className: "font-bold uppercase tracking-widest text-center", children: "No certificates yet." })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-6", children: certificates.map(cert => ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-4 flex gap-4 items-center group hover:-translate-y-1 transition-transform", children: [(0, jsx_runtime_1.jsx)("div", { className: `w-16 h-16 border-4 border-black ${cert.color} flex items-center justify-center shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] shrink-0`, children: getIconComponent(cert.icon, cert.color.includes('white') ? 'text-black' : 'text-white') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 min-w-0", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-bold text-lg leading-tight truncate", children: cert.title }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-bold text-gray-500 mt-1 uppercase tracking-wider", children: cert.date })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setSelectedCertificate(cert), className: "p-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000] hover:bg-black hover:text-white transition-colors text-xs font-bold uppercase shrink-0", children: "View" }), isCoreTeam && ((0, jsx_runtime_1.jsx)("button", { onClick: () => handleDeleteCertificate(cert.id), className: "p-2 border-2 border-black bg-primary-red text-black shadow-[2px_2px_0px_0px_#000] hover:bg-black hover:text-white transition-colors flex items-center justify-center shrink-0", title: "Remove Certificate", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { size: 16 }) }))] })] }, cert.id))) }))] })] }), (0, jsx_runtime_1.jsx)(CertificateModal_1.CertificateModal, { isOpen: !!selectedCertificate, onClose: () => setSelectedCertificate(null), userName: user.name, certificate: selectedCertificate || { title: '', date: '', occasion: '' } })] }));
}

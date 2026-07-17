"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarApp = CalendarApp;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const firebase_1 = require("../lib/firebase");
const firestore_1 = require("firebase/firestore");
function CalendarApp() {
    const [events, setEvents] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        async function fetchEvents() {
            try {
                const eventsRef = (0, firestore_1.collection)(firebase_1.db, 'events');
                const q = (0, firestore_1.query)(eventsRef, (0, firestore_1.orderBy)('createdAt', 'desc'));
                const querySnapshot = await (0, firestore_1.getDocs)(q);
                const fetchedEvents = [];
                querySnapshot.forEach((docSnap) => {
                    fetchedEvents.push({ id: docSnap.id, ...docSnap.data() });
                });
                setEvents(fetchedEvents);
            }
            catch (err) {
                console.error("Failed to fetch events", err);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchEvents();
    }, []);
    const getGoogleCalendarUrl = (event) => {
        // Format date and time for Google Calendar (YYYYMMDDTHHmmssZ)
        // For simplicity, we create a URL with text, dates, and details
        // Create a date object from the event date and time
        try {
            const dateTimeString = `${event.date}T${event.time}:00`;
            const startDate = new Date(dateTimeString);
            // Assume event is 2 hours long
            const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
            const formatGCalDate = (date) => {
                return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
            };
            const dates = `${formatGCalDate(startDate)}/${formatGCalDate(endDate)}`;
            const details = `SmartSphere Club Event: ${event.type}`;
            const params = new URLSearchParams({
                action: 'TEMPLATE',
                text: event.title,
                dates: dates,
                details: details,
                location: event.location,
            });
            return `https://calendar.google.com/calendar/render?${params.toString()}`;
        }
        catch (err) {
            console.error("Date formatting error", err);
            // Fallback
            return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}`;
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "text-black h-full flex flex-col font-sans min-h-[400px] bg-white", children: [(0, jsx_runtime_1.jsxs)("div", { className: "p-6 pb-6 bg-primary-yellow border-b-4 border-black", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4 mb-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_#000]", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { size: 28, strokeWidth: 2.5 }) }), (0, jsx_runtime_1.jsx)("h2", { className: "text-4xl font-black tracking-tighter uppercase", children: "Events" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-black font-bold text-sm bg-white border-2 border-black inline-block px-3 py-1 shadow-[2px_2px_0px_0px_#000]", children: "Track club meetups and hackathons." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6 bg-surface-alt", children: [isLoading ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center gap-4 p-8 border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "animate-spin text-primary-cyan", size: 32 }), (0, jsx_runtime_1.jsx)("span", { className: "font-black text-xl uppercase", children: "Loading Events..." })] })) : events.map((event) => ((0, jsx_runtime_1.jsxs)("div", { className: `${event.color} border-4 border-black p-5 shadow-[8px_8px_0px_0px_#000] transition-all group relative`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-start mb-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-2xl font-black text-black bg-white border-2 border-black px-3 py-1 shadow-[4px_4px_0px_0px_#000] uppercase tracking-tight", children: event.title }), (0, jsx_runtime_1.jsx)("span", { className: "px-3 py-1 bg-black text-white border-2 border-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000]", children: event.type })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-black font-bold bg-white/80 p-4 border-4 border-black backdrop-blur-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { size: 18, strokeWidth: 2.5 }), (0, jsx_runtime_1.jsx)("span", { className: "uppercase", children: event.date })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { size: 18, strokeWidth: 2.5 }), (0, jsx_runtime_1.jsx)("span", { className: "uppercase", children: event.time })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 sm:col-span-2 pt-2 border-t-2 border-black/20", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { size: 18, strokeWidth: 2.5 }), (0, jsx_runtime_1.jsx)("span", { className: "uppercase", children: event.location })] })] }), (0, jsx_runtime_1.jsxs)("a", { href: getGoogleCalendarUrl(event), target: "_blank", rel: "noopener noreferrer", className: "mt-4 flex items-center justify-center gap-2 w-full bg-white border-4 border-black py-2 font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { size: 18, strokeWidth: 3 }), "Add to Google Calendar"] })] }, event.id))), !isLoading && events.length === 0 && ((0, jsx_runtime_1.jsx)("div", { className: "text-center font-black text-xl text-black mt-8 p-8 border-4 border-dashed border-black bg-white shadow-[8px_8px_0px_0px_#000] uppercase", children: "No upcoming events found." }))] })] }));
}

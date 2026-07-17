"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDashboard = AdminDashboard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const firebase_1 = require("../lib/firebase");
const firestore_1 = require("firebase/firestore");
const lucide_react_1 = require("lucide-react");
function AdminDashboard() {
    const [users, setUsers] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    const [successMsg, setSuccessMsg] = (0, react_1.useState)('');
    const [selectedUserId, setSelectedUserId] = (0, react_1.useState)('');
    const [certTitle, setCertTitle] = (0, react_1.useState)('');
    const [certDate, setCertDate] = (0, react_1.useState)('');
    const [certOccasion, setCertOccasion] = (0, react_1.useState)('');
    const [certIcon, setCertIcon] = (0, react_1.useState)('Award');
    const [certColor, setCertColor] = (0, react_1.useState)('bg-primary-yellow');
    // Event State
    const [eventTitle, setEventTitle] = (0, react_1.useState)('');
    const [eventDate, setEventDate] = (0, react_1.useState)('');
    const [eventTime, setEventTime] = (0, react_1.useState)('');
    const [eventLocation, setEventLocation] = (0, react_1.useState)('');
    const [eventType, setEventType] = (0, react_1.useState)('Meetup');
    const [eventColor, setEventColor] = (0, react_1.useState)('bg-primary-cyan');
    const [isSubmittingEvent, setIsSubmittingEvent] = (0, react_1.useState)(false);
    const [eventSuccessMsg, setEventSuccessMsg] = (0, react_1.useState)('');
    // Manage Events State
    const [events, setEvents] = (0, react_1.useState)([]);
    const [editingEventId, setEditingEventId] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        async function fetchUsers() {
            try {
                const querySnapshot = await (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, 'users'));
                const usersList = [];
                querySnapshot.forEach((docSnap) => {
                    usersList.push({ id: docSnap.id, ...docSnap.data() });
                });
                setUsers(usersList);
            }
            catch (err) {
                console.error("Failed to fetch users", err);
            }
        }
        async function fetchEvents() {
            try {
                const eventsRef = (0, firestore_1.collection)(firebase_1.db, 'events');
                const q = (0, firestore_1.query)(eventsRef, (0, firestore_1.orderBy)('createdAt', 'desc'));
                const querySnapshot = await (0, firestore_1.getDocs)(q);
                const eventsList = [];
                querySnapshot.forEach((docSnap) => {
                    eventsList.push({ id: docSnap.id, ...docSnap.data() });
                });
                setEvents(eventsList);
            }
            catch (err) {
                console.error("Failed to fetch events", err);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchUsers();
        fetchEvents();
    }, []);
    const handleAssignCertificate = async (e) => {
        e.preventDefault();
        if (!selectedUserId || !certTitle || !certDate)
            return;
        setIsSubmitting(true);
        setSuccessMsg('');
        try {
            const certRef = (0, firestore_1.collection)(firebase_1.db, 'users', selectedUserId, 'certificates');
            await (0, firestore_1.addDoc)(certRef, {
                title: certTitle,
                date: certDate,
                occasion: certOccasion,
                icon: certIcon,
                color: certColor,
                createdAt: new Date().toISOString()
            });
            setSuccessMsg(`Certificate assigned successfully!`);
            setCertTitle('');
            setCertDate('');
            setCertOccasion('');
            setTimeout(() => setSuccessMsg(''), 3000);
        }
        catch (err) {
            console.error("Failed to assign certificate", err);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleCreateEvent = async (e) => {
        e.preventDefault();
        if (!eventTitle || !eventDate || !eventTime || !eventLocation)
            return;
        setIsSubmittingEvent(true);
        setEventSuccessMsg('');
        try {
            if (editingEventId) {
                const eventRef = (0, firestore_1.doc)(firebase_1.db, 'events', editingEventId);
                await (0, firestore_1.updateDoc)(eventRef, {
                    title: eventTitle,
                    date: eventDate,
                    time: eventTime,
                    location: eventLocation,
                    type: eventType,
                    color: eventColor
                });
                setEventSuccessMsg(`Event updated successfully!`);
                setEvents(events.map(ev => ev.id === editingEventId ? {
                    ...ev, title: eventTitle, date: eventDate, time: eventTime, location: eventLocation, type: eventType, color: eventColor
                } : ev));
                setEditingEventId(null);
            }
            else {
                const eventsRef = (0, firestore_1.collection)(firebase_1.db, 'events');
                const newEvent = {
                    title: eventTitle,
                    date: eventDate,
                    time: eventTime,
                    location: eventLocation,
                    type: eventType,
                    color: eventColor,
                    createdAt: new Date().toISOString()
                };
                const docRef = await (0, firestore_1.addDoc)(eventsRef, newEvent);
                setEventSuccessMsg(`Event created successfully!`);
                setEvents([{ id: docRef.id, ...newEvent }, ...events]);
            }
            setEventTitle('');
            setEventDate('');
            setEventTime('');
            setEventLocation('');
            setTimeout(() => setEventSuccessMsg(''), 3000);
        }
        catch (err) {
            console.error("Failed to create event", err);
        }
        finally {
            setIsSubmittingEvent(false);
        }
    };
    const handleEditEvent = (event) => {
        setEventTitle(event.title);
        setEventDate(event.date);
        setEventTime(event.time);
        setEventLocation(event.location);
        setEventType(event.type);
        setEventColor(event.color);
        setEditingEventId(event.id);
        // Scroll to the event creation form
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };
    const handleDeleteEvent = async (eventId) => {
        if (!confirm("Are you sure you want to delete this event?"))
            return;
        try {
            await (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.db, 'events', eventId));
            setEvents(events.filter(ev => ev.id !== eventId));
        }
        catch (err) {
            console.error("Failed to delete event", err);
            alert("Failed to delete event");
        }
    };
    if (isLoading) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center p-6 border-4 border-black bg-surface-alt shadow-[4px_4px_0px_0px_#000] mb-8", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "animate-spin text-primary-cyan", size: 24 }), (0, jsx_runtime_1.jsx)("span", { className: "ml-2 font-bold uppercase", children: "Loading Users..." })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] mb-8 relative overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-black text-white p-3 flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Shield, { size: 20, className: "text-primary-yellow" }), (0, jsx_runtime_1.jsx)("h3", { className: "font-black uppercase tracking-widest text-sm", children: "Admin Dashboard" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-5", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-bold text-gray-600 mb-4 text-sm", children: "Assign a new certificate directly to a club member." }), successMsg && ((0, jsx_runtime_1.jsxs)("div", { className: "bg-primary-green border-2 border-black p-2 mb-4 flex items-center gap-2 font-bold text-sm shadow-[2px_2px_0px_0px_#000]", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, { size: 16 }), " ", successMsg] })), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleAssignCertificate, className: "flex flex-col gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block font-black text-xs uppercase tracking-wider mb-1", children: "Select Member" }), (0, jsx_runtime_1.jsxs)("select", { value: selectedUserId, onChange: (e) => setSelectedUserId(e.target.value), required: true, className: "w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]", children: [(0, jsx_runtime_1.jsx)("option", { value: "", disabled: true, children: "-- Choose a Member --" }), users.map(u => ((0, jsx_runtime_1.jsxs)("option", { value: u.id, children: [u.name, " (", u.email, ")"] }, u.id)))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block font-black text-xs uppercase tracking-wider mb-1", children: "Certificate Title" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: certTitle, onChange: (e) => setCertTitle(e.target.value), required: true, placeholder: "e.g. Hackathon Winner", className: "w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block font-black text-xs uppercase tracking-wider mb-1", children: "Date Achieved" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: certDate, onChange: (e) => setCertDate(e.target.value), required: true, placeholder: "e.g. Jan 2025", className: "w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]" })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block font-black text-xs uppercase tracking-wider mb-1", children: "Occasion / Reason" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: certOccasion, onChange: (e) => setCertOccasion(e.target.value), placeholder: "e.g. For outstanding performance in Web Dev...", className: "w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block font-black text-xs uppercase tracking-wider mb-1", children: "Icon Style" }), (0, jsx_runtime_1.jsxs)("select", { value: certIcon, onChange: (e) => setCertIcon(e.target.value), className: "w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]", children: [(0, jsx_runtime_1.jsx)("option", { value: "Award", children: "Award (General)" }), (0, jsx_runtime_1.jsx)("option", { value: "Terminal", children: "Terminal (Coding)" }), (0, jsx_runtime_1.jsx)("option", { value: "Code2", children: "Code (Web Dev)" }), (0, jsx_runtime_1.jsx)("option", { value: "Cpu", children: "CPU (Hardware/IoT)" })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block font-black text-xs uppercase tracking-wider mb-1", children: "Color Theme" }), (0, jsx_runtime_1.jsxs)("select", { value: certColor, onChange: (e) => setCertColor(e.target.value), className: "w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]", children: [(0, jsx_runtime_1.jsx)("option", { value: "bg-primary-yellow", children: "Yellow" }), (0, jsx_runtime_1.jsx)("option", { value: "bg-primary-cyan", children: "Cyan" }), (0, jsx_runtime_1.jsx)("option", { value: "bg-primary-green", children: "Green" }), (0, jsx_runtime_1.jsx)("option", { value: "bg-primary-red", children: "Red" })] })] })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: isSubmitting, className: "w-full mt-2 bg-black text-white border-4 border-black py-3 font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#primary-cyan] hover:bg-gray-800 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 flex items-center justify-center", children: isSubmitting ? (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "animate-spin" }) : "Assign Certificate" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-black text-white p-3 flex items-center gap-2 border-t-4 border-black mt-8", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CalendarPlus, { size: 20, className: "text-primary-cyan" }), (0, jsx_runtime_1.jsx)("h3", { className: "font-black uppercase tracking-widest text-sm", children: editingEventId ? "Edit Club Event" : "Create Club Event" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-5", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-bold text-gray-600 mb-4 text-sm", children: editingEventId ? "Update the details of the selected event." : "Publish a new event to the club calendar." }), eventSuccessMsg && ((0, jsx_runtime_1.jsxs)("div", { className: "bg-primary-green border-2 border-black p-2 mb-4 flex items-center gap-2 font-bold text-sm shadow-[2px_2px_0px_0px_#000]", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, { size: 16 }), " ", eventSuccessMsg] })), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleCreateEvent, className: "flex flex-col gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block font-black text-xs uppercase tracking-wider mb-1", children: "Event Title" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: eventTitle, onChange: (e) => setEventTitle(e.target.value), required: true, placeholder: "e.g. SmartSphere Orientation", className: "w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block font-black text-xs uppercase tracking-wider mb-1", children: "Date" }), (0, jsx_runtime_1.jsx)("input", { type: "date", value: eventDate, onChange: (e) => setEventDate(e.target.value), required: true, className: "w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block font-black text-xs uppercase tracking-wider mb-1", children: "Time" }), (0, jsx_runtime_1.jsx)("input", { type: "time", value: eventTime, onChange: (e) => setEventTime(e.target.value), required: true, className: "w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]" })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block font-black text-xs uppercase tracking-wider mb-1", children: "Location" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: eventLocation, onChange: (e) => setEventLocation(e.target.value), required: true, placeholder: "e.g. Main Auditorium", className: "w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block font-black text-xs uppercase tracking-wider mb-1", children: "Event Type" }), (0, jsx_runtime_1.jsxs)("select", { value: eventType, onChange: (e) => setEventType(e.target.value), className: "w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]", children: [(0, jsx_runtime_1.jsx)("option", { value: "Meetup", children: "Meetup" }), (0, jsx_runtime_1.jsx)("option", { value: "Hackathon", children: "Hackathon" }), (0, jsx_runtime_1.jsx)("option", { value: "Workshop", children: "Workshop" }), (0, jsx_runtime_1.jsx)("option", { value: "Competition", children: "Competition" })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block font-black text-xs uppercase tracking-wider mb-1", children: "Color Theme" }), (0, jsx_runtime_1.jsxs)("select", { value: eventColor, onChange: (e) => setEventColor(e.target.value), className: "w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]", children: [(0, jsx_runtime_1.jsx)("option", { value: "bg-primary-cyan", children: "Cyan" }), (0, jsx_runtime_1.jsx)("option", { value: "bg-primary-yellow", children: "Yellow" }), (0, jsx_runtime_1.jsx)("option", { value: "bg-primary-red", children: "Red" }), (0, jsx_runtime_1.jsx)("option", { value: "bg-primary-green", children: "Green" })] })] })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: isSubmittingEvent, className: `w-full mt-2 text-white border-4 border-black py-3 font-black uppercase tracking-widest hover:bg-gray-800 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 flex items-center justify-center ${editingEventId ? 'bg-primary-yellow text-black shadow-[4px_4px_0px_0px_#000] hover:text-white' : 'bg-black shadow-[4px_4px_0px_0px_#primary-cyan]'}`, children: isSubmittingEvent ? (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "animate-spin" }) : (editingEventId ? "Update Event" : "Publish Event") }), editingEventId && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                    setEditingEventId(null);
                                    setEventTitle('');
                                    setEventDate('');
                                    setEventTime('');
                                    setEventLocation('');
                                }, className: "w-full bg-white text-black border-4 border-black py-3 font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:bg-gray-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center", children: "Cancel Edit" }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-black text-white p-3 flex items-center gap-2 border-y-4 border-black mt-8", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Shield, { size: 20, className: "text-primary-red" }), (0, jsx_runtime_1.jsx)("h3", { className: "font-black uppercase tracking-widest text-sm", children: "Manage Events" })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-5", children: events.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-gray-500 font-bold italic", children: "No events found." })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-4", children: events.map((ev) => ((0, jsx_runtime_1.jsxs)("div", { className: "border-2 border-black p-4 flex justify-between items-center shadow-[4px_4px_0px_0px_#000]", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-black uppercase", children: ev.title }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs font-bold text-gray-600", children: [ev.date, " @ ", ev.time, " | ", ev.location] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => handleEditEvent(ev), className: "p-2 bg-primary-yellow border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-black hover:text-white transition-colors", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit2, { size: 16 }) }), (0, jsx_runtime_1.jsx)("button", { onClick: () => handleDeleteEvent(ev.id), className: "p-2 bg-primary-red border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-black hover:text-white transition-colors text-white", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { size: 16 }) })] })] }, ev.id))) })) })] }));
}

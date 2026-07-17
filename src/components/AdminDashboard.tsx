import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { Shield, Loader2, CheckCircle2, CalendarPlus, Trash2, Edit2 } from 'lucide-react';
import type { UserProfile } from './AuthContext';

export function AdminDashboard() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [selectedUserId, setSelectedUserId] = useState('');
  const [certTitle, setCertTitle] = useState('');
  const [certDate, setCertDate] = useState('');
  const [certOccasion, setCertOccasion] = useState('');
  const [certIcon, setCertIcon] = useState('Award');
  const [certColor, setCertColor] = useState('bg-primary-yellow');

  // Event State
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventType, setEventType] = useState('Meetup');
  const [eventColor, setEventColor] = useState('bg-primary-cyan');
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [eventSuccessMsg, setEventSuccessMsg] = useState('');
  
  // Manage Events State
  const [events, setEvents] = useState<any[]>([]);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList: UserProfile[] = [];
        querySnapshot.forEach((docSnap) => {
          usersList.push({ id: docSnap.id, ...docSnap.data() } as UserProfile);
        });
        setUsers(usersList);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    }

    async function fetchEvents() {
      try {
        const eventsRef = collection(db, 'events');
        const q = query(eventsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const eventsList: any[] = [];
        querySnapshot.forEach((docSnap) => {
          eventsList.push({ id: docSnap.id, ...docSnap.data() });
        });
        setEvents(eventsList);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
    fetchEvents();
  }, []);

  const handleAssignCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId || !certTitle || !certDate) return;

    setIsSubmitting(true);
    setSuccessMsg('');

    try {
      const certRef = collection(db, 'users', selectedUserId, 'certificates');
      await addDoc(certRef, {
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
    } catch (err) {
      console.error("Failed to assign certificate", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDate || !eventTime || !eventLocation) return;

    setIsSubmittingEvent(true);
    setEventSuccessMsg('');

    try {
      if (editingEventId) {
        const eventRef = doc(db, 'events', editingEventId);
        await updateDoc(eventRef, {
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
      } else {
        const eventsRef = collection(db, 'events');
        const newEvent = {
          title: eventTitle,
          date: eventDate,
          time: eventTime,
          location: eventLocation,
          type: eventType,
          color: eventColor,
          createdAt: new Date().toISOString()
        };
        const docRef = await addDoc(eventsRef, newEvent);
        setEventSuccessMsg(`Event created successfully!`);
        setEvents([{ id: docRef.id, ...newEvent }, ...events]);
      }
      
      setEventTitle('');
      setEventDate('');
      setEventTime('');
      setEventLocation('');
      
      setTimeout(() => setEventSuccessMsg(''), 3000);
    } catch (err) {
      console.error("Failed to create event", err);
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  const handleEditEvent = (event: any) => {
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

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteDoc(doc(db, 'events', eventId));
      setEvents(events.filter(ev => ev.id !== eventId));
    } catch (err) {
      console.error("Failed to delete event", err);
      alert("Failed to delete event");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 border-4 border-black bg-surface-alt shadow-[4px_4px_0px_0px_#000] mb-8">
        <Loader2 className="animate-spin text-primary-cyan" size={24} />
        <span className="ml-2 font-bold uppercase">Loading Users...</span>
      </div>
    );
  }

  return (
    <div className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] mb-8 relative overflow-hidden">
      <div className="bg-black text-white p-3 flex items-center gap-2">
        <Shield size={20} className="text-primary-yellow" />
        <h3 className="font-black uppercase tracking-widest text-sm">Admin Dashboard</h3>
      </div>
      
      <div className="p-5">
        <p className="font-bold text-gray-600 mb-4 text-sm">Assign a new certificate directly to a club member.</p>
        
        {successMsg && (
          <div className="bg-primary-green border-2 border-black p-2 mb-4 flex items-center gap-2 font-bold text-sm shadow-[2px_2px_0px_0px_#000]">
            <CheckCircle2 size={16} /> {successMsg}
          </div>
        )}

        <form onSubmit={handleAssignCertificate} className="flex flex-col gap-4">
          <div>
            <label className="block font-black text-xs uppercase tracking-wider mb-1">Select Member</label>
            <select 
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              required
              className="w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]"
            >
              <option value="" disabled>-- Choose a Member --</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-black text-xs uppercase tracking-wider mb-1">Certificate Title</label>
              <input 
                type="text" 
                value={certTitle}
                onChange={(e) => setCertTitle(e.target.value)}
                required
                placeholder="e.g. Hackathon Winner"
                className="w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]"
              />
            </div>
            <div>
              <label className="block font-black text-xs uppercase tracking-wider mb-1">Date Achieved</label>
              <input 
                type="text" 
                value={certDate}
                onChange={(e) => setCertDate(e.target.value)}
                required
                placeholder="e.g. Jan 2025"
                className="w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]"
              />
            </div>
          </div>

          <div>
            <label className="block font-black text-xs uppercase tracking-wider mb-1">Occasion / Reason</label>
            <input 
              type="text" 
              value={certOccasion}
              onChange={(e) => setCertOccasion(e.target.value)}
              placeholder="e.g. For outstanding performance in Web Dev..."
              className="w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-black text-xs uppercase tracking-wider mb-1">Icon Style</label>
              <select 
                value={certIcon}
                onChange={(e) => setCertIcon(e.target.value)}
                className="w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]"
              >
                <option value="Award">Award (General)</option>
                <option value="Terminal">Terminal (Coding)</option>
                <option value="Code2">Code (Web Dev)</option>
                <option value="Cpu">CPU (Hardware/IoT)</option>
              </select>
            </div>
            <div>
              <label className="block font-black text-xs uppercase tracking-wider mb-1">Color Theme</label>
              <select 
                value={certColor}
                onChange={(e) => setCertColor(e.target.value)}
                className="w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]"
              >
                <option value="bg-primary-yellow">Yellow</option>
                <option value="bg-primary-cyan">Cyan</option>
                <option value="bg-primary-green">Green</option>
                <option value="bg-primary-red">Red</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-black text-white border-4 border-black py-3 font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#primary-cyan] hover:bg-gray-800 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 flex items-center justify-center"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Assign Certificate"}
          </button>
        </form>
      </div>
      
      {/* Event Creation Section */}
      <div className="bg-black text-white p-3 flex items-center gap-2 border-t-4 border-black mt-8">
        <CalendarPlus size={20} className="text-primary-cyan" />
        <h3 className="font-black uppercase tracking-widest text-sm">
          {editingEventId ? "Edit Club Event" : "Create Club Event"}
        </h3>
      </div>
      
      <div className="p-5">
        <p className="font-bold text-gray-600 mb-4 text-sm">
          {editingEventId ? "Update the details of the selected event." : "Publish a new event to the club calendar."}
        </p>
        
        {eventSuccessMsg && (
          <div className="bg-primary-green border-2 border-black p-2 mb-4 flex items-center gap-2 font-bold text-sm shadow-[2px_2px_0px_0px_#000]">
            <CheckCircle2 size={16} /> {eventSuccessMsg}
          </div>
        )}

        <form onSubmit={handleCreateEvent} className="flex flex-col gap-4">
          <div>
            <label className="block font-black text-xs uppercase tracking-wider mb-1">Event Title</label>
            <input 
              type="text" 
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              required
              placeholder="e.g. SmartSphere Orientation"
              className="w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-black text-xs uppercase tracking-wider mb-1">Date</label>
              <input 
                type="date" 
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
                className="w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]"
              />
            </div>
            <div>
              <label className="block font-black text-xs uppercase tracking-wider mb-1">Time</label>
              <input 
                type="time" 
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                required
                className="w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]"
              />
            </div>
          </div>

          <div>
            <label className="block font-black text-xs uppercase tracking-wider mb-1">Location</label>
            <input 
              type="text" 
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              required
              placeholder="e.g. Main Auditorium"
              className="w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-black text-xs uppercase tracking-wider mb-1">Event Type</label>
              <select 
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]"
              >
                <option value="Meetup">Meetup</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Workshop">Workshop</option>
                <option value="Competition">Competition</option>
              </select>
            </div>
            <div>
              <label className="block font-black text-xs uppercase tracking-wider mb-1">Color Theme</label>
              <select 
                value={eventColor}
                onChange={(e) => setEventColor(e.target.value)}
                className="w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]"
              >
                <option value="bg-primary-cyan">Cyan</option>
                <option value="bg-primary-yellow">Yellow</option>
                <option value="bg-primary-red">Red</option>
                <option value="bg-primary-green">Green</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmittingEvent}
            className={`w-full mt-2 text-white border-4 border-black py-3 font-black uppercase tracking-widest hover:bg-gray-800 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 flex items-center justify-center ${editingEventId ? 'bg-primary-yellow text-black shadow-[4px_4px_0px_0px_#000] hover:text-white' : 'bg-black shadow-[4px_4px_0px_0px_#primary-cyan]'}`}
          >
            {isSubmittingEvent ? <Loader2 className="animate-spin" /> : (editingEventId ? "Update Event" : "Publish Event")}
          </button>
          
          {editingEventId && (
            <button 
              type="button"
              onClick={() => {
                setEditingEventId(null);
                setEventTitle('');
                setEventDate('');
                setEventTime('');
                setEventLocation('');
              }}
              className="w-full bg-white text-black border-4 border-black py-3 font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:bg-gray-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* Manage Existing Events */}
      <div className="bg-black text-white p-3 flex items-center gap-2 border-y-4 border-black mt-8">
        <Shield size={20} className="text-primary-red" />
        <h3 className="font-black uppercase tracking-widest text-sm">Manage Events</h3>
      </div>
      
      <div className="p-5">
        {events.length === 0 ? (
          <p className="text-gray-500 font-bold italic">No events found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {events.map((ev) => (
              <div key={ev.id} className="border-2 border-black p-4 flex justify-between items-center shadow-[4px_4px_0px_0px_#000]">
                <div>
                  <h4 className="font-black uppercase">{ev.title}</h4>
                  <p className="text-xs font-bold text-gray-600">{ev.date} @ {ev.time} | {ev.location}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEditEvent(ev)}
                    className="p-2 bg-primary-yellow border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-black hover:text-white transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteEvent(ev.id)}
                    className="p-2 bg-primary-red border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-black hover:text-white transition-colors text-white"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

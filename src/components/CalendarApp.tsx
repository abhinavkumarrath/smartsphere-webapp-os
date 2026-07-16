import { Calendar, MapPin, Clock } from 'lucide-react';

export function CalendarApp() {
  const events = [
    {
      id: 1,
      title: "SmartSphere Orientation",
      date: "2026-08-01",
      time: "10:00 AM",
      location: "Main Auditorium",
      type: "Meetup",
      color: "bg-primary-cyan"
    },
    {
      id: 2,
      title: "Hack The Future 4.0",
      date: "2026-08-15",
      time: "09:00 AM",
      location: "Hardware Lab",
      type: "Hackathon",
      color: "bg-primary-red"
    },
    {
      id: 3,
      title: "AI & Robotics Workshop",
      date: "2026-08-22",
      time: "02:00 PM",
      location: "Lab 402",
      type: "Workshop",
      color: "bg-primary-yellow"
    }
  ];

  return (
    <div className="text-black h-full flex flex-col font-sans min-h-[400px] bg-white">
      <div className="p-6 pb-6 bg-primary-yellow border-b-4 border-black">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
            <Calendar size={28} strokeWidth={2.5} />
          </div>
          <h2 className="text-4xl font-black tracking-tighter uppercase">Events</h2>
        </div>
        <p className="text-black font-bold text-sm bg-white border-2 border-black inline-block px-3 py-1 shadow-[2px_2px_0px_0px_#000]">Track club meetups and hackathons.</p>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6 bg-surface-alt">
        {events.map((event) => (
          <div key={event.id} className={`${event.color} border-4 border-black p-5 shadow-[8px_8px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000] transition-all group relative`}>
            
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-black text-black bg-white border-2 border-black px-3 py-1 shadow-[4px_4px_0px_0px_#000] uppercase tracking-tight">{event.title}</h3>
              <span className="px-3 py-1 bg-black text-white border-2 border-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000]">
                {event.type}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-black font-bold bg-white/80 p-4 border-4 border-black backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Calendar size={18} strokeWidth={2.5} />
                <span className="uppercase">{event.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} strokeWidth={2.5} />
                <span className="uppercase">{event.time}</span>
              </div>
              <div className="flex items-center gap-3 sm:col-span-2 pt-2 border-t-2 border-black/20">
                <MapPin size={18} strokeWidth={2.5} />
                <span className="uppercase">{event.location}</span>
              </div>
            </div>
          </div>
        ))}
        
        {events.length === 0 && (
          <div className="text-center font-black text-xl text-black mt-8 p-8 border-4 border-dashed border-black bg-white shadow-[8px_8px_0px_0px_#000] uppercase">
            No upcoming events found.
          </div>
        )}
      </div>
    </div>
  );
}

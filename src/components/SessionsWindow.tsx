import { useState } from 'react';
import { Folder, FileCode2, Image as ImageIcon, ChevronRight } from 'lucide-react';

const SESSIONS = [
  {
    id: 1,
    title: 'Session 1: Introduction to Microcontrollers',
    date: '2023-09-10',
    description: 'Blinking LEDs, reading digital inputs, and understanding GPIOs on Arduino.',
    repo: 'github.com/smartsphere/session1-intro',
    driveLink: '#', // Replace with actual Google Drive link
    photos: 5
  },
  {
    id: 2,
    title: 'Session 2: Sensor Integration (Analog & Digital)',
    date: '2023-09-24',
    description: 'Interfacing ultrasonic sensors, LDRs, and basic I2C communication.',
    repo: 'github.com/smartsphere/session2-sensors',
    driveLink: '#', // Replace with actual Google Drive link
    photos: 12
  },
  {
    id: 3,
    title: 'Session 3: Wireless Communication (ESP32)',
    date: '2023-10-08',
    description: 'Setting up WiFi, creating a simple web server, and REST API basics.',
    repo: 'github.com/smartsphere/session3-wifi',
    driveLink: '#', // Replace with actual Google Drive link
    photos: 8
  },
  {
    id: 4,
    title: 'Session 4: MQTT & Cloud IoT Platforms',
    date: '2023-10-22',
    description: 'Publishing and subscribing to MQTT topics using AWS IoT Core.',
    repo: 'github.com/smartsphere/session4-mqtt',
    driveLink: '#', // Replace with actual Google Drive link
    photos: 15
  }
];

export function SessionsWindow() {
  const [activeSession, setActiveSession] = useState<number | null>(null);

  return (
    <div className="flex h-full min-h-[500px] font-sans bg-white">
      {/* Directory Sidebar */}
      <div className="w-1/3 border-r-4 border-black p-4 flex flex-col gap-3 overflow-y-auto custom-scrollbar bg-surface-alt">
        <h3 className="text-black mb-4 font-black uppercase tracking-wider text-sm flex items-center gap-2 bg-white border-2 border-black p-2 shadow-[2px_2px_0px_0px_#000]">
          <Folder size={18} strokeWidth={2.5} /> /var/log/sessions
        </h3>
        {SESSIONS.map(session => (
          <button
            key={session.id}
            onClick={() => setActiveSession(session.id)}
            className={`flex items-center gap-3 p-4 w-full text-left transition-all border-4 font-bold text-sm shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#000] ${
              activeSession === session.id 
                ? 'bg-primary-yellow border-black text-black translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_#000]' 
                : 'bg-white border-black text-black hover:bg-primary-cyan'
            }`}
          >
            <Folder size={20} strokeWidth={2.5} className="flex-shrink-0" />
            <span className="truncate flex-1">{session.title.split(':')[0]}</span>
            {activeSession === session.id && <ChevronRight size={18} strokeWidth={3} />}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="w-2/3 p-8 bg-white">
        {activeSession ? (
          <div className="flex flex-col h-full">
            {SESSIONS.filter(s => s.id === activeSession).map(session => (
              <div key={session.id} className="flex flex-col h-full">
                <h2 className="text-3xl font-black text-black mb-4 leading-tight uppercase">{session.title}</h2>
                <div className="inline-block bg-black text-white px-4 py-2 text-sm font-black mb-8 border-2 border-black shadow-[4px_4px_0px_0px_#000] w-max uppercase">
                  DATE: {session.date}
                </div>
                
                <div className="bg-primary-cyan border-4 border-black p-6 mb-8 text-black font-bold text-lg leading-relaxed shadow-[8px_8px_0px_0px_#000]">
                  {session.description}
                </div>

                <div className="grid grid-cols-2 gap-6 mt-auto">
                  <div className="bg-white border-4 border-black p-6 flex flex-col items-center justify-center gap-4 hover:bg-primary-yellow transition-all cursor-pointer shadow-[8px_8px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none">
                    <div className="bg-black p-4 text-white">
                      <FileCode2 size={32} strokeWidth={2.5} />
                    </div>
                    <span className="text-lg font-black text-black uppercase">Source Code</span>
                    <span className="text-sm font-bold text-gray-700 truncate w-full text-center px-2">{session.repo}</span>
                  </div>
                  
                  <a 
                    href={session.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border-4 border-black p-6 flex flex-col items-center justify-center gap-4 hover:bg-primary-red transition-all cursor-pointer shadow-[8px_8px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                  >
                    <div className="bg-black p-4 text-white">
                      <ImageIcon size={32} strokeWidth={2.5} />
                    </div>
                    <span className="text-lg font-black text-black uppercase">Photo Gallery</span>
                    <span className="text-sm font-bold text-gray-700">View Drive Folder</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-black text-xl font-black bg-surface-alt border-4 border-dashed border-black p-8 text-center uppercase tracking-widest shadow-[8px_8px_0px_0px_#000]">
            <div className="flex flex-col items-center gap-6">
              <Folder size={48} strokeWidth={2} />
              <p>Select a session<br/>directory</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

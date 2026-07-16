import { useState } from 'react';
import { Folder, FileCode2, Image as ImageIcon, ChevronRight } from 'lucide-react';
import sessionsManifest from '../data/sessions_manifest.json';

const SESSIONS = [
  {
    id: 1,
    title: 'Club Launch (16 May)',
    date: '16 May',
    description: 'The official launch event of the SmartSphere Club.',
    repo: null,
    driveLink: 'https://drive.google.com/drive/u/1/folders/1id9oryx_QlQISRzUMJXwKfILdYuL1Q-j',
    photos: 0
  },
  {
    id: 2,
    title: 'Session 1 (23 May)',
    date: '23 May',
    description: 'First technical session of the club.',
    repo: 'github.com/smartsphere/session1-intro',
    driveLink: 'https://drive.google.com/drive/u/1/folders/1id9oryx_QlQISRzUMJXwKfILdYuL1Q-j',
    photos: 0
  },
  {
    id: 3,
    title: 'Session 2 (30 May)',
    date: '30 May',
    description: 'Second technical session.',
    repo: 'github.com/smartsphere/session2-sensors',
    driveLink: 'https://drive.google.com/drive/u/1/folders/1id9oryx_QlQISRzUMJXwKfILdYuL1Q-j',
    photos: 0
  },
  {
    id: 4,
    title: 'Session 3 [PP] (6 Jun)',
    date: '6 Jun',
    description: 'Third technical session with project presentations.',
    repo: 'github.com/smartsphere/session3-wifi',
    driveLink: 'https://drive.google.com/drive/u/1/folders/1id9oryx_QlQISRzUMJXwKfILdYuL1Q-j',
    photos: 0
  },
  {
    id: 5,
    title: 'Session 4 [PP] (13 Jun)',
    date: '13 Jun',
    description: 'Fourth technical session with project presentations.',
    repo: 'github.com/smartsphere/session4-mqtt',
    driveLink: 'https://drive.google.com/drive/u/1/folders/1id9oryx_QlQISRzUMJXwKfILdYuL1Q-j',
    photos: 0
  },
  {
    id: 6,
    title: 'Core Team Recruitment (4 July)',
    date: '4 Jul',
    description: 'Recruitment drive for the core team members.',
    repo: null,
    driveLink: 'https://drive.google.com/drive/u/1/folders/1id9oryx_QlQISRzUMJXwKfILdYuL1Q-j',
    photos: 0
  },
  {
    id: 7,
    title: 'Review 4th Sem',
    date: '11 Jul',
    description: 'Review session for the 4th semester.',
    repo: null,
    driveLink: 'https://drive.google.com/drive/u/1/folders/1id9oryx_QlQISRzUMJXwKfILdYuL1Q-j',
    photos: 0
  }
];

export function SessionsWindow() {
  const [activeSession, setActiveSession] = useState<number | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

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
                  {session.repo && (
                    <div className="bg-white border-4 border-black p-6 flex flex-col items-center justify-center gap-4 hover:bg-primary-yellow transition-all cursor-pointer shadow-[8px_8px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none">
                      <div className="bg-black p-4 text-white">
                        <FileCode2 size={32} strokeWidth={2.5} />
                      </div>
                      <span className="text-lg font-black text-black uppercase">Source Code</span>
                      <span className="text-sm font-bold text-gray-700 truncate w-full text-center px-2">{session.repo}</span>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => setIsGalleryOpen(true)}
                    className={`bg-white border-4 border-black p-6 flex flex-col items-center justify-center gap-4 hover:bg-primary-red transition-all cursor-pointer shadow-[8px_8px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${!session.repo ? 'col-span-2' : ''}`}
                  >
                    <div className="bg-black p-4 text-white">
                      <ImageIcon size={32} strokeWidth={2.5} />
                    </div>
                    <span className="text-lg font-black text-black uppercase">Photo Gallery</span>
                    <span className="text-sm font-bold text-gray-700">View Optimized Photos</span>
                  </button>
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

      {/* Photo Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8">
          <div className="bg-white border-4 border-black w-full max-w-6xl h-full shadow-[8px_8px_0px_0px_#000] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b-4 border-black bg-primary-yellow">
              <h3 className="font-black text-xl uppercase tracking-widest">
                {SESSIONS.find(s => s.id === activeSession)?.title} - Photo Gallery
              </h3>
              <button 
                onClick={() => setIsGalleryOpen(false)}
                className="font-black text-xl hover:text-white transition-colors px-4 border-2 border-black bg-white hover:bg-black p-1 shadow-[2px_2px_0px_0px_#000]"
              >
                CLOSE [X]
              </button>
            </div>
            <div className="flex-1 bg-surface-alt p-6 overflow-y-auto custom-scrollbar">
              {(() => {
                const sessionTitle = SESSIONS.find(s => s.id === activeSession)?.title;
                const images = sessionTitle ? (sessionsManifest as Record<string, string[]>)[sessionTitle] || [] : [];
                
                if (images.length === 0) {
                  return (
                    <div className="h-full flex items-center justify-center text-black text-xl font-black border-4 border-dashed border-black p-8 text-center uppercase tracking-widest bg-white shadow-[8px_8px_0px_0px_#000]">
                      <div className="flex flex-col items-center gap-6">
                        <ImageIcon size={48} strokeWidth={2} />
                        <p>No photos have been<br/>synced for this session yet.</p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {images.map((filename, idx) => (
                      <div key={idx} className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] overflow-hidden group">
                        <img 
                          src={`/images/sessions/${sessionTitle}/${filename}`} 
                          alt={`Session Photo ${idx + 1}`}
                          className="w-full h-64 object-cover border-b-4 border-black group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

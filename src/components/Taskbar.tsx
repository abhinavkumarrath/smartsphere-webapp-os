import { useState, useEffect, useRef } from 'react';
import { Cpu, Users, CalendarDays, Rocket, ClipboardList, Music, Calendar, Gamepad2, UserCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isActive: boolean;
}

interface TaskbarProps {
  windows: WindowState[];
  toggleMinimize: (id: string) => void;
  theme?: 'dark' | 'light';
  toggleTheme?: () => void;
  onOpenWindow?: (id: string) => void;
}

export function Taskbar({ windows, toggleMinimize, onOpenWindow }: TaskbarProps) {
  const [time, setTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const startMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
        setIsStartMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStartMenuClick = (id: string) => {
    if (onOpenWindow) onOpenWindow(id);
    setIsStartMenuOpen(false);
  };

  const isAnyWindowOpen = windows.some(w => w.isOpen && !w.isMinimized);

  return (
    <div 
      className={cn(
        "absolute left-1/2 -translate-x-1/2 h-16 sm:h-20 bg-surface border-4 border-black flex items-center px-2 sm:px-6 z-[9999] transition-all duration-500 w-[96%] sm:w-11/12 max-w-6xl",
        isAnyWindowOpen ? "-bottom-32 opacity-0 pointer-events-none" : "bottom-4 sm:bottom-6 shadow-[8px_8px_0px_0px_#000]"
      )} 
      ref={startMenuRef}
    >
      
      {/* Start Menu Popup */}
      {isStartMenuOpen && (
        <div className="absolute bottom-20 sm:bottom-28 left-0 w-full sm:w-72 bg-surface border-4 border-black shadow-[8px_8px_0px_0px_#000] flex flex-col p-2 mb-2 z-[10000] max-w-[calc(100vw-16px)]">
          <div className="bg-primary-yellow border-2 border-black text-black font-black p-4 mb-2 flex items-center gap-3 text-lg">
            <div className="w-10 h-10 border-2 border-black bg-white overflow-hidden shadow-[2px_2px_0px_0px_#000]">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            SmartSphere
          </div>
          <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto custom-scrollbar p-1">
            <button onClick={() => handleStartMenuClick('about')} className="flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-cyan transition-colors text-left text-base text-black font-bold">
              <span className="w-6 text-center text-xl">S</span> About Club
            </button>
            <button onClick={() => handleStartMenuClick('inventory')} className="flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-green transition-colors text-left text-base text-black font-bold">
              <Cpu size={24} strokeWidth={2.5} /> Hardware Lab
            </button>
            <button onClick={() => handleStartMenuClick('team')} className="flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-red transition-colors text-left text-base text-black font-bold">
              <Users size={24} strokeWidth={2.5} /> Core Team
            </button>
            <button onClick={() => handleStartMenuClick('sessions')} className="flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-yellow transition-colors text-left text-base text-black font-bold">
              <CalendarDays size={24} strokeWidth={2.5} /> Session Logs
            </button>
            <button onClick={() => handleStartMenuClick('projects')} className="flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-cyan transition-colors text-left text-base text-black font-bold">
              <Rocket size={24} strokeWidth={2.5} /> Innovations
            </button>
            <button onClick={() => handleStartMenuClick('registration')} className="flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-green transition-colors text-left text-base text-black font-bold">
              <ClipboardList size={24} strokeWidth={2.5} /> Register
            </button>
            <button onClick={() => handleStartMenuClick('calendar')} className="flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-red transition-colors text-left text-base text-black font-bold">
              <Calendar size={24} strokeWidth={2.5} /> Events
            </button>
            <button onClick={() => handleStartMenuClick('music')} className="flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-yellow transition-colors text-left text-base text-black font-bold">
              <Music size={24} strokeWidth={2.5} /> Music Player
            </button>
            <button onClick={() => handleStartMenuClick('profile')} className="flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-cyan transition-colors text-left text-base text-black font-bold">
              <UserCircle2 size={24} strokeWidth={2.5} /> Profile
            </button>
            <button onClick={() => handleStartMenuClick('snake')} className="flex items-center gap-3 p-4 border-2 border-transparent hover:border-black hover:bg-primary-green transition-colors text-left text-base text-black font-bold">
              <Gamepad2 size={24} strokeWidth={2.5} /> Games
            </button>
          </div>
        </div>
      )}

      {/* Start Button */}
      <button 
        onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
        className={cn(
          "flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-primary-red border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all mr-2 sm:mr-8 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shrink-0",
          isStartMenuOpen ? "translate-x-[2px] translate-y-[2px] shadow-none" : ""
        )}
      >
        <div className="w-10 h-10 border border-black overflow-hidden bg-white">
          <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
        </div>
      </button>

      {/* Window Tasks */}
      <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto mx-2 flex-1 custom-scrollbar">
        {windows.filter(w => w.isOpen).map((w) => {
          const Icon = () => {
            switch (w.id) {
              case 'about': return <span className="font-bold text-xl">S</span>;
              case 'inventory': return <Cpu size={20} strokeWidth={2.5} />;
              case 'team': return <Users size={20} strokeWidth={2.5} />;
              case 'sessions': return <CalendarDays size={20} strokeWidth={2.5} />;
              case 'projects': return <Rocket size={20} strokeWidth={2.5} />;
              case 'calendar': return <Calendar size={20} strokeWidth={2.5} />;
              case 'music': return <Music size={20} strokeWidth={2.5} />;
              case 'profile': return <UserCircle2 size={20} strokeWidth={2.5} />;
              case 'snake': return <Gamepad2 size={20} strokeWidth={2.5} />;
              case 'registration': return <ClipboardList size={20} strokeWidth={2.5} />;
              default: return null;
            }
          };
          
          return (
            <button
              key={w.id}
              onClick={() => toggleMinimize(w.id)}
              className={cn(
                "flex items-center justify-center px-4 h-12 border-2 border-black font-bold text-base transition-all truncate shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none gap-2",
                !w.isMinimized
                  ? "min-w-[140px] max-w-[200px]" 
                  : "w-14",
                w.isActive && !w.isMinimized
                  ? "bg-primary-yellow text-black"
                  : "bg-surface text-text-primary hover:bg-primary-cyan hover:text-black"
              )}
              title={w.title}
            >
              <Icon />
              {!w.isMinimized && <span className="truncate">{w.title}</span>}
            </button>
          );
        })}
      </div>

      {/* Clock */}
      <div className="hidden sm:flex ml-auto items-center gap-4 pl-8 border-l-2 border-black h-full shrink-0">
        <div className="flex items-center justify-center px-6 py-3 border-2 border-black bg-primary-green text-black font-black text-base tabular-nums shadow-[2px_2px_0px_0px_#000]">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

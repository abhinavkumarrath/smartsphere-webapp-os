import { useState, useEffect } from 'react';
import { Cpu, Users, CalendarDays, Rocket, ClipboardList } from 'lucide-react';
import { cn } from './lib/utils';
import { AnimatedIoTBackground } from './components/AnimatedIoTBackground';
import { WindowContainer } from './components/WindowContainer';
import { Taskbar, type WindowState } from './components/Taskbar';
import { TeamWindow } from './components/TeamWindow';
import { SessionsWindow } from './components/SessionsWindow';
import { ProjectsWindow } from './components/ProjectsWindow';
import { InventoryWindow } from './components/InventoryWindow';
import { AboutWindow } from './components/AboutWindow';
import { BootScreen } from './components/BootScreen';
import { CalendarApp } from './components/CalendarApp';
import { MusicPlayer } from './components/MusicPlayer';
import { LoginScreen } from './components/LoginScreen';
import { ProfileWindow } from './components/ProfileWindow';
import { SnakeGame } from './components/SnakeGame';
import { RegistrationWindow } from './components/RegistrationWindow';
import { Music, Calendar, Gamepad2, UserCircle2 } from 'lucide-react';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('smartsphere_is_logged_in') === 'true';
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('smartsphere_is_logged_in', 'true');
  };
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'about', title: 'ABOUT_CLUB', isOpen: false, isMinimized: false, isActive: false },
    { id: 'inventory', title: 'HARDWARE_LAB', isOpen: false, isMinimized: false, isActive: false },
    { id: 'team', title: 'CORE_TEAM', isOpen: false, isMinimized: false, isActive: false },
    { id: 'sessions', title: 'SESSION_LOGS', isOpen: false, isMinimized: false, isActive: false },
    { id: 'projects', title: 'INNOVATIONS', isOpen: false, isMinimized: false, isActive: false },
    { id: 'calendar', title: 'EVENTS', isOpen: false, isMinimized: false, isActive: false },
    { id: 'music', title: 'BEATS', isOpen: false, isMinimized: false, isActive: false },
    { id: 'profile', title: 'PROFILE', isOpen: false, isMinimized: false, isActive: false },
    { id: 'snake', title: 'SNAKE', isOpen: false, isMinimized: false, isActive: false },
    { id: 'registration', title: 'REGISTRATION', isOpen: false, isMinimized: false, isActive: false },
  ]);

  const bringToFront = (id: string) => {
    setWindows(prev => prev.map(w => ({
      ...w,
      isActive: w.id === id,
      isMinimized: w.id === id ? false : w.isMinimized
    })));
  };

  const toggleMinimize = (id: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        const willMinimize = !w.isMinimized;
        return { ...w, isMinimized: willMinimize, isActive: !willMinimize };
      }
      return w;
    }));
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false, isActive: false } : w));
  };

  const openWindow = (id: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, isOpen: true, isMinimized: false, isActive: true };
      }
      return { ...w, isActive: false };
    }));
  };

  const getWindowProps = (id: string) => {
    const w = windows.find(w => w.id === id)!;
    return {
      id: w.id,
      title: w.title,
      isOpen: w.isOpen,
      isMinimized: w.isMinimized,
      isActive: w.isActive,
      onFocus: () => bringToFront(id),
      onMinimize: () => toggleMinimize(id),
      onClose: () => closeWindow(id),
    };
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.body.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className={cn("h-screen w-screen overflow-hidden relative selection:bg-primary-yellow selection:text-black", theme === 'light' ? 'light-theme' : '')}>
      {isBooting ? (
        <BootScreen onComplete={() => setIsBooting(false)} />
      ) : !isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <>
          <AnimatedIoTBackground />
      
      {/* Mobile Icons - Responsive Grid */}
      <div className="absolute inset-0 p-4 pt-16 grid grid-cols-4 gap-4 content-start items-start z-[5] overflow-y-auto pb-24 sm:hidden">
        <button onDoubleClick={() => openWindow('about')} onClick={() => openWindow('about')} className="flex flex-col items-center gap-2 group w-full">
          <div className="w-12 h-12 bg-primary-cyan border-2 border-black flex items-center justify-center transition-all shadow-[4px_4px_0px_0px_#000] overflow-hidden">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-black text-[10px] font-bold px-1 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">About</span>
        </button>

        <button onDoubleClick={() => openWindow('team')} onClick={() => openWindow('team')} className="flex flex-col items-center gap-2 group w-full">
          <div className="w-12 h-12 bg-primary-red border-2 border-black flex items-center justify-center text-black transition-all shadow-[4px_4px_0px_0px_#000]">
            <Users className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <span className="text-black text-[10px] font-bold px-1 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Team</span>
        </button>

        <button onDoubleClick={() => openWindow('projects')} onClick={() => openWindow('projects')} className="flex flex-col items-center gap-2 group w-full">
          <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-black transition-all shadow-[4px_4px_0px_0px_#000]">
            <Rocket className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <span className="text-black text-[10px] font-bold px-1 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Projects</span>
        </button>

        <button onDoubleClick={() => openWindow('calendar')} onClick={() => openWindow('calendar')} className="flex flex-col items-center gap-2 group w-full">
          <div className="w-12 h-12 bg-primary-red border-2 border-black flex items-center justify-center text-black transition-all shadow-[4px_4px_0px_0px_#000]">
            <Calendar className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <span className="text-black text-[10px] font-bold px-1 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Events</span>
        </button>

        <button onDoubleClick={() => openWindow('profile')} onClick={() => openWindow('profile')} className="flex flex-col items-center gap-2 group w-full">
          <div className="w-12 h-12 bg-primary-cyan border-2 border-black flex items-center justify-center text-black transition-all shadow-[4px_4px_0px_0px_#000]">
            <UserCircle2 className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <span className="text-black text-[10px] font-bold px-1 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Profile</span>
        </button>

        <button onDoubleClick={() => openWindow('inventory')} onClick={() => openWindow('inventory')} className="flex flex-col items-center gap-2 group w-full">
          <div className="w-12 h-12 bg-primary-green border-2 border-black flex items-center justify-center text-black transition-all shadow-[4px_4px_0px_0px_#000]">
            <Cpu className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <span className="text-black text-[10px] font-bold px-1 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Hardware</span>
        </button>

        <button onDoubleClick={() => openWindow('sessions')} onClick={() => openWindow('sessions')} className="flex flex-col items-center gap-2 group w-full">
          <div className="w-12 h-12 bg-primary-yellow border-2 border-black flex items-center justify-center text-black transition-all shadow-[4px_4px_0px_0px_#000]">
            <CalendarDays className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <span className="text-black text-[10px] font-bold px-1 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Sessions</span>
        </button>

        <button onDoubleClick={() => openWindow('registration')} onClick={() => openWindow('registration')} className="flex flex-col items-center gap-2 group w-full">
          <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center text-white transition-all shadow-[4px_4px_0px_0px_#000]">
            <ClipboardList className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <span className="text-black text-[10px] font-bold px-1 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Register</span>
        </button>

        <button onDoubleClick={() => openWindow('music')} onClick={() => openWindow('music')} className="flex flex-col items-center gap-2 group w-full">
          <div className="w-12 h-12 bg-primary-yellow border-2 border-black flex items-center justify-center text-black transition-all shadow-[4px_4px_0px_0px_#000]">
            <Music className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <span className="text-black text-[10px] font-bold px-1 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Music</span>
        </button>

        <button onDoubleClick={() => openWindow('snake')} onClick={() => openWindow('snake')} className="flex flex-col items-center gap-2 group w-full">
          <div className="w-12 h-12 bg-primary-green border-2 border-black flex items-center justify-center text-black transition-all shadow-[4px_4px_0px_0px_#000]">
            <Gamepad2 className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <span className="text-black text-[10px] font-bold px-1 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Games</span>
        </button>
      </div>

      {/* Desktop Icons - Left Side */}
      <div className="hidden sm:flex absolute top-0 bottom-0 left-0 p-6 sm:p-10 flex-col gap-8 content-start justify-start z-[5]">
        <button onDoubleClick={() => openWindow('about')} onClick={() => openWindow('about')} className="flex flex-col items-center gap-2 group w-24">
          <div className="w-16 h-16 bg-primary-cyan border-2 border-black flex items-center justify-center transition-all shadow-[4px_4px_0px_0px_#000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_#000] group-active:translate-x-[4px] group-active:translate-y-[4px] group-active:shadow-none overflow-hidden">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-black text-xs font-bold px-2 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">About Club</span>
        </button>

        <button onDoubleClick={() => openWindow('team')} onClick={() => openWindow('team')} className="flex flex-col items-center gap-2 group w-24">
          <div className="w-16 h-16 bg-primary-red border-2 border-black flex items-center justify-center text-black transition-all shadow-[4px_4px_0px_0px_#000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_#000] group-active:translate-x-[4px] group-active:translate-y-[4px] group-active:shadow-none">
            <Users size={28} strokeWidth={2.5} />
          </div>
          <span className="text-black text-xs font-bold px-2 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Core Team</span>
        </button>

        <button onDoubleClick={() => openWindow('projects')} onClick={() => openWindow('projects')} className="flex flex-col items-center gap-2 group w-24">
          <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center text-black transition-all shadow-[4px_4px_0px_0px_#000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_#000] group-active:translate-x-[4px] group-active:translate-y-[4px] group-active:shadow-none">
            <Rocket size={28} strokeWidth={2.5} />
          </div>
          <span className="text-black text-xs font-bold px-2 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Projects</span>
        </button>

        <button onDoubleClick={() => openWindow('calendar')} onClick={() => openWindow('calendar')} className="flex flex-col items-center gap-2 group w-24">
          <div className="w-16 h-16 bg-primary-red border-2 border-black flex items-center justify-center text-black transition-all shadow-[4px_4px_0px_0px_#000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_#000] group-active:translate-x-[4px] group-active:translate-y-[4px] group-active:shadow-none">
            <Calendar size={28} strokeWidth={2.5} />
          </div>
          <span className="text-black text-xs font-bold px-2 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Events</span>
        </button>

        <button onDoubleClick={() => openWindow('profile')} onClick={() => openWindow('profile')} className="flex flex-col items-center gap-2 group w-24">
          <div className="w-16 h-16 bg-primary-cyan border-2 border-black flex items-center justify-center text-black transition-all shadow-[4px_4px_0px_0px_#000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_#000] group-active:translate-x-[4px] group-active:translate-y-[4px] group-active:shadow-none">
            <UserCircle2 size={28} strokeWidth={2.5} />
          </div>
          <span className="text-black text-xs font-bold px-2 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Profile</span>
        </button>
      </div>

      {/* Desktop Icons - Right Side */}
      <div className="hidden sm:flex absolute top-0 bottom-0 right-0 p-6 sm:p-10 flex-col gap-8 content-start justify-start items-end z-[5]">
        <button onDoubleClick={() => openWindow('inventory')} onClick={() => openWindow('inventory')} className="flex flex-col items-center gap-2 group w-24">
          <div className="w-16 h-16 bg-primary-green border-2 border-black flex items-center justify-center text-black transition-all shadow-[4px_4px_0px_0px_#000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_#000] group-active:translate-x-[4px] group-active:translate-y-[4px] group-active:shadow-none">
            <Cpu size={28} strokeWidth={2.5} />
          </div>
          <span className="text-black text-xs font-bold px-2 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Hardware</span>
        </button>

        <button onDoubleClick={() => openWindow('sessions')} onClick={() => openWindow('sessions')} className="flex flex-col items-center gap-2 group w-24">
          <div className="w-16 h-16 bg-primary-yellow border-2 border-black flex items-center justify-center text-black transition-all shadow-[4px_4px_0px_0px_#000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_#000] group-active:translate-x-[4px] group-active:translate-y-[4px] group-active:shadow-none">
            <CalendarDays size={28} strokeWidth={2.5} />
          </div>
          <span className="text-black text-xs font-bold px-2 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Sessions</span>
        </button>

        <button onDoubleClick={() => openWindow('registration')} onClick={() => openWindow('registration')} className="flex flex-col items-center gap-2 group w-24">
          <div className="w-16 h-16 bg-black border-2 border-black flex items-center justify-center text-white transition-all shadow-[4px_4px_0px_0px_#000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_#000] group-active:translate-x-[4px] group-active:translate-y-[4px] group-active:shadow-none">
            <ClipboardList size={28} strokeWidth={2.5} />
          </div>
          <span className="text-black text-xs font-bold px-2 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Register</span>
        </button>

        <button onDoubleClick={() => openWindow('music')} onClick={() => openWindow('music')} className="flex flex-col items-center gap-2 group w-24">
          <div className="w-16 h-16 bg-primary-yellow border-2 border-black flex items-center justify-center text-black transition-all shadow-[4px_4px_0px_0px_#000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_#000] group-active:translate-x-[4px] group-active:translate-y-[4px] group-active:shadow-none">
            <Music size={28} strokeWidth={2.5} />
          </div>
          <span className="text-black text-xs font-bold px-2 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Music</span>
        </button>

        <button onDoubleClick={() => openWindow('snake')} onClick={() => openWindow('snake')} className="flex flex-col items-center gap-2 group w-24">
          <div className="w-16 h-16 bg-primary-green border-2 border-black flex items-center justify-center text-black transition-all shadow-[4px_4px_0px_0px_#000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_#000] group-active:translate-x-[4px] group-active:translate-y-[4px] group-active:shadow-none">
            <Gamepad2 size={28} strokeWidth={2.5} />
          </div>
          <span className="text-black text-xs font-bold px-2 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] truncate w-full text-center">Games</span>
        </button>
      </div>

      {/* Desktop Area */}
      <div className="absolute inset-0 bottom-12 p-4 pointer-events-none">
        <WindowContainer {...getWindowProps('about')} icon={<span className="font-bold">S</span>} defaultPosition={{ x: 20, y: 20 }} width="w-[90vw] max-w-sm">
          <AboutWindow />
        </WindowContainer>

        <WindowContainer {...getWindowProps('inventory')} icon={<Cpu size={18} />} defaultPosition={{ x: 30, y: 30 }} width="w-[95vw] max-w-2xl">
          <InventoryWindow />
        </WindowContainer>

        <WindowContainer {...getWindowProps('team')} icon={<Users size={18} />} defaultPosition={{ x: 40, y: 40 }} width="w-[95vw] max-w-3xl">
          <TeamWindow />
        </WindowContainer>

        <WindowContainer {...getWindowProps('sessions')} icon={<CalendarDays size={18} />} defaultPosition={{ x: 10, y: 50 }} width="w-[95vw] max-w-4xl">
          <SessionsWindow />
        </WindowContainer>

        <WindowContainer {...getWindowProps('projects')} icon={<Rocket size={18} />} defaultPosition={{ x: 20, y: 60 }} width="w-[95vw] max-w-4xl">
          <ProjectsWindow />
        </WindowContainer>

        <WindowContainer {...getWindowProps('calendar')} icon={<Calendar size={18} />} defaultPosition={{ x: 50, y: 50 }} width="w-[95vw] max-w-xl">
          <CalendarApp />
        </WindowContainer>

        <WindowContainer {...getWindowProps('music')} icon={<Music size={18} />} defaultPosition={{ x: 60, y: 20 }} width="w-[90vw] max-w-sm">
          <MusicPlayer />
        </WindowContainer>

        <WindowContainer {...getWindowProps('profile')} icon={<UserCircle2 size={18} />} defaultPosition={{ x: 30, y: 40 }} width="w-[95vw] max-w-2xl">
          <ProfileWindow />
        </WindowContainer>

        <WindowContainer {...getWindowProps('snake')} icon={<Gamepad2 size={18} />} defaultPosition={{ x: 20, y: 30 }} width="w-[95vw] max-w-md">
          <SnakeGame />
        </WindowContainer>
        
        <WindowContainer {...getWindowProps('registration')} icon={<ClipboardList size={18} />} defaultPosition={{ x: 35, y: 20 }} width="w-[95vw] max-w-md">
          <RegistrationWindow />
        </WindowContainer>
      </div>

      <Taskbar windows={windows} toggleMinimize={toggleMinimize} theme={theme} toggleTheme={toggleTheme} onOpenWindow={openWindow} />
        </>
      )}
    </div>
  );
}

export default App;

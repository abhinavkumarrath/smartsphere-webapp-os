import { useState, useEffect } from 'react';
import { TerminalSquare, X } from 'lucide-react';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success';
}

const FAKE_NOTIFICATIONS = [
  { message: "Mainframe connection stable.", type: "success" },
  { message: "Network ping: 12ms", type: "info" },
  { message: "Background telemetry updated.", type: "info" },
  { message: "RAM optimized: 245MB freed.", type: "success" },
  { message: "Unidentified ping on port 21.", type: "warning" },
  { message: "SmartSphere OS background check OK.", type: "success" }
] as const;

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Randomly spawn a notification every 20-40 seconds
    const spawnNotification = () => {
      const randomNotif = FAKE_NOTIFICATIONS[Math.floor(Math.random() * FAKE_NOTIFICATIONS.length)];
      const newNotif: Notification = {
        id: Math.random().toString(36).substring(7),
        message: randomNotif.message,
        type: randomNotif.type
      };
      
      setNotifications(prev => [...prev, newNotif]);

      // Remove after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
      }, 5000);

      const nextTimeout = Math.floor(Math.random() * 20000) + 20000; // 20s to 40s
      setTimeout(spawnNotification, nextTimeout);
    };

    const initialTimeout = setTimeout(spawnNotification, 10000); // First one after 10s

    return () => clearTimeout(initialTimeout);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="absolute bottom-16 right-4 flex flex-col gap-2 z-[9000] pointer-events-none">
      {notifications.map((notif) => (
        <div 
          key={notif.id}
          className="bg-surface border-2 border-primary-cyan w-64 p-3 shadow-[4px_4px_0_0_var(--color-primary-cyan)] animate-in slide-in-from-right-8 fade-in pointer-events-auto"
        >
          <div className="flex justify-between items-start mb-1">
            <div className="flex items-center gap-2 text-primary-cyan text-xs font-bold font-mono uppercase">
              <TerminalSquare size={14} /> System Alert
            </div>
            <button 
              onClick={() => removeNotification(notif.id)}
              className="text-text-secondary hover:text-primary-cyan transition-colors"
            >
              <X size={14} />
            </button>
          </div>
          <div className="text-text-primary text-sm font-mono leading-tight">
            {notif.message}
          </div>
        </div>
      ))}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { LightBulbIcon, SmartPlugIcon, RoboticArmIcon, SecurityCameraIcon } from './BootScreenIcons';

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Staggered pop-in animations
    setTimeout(() => setStage(1), 300);
    setTimeout(() => setStage(2), 800);
    setTimeout(() => setStage(3), 1500);

    // Fade out and Complete (Extended to 4.5s for animations)
    setTimeout(() => {
      onComplete();
    }, 4500);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 bg-primary-yellow z-[100] flex flex-col items-center justify-center font-sans overflow-hidden">
      
      {/* Animated Cartoon Characters */}
      <div className={`absolute top-10 left-10 transition-transform duration-500 ${stage >= 1 ? 'scale-100' : 'scale-0'}`}>
        <LightBulbIcon />
      </div>
      
      <div className={`absolute bottom-10 left-10 transition-transform duration-500 ${stage >= 2 ? 'scale-100' : 'scale-0'}`}>
        <SmartPlugIcon />
      </div>

      <div className={`absolute top-10 right-10 transition-transform duration-500 ${stage >= 1 ? 'scale-100' : 'scale-0'}`}>
        <RoboticArmIcon />
      </div>

      <div className={`absolute bottom-10 right-10 transition-transform duration-500 ${stage >= 2 ? 'scale-100' : 'scale-0'}`}>
        <SecurityCameraIcon />
      </div>

      <div className="flex flex-col items-center gap-8 relative z-10">
        <div className={`w-32 h-32 border-4 border-black bg-white flex items-center justify-center overflow-hidden shadow-[8px_8px_0px_0px_#000] transition-all duration-500 ${stage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <h1 className={`text-4xl sm:text-6xl font-black text-black tracking-tighter uppercase transition-all duration-500 ${stage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            SmartSphere
          </h1>
          <div className={`text-black font-bold text-xl uppercase border-2 border-black bg-white px-4 py-1 shadow-[4px_4px_0px_0px_#000] transition-all duration-500 ${stage >= 3 ? 'scale-100' : 'scale-0'}`}>
            Loading OS...
          </div>
        </div>
      </div>
    </div>
  );
}


import { Lightbulb, Plug, Bot, Cctv } from 'lucide-react';

export const LightBulbIcon = ({ className }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="w-24 h-24 bg-[#FFC22E] border-4 border-black rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform hover:scale-110">
      <Lightbulb size={48} strokeWidth={2.5} color="black" />
    </div>
  </div>
);

export const SmartPlugIcon = ({ className }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="w-24 h-24 bg-[#29A873] border-4 border-black rounded-2xl flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform hover:scale-110">
      <Plug size={48} strokeWidth={2.5} color="black" />
    </div>
  </div>
);

export const RoboticArmIcon = ({ className }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="w-24 h-24 bg-[#F23C34] border-4 border-black rounded-lg flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform hover:scale-110">
      <Bot size={48} strokeWidth={2.5} color="black" />
    </div>
  </div>
);

export const SecurityCameraIcon = ({ className }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="w-24 h-24 bg-[#3061FF] border-4 border-black rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform hover:scale-110">
      <Cctv size={48} strokeWidth={2.5} color="black" />
    </div>
  </div>
);

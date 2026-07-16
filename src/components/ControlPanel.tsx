import { useSettings } from './SettingsContext';
import { Monitor, Palette } from 'lucide-react';

export function ControlPanel() {
  const { colorTheme, setColorTheme, crtEnabled, setCrtEnabled } = useSettings();

  const themes = [
    { id: 'cyber-cyan', name: 'Cool Blue', color: '#3061FF' },
    { id: 'hacker-green', name: 'Go Green', color: '#29A873' },
    { id: 'synthwave-pink', name: 'Rad Red', color: '#F23C34' },
    { id: 'retro-amber', name: 'Yell-oh', color: '#FFC22E' }
  ] as const;

  return (
    <div className="text-black h-full min-h-[400px] flex flex-col font-sans bg-white">
      <div className="p-6 pb-4 border-b-4 border-black bg-primary-yellow">
        <h2 className="text-3xl font-black tracking-tighter mb-1 uppercase">System Settings</h2>
        <p className="text-black font-bold text-sm">Manage appearance and display effects.</p>
      </div>

      <div className="p-6 flex flex-col gap-8 bg-surface-alt flex-1">
        
        {/* Appearance / Themes */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm font-black text-black uppercase tracking-wider bg-white border-2 border-black px-3 py-1 w-max shadow-[4px_4px_0px_0px_#000]">
            <Palette size={18} strokeWidth={2.5} /> Appearance Theme
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setColorTheme(theme.id)}
                className={`flex items-center gap-4 p-4 transition-all border-4 border-black font-bold text-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                  colorTheme === theme.id 
                    ? 'bg-white shadow-[4px_4px_0px_0px_#000] scale-100' 
                    : 'bg-white/50 shadow-none hover:bg-white hover:shadow-[4px_4px_0px_0px_#000]'
                }`}
              >
                <div 
                  className="w-8 h-8 border-4 border-black shadow-[2px_2px_0px_0px_#000]"
                  style={{ backgroundColor: theme.color }}
                />
                <span>{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Display / Effects */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm font-black text-black uppercase tracking-wider bg-white border-2 border-black px-3 py-1 w-max shadow-[4px_4px_0px_0px_#000]">
            <Monitor size={18} strokeWidth={2.5} /> Display Effects
          </div>
          
          <div className="flex items-center justify-between p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] mt-2">
            <div>
              <div className="font-black text-lg">CRT Scanline Overlay</div>
              <div className="text-sm font-bold text-gray-600">Simulate a retro cathode-ray tube monitor</div>
            </div>
            <button
              onClick={() => setCrtEnabled(!crtEnabled)}
              className={`relative inline-flex h-8 w-14 items-center border-4 border-black transition-colors shadow-[2px_2px_0px_0px_#000] ${
                crtEnabled ? 'bg-primary-green' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform bg-white border-4 border-black transition-transform ${
                  crtEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

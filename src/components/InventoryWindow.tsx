import { useState } from 'react';
import { Cpu, Terminal as TerminalIcon } from 'lucide-react';

const INVENTORY_DATA = [
  { id: 1, name: 'Arduino Uno R3', category: 'Microcontroller', status: 'Available', qty: 5 },
  { id: 2, name: 'Raspberry Pi 4 (4GB)', category: 'SBC', status: 'In Use', qty: 2 },
  { id: 3, name: 'ESP32 Development Board', category: 'Microcontroller', status: 'Available', qty: 10 },
  { id: 4, name: 'HC-SR04 Ultrasonic Sensor', category: 'Sensor', status: 'Reserved', qty: 4 },
  { id: 5, name: 'Breadboard (830 point)', category: 'Prototyping', status: 'Available', qty: 15 },
];

export function InventoryWindow() {
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <div className="flex flex-col h-full gap-8 font-sans min-h-[500px] p-6 bg-white">
      <div className="flex justify-between items-end border-b-4 border-black pb-6 bg-primary-green p-6 shadow-[8px_8px_0px_0px_#000]">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
              <Cpu size={28} strokeWidth={2.5} />
            </div>
            <h2 className="text-4xl font-black text-black tracking-tighter uppercase">Hardware Lab</h2>
          </div>
          <p className="text-black font-bold text-sm bg-white border-2 border-black inline-block px-3 py-1 shadow-[2px_2px_0px_0px_#000]">Component inventory & borrowing.</p>
        </div>
        
        <button 
          onClick={() => setShowTerminal(!showTerminal)}
          className="bg-primary-yellow hover:bg-black hover:text-white border-4 border-black px-6 py-3 font-black text-sm uppercase transition-all flex items-center gap-2 active:translate-x-[4px] active:translate-y-[4px] shadow-[4px_4px_0px_0px_#000] active:shadow-none"
        >
          <TerminalIcon size={20} strokeWidth={3} />
          {showTerminal ? 'Close Request Form' : 'Request Item'}
        </button>
      </div>

      {showTerminal && (
        <div className="bg-black border-4 border-black p-6 font-mono text-primary-green shadow-[8px_8px_0px_0px_var(--color-primary-green)] relative">
          <div className="absolute top-0 right-0 bg-primary-green text-black px-2 py-1 text-xs font-bold border-b-2 border-l-2 border-black">TERMINAL</div>
          <div className="mb-6 text-sm font-bold">guest@smartsphere:~/inventory$ ./request_item.sh</div>
          <form className="flex flex-col gap-5 text-sm" onSubmit={(e) => { e.preventDefault(); alert('Request submitted to core team.'); setShowTerminal(false); }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="w-full sm:w-36 font-bold uppercase">Item ID:</span>
              <input type="text" className="bg-white border-2 border-primary-green focus:outline-none focus:bg-primary-green focus:text-black w-full sm:flex-1 text-black px-4 py-2 font-bold transition-colors" required />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="w-full sm:w-36 font-bold uppercase">Duration (Days):</span>
              <input type="number" className="bg-white border-2 border-primary-green focus:outline-none focus:bg-primary-green focus:text-black w-full sm:flex-1 text-black px-4 py-2 font-bold transition-colors" required />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="w-full sm:w-36 font-bold uppercase">Project Purpose:</span>
              <input type="text" className="bg-white border-2 border-primary-green focus:outline-none focus:bg-primary-green focus:text-black w-full sm:flex-1 text-black px-4 py-2 font-bold transition-colors" required />
            </div>
            <button type="submit" className="mt-4 self-start bg-primary-green border-2 border-primary-green text-black px-8 py-3 font-black uppercase hover:bg-white transition-colors shadow-[4px_4px_0px_0px_var(--color-primary-green)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              Submit Request
            </button>
          </form>
        </div>
      )}

      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b-4 border-black bg-primary-cyan text-black text-sm">
                <th className="p-4 font-black uppercase tracking-wider border-r-2 border-black">ID</th>
                <th className="p-4 font-black uppercase tracking-wider border-r-2 border-black">Component</th>
                <th className="p-4 font-black uppercase tracking-wider border-r-2 border-black">Category</th>
                <th className="p-4 font-black uppercase tracking-wider border-r-2 border-black">Status</th>
                <th className="p-4 font-black uppercase tracking-wider">Qty</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black">
              {INVENTORY_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-surface-alt transition-colors group font-bold">
                  <td className="p-4 font-mono text-black border-r-2 border-black/20">#{item.id.toString().padStart(3, '0')}</td>
                  <td className="p-4 text-black border-r-2 border-black/20">{item.name}</td>
                  <td className="p-4 text-gray-700 border-r-2 border-black/20 uppercase">{item.category}</td>
                  <td className="p-4 border-r-2 border-black/20">
                    <span className={`px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_#000] ${
                      item.status === 'Available' ? 'bg-primary-green text-black' : 
                      item.status === 'In Use' ? 'bg-primary-red text-black' : 
                      'bg-primary-yellow text-black'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 font-black text-lg text-black">{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

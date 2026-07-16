export function AboutWindow() {
  return (
    <div className="flex flex-col items-center text-center p-8 gap-8 h-full justify-center font-sans">
      
      <div className="w-40 h-40 border-4 border-black bg-primary-yellow relative shadow-[8px_8px_0px_0px_#000] overflow-hidden rotate-[-3deg] hover:rotate-0 transition-transform cursor-pointer">
        <img src="/logo.jpg" alt="SmartSphere Logo" className="w-full h-full object-cover border-2 border-black m-[-2px]" />
      </div>

      <div className="flex flex-col items-center max-w-md">
        <h1 className="text-5xl font-black text-black tracking-tighter mb-2 uppercase">SmartSphere</h1>
        <h2 className="text-xl text-black bg-primary-cyan px-4 py-1 border-2 border-black font-bold mb-6 shadow-[4px_4px_0px_0px_#000]">The IoT & Innovation Club</h2>
        
        <div className="flex gap-4 justify-center items-center font-black text-sm tracking-widest text-black mb-8 border-y-4 border-black py-4 w-full bg-white">
          <span className="hover:text-primary-red transition-colors">INNOVATE</span>
          <span>•</span>
          <span className="hover:text-primary-blue transition-colors">INTEGRATE</span>
          <span>•</span>
          <span className="hover:text-primary-green transition-colors">INSPIRE</span>
        </div>

        <p className="text-black text-lg font-bold leading-relaxed bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
          Where smart ideas become reality. Innovation meets connectivity in our modern tech ecosystem.
          <br /><br />
          Built for the visionaries of tomorrow.
        </p>
      </div>
    </div>
  );
}

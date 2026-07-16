import React from 'react';

export function RegistrationWindow() {
  return (
    <div className="h-full w-full bg-white flex flex-col border-4 border-black font-sans relative">
      <div className="bg-primary-yellow border-b-4 border-black p-4 flex items-center justify-between z-10 shrink-0">
        <h2 className="text-xl font-black uppercase tracking-tight">SmartSphere Registration</h2>
      </div>
      
      <div className="flex-1 w-full h-full relative bg-gray-100 overflow-hidden">
        <iframe 
          src="https://docs.google.com/forms/d/e/1FAIpQLSfV_TpzhDYLLs9fbe5og0uE68Dr-MxHFqMH39covV2CndsvWg/viewform?embedded=true" 
          className="absolute inset-0 w-full h-full border-none"
          title="Registration Form"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}

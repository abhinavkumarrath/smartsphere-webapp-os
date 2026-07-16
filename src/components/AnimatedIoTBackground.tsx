

export function AnimatedIoTBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#F0EBE1] flex items-center justify-center">
      <div 
        className="w-[200px] sm:w-[300px] md:w-[400px] transition-transform duration-700 hover:scale-105"
        style={{
          transform: 'perspective(1000px) rotateX(20deg) rotateY(-10deg) rotateZ(-10deg)',
          transformStyle: 'preserve-3d',
          mixBlendMode: 'multiply'
        }}
      >
        <img 
          src="/cartoon_pi.png" 
          alt="Single Board Computer" 
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

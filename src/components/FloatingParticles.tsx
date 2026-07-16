import { motion } from 'framer-motion';
import { Cpu, CpuIcon, Microchip, Wifi, Lightbulb, Satellite, Zap } from 'lucide-react';

export function FloatingParticles() {
  const icons = [Cpu, Microchip, Wifi, Lightbulb, Satellite, Zap, CpuIcon];
  
  // Generate random particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    Icon: icons[Math.floor(Math.random() * icons.length)],
    x: Math.random() * 100,
    y: 110 + Math.random() * 50, // Start below screen
    size: 20 + Math.random() * 30,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 20
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-primary-cyan/20"
          initial={{ x: `${p.x}vw`, y: `${p.y}vh`, rotate: 0 }}
          animate={{
            y: '-20vh',
            rotate: 360,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
        >
          <p.Icon size={p.size} />
        </motion.div>
      ))}
    </div>
  );
}

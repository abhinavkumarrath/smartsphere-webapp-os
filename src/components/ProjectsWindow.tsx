import { ExternalLink, GitBranch, Cpu } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'Smart Agriculture System',
    status: 'In Progress',
    progress: 65,
    techStack: ['ESP32', 'LoRa', 'AWS IoT', 'React'],
    description: 'A distributed sensor network for monitoring soil moisture, temperature, and automated irrigation via LoRaWAN.',
    repo: 'https://github.com/smartsphere/smart-agri',
    color: 'bg-primary-yellow'
  },
  {
    id: 2,
    title: 'Automated Lab Access Control',
    status: 'Completed',
    progress: 100,
    techStack: ['Raspberry Pi', 'RFID', 'Python', 'PostgreSQL'],
    description: 'RFID-based door lock system for the hardware lab with an attendance logging dashboard.',
    repo: 'https://github.com/smartsphere/lab-access',
    color: 'bg-primary-green'
  },
  {
    id: 3,
    title: 'Weather Station Mesh',
    status: 'Planning',
    progress: 15,
    techStack: ['ESP8266', 'BME280', 'MQTT', 'Grafana'],
    description: 'Campus-wide mesh network of weather stations reporting micro-climate data in real-time.',
    repo: 'https://github.com/smartsphere/weather-mesh',
    color: 'bg-primary-red'
  }
];

export function ProjectsWindow() {
  return (
    <div className="flex flex-col gap-8 font-sans p-6 bg-white h-full">
      <div className="bg-primary-blue border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] flex justify-between items-end flex-wrap gap-4">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">R&D Showcase</h2>
          <p className="text-white font-bold mt-2 bg-black px-2 py-1 inline-block">Active & Completed Innovations.</p>
        </div>
        <div className="flex items-center gap-2 text-black font-black bg-white px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_#000]">
          <Cpu size={24} strokeWidth={3} />
          <span className="uppercase">{PROJECTS.length} PROJECTS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-4">
        {PROJECTS.map(project => (
          <div key={project.id} className={`${project.color} border-4 border-black p-6 transition-all relative overflow-hidden shadow-[8px_8px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000]`}>
            {/* Background wireframe accent */}
            <div className="absolute -right-10 -bottom-10 opacity-10 transition-opacity text-black">
              <Cpu size={200} strokeWidth={1} />
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                <h3 className="text-3xl font-black text-black uppercase tracking-tight bg-white border-2 border-black px-3 py-1 shadow-[4px_4px_0px_0px_#000]">{project.title}</h3>
                <span className={`px-4 py-1 text-sm font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_#000] bg-white text-black`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-black font-bold text-lg mb-6 max-w-xl leading-relaxed bg-white/80 p-3 border-2 border-black backdrop-blur-sm">{project.description}</p>
              
              {/* Progress Bar */}
              <div className="mb-6 bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
                <div className="flex justify-between text-sm mb-2 font-black uppercase">
                  <span>Completion</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="h-4 w-full bg-surface-alt border-2 border-black overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-black transition-all duration-1000 ease-out" 
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-8">
                <div>
                  <div className="text-sm text-black mb-2 uppercase tracking-widest font-black bg-white inline-block px-2 border-2 border-black">Tech Stack</div>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="bg-white px-4 py-2 border-2 border-black text-sm font-bold text-black shadow-[2px_2px_0px_0px_#000] uppercase">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <a 
                  href={project.repo} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 border-4 border-black bg-white px-6 py-3 text-black font-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none uppercase tracking-wider"
                >
                  <GitBranch size={20} strokeWidth={3} />
                  <span>View Repo</span>
                  <ExternalLink size={18} strokeWidth={3} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useAuth } from './AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { LogOut, UserCircle2, Award, Terminal, Code2, Cpu } from 'lucide-react';

export function ProfileWindow() {
  const { user, login, logout, isAuthenticated } = useAuth();

  const handleGoogleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      login({
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        role: 'Club Member',
        joinDate: new Date().toLocaleDateString()
      });
    }
  };

  const handleMockLogin = () => {
    login({
      id: 'mock_123',
      name: 'Abhinav Patel',
      email: 'abhinav@smartsphere.club',
      picture: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=abhinav',
      role: 'Core Team Member',
      joinDate: new Date().toLocaleDateString()
    });
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="flex flex-col h-full bg-white font-sans border-4 border-black">
        <div className="p-6 bg-primary-cyan border-b-4 border-black">
          <h2 className="text-3xl font-black uppercase flex items-center gap-2">
            <UserCircle2 size={32} /> User Authentication
          </h2>
          <p className="font-bold text-black mt-2">Login to access your club profile and certificates.</p>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-6 bg-surface-alt">
          <div className="w-24 h-24 bg-gray-200 border-4 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center mb-4">
            <UserCircle2 size={64} className="text-gray-400" />
          </div>
          
          <div className="flex flex-col gap-4 items-center">
            <p className="font-bold text-lg text-center text-gray-700">Please authenticate using your Google Account.</p>
            
            {/* Standard Google Login Button */}
            <div className="border-4 border-black shadow-[4px_4px_0px_0px_#000] bg-white p-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.error('Login Failed')}
                useOneTap
              />
            </div>

            <div className="mt-8 flex flex-col items-center gap-2 border-t-2 border-dashed border-gray-400 pt-8 w-full">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Developer Tools</span>
              <button 
                onClick={handleMockLogin}
                className="px-6 py-2 bg-black text-white font-bold border-2 border-black hover:bg-gray-800 transition-colors"
              >
                Mock Login (Bypass Auth)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MOCK CERTIFICATES DATA
  const certificates = [
    { id: 1, title: 'Hackathon Winner 2025', date: 'Jan 2025', icon: <Terminal className="text-primary-green" />, color: 'bg-primary-green' },
    { id: 2, title: 'IoT Workshop Completion', date: 'Mar 2024', icon: <Cpu className="text-primary-cyan" />, color: 'bg-primary-cyan' },
    { id: 3, title: 'Web Dev Bootcamp', date: 'Oct 2023', icon: <Code2 className="text-primary-yellow" />, color: 'bg-primary-yellow' }
  ];

  return (
    <div className="flex flex-col h-full bg-surface-alt font-sans">
      {/* Profile Header */}
      <div className="p-6 bg-white border-b-4 border-black flex gap-6 items-center shadow-[0_4px_0_0_#000] z-10 relative">
        <div className="w-24 h-24 border-4 border-black shadow-[4px_4px_0px_0px_#000] bg-gray-100 overflow-hidden shrink-0">
          <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1">
          <h2 className="text-4xl font-black uppercase tracking-tight">{user.name}</h2>
          <p className="font-bold text-gray-600 font-mono text-sm mt-1">{user.email}</p>
          <div className="flex gap-2 mt-3">
            <span className="text-xs font-bold px-2 py-1 bg-black text-white uppercase">{user.role}</span>
            <span className="text-xs font-bold px-2 py-1 bg-white border-2 border-black uppercase shadow-[2px_2px_0px_0px_#000]">
              Member since {user.joinDate}
            </span>
          </div>
        </div>

        <button 
          onClick={logout}
          className="p-3 bg-primary-red border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          title="Logout"
        >
          <LogOut className="text-black" strokeWidth={2.5} />
        </button>
      </div>

      {/* Certificates Section */}
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
          <Award className="text-primary-yellow" size={28} /> Club Certificates
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map(cert => (
            <div key={cert.id} className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-4 flex gap-4 items-center group hover:-translate-y-1 transition-transform">
              <div className={`w-16 h-16 border-4 border-black ${cert.color} flex items-center justify-center shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)]`}>
                {cert.icon}
              </div>
              <div>
                <h4 className="font-bold text-lg leading-tight">{cert.title}</h4>
                <p className="text-sm font-bold text-gray-500 mt-1 uppercase tracking-wider">{cert.date}</p>
              </div>
              <button className="ml-auto p-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000] hover:bg-black hover:text-white transition-colors text-xs font-bold uppercase">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useAuth } from './AuthContext';
import { LogOut, UserCircle2, Award, Terminal, Code2, Cpu, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { AdminDashboard } from './AdminDashboard';
import { CertificateModal } from './CertificateModal';

function getIconComponent(iconName: string, className: string) {
  switch (iconName) {
    case 'Terminal': return <Terminal className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Code2': return <Code2 className={className} />;
    default: return <Award className={className} />;
  }
}

export function ProfileWindow() {
  const { user, logout, isAuthenticated, signInWithGoogle } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isLoadingCerts, setIsLoadingCerts] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<any | null>(null);

  useEffect(() => {
    async function fetchCerts() {
      if (!user) return;
      try {
        const certsRef = collection(db, 'users', user.id, 'certificates');
        const q = query(certsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const fetchedCerts: any[] = [];
        querySnapshot.forEach((docSnap) => {
          fetchedCerts.push({ id: docSnap.id, ...docSnap.data() });
        });
        
        setCertificates(fetchedCerts);
      } catch (err) {
        console.error("Failed to fetch certificates", err);
      } finally {
        setIsLoadingCerts(false);
      }
    }

    if (isAuthenticated && user) {
      fetchCerts();
    }
  }, [user, isAuthenticated]);

  const handleGoogleLogin = async () => {
    setIsVerifying(true);
    try {
      await signInWithGoogle();
      setIsVerifying(false);
    } catch (err) {
      console.error('Login Failed', err);
      setIsVerifying(false);
    }
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
          
          <div className="flex flex-col gap-4 items-center w-full max-w-sm">
            <p className="font-bold text-lg text-center text-gray-700">Please authenticate using your Google Account.</p>
            
            {isVerifying ? (
              <div className="flex flex-col items-center justify-center h-20 gap-4 w-full my-4">
                <Loader2 className="animate-spin text-primary-cyan" size={32} strokeWidth={3} />
                <span className="font-bold uppercase tracking-widest text-xs">Authenticating...</span>
              </div>
            ) : (
              <button 
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white border-4 border-black py-3 mt-4 font-black text-lg shadow-[4px_4px_0px_0px_#000] hover:bg-surface-alt active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const isCoreTeam = user.role === 'Founder' || user.role === 'Core Team Member';

  return (
    <div className="flex flex-col h-full bg-surface-alt font-sans overflow-hidden">
      {/* Profile Header */}
      <div className="p-6 bg-white border-b-4 border-black flex flex-col md:flex-row gap-6 md:items-center shadow-[0_4px_0_0_#000] z-10 relative">
        <div className="w-24 h-24 border-4 border-black shadow-[4px_4px_0px_0px_#000] bg-gray-100 overflow-hidden shrink-0">
          <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1">
          <h2 className="text-4xl font-black uppercase tracking-tight">{user.name}</h2>
          <p className="font-bold text-gray-600 font-mono text-sm mt-1">{user.email}</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className={`text-xs font-bold px-2 py-1 uppercase ${isCoreTeam ? 'bg-primary-yellow text-black' : 'bg-black text-white'}`}>
              {user.role}
            </span>
            <span className="text-xs font-bold px-2 py-1 bg-white border-2 border-black uppercase shadow-[2px_2px_0px_0px_#000]">
              Member since {user.joinDate}
            </span>
          </div>
        </div>

        <button 
          onClick={logout}
          className="p-3 bg-primary-red border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none self-start md:self-center"
          title="Logout"
        >
          <LogOut className="text-black" strokeWidth={2.5} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        
        {/* Admin Dashboard */}
        {isCoreTeam && <AdminDashboard />}

        {/* Certificates Section */}
        <div>
          <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
            <Award className="text-primary-yellow" size={28} /> Club Certificates
          </h3>
          
          {isLoadingCerts ? (
            <div className="flex items-center gap-3 p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000]">
              <Loader2 className="animate-spin text-primary-cyan" size={24} />
              <span className="font-bold uppercase tracking-widest text-sm">Fetching certificates...</span>
            </div>
          ) : certificates.length === 0 ? (
            <div className="p-8 bg-white border-4 border-black border-dashed flex flex-col items-center justify-center gap-4 text-gray-500">
              <Award size={48} className="opacity-50" />
              <p className="font-bold uppercase tracking-widest text-center">No certificates yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {certificates.map(cert => (
                <div key={cert.id} className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] p-4 flex gap-4 items-center group hover:-translate-y-1 transition-transform">
                  <div className={`w-16 h-16 border-4 border-black ${cert.color} flex items-center justify-center shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] shrink-0`}>
                    {getIconComponent(cert.icon, cert.color.includes('white') ? 'text-black' : 'text-white')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg leading-tight truncate">{cert.title}</h4>
                    <p className="text-sm font-bold text-gray-500 mt-1 uppercase tracking-wider">{cert.date}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedCertificate(cert)}
                    className="p-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000] hover:bg-black hover:text-white transition-colors text-xs font-bold uppercase shrink-0"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CertificateModal 
        isOpen={!!selectedCertificate} 
        onClose={() => setSelectedCertificate(null)}
        userName={user.name}
        certificate={selectedCertificate || { title: '', date: '', occasion: '' }}
      />
    </div>
  );
}

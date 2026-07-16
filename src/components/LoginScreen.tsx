import { useState } from 'react';
import { Loader2, UserCircle2 } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from './AuthContext';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const { login } = useAuth();

  const handleGoogleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      setIsVerifying(true);
      const decoded: any = jwtDecode(credentialResponse.credential);
      login({
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        role: 'Club Member',
        joinDate: new Date().toLocaleDateString()
      });
      // Simulate small delay for aesthetics
      setTimeout(() => {
        onLogin();
      }, 800);
    }
  };

  const handleGuestAccess = () => {
    setIsVerifying(true);
    setTimeout(() => {
      onLogin(); // Simply calls onLogin without setting any auth context
    }, 800);
  };

  return (
    <div className="absolute inset-0 bg-background z-[50] flex flex-col items-center justify-center p-4 sm:p-6 font-sans bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwgMCwgMCwgMC4wNSkiLz48L3N2Zz4=')]">
      <div className="w-full max-w-sm bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_#000] flex flex-col items-center transform transition-transform">
        
        <div className="w-24 h-24 border-4 border-black bg-primary-yellow p-1 shadow-[4px_4px_0px_0px_#000] mb-6 overflow-hidden">
          <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover border-2 border-black" />
        </div>
        
        <h2 className="text-3xl font-black text-black tracking-tight mb-1 uppercase">SmartSphere</h2>
        <p className="text-text-secondary font-bold text-sm mb-8 uppercase tracking-widest">System Locked</p>

        {isVerifying ? (
          <div className="flex flex-col items-center justify-center h-32 gap-4 w-full">
            <Loader2 className="animate-spin text-primary-cyan" size={40} strokeWidth={3} />
            <span className="font-bold uppercase tracking-widest text-sm">Authenticating...</span>
          </div>
        ) : (
          <div className="flex flex-col gap-6 w-full relative">
            
            <button 
              onClick={handleGuestAccess}
              className="w-full flex items-center justify-center gap-3 bg-primary-cyan border-4 border-black py-4 font-black text-lg shadow-[4px_4px_0px_0px_#000] hover:bg-white active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase tracking-wider"
            >
              <UserCircle2 strokeWidth={3} />
              Guest Access
            </button>
            
            <div className="w-full flex items-center gap-4">
              <div className="h-1 flex-1 bg-black"></div>
              <span className="font-black text-sm uppercase">OR</span>
              <div className="h-1 flex-1 bg-black"></div>
            </div>
            
            <div className="border-4 border-black shadow-[4px_4px_0px_0px_#000] bg-white p-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.error('Login Failed')}
                useOneTap
              />
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === '') return;
    
    setIsVerifying(true);
    
    // Simulate verification delay
    setTimeout(() => {
      onLogin();
    }, 1200);
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
          <div className="flex flex-col items-center justify-center h-20 gap-4 w-full">
            <Loader2 className="animate-spin text-primary-cyan" size={40} strokeWidth={3} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full relative">
            <div className="relative flex items-center">
              <div className="absolute left-4 text-black">
                <Lock size={20} strokeWidth={2.5} />
              </div>
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-alt border-4 border-black py-3 pl-12 pr-16 text-black placeholder:text-black/40 outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#000] transition-all font-bold text-lg"
                placeholder="PASSWORD"
              />
              <button 
                type="submit" 
                className="absolute right-2 p-2 h-10 w-12 flex items-center justify-center text-black bg-primary-yellow border-2 border-black hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-primary-yellow disabled:hover:text-black active:translate-y-[2px] active:translate-x-[2px]"
                disabled={password.trim() === ''}
              >
                <ArrowRight size={20} strokeWidth={3} />
              </button>
            </div>
            
            <div className="w-full flex items-center gap-4 my-2">
              <div className="h-1 flex-1 bg-black"></div>
              <span className="font-black text-sm uppercase">OR</span>
              <div className="h-1 flex-1 bg-black"></div>
            </div>
            
            <button 
              type="button"
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-3 bg-white border-4 border-black py-3 font-black text-lg shadow-[4px_4px_0px_0px_#000] hover:bg-surface-alt active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
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
          </form>
        )}
      </div>
      
      <div className="absolute bottom-8 flex gap-6 text-black font-black uppercase text-sm">
        <button className="hover:text-primary-cyan transition-colors underline decoration-2 underline-offset-4">Guest Access</button>
        <button className="hover:text-primary-red transition-colors underline decoration-2 underline-offset-4">Forgot Password?</button>
      </div>
    </div>
  );
}

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  picture: string;
  role: string;
  joinDate: string;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (profile: UserProfile) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  // Load session from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('smartsphere_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user session");
        localStorage.removeItem('smartsphere_user');
      }
    }
  }, []);

  const login = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('smartsphere_user', JSON.stringify(profile));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartsphere_user');
    localStorage.removeItem('smartsphere_is_logged_in');
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { auth, googleProvider, db } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setUser({ id: firebaseUser.uid, ...userDoc.data() } as UserProfile);
          } else {
            const newProfile: Omit<UserProfile, 'id'> = {
              name: firebaseUser.displayName || 'Unknown User',
              email: firebaseUser.email || '',
              picture: firebaseUser.photoURL || '',
              role: 'Club Member',
              joinDate: new Date(firebaseUser.metadata.creationTime || Date.now()).toLocaleDateString()
            };
            await setDoc(userDocRef, newProfile);
            setUser({ id: firebaseUser.uid, ...newProfile });
          }
        } catch (error) {
          console.error("Error fetching user profile from Firestore:", error);
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'Unknown User',
            email: firebaseUser.email || '',
            picture: firebaseUser.photoURL || '',
            role: 'Club Member',
            joinDate: new Date(firebaseUser.metadata.creationTime || Date.now()).toLocaleDateString()
          });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('smartsphere_is_logged_in');
      window.location.reload();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logout, isAuthenticated: !!user, isLoading }}>
      {!isLoading && children}
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

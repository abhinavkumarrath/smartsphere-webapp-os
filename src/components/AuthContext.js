"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = AuthProvider;
exports.useAuth = useAuth;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const firebase_1 = require("../lib/firebase");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const AuthContext = (0, react_1.createContext)(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const unsubscribe = (0, auth_1.onAuthStateChanged)(firebase_1.auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const userDocRef = (0, firestore_1.doc)(firebase_1.db, 'users', firebaseUser.uid);
                    const userDoc = await (0, firestore_1.getDoc)(userDocRef);
                    if (userDoc.exists()) {
                        setUser({ id: firebaseUser.uid, ...userDoc.data() });
                    }
                    else {
                        const newProfile = {
                            name: firebaseUser.displayName || 'Unknown User',
                            email: firebaseUser.email || '',
                            picture: firebaseUser.photoURL || '',
                            role: 'Club Member',
                            joinDate: new Date(firebaseUser.metadata.creationTime || Date.now()).toLocaleDateString()
                        };
                        await (0, firestore_1.setDoc)(userDocRef, newProfile);
                        setUser({ id: firebaseUser.uid, ...newProfile });
                    }
                }
                catch (error) {
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
            }
            else {
                setUser(null);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);
    const signInWithGoogle = async () => {
        try {
            await (0, auth_1.signInWithPopup)(firebase_1.auth, firebase_1.googleProvider);
        }
        catch (error) {
            console.error("Error signing in with Google:", error);
            throw error;
        }
    };
    const logout = async () => {
        try {
            await (0, auth_1.signOut)(firebase_1.auth);
            localStorage.removeItem('smartsphere_is_logged_in');
            window.location.reload();
        }
        catch (error) {
            console.error("Error signing out:", error);
        }
    };
    return ((0, jsx_runtime_1.jsx)(AuthContext.Provider, { value: { user, signInWithGoogle, logout, isAuthenticated: !!user, isLoading }, children: !isLoading && children }));
}
function useAuth() {
    const context = (0, react_1.useContext)(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Shield, Loader2, CheckCircle2 } from 'lucide-react';
import type { UserProfile } from './AuthContext';

export function AdminDashboard() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [selectedUserId, setSelectedUserId] = useState('');
  const [certTitle, setCertTitle] = useState('');
  const [certDate, setCertDate] = useState('');
  const [certIcon, setCertIcon] = useState('Award');
  const [certColor, setCertColor] = useState('bg-primary-yellow');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList: UserProfile[] = [];
        querySnapshot.forEach((docSnap) => {
          usersList.push({ id: docSnap.id, ...docSnap.data() } as UserProfile);
        });
        setUsers(usersList);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleAssignCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId || !certTitle || !certDate) return;

    setIsSubmitting(true);
    setSuccessMsg('');

    try {
      const certRef = collection(db, 'users', selectedUserId, 'certificates');
      await addDoc(certRef, {
        title: certTitle,
        date: certDate,
        icon: certIcon,
        color: certColor,
        createdAt: new Date().toISOString()
      });
      
      setSuccessMsg(`Certificate assigned successfully!`);
      setCertTitle('');
      setCertDate('');
      
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error("Failed to assign certificate", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 border-4 border-black bg-surface-alt shadow-[4px_4px_0px_0px_#000] mb-8">
        <Loader2 className="animate-spin text-primary-cyan" size={24} />
        <span className="ml-2 font-bold uppercase">Loading Users...</span>
      </div>
    );
  }

  return (
    <div className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] mb-8 relative overflow-hidden">
      <div className="bg-black text-white p-3 flex items-center gap-2">
        <Shield size={20} className="text-primary-yellow" />
        <h3 className="font-black uppercase tracking-widest text-sm">Admin Dashboard</h3>
      </div>
      
      <div className="p-5">
        <p className="font-bold text-gray-600 mb-4 text-sm">Assign a new certificate directly to a club member.</p>
        
        {successMsg && (
          <div className="bg-primary-green border-2 border-black p-2 mb-4 flex items-center gap-2 font-bold text-sm shadow-[2px_2px_0px_0px_#000]">
            <CheckCircle2 size={16} /> {successMsg}
          </div>
        )}

        <form onSubmit={handleAssignCertificate} className="flex flex-col gap-4">
          <div>
            <label className="block font-black text-xs uppercase tracking-wider mb-1">Select Member</label>
            <select 
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              required
              className="w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]"
            >
              <option value="" disabled>-- Choose a Member --</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-black text-xs uppercase tracking-wider mb-1">Certificate Title</label>
              <input 
                type="text" 
                value={certTitle}
                onChange={(e) => setCertTitle(e.target.value)}
                required
                placeholder="e.g. Hackathon Winner"
                className="w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]"
              />
            </div>
            <div>
              <label className="block font-black text-xs uppercase tracking-wider mb-1">Date Achieved</label>
              <input 
                type="text" 
                value={certDate}
                onChange={(e) => setCertDate(e.target.value)}
                required
                placeholder="e.g. Jan 2025"
                className="w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-black text-xs uppercase tracking-wider mb-1">Icon Style</label>
              <select 
                value={certIcon}
                onChange={(e) => setCertIcon(e.target.value)}
                className="w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]"
              >
                <option value="Award">Award (General)</option>
                <option value="Terminal">Terminal (Coding)</option>
                <option value="Code2">Code (Web Dev)</option>
                <option value="Cpu">CPU (Hardware/IoT)</option>
              </select>
            </div>
            <div>
              <label className="block font-black text-xs uppercase tracking-wider mb-1">Color Theme</label>
              <select 
                value={certColor}
                onChange={(e) => setCertColor(e.target.value)}
                className="w-full border-2 border-black p-2 font-bold bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary-cyan shadow-[2px_2px_0px_0px_#000]"
              >
                <option value="bg-primary-yellow">Yellow</option>
                <option value="bg-primary-cyan">Cyan</option>
                <option value="bg-primary-green">Green</option>
                <option value="bg-primary-red">Red</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-black text-white border-4 border-black py-3 font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_#primary-cyan] hover:bg-gray-800 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 flex items-center justify-center"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Assign Certificate"}
          </button>
        </form>
      </div>
    </div>
  );
}

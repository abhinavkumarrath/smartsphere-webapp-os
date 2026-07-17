import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { X, Download, Loader2 } from 'lucide-react';

interface CertificateProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  certificate: {
    title: string;
    date: string;
    occasion?: string;
  };
}

export function CertificateModal({ isOpen, onClose, userName, certificate }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true);
    
    // Temporarily remove transform to prevent html2canvas offset/blank bugs
    const wrapper = certificateRef.current.parentElement;
    const originalTransform = wrapper ? wrapper.style.transform : '';
    if (wrapper) wrapper.style.transform = 'none';

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, 
        useCORS: true, 
        logging: false,
        backgroundColor: '#0f172a' // Matches slate-900
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1024, 720]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, 1024, 720);
      pdf.save(`${userName.replace(/\s+/g, '_')}_Certificate.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
    } finally {
      if (wrapper) wrapper.style.transform = originalTransform;
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/95 p-4 md:p-8 overflow-y-auto custom-scrollbar">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');`}
      </style>
      
      <div className="relative flex flex-col items-center w-full min-h-full">
        {/* Actions Bar */}
        <div className="w-full max-w-[1024px] flex justify-between items-center mb-6 shrink-0">
          <h2 className="text-white font-black text-xl tracking-widest uppercase text-primary-cyan drop-shadow-md">
            Certificate Preview
          </h2>
          <div className="flex gap-4">
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-gradient-to-r from-primary-cyan to-blue-500 text-white px-6 py-2 rounded font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(0,255,255,0.8)] transition-all disabled:opacity-50"
            >
              {isDownloading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
              {isDownloading ? 'Generating...' : 'Download PDF'}
            </button>
            <button 
              onClick={onClose}
              className="p-2 bg-white/10 rounded text-white hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Scalable Container for responsiveness, but inner is strictly 1024x720 */}
        <div 
          className="shrink-0 origin-top flex items-center justify-center pb-12 transition-transform"
          style={{ transform: 'scale(min(1, calc((100vw - 40px) / 1024)))' }}
        >
          {/* THE CERTIFICATE TEMPLATE */}
          <div 
            ref={certificateRef}
            className="w-[1024px] h-[720px] relative p-[40px] bg-slate-900 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] shrink-0"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {/* Outer Gold Border */}
            <div className="absolute inset-[20px] border-[3px] border-[#d4af37] opacity-80 pointer-events-none z-10" />
            <div className="absolute inset-[28px] border-[1px] border-[#d4af37] opacity-50 pointer-events-none z-10" />

            {/* Premium Background Elements */}
            <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-primary-cyan/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Corner Ornaments */}
            <div className="absolute top-[30px] left-[30px] w-[40px] h-[40px] border-t-[3px] border-l-[3px] border-[#d4af37] z-20" />
            <div className="absolute top-[30px] right-[30px] w-[40px] h-[40px] border-t-[3px] border-r-[3px] border-[#d4af37] z-20" />
            <div className="absolute bottom-[30px] left-[30px] w-[40px] h-[40px] border-b-[3px] border-l-[3px] border-[#d4af37] z-20" />
            <div className="absolute bottom-[30px] right-[30px] w-[40px] h-[40px] border-b-[3px] border-r-[3px] border-[#d4af37] z-20" />

            {/* Content Container */}
            <div className="relative z-30 w-full h-full flex flex-col items-center justify-between">
              
              {/* Header Logos */}
              <div className="w-full flex justify-between items-center px-12 pt-6">
                <img src="/ggits.png" alt="College Logo" className="h-[90px] object-contain drop-shadow-xl" />
                <img src="/logo.jpg" alt="SmartSphere Logo" className="h-[90px] object-contain drop-shadow-xl rounded-xl" />
              </div>

              {/* Main Content */}
              <div className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
                
                <h1 className="text-6xl font-serif text-[#d4af37] tracking-wider mb-6 drop-shadow-lg" style={{ fontVariant: 'small-caps' }}>
                  Certificate of Achievement
                </h1>

                <p className="text-[#94a3b8] tracking-[0.3em] uppercase text-sm mb-12">
                  This is proudly presented to
                </p>

                <div className="relative w-full max-w-[700px] flex justify-center border-b border-[#334155] pb-6 mb-10">
                  <h2 className="text-6xl font-serif italic text-white tracking-widest drop-shadow-md">
                    {userName}
                  </h2>
                </div>

                <p className="text-[#cbd5e1] text-lg font-light max-w-[800px] leading-relaxed mb-6 uppercase tracking-[0.2em]">
                  For outstanding participation and successfully achieving the title of 
                </p>
                <div className="border-y border-[#334155]/50 py-4 w-full max-w-[600px] mb-6">
                  <span className="block text-5xl font-serif font-bold text-[#d4af37] tracking-wider uppercase drop-shadow-lg">{certificate.title}</span>
                </div>

                {certificate.occasion && (
                  <p className="text-[#94a3b8] italic text-xl max-w-[700px] font-serif">
                    "{certificate.occasion}"
                  </p>
                )}
              </div>

              {/* Footer Signatures */}
              <div className="w-full flex justify-between items-end px-20 pb-4">
                <div className="flex flex-col items-center w-64">
                  <span className="text-[#e2e8f0] text-xl mb-3 font-serif italic">{certificate.date}</span>
                  <div className="w-full border-t border-[#475569] pt-3 text-center">
                    <span className="text-[#94a3b8] text-xs uppercase tracking-[0.2em]">Date of Award</span>
                  </div>
                </div>

                <div className="flex flex-col items-center w-64">
                  {/* Cursive Signature matching user request */}
                  <span 
                    className="text-6xl mb-2 -rotate-6 opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" 
                    style={{ 
                      fontFamily: "'Great Vibes', cursive",
                      background: "linear-gradient(135deg, #bf953f 0%, #fcf6ba 40%, #b38728 80%, #fbf5b7 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    SmartSphere
                  </span>
                  <div className="w-full border-t border-[#475569] pt-3 text-center">
                    <span className="text-[#94a3b8] text-xs uppercase tracking-[0.2em]">SmartSphere Founder</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // Higher quality
        useCORS: true, // Allow loading images
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate aspect ratio for A4 landscape
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${userName.replace(/\s+/g, '_')}_Certificate.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      {/* Container to restrict max size on small screens but keep the certificate large enough to render clearly */}
      <div className="relative w-full max-w-5xl max-h-[95vh] flex flex-col bg-surface-alt border-4 border-black shadow-[8px_8px_0px_0px_#fff]">
        
        {/* Header Bar */}
        <div className="bg-black text-white p-4 flex justify-between items-center shrink-0">
          <h2 className="font-black uppercase tracking-widest text-lg">Digital Certificate</h2>
          <div className="flex gap-4">
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-primary-cyan text-black px-4 py-2 font-bold uppercase hover:bg-white transition-colors disabled:opacity-50"
            >
              {isDownloading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
              {isDownloading ? 'Generating...' : 'Download PDF'}
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Scrollable area for the certificate preview */}
        <div className="flex-1 overflow-auto p-4 md:p-8 flex items-center justify-center bg-gray-200">
          
          {/* THE CERTIFICATE TEMPLATE - Fixed size for consistent PDF rendering */}
          <div 
            ref={certificateRef}
            className="w-[1024px] h-[720px] bg-white relative p-16 flex flex-col justify-between shrink-0 shadow-xl overflow-hidden"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              border: "16px double #000"
            }}
          >
            {/* Background Pattern / Watermark (optional) */}
            <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
              <div className="w-[800px] h-[800px] rounded-full border-[60px] border-black"></div>
            </div>

            {/* Top Logos */}
            <div className="flex justify-between items-start z-10">
              <img src="/ggits.png" alt="GGITS" className="h-28 object-contain" crossOrigin="anonymous" />
              <img src="/logo.jpg" alt="SmartSphere" className="h-28 object-contain" crossOrigin="anonymous" />
            </div>

            {/* Content Body */}
            <div className="flex-1 flex flex-col items-center justify-center text-center z-10 px-24">
              <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 text-black">
                Certificate of Achievement
              </h1>
              
              <p className="text-xl font-medium text-gray-600 tracking-widest uppercase mt-6 mb-8">
                This is proudly presented to
              </p>
              
              <h2 className="text-5xl font-black text-black border-b-4 border-black pb-2 px-12 mb-8 inline-block">
                {userName}
              </h2>
              
              <p className="text-lg font-bold text-gray-700 max-w-2xl leading-relaxed mb-4">
                For successfully achieving the title of <strong className="text-black uppercase">{certificate.title}</strong>
              </p>
              
              {certificate.occasion && (
                <p className="text-lg text-gray-600 italic max-w-2xl">
                  "{certificate.occasion}"
                </p>
              )}
            </div>

            {/* Bottom Signatures & Date */}
            <div className="flex justify-between items-end z-10 pt-8 border-t-2 border-dashed border-gray-300 mt-4">
              <div className="text-center w-64">
                <p className="text-2xl font-bold font-serif mb-2">{certificate.date}</p>
                <div className="border-t-2 border-black pt-2">
                  <p className="font-bold uppercase tracking-widest text-xs">Date of Award</p>
                </div>
              </div>
              
              {/* Optional Seal / Badge */}
              <div className="w-24 h-24 bg-primary-yellow border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_#000]">
                <span className="font-black text-xl">SS</span>
              </div>

              <div className="text-center w-64">
                <div className="h-12 border-b border-gray-400 mb-2"></div>
                <div className="border-t-2 border-black pt-2">
                  <p className="font-bold uppercase tracking-widest text-xs">SmartSphere Founder</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

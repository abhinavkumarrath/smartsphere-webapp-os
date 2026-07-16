import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music as MusicIcon, Disc3 } from 'lucide-react';

const PLAYLIST = [
  { id: 1, title: 'Chill Vibes', artist: 'Lofi Maker', duration: '6:12', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'Midnight Coffee', artist: 'Chill Beats', duration: '7:05', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'Rainy Window', artist: 'Sleepy Sound', duration: '5:44', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 4, title: 'Study Session', artist: 'Focus Flow', duration: '5:02', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
];

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Audio play failed, user interaction needed:', error);
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleEnded = () => {
    handleNext();
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  
  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
    setProgress(0);
    setIsPlaying(true);
  };
  
  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const track = PLAYLIST[currentTrack];

  return (
    <div className="flex flex-col font-sans h-full bg-white text-black min-h-[450px]">
      
      {/* Now Playing Area */}
      <div className="p-8 flex flex-col items-center bg-primary-yellow border-b-4 border-black relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 border-2 border-black p-2 bg-white shadow-[2px_2px_0px_0px_#000]">
          <MusicIcon size={20} strokeWidth={3} />
        </div>
        
        <div className={`w-32 h-32 border-4 border-black bg-white rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_#000] mb-6 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
          <div className="w-10 h-10 border-4 border-black bg-primary-yellow rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-full" />
          </div>
        </div>
        
        <h2 className="text-2xl font-black text-center uppercase tracking-tight bg-white border-2 border-black px-4 py-1 shadow-[4px_4px_0px_0px_#000] z-10 mb-2">{track.title}</h2>
        <p className="font-bold text-sm bg-black text-white px-3 py-1 uppercase tracking-widest">{track.artist}</p>
      </div>

      {/* Controls & Progress */}
      <div className="p-6 bg-white border-b-4 border-black">
        {/* Progress Bar */}
        <div className="mb-6 flex items-center gap-4">
          <span className="text-xs font-black w-10 text-right">0:{(progress * 0.6).toFixed(0).padStart(2, '0')}</span>
          <div className="flex-1 h-6 bg-surface-alt border-2 border-black overflow-hidden p-0.5">
            <div 
              className="h-full bg-primary-cyan border-r-2 border-black transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-black w-10">{track.duration}</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-center items-center gap-6">
          <button onClick={handlePrev} className="p-3 border-4 border-black bg-white hover:bg-primary-red transition-all shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <SkipBack size={24} strokeWidth={3} />
          </button>
          <button 
            onClick={handlePlayPause} 
            className="w-16 h-16 rounded-full border-4 border-black bg-primary-green flex items-center justify-center hover:bg-black hover:text-primary-green transition-all shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            {isPlaying ? <Pause size={32} strokeWidth={3} className="ml-0" /> : <Play size={32} strokeWidth={3} className="ml-1" />}
          </button>
          <button onClick={handleNext} className="p-3 border-4 border-black bg-white hover:bg-primary-cyan transition-all shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <SkipForward size={24} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Playlist */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-surface-alt p-4">
        <h3 className="font-black uppercase text-sm mb-4 bg-white border-2 border-black inline-block px-2 shadow-[2px_2px_0px_0px_#000]">Up Next</h3>
        <div className="flex flex-col gap-3">
          {PLAYLIST.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => { setCurrentTrack(idx); setProgress(0); setIsPlaying(true); }}
              className={`flex items-center p-3 border-2 border-black transition-all shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none text-left ${
                currentTrack === idx ? 'bg-primary-yellow border-black font-black' : 'bg-white hover:bg-primary-cyan/20 font-bold'
              }`}
            >
              <div className="w-8 flex justify-center text-xs opacity-50 font-black">
                {currentTrack === idx ? <Disc3 size={16} className="animate-spin" /> : `${idx + 1}.`}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="truncate uppercase text-sm">{item.title}</div>
                <div className="text-xs opacity-70 truncate uppercase">{item.artist}</div>
              </div>
              <div className="text-xs font-black">{item.duration}</div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src={track.url} 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={handleEnded} 
        autoPlay={isPlaying}
      />
    </div>
  );
}

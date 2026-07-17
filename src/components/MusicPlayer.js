"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicPlayer = MusicPlayer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const PLAYLIST = [
    { id: 1, title: 'Chill Vibes', artist: 'Lofi Maker', duration: '6:12', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 2, title: 'Midnight Coffee', artist: 'Chill Beats', duration: '7:05', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 3, title: 'Rainy Window', artist: 'Sleepy Sound', duration: '5:44', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: 4, title: 'Study Session', artist: 'Focus Flow', duration: '5:02', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
];
function MusicPlayer() {
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(false);
    const [currentTrack, setCurrentTrack] = (0, react_1.useState)(0);
    const [progress, setProgress] = (0, react_1.useState)(0);
    const audioRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (audioRef.current) {
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log('Audio play failed, user interaction needed:', error);
                        setIsPlaying(false);
                    });
                }
            }
            else {
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col font-sans h-full bg-white text-black min-h-[450px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "p-8 flex flex-col items-center bg-primary-yellow border-b-4 border-black relative overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-4 left-4 border-2 border-black p-2 bg-white shadow-[2px_2px_0px_0px_#000]", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Music, { size: 20, strokeWidth: 3 }) }), (0, jsx_runtime_1.jsx)("div", { className: `w-32 h-32 border-4 border-black bg-white rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_#000] mb-6 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`, children: (0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 border-4 border-black bg-primary-yellow rounded-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)("div", { className: "w-3 h-3 bg-black rounded-full" }) }) }), (0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-black text-center uppercase tracking-tight bg-white border-2 border-black px-4 py-1 shadow-[4px_4px_0px_0px_#000] z-10 mb-2", children: track.title }), (0, jsx_runtime_1.jsx)("p", { className: "font-bold text-sm bg-black text-white px-3 py-1 uppercase tracking-widest", children: track.artist })] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-6 bg-white border-b-4 border-black", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-6 flex items-center gap-4", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-black w-10 text-right", children: ["0:", (progress * 0.6).toFixed(0).padStart(2, '0')] }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 h-6 bg-surface-alt border-2 border-black overflow-hidden p-0.5", children: (0, jsx_runtime_1.jsx)("div", { className: "h-full bg-primary-cyan border-r-2 border-black transition-all duration-1000 ease-linear", style: { width: `${progress}%` } }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-black w-10", children: track.duration })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center items-center gap-6", children: [(0, jsx_runtime_1.jsx)("button", { onClick: handlePrev, className: "p-3 border-4 border-black bg-white hover:bg-primary-red transition-all shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none", children: (0, jsx_runtime_1.jsx)(lucide_react_1.SkipBack, { size: 24, strokeWidth: 3 }) }), (0, jsx_runtime_1.jsx)("button", { onClick: handlePlayPause, className: "w-16 h-16 rounded-full border-4 border-black bg-primary-green flex items-center justify-center hover:bg-black hover:text-primary-green transition-all shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none", children: isPlaying ? (0, jsx_runtime_1.jsx)(lucide_react_1.Pause, { size: 32, strokeWidth: 3, className: "ml-0" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Play, { size: 32, strokeWidth: 3, className: "ml-1" }) }), (0, jsx_runtime_1.jsx)("button", { onClick: handleNext, className: "p-3 border-4 border-black bg-white hover:bg-primary-cyan transition-all shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none", children: (0, jsx_runtime_1.jsx)(lucide_react_1.SkipForward, { size: 24, strokeWidth: 3 }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 overflow-y-auto custom-scrollbar bg-surface-alt p-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-black uppercase text-sm mb-4 bg-white border-2 border-black inline-block px-2 shadow-[2px_2px_0px_0px_#000]", children: "Up Next" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-3", children: PLAYLIST.map((item, idx) => ((0, jsx_runtime_1.jsxs)("button", { onClick: () => { setCurrentTrack(idx); setProgress(0); setIsPlaying(true); }, className: `flex items-center p-3 border-2 border-black transition-all shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none text-left ${currentTrack === idx ? 'bg-primary-yellow border-black font-black' : 'bg-white hover:bg-primary-cyan/20 font-bold'}`, children: [(0, jsx_runtime_1.jsx)("div", { className: "w-8 flex justify-center text-xs opacity-50 font-black", children: currentTrack === idx ? (0, jsx_runtime_1.jsx)(lucide_react_1.Disc3, { size: 16, className: "animate-spin" }) : `${idx + 1}.` }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "truncate uppercase text-sm", children: item.title }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs opacity-70 truncate uppercase", children: item.artist })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs font-black", children: item.duration })] }, item.id))) })] }), (0, jsx_runtime_1.jsx)("audio", { ref: audioRef, src: track.url, onTimeUpdate: handleTimeUpdate, onEnded: handleEnded, autoPlay: isPlaying })] }));
}

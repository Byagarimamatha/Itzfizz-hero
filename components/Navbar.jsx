"use client";

export default function Navbar({ mode, setMode, isMuted, setIsMuted, onReplay }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3.5 backdrop-blur-md bg-white/70 border-b border-black/10 transition-all duration-300">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <span className="font-extrabold text-lg tracking-wider text-black font-display">
            ITZFIZZ
          </span>
        </a>
        <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-black/5 text-black/70 border border-black/10">
          Scroll-Driven Hero
        </span>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
        {/* Animation Mode Switcher */}
        <div className="flex items-center bg-black/5 p-1 rounded-full border border-black/10 text-xs">
          <button
            onClick={() => setMode("hybrid")}
            className={`px-2.5 py-1 rounded-full font-medium transition-all ${
              mode === "hybrid"
                ? "bg-black text-white shadow-sm"
                : "text-black/70 hover:text-black"
            }`}
            title="Intro on page load, interactive glow on scroll"
          >
            Hybrid Mode
          </button>
          <button
            onClick={() => setMode("scroll-only")}
            className={`px-2.5 py-1 rounded-full font-medium transition-all ${
              mode === "scroll-only"
                ? "bg-black text-white shadow-sm"
                : "text-black/70 hover:text-black"
            }`}
            title="Stats reveal sequentially on scroll as car advances"
          >
            Scroll Reveal
          </button>
        </div>

        {/* Audio Engine Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-xs font-medium ${
            !isMuted
              ? "bg-[#def54f] border-black/30 text-black font-semibold shadow-sm"
              : "bg-white/80 border-black/15 text-black/70 hover:text-black hover:border-black/30"
          }`}
          title={isMuted ? "Unmute engine sound on scroll" : "Mute engine sound"}
        >
          <span>{isMuted ? "🔇 Sound Off" : "🔊 Engine On"}</span>
        </button>

        {/* Replay Button */}
        <button
          onClick={onReplay}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-black/15 hover:border-black/30 text-black font-medium text-xs transition-all hover:bg-white"
          title="Replay initial load animation"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Replay
        </button>
      </div>
    </header>
  );
}

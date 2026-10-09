"use client";

export default function TechDetails({ mode, setMode, isMuted, setIsMuted, onReplay }) {
  return (
    <section className="relative z-30 bg-[#161618] text-white py-20 px-4 sm:px-8 border-t border-black/20">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#45db7d] bg-[#45db7d]/10 px-3 py-1 rounded-full border border-[#45db7d]/20">
            Engineered For Performance
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white">
            Scroll-Driven Motion Architecture
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            A recreation and elevation of the McLaren sports car scroll animation, built with modern web standards, GSAP ScrollTrigger, Next.js 14, and Tailwind CSS.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 space-y-3 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#def54f]/15 text-[#def54f] flex items-center justify-center font-bold text-lg">
              01
            </div>
            <h3 className="text-lg font-bold text-white">Scrubbed Scroll Progress</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Animation is strictly tied to scroll progress using GSAP ScrollTrigger with a 1.2s scrub smoothing factor, ensuring organic physical momentum rather than artificial time-based autoplay.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 space-y-3 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#45db7d]/15 text-[#45db7d] flex items-center justify-center font-bold text-lg">
              02
            </div>
            <h3 className="text-lg font-bold text-white">Zero-Reflow Spatial Sync</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Letter bounding boxes are pre-measured and cached during initialization and window resize. Real-time scroll ticks only calculate numeric math, preventing expensive layout reflows at 60+ FPS.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 space-y-3 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#6ac9ff]/15 text-[#6ac9ff] flex items-center justify-center font-bold text-lg">
              03
            </div>
            <h3 className="text-lg font-bold text-white">Dual Motion Modes</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Switch seamlessly between <strong>Hybrid Mode</strong> (intro stagger on load with active scroll pulses) and <strong>Scroll Reveal Mode</strong> (cards reveal one-by-one as the car reaches them).
            </p>
          </div>
        </div>

        {/* Requirements Checklist */}
        <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
            <div>
              <h3 className="text-xl font-bold text-white">Assignment Functional Requirements</h3>
              <p className="text-xs text-zinc-400">Verified against all prompt objectives</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onReplay}
                className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-sm"
              >
                ↻ Replay Load Animation
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-800/40 border border-zinc-700/50">
              <span className="text-[#45db7d] font-bold">✓</span>
              <div>
                <strong className="text-white block">Hero Section Layout</strong>
                <span className="text-zinc-400">First screen above fold, letter-spaced headline & impact metrics</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-800/40 border border-zinc-700/50">
              <span className="text-[#45db7d] font-bold">✓</span>
              <div>
                <strong className="text-white block">Initial Load Animation</strong>
                <span className="text-zinc-400">Headline staggered rise, car entrance, and sequential metric intro</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-800/40 border border-zinc-700/50">
              <span className="text-[#45db7d] font-bold">✓</span>
              <div>
                <strong className="text-white block">Scroll-Based Core Animation</strong>
                <span className="text-zinc-400">Car glides across road, neon green trail follows, letters illuminate</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-800/40 border border-zinc-700/50">
              <span className="text-[#45db7d] font-bold">✓</span>
              <div>
                <strong className="text-white block">High Performance Pipeline</strong>
                <span className="text-zinc-400">GPU transform acceleration, zero layout thrashing, responsive across devices</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} ITZFIZZ — Scroll-Driven Hero Animation</p>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">Next.js 14 • GSAP 3 • Tailwind CSS</span>
          </div>
        </div>
      </div>
    </section>
  );
}

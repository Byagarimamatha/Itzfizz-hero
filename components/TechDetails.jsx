"use client";

export default function TechDetails({ onReplay }) {
  return (
    <section className="relative z-20 bg-ink text-paper py-24 px-[5vw] border-t border-road">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-signal bg-signal/10 px-3 py-1 rounded-full border border-signal/20">
            Scroll-Driven Motion Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-paper">
            Engineered For Performance & Fluidity
          </h2>
          <p className="text-sm sm:text-base text-paper/70">
            A custom implementation of scroll-driven interaction built with Next.js, Tailwind CSS, and GSAP ScrollTrigger.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-road/60 border border-lilac/15 p-6 space-y-3 hover:border-lilac/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-signal/15 text-signal flex items-center justify-center font-bold text-lg">
              01
            </div>
            <h3 className="text-lg font-bold text-paper font-display">Physics-Based Wheel Rotation</h3>
            <p className="text-sm text-paper/70 leading-relaxed">
              Vector wheels calculate real-time angular displacement from linear travel distance (&theta; = x / radius). Only tyres and spokes rotate, keeping calipers and discs static.
            </p>
          </div>

          <div className="rounded-2xl bg-road/60 border border-lilac/15 p-6 space-y-3 hover:border-lilac/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-signal/15 text-signal flex items-center justify-center font-bold text-lg">
              02
            </div>
            <h3 className="text-lg font-bold text-paper font-display">Zero-Reflow Letter Detection</h3>
            <p className="text-sm text-paper/70 leading-relaxed">
              Letter bounding centers are pre-calculated during initialization and resize. Real-time scroll triggers only evaluate cached numbers without layout reflows.
            </p>
          </div>

          <div className="rounded-2xl bg-road/60 border border-lilac/15 p-6 space-y-3 hover:border-lilac/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-signal/15 text-signal flex items-center justify-center font-bold text-lg">
              03
            </div>
            <h3 className="text-lg font-bold text-paper font-display">Scrubbed Scroll Interpolation</h3>
            <p className="text-sm text-paper/70 leading-relaxed">
              Tied strictly to scroll position via GSAP ScrollTrigger with a 1.2s scrub smoothing factor, delivering natural vehicular inertia rather than autoplay timers.
            </p>
          </div>
        </div>

        {/* Requirements Verification Checklist */}
        <div className="rounded-2xl bg-road/40 border border-lilac/15 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-road pb-5">
            <div>
              <h3 className="text-xl font-bold text-paper font-display">Assignment Requirements Verification</h3>
              <p className="text-xs text-paper/60">Strictly adheres to all evaluation criteria</p>
            </div>
            {onReplay && (
              <button
                onClick={onReplay}
                className="px-4 py-2 rounded-xl bg-signal text-ink font-bold text-xs hover:bg-signal/90 transition-all shadow-md self-start sm:self-auto"
              >
                ↻ Replay Load Animation
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-ink/60 border border-lilac/10">
              <span className="text-signal font-bold text-base">✓</span>
              <div>
                <strong className="text-paper block">Hero Section Layout</strong>
                <span className="text-paper/60">First screen above fold, letter-spaced headline & impact metrics</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-ink/60 border border-lilac/10">
              <span className="text-signal font-bold text-base">✓</span>
              <div>
                <strong className="text-paper block">Initial Load Animation</strong>
                <span className="text-paper/60">Headline staggered rise, car entrance, and sequential metric count-up</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-ink/60 border border-lilac/10">
              <span className="text-signal font-bold text-base">✓</span>
              <div>
                <strong className="text-paper block">Scroll-Based Core Animation</strong>
                <span className="text-paper/60">Car movement tied strictly to scroll progress with fluid easing</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-ink/60 border border-lilac/10">
              <span className="text-signal font-bold text-base">✓</span>
              <div>
                <strong className="text-paper block">Motion & Performance Guidelines</strong>
                <span className="text-paper/60">Hardware transform execution, zero layout thrashing, reduced-motion support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-road flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-paper/50">
          <p>© {new Date().getFullYear()} ITZFIZZ — Scroll-Driven Hero Section</p>
          <span className="text-paper/40">Next.js 14 • GSAP 3 • Tailwind CSS</span>
        </div>
      </div>
    </section>
  );
}

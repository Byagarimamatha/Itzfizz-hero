"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS_DATA = [
  {
    id: "box1",
    num: 58,
    suffix: "%",
    label: "Increase in pick up point use",
    bgColor: "#def54f", // lime yellow
    textColor: "#111111",
    desktopClass: "md:top-[5%] md:right-[31%] lg:right-[33%]",
    scrollStart: 0.16,
    scrollEnd: 0.36,
  },
  {
    id: "box3",
    num: 27,
    suffix: "%",
    label: "Increase in pick up point use",
    bgColor: "#2e2e2e", // charcoal dark
    textColor: "#ffffff",
    desktopClass: "md:top-[5%] md:right-[6%] lg:right-[9%]",
    scrollStart: 0.58,
    scrollEnd: 0.78,
  },
  {
    id: "box2",
    num: 23,
    suffix: "%",
    label: "Decreased in customer phone calls",
    bgColor: "#6ac9ff", // sky blue
    textColor: "#111111",
    desktopClass: "md:bottom-[5%] md:right-[35%] lg:right-[38%]",
    scrollStart: 0.36,
    scrollEnd: 0.56,
  },
  {
    id: "box4",
    num: 40,
    suffix: "%",
    label: "Decreased in customer phone calls",
    bgColor: "#fa7328", // orange
    textColor: "#111111",
    desktopClass: "md:bottom-[5%] md:right-[8%] lg:right-[11%]",
    scrollStart: 0.76,
    scrollEnd: 0.96,
  },
];

const HEADLINE_LETTERS = [
  "W", "E", "L", "C", "O", "M", "E",
  "\u00A0",
  "I", "T", "Z", "F", "I", "Z", "Z"
];

export default function Hero({ mode = "hybrid", isMuted = true, replayKey = 0 }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const headlineRef = useRef(null);
  const lettersRef = useRef([]);
  const cardRefs = useRef({});
  const cardValueRefs = useRef({});

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCards, setActiveCards] = useState({});

  // Web Audio engine oscillator
  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!isMuted && !audioCtxRef.current) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(55, ctx.currentTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();

        audioCtxRef.current = ctx;
        oscRef.current = osc;
        gainRef.current = gain;
        filterRef.current = filter;
      } catch {}
    } else if (isMuted && gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.05);
    } else if (!isMuted && gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setTargetAtTime(0.04, audioCtxRef.current.currentTime, 0.05);
    }

    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        try {
          audioCtxRef.current.close();
        } catch {}
        audioCtxRef.current = null;
      }
    };
  }, [isMuted]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const road = roadRef.current;
      const car = carRef.current;
      const trail = trailRef.current;
      const letters = lettersRef.current.filter(Boolean);

      if (!road || !car || !trail || letters.length === 0) return;

      let roadWidth = road.offsetWidth;
      let carWidth = car.offsetWidth || 380;
      let startX = -carWidth * 0.12;
      let endX = roadWidth - carWidth * 0.35;
      let letterPositions = [];

      const measure = () => {
        roadWidth = road.offsetWidth;
        carWidth = car.offsetWidth || 380;
        startX = -carWidth * 0.12;
        endX = roadWidth - carWidth * 0.35;

        const roadRect = road.getBoundingClientRect();
        letterPositions = letters.map((letter) => {
          if (!letter) return 0;
          const rect = letter.getBoundingClientRect();
          return rect.left - roadRect.left + rect.width / 2;
        });
      };

      measure();

      // Reset state
      gsap.set(trail, { width: 0 });
      gsap.set(car, { x: startX });

      // Number count up animation helper
      const animateNumbers = () => {
        STATS_DATA.forEach((s) => {
          const el = cardValueRefs.current[s.id];
          if (!el) return;
          const target = s.num;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = Math.round(obj.val) + s.suffix;
            },
          });
        });
      };

      // 1) INITIAL LOAD ANIMATION (Requirement 2)
      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Letters smooth staggered rise & subtle initial presence
      introTl.fromTo(
        letters,
        { opacity: 0, y: 35, scale: 0.9 },
        {
          opacity: mode === "hybrid" ? 0.22 : 0,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.035,
          ease: "power3.out",
        },
        0.1
      );

      // Car entrance: glides onto track
      introTl.fromTo(
        car,
        { x: -carWidth * 1.25 },
        {
          x: startX,
          duration: 1.1,
          ease: "power2.out",
          onUpdate: () => {
            const currentX = gsap.getProperty(car, "x") + carWidth * 0.5;
            gsap.set(trail, { width: Math.max(0, currentX) });
          },
        },
        0.2
      );

      // Statistics cards initial animation
      if (mode === "hybrid") {
        const cardsArray = STATS_DATA.map((s) => cardRefs.current[s.id]).filter(Boolean);
        introTl.fromTo(
          cardsArray,
          { opacity: 0, y: 30, scale: 0.93 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.15,
            ease: "back.out(1.3)",
          },
          0.5
        );
        introTl.add(animateNumbers, 0.6);
      } else {
        // Pure reference-demo mode: start completely invisible
        STATS_DATA.forEach((s) => {
          const el = cardRefs.current[s.id];
          if (el) gsap.set(el, { opacity: 0, scale: 0.9, y: 20 });
        });
      }

      // Update letters, trail, and audio
      const updateCarProgress = (progress) => {
        const currentCarX = gsap.getProperty(car, "x");
        const carFrontX = currentCarX + carWidth * 0.94;

        gsap.set(trail, { width: Math.max(0, Math.min(roadWidth, carFrontX)) });

        letters.forEach((letter, i) => {
          if (!letter) return;
          const letterX = letterPositions[i] || 0;
          if (carFrontX >= letterX) {
            letter.classList.add("lit");
          } else {
            letter.classList.remove("lit");
          }
        });

        if (!isMuted && oscRef.current && filterRef.current && audioCtxRef.current) {
          const baseFreq = 55 + progress * 160;
          const filterFreq = 300 + progress * 1400;
          oscRef.current.frequency.setTargetAtTime(baseFreq, audioCtxRef.current.currentTime, 0.05);
          filterRef.current.frequency.setTargetAtTime(filterFreq, audioCtxRef.current.currentTime, 0.05);
        }

        setScrollProgress(progress);
      };

      // 2) SCROLL-BASED ANIMATION (Requirement 3 & 4)
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=220%",
        pin: trackRef.current,
        scrub: 1.2, // Smooth interpolation and natural momentum
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: () => {
          measure();
        },
        onUpdate: (self) => {
          const p = self.progress;
          const currentX = startX + (endX - startX) * p;
          gsap.set(car, { x: currentX });
          updateCarProgress(p);

          const newActive = {};
          STATS_DATA.forEach((s) => {
            const cardEl = cardRefs.current[s.id];
            if (!cardEl) return;

            if (mode === "scroll-only") {
              if (p >= s.scrollStart) {
                const cardProgress = Math.min(1, (p - s.scrollStart) / (s.scrollEnd - s.scrollStart));
                gsap.set(cardEl, {
                  opacity: cardProgress,
                  scale: 0.9 + 0.1 * cardProgress,
                  y: 20 * (1 - cardProgress),
                });
                newActive[s.id] = cardProgress > 0.8;
              } else {
                gsap.set(cardEl, { opacity: 0, scale: 0.9, y: 20 });
              }
            } else {
              newActive[s.id] = p >= s.scrollStart;
            }
          });
          setActiveCards(newActive);
        },
      });

      const handleResize = () => {
        measure();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        scrollTriggerInstance.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [mode, replayKey, isMuted]);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section ref={containerRef} className="relative w-full bg-[#d1d1d1]">
      {/* 100vh Sticky/Pinned Track Screen */}
      <div
        ref={trackRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between select-none"
      >
        {/* Top Scroll Progress Indicator */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-black/10 z-50">
          <div
            className="h-full bg-black transition-all duration-75"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>

        {/* TOP STAT CARDS CONTAINER */}
        <div className="relative w-full pt-16 sm:pt-20 px-4 md:px-12 z-30 flex-none md:static">
          {/* Mobile flex row fallback */}
          <div className="flex md:hidden gap-3 justify-end items-start w-full">
            {/* Box 1 (58% Lime) */}
            <div
              ref={(el) => (cardRefs.current["box1"] = el)}
              className="stat-card rounded-2xl p-4 shadow-md w-1/2"
              style={{ backgroundColor: "#def54f", color: "#111111" }}
            >
              <span className="text-3xl font-extrabold block">58%</span>
              <p className="text-[11px] font-semibold text-black/85 leading-tight mt-1">
                Increase in pick up point use
              </p>
            </div>
            {/* Box 3 (27% Charcoal) */}
            <div
              ref={(el) => (cardRefs.current["box3"] = el)}
              className="stat-card rounded-2xl p-4 shadow-md w-1/2"
              style={{ backgroundColor: "#2e2e2e", color: "#ffffff" }}
            >
              <span className="text-3xl font-extrabold text-white block">27%</span>
              <p className="text-[11px] font-medium text-white/85 leading-tight mt-1">
                Increase in pick up point use
              </p>
            </div>
          </div>

          {/* Desktop Absolute: Box 1 (58% Lime) */}
          <div
            ref={(el) => (cardRefs.current["box1"] = el)}
            className={`hidden md:flex stat-card absolute ${STATS_DATA[0].desktopClass} flex-col justify-center rounded-2xl p-6 shadow-lg transition-transform duration-300 w-64 lg:w-72 ${
              activeCards["box1"] ? "ring-4 ring-black/20 scale-[1.03]" : ""
            }`}
            style={{ backgroundColor: "#def54f", color: "#111111" }}
          >
            <div className="flex items-baseline justify-between mb-1">
              <span
                ref={(el) => (cardValueRefs.current["box1"] = el)}
                className="text-5xl lg:text-6xl font-extrabold tracking-tight"
              >
                58%
              </span>
              {activeCards["box1"] && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-black text-[#def54f] px-1.5 py-0.5 rounded">
                  Passed
                </span>
              )}
            </div>
            <p className="text-sm font-semibold leading-snug text-black/90">
              Increase in pick up point use
            </p>
          </div>

          {/* Desktop Absolute: Box 3 (27% Charcoal) */}
          <div
            ref={(el) => (cardRefs.current["box3"] = el)}
            className={`hidden md:flex stat-card absolute ${STATS_DATA[1].desktopClass} flex-col justify-center rounded-2xl p-6 shadow-lg transition-transform duration-300 w-64 lg:w-72 ${
              activeCards["box3"] ? "ring-4 ring-white/30 scale-[1.03]" : ""
            }`}
            style={{ backgroundColor: "#2e2e2e", color: "#ffffff" }}
          >
            <div className="flex items-baseline justify-between mb-1">
              <span
                ref={(el) => (cardValueRefs.current["box3"] = el)}
                className="text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
              >
                27%
              </span>
              {activeCards["box3"] && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white text-black px-1.5 py-0.5 rounded">
                  Passed
                </span>
              )}
            </div>
            <p className="text-sm font-medium leading-snug text-white/90">
              Increase in pick up point use
            </p>
          </div>
        </div>

        {/* CENTER ROAD STAGE */}
        <div className="relative w-full my-auto z-20">
          <div
            ref={roadRef}
            className="relative w-full h-[180px] sm:h-[200px] md:h-[210px] bg-[#1e1e1e] overflow-hidden flex items-center shadow-2xl"
          >
            {/* Dynamic Green Trail painted behind the car */}
            <div
              ref={trailRef}
              className="absolute top-0 left-0 h-full bg-[#45db7d] z-10 will-change-[width]"
              style={{ width: "0px" }}
            />

            {/* Letter-Spaced Headline starting at left 4% like reference demo */}
            <div
              ref={headlineRef}
              className="absolute left-[3%] sm:left-[4%] md:left-[5%] top-1/2 -translate-y-1/2 z-20 pointer-events-none select-none flex items-center"
            >
              <h1 className="font-display font-black tracking-[0.16em] sm:tracking-[0.24em] md:tracking-[0.3em] text-[clamp(1.8rem,5.4vw,5.8rem)] leading-none flex items-center">
                {HEADLINE_LETTERS.map((char, idx) => (
                  <span
                    key={idx}
                    ref={(el) => (lettersRef.current[idx] = el)}
                    className="headline-letter inline-block"
                  >
                    {char}
                  </span>
                ))}
              </h1>
            </div>

            {/* Top-Down McLaren Sports Car */}
            <div
              ref={carRef}
              className="absolute top-0 left-0 h-full flex items-center z-30 pointer-events-none will-change-transform"
              style={{ transform: "translate3d(-400px, 0, 0)" }}
            >
              <img
                src={`${basePath}/car.png`}
                alt="McLaren 720S Sports Car Top View"
                className="h-full w-auto object-contain select-none drop-shadow-[0_16px_28px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM STAT CARDS CONTAINER */}
        <div className="relative w-full pb-16 sm:pb-20 px-4 md:px-12 z-30 flex-none md:static">
          {/* Mobile flex row fallback */}
          <div className="flex md:hidden gap-3 justify-end items-end w-full">
            {/* Box 2 (23% Sky Blue) */}
            <div
              ref={(el) => (cardRefs.current["box2"] = el)}
              className="stat-card rounded-2xl p-4 shadow-md w-1/2"
              style={{ backgroundColor: "#6ac9ff", color: "#111111" }}
            >
              <span className="text-3xl font-extrabold text-black block">23%</span>
              <p className="text-[11px] font-semibold text-black/85 leading-tight mt-1">
                Decreased in customer phone calls
              </p>
            </div>
            {/* Box 4 (40% Orange) */}
            <div
              ref={(el) => (cardRefs.current["box4"] = el)}
              className="stat-card rounded-2xl p-4 shadow-md w-1/2"
              style={{ backgroundColor: "#fa7328", color: "#111111" }}
            >
              <span className="text-3xl font-extrabold text-black block">40%</span>
              <p className="text-[11px] font-semibold text-black/85 leading-tight mt-1">
                Decreased in customer phone calls
              </p>
            </div>
          </div>

          {/* Desktop Absolute: Box 2 (23% Sky Blue) */}
          <div
            ref={(el) => (cardRefs.current["box2"] = el)}
            className={`hidden md:flex stat-card absolute ${STATS_DATA[2].desktopClass} flex-col justify-center rounded-2xl p-6 shadow-lg transition-transform duration-300 w-64 lg:w-72 ${
              activeCards["box2"] ? "ring-4 ring-black/20 scale-[1.03]" : ""
            }`}
            style={{ backgroundColor: "#6ac9ff", color: "#111111" }}
          >
            <div className="flex items-baseline justify-between mb-1">
              <span
                ref={(el) => (cardValueRefs.current["box2"] = el)}
                className="text-5xl lg:text-6xl font-extrabold tracking-tight text-black"
              >
                23%
              </span>
              {activeCards["box2"] && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-black text-[#6ac9ff] px-1.5 py-0.5 rounded">
                  Passed
                </span>
              )}
            </div>
            <p className="text-sm font-semibold leading-snug text-black/90">
              Decreased in customer phone calls
            </p>
          </div>

          {/* Desktop Absolute: Box 4 (40% Orange) */}
          <div
            ref={(el) => (cardRefs.current["box4"] = el)}
            className={`hidden md:flex stat-card absolute ${STATS_DATA[3].desktopClass} flex-col justify-center rounded-2xl p-6 shadow-lg transition-transform duration-300 w-64 lg:w-72 ${
              activeCards["box4"] ? "ring-4 ring-black/20 scale-[1.03]" : ""
            }`}
            style={{ backgroundColor: "#fa7328", color: "#111111" }}
          >
            <div className="flex items-baseline justify-between mb-1">
              <span
                ref={(el) => (cardValueRefs.current["box4"] = el)}
                className="text-5xl lg:text-6xl font-extrabold tracking-tight text-black"
              >
                40%
              </span>
              {activeCards["box4"] && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-black text-[#fa7328] px-1.5 py-0.5 rounded">
                  Passed
                </span>
              )}
            </div>
            <p className="text-sm font-semibold leading-snug text-black/90">
              Decreased in customer phone calls
            </p>
          </div>
        </div>

        {/* Scroll Instruction Floating Pill */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 backdrop-blur-sm border border-black/10 text-xs font-semibold text-black/70 pointer-events-none transition-opacity duration-300 z-40"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 3.5) }}
        >
          <span className="inline-block animate-bounce">↓</span>
          <span>Scroll down to drive the car</span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/10">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </section>
  );
}
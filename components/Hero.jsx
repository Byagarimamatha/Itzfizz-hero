"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Car from "./Car";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["WELCOME", "ITZFIZZ"];

const STATS = [
  { value: 72, suffix: "%", label: "faster first response to customer requests" },
  { value: 38, suffix: "%", label: "fewer support calls after launch" },
  { value: 3.4, decimals: 1, suffix: "×", label: "more repeat visits within 30 days" },
  { value: 94, suffix: "%", label: "of customers would recommend us" },
];

const format = (v, s) => v.toFixed(s.decimals || 0) + s.suffix;

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    // gsap.context scopes selectors to this component and cleans up on unmount
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const hero = root.current;
      const headline = q(".headline")[0];
      const carIntro = q(".car-intro")[0];
      const car = q(".car")[0];
      const wheels = q(".wheel");
      const dashes = q(".dashes")[0];
      const statsTop = q(".stats-top")[0];
      const statsBottom = q(".stats-bottom")[0];
      const chars = q(".char");
      const statItems = q(".stat");

      // Cached measurements, updated on refresh only (no layout reads per scroll event)
      let carWidth = 0;
      let startX = 0; // where the car waits at scroll progress 0
      let centers = [];
      let charThresholds = [];
      let boxThresholds = [];

      const measure = () => {
        carWidth = carIntro.offsetWidth;
        centers = chars.map((c) => {
          const r = c.getBoundingClientRect();
          return r.left + r.width / 2;
        });

        const firstChar = centers[0] || 0;
        const lastChar = centers[chars.length - 1] || window.innerWidth;
        const charSpan = Math.max(1, lastChar - firstChar);

        // Letter thresholds: Letter 0 ("W") requires initial scroll, Letter 13 ("Z") activates near ~80%
        charThresholds = centers.map((cx) => {
          const ratio = Math.max(0, Math.min(1, (cx - firstChar) / charSpan));
          return 0.025 + ratio * 0.78; // maps [0, 1] to [0.025, 0.805]
        });

        // Box thresholds: Left metrics (~18-22%) and Right metrics (~56-60%)
        boxThresholds = statItems.map((item, idx) => {
          const r = item.getBoundingClientRect();
          const cardTriggerX = r.left + r.width * 0.3;
          const ratio = Math.max(0, Math.min(1, (cardTriggerX - firstChar) / charSpan));
          const subtleOffset = idx === 2 || idx === 3 ? 0.04 : 0;
          return Math.max(0.07, Math.min(0.85, 0.03 + ratio * 0.75 + subtleOffset));
        });

        // Park the car neatly on the left side of the road
        startX = Math.max(16, window.innerWidth * 0.04);
      };

      // Resting position at the end of the scroll: car fully visible at the right
      const endX = () => window.innerWidth - carWidth - window.innerWidth * 0.04;

      // Wheels roll with the car: angle = distance travelled / wheel radius.
      const rollWheels = () => {
        const x = gsap.getProperty(carIntro, "x") + gsap.getProperty(car, "x");
        const radius = 22 * (carWidth / 400);
        const deg = (x / radius) * (180 / Math.PI);
        wheels.forEach((w) => {
          w.style.transform = `rotate(${deg}deg)`;
        });
      };

      // Dynamic scroll-driven lighting for headline letters and metric boxes
      const updateLighting = (isScrolling, scrollProgress = 0) => {
        // If at or near start (or destination reached in reverse), turn off ALL glowing elements
        if (!isScrolling || scrollProgress <= 0.015) {
          chars.forEach((c) => c.classList.remove("lit"));
          statItems.forEach((b) => b.classList.remove("lit"));
          return;
        }

        const currentX = gsap.getProperty(car, "x");
        const totalTravel = endX() - startX;
        const travelRatio = totalTravel > 0 ? (currentX - startX) / totalTravel : scrollProgress;

        if (travelRatio <= 0.015) {
          chars.forEach((c) => c.classList.remove("lit"));
          statItems.forEach((b) => b.classList.remove("lit"));
          return;
        }

        // 1. Headline characters lighting
        for (let i = 0; i < chars.length; i++) {
          const threshold = charThresholds[i] ?? 0.025 + (i / chars.length) * 0.78;
          chars[i].classList.toggle("lit", travelRatio >= threshold);
        }

        // 2. Metric boxes lighting
        for (let j = 0; j < statItems.length; j++) {
          const threshold = boxThresholds[j] ?? 0.1 + (j / statItems.length) * 0.7;
          statItems[j].classList.toggle("lit", travelRatio >= threshold);
        }
      };

      const countUp = (item, i) => {
        const el = item.querySelector(".stat-value");
        const s = STATS[i];
        const state = { v: 0 };
        return gsap.to(state, {
          v: s.value,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = format(state.v, s);
          },
        });
      };

      const mm = gsap.matchMedia();

      // ---- Full motion ----
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        measure();
        updateLighting(false, 0);

        // 1) Load animation: letters rise in, car rolls into parking spot, stats arrive one by one
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from(chars, { yPercent: 60, opacity: 0, duration: 1, stagger: 0.045 })
          .from(
            carIntro,
            {
              x: () => -(startX + carWidth + 40),
              duration: 1.4,
              ease: "power2.out",
              onUpdate: rollWheels,
            },
            0.3
          )
          .fromTo(statItems, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.14 }, 0.9);
        statItems.forEach((item, i) => intro.add(countUp(item, i), 0.9 + i * 0.14));

        // 2) Scroll: pinned hero, one scrubbed timeline (progress-based, not time-based)
        const onRefreshInit = () => measure();
        ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "+=250%",
              pin: true,
              scrub: 1.2, // smoothing/interpolation so motion eases
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                rollWheels();
                updateLighting(true, self.progress);
              },
              onRefresh: () => {
                measure();
                rollWheels();
                updateLighting(false, 0);
              },
            },
          })
          .fromTo(car, { x: () => startX }, { x: endX, duration: 0.85 }, 0)
          .to(dashes, { x: -900, duration: 0.85 }, 0)
          .to(headline, { y: -25, duration: 0.85 }, 0)
          .to(statsTop, { y: -20, duration: 0.85 }, 0)
          .to(statsBottom, { y: -35, duration: 0.85 }, 0)
          .to({}, { duration: 0.15 }); // hold the finished state at the end

        document.fonts.ready.then(() => ScrollTrigger.refresh());

        return () => ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
      });

      // ---- Reduced motion: static, fully revealed ----
      mm.add("(prefers-reduced-motion: reduce)", () => {
        measure();
        gsap.set(car, { x: endX });
        gsap.set(statItems, { opacity: 1 });
        chars.forEach((c) => c.classList.add("lit"));
        statItems.forEach((b) => b.classList.add("lit"));
        statItems.forEach((item, i) => {
          item.querySelector(".stat-value").textContent = format(STATS[i].value, STATS[i]);
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="relative flex h-svh min-h-[600px] flex-col justify-between overflow-hidden bg-ink py-[4vh] md:py-[5vh]"
    >
      {/* 1. Letter-Spaced Headline (Top) */}
      <h1
        id="hero-title"
        aria-label="Welcome ITZFIZZ"
        className="headline flex flex-col items-center gap-y-1 px-[5vw] text-center font-display text-[10vw] sm:text-[8vw] md:text-[clamp(1.6rem,4.8vw,5.5rem)] font-bold leading-[1.1] tracking-[0.2em] will-change-transform md:flex-row md:flex-wrap md:justify-center md:gap-x-[1.2em] select-none"
      >
        {WORDS.map((word) => (
          <span key={word} aria-hidden="true" className="inline-block tracking-[0.22em] -mr-[0.22em]">
            {[...word].map((letter, i) => (
              <span key={i} className="char">{letter}</span>
            ))}
          </span>
        ))}
      </h1>

      {/* 2. Top 2 Metrics (Directly Under the Headline) */}
      <ul className="stats-top mx-auto grid w-full max-w-[860px] grid-cols-2 gap-3 sm:gap-6 px-[5vw] will-change-transform z-10">
        {STATS.slice(0, 2).map((s) => (
          <li
            key={s.label}
            className="stat stat-box relative flex flex-col justify-center gap-1.5 opacity-0 rounded-2xl p-4 sm:p-5 group cursor-default"
          >
            {/* Ambient specular highlight edge */}
            <div className="specular-line absolute inset-x-5 top-0 h-[1px] bg-gradient-to-r from-transparent via-lilac/40 to-transparent pointer-events-none transition-all duration-300" />

            <strong className="stat-value font-display text-[clamp(1.7rem,3.4vw,2.8rem)] font-bold leading-none tabular-nums text-signal drop-shadow-[0_2px_12px_rgba(255,201,60,0.25)] transition-all duration-300">
              {format(s.value, s)}
            </strong>
            <span className="stat-label text-[0.78rem] sm:text-[0.88rem] text-paper/75 leading-snug font-medium transition-colors duration-300">
              {s.label}
            </span>
          </li>
        ))}
      </ul>

      {/* 3. Center Road & Car Stage */}
      <div className="relative h-[22vh] min-h-[140px] md:h-[26vh]" aria-hidden="true">
        <div className="absolute inset-x-0 bottom-0 h-[38%] overflow-hidden bg-road">
          <div className="dashes absolute -left-[2%] top-1/2 -mt-0.5 h-1 w-[160%] will-change-transform" />
        </div>

        {/* .car-intro = page-load entrance, .car = scroll movement */}
        <div className="car-intro absolute bottom-[22%] left-0 w-[clamp(200px,26vw,400px)] will-change-transform">
          <div className="w-full car will-change-transform">
            <Car />
          </div>
        </div>
      </div>

      {/* 4. Bottom 2 Metrics (Under the Road and Car) */}
      <ul className="stats-bottom mx-auto grid w-full max-w-[860px] grid-cols-2 gap-3 sm:gap-6 px-[5vw] will-change-transform z-10">
        {STATS.slice(2, 4).map((s) => (
          <li
            key={s.label}
            className="stat stat-box relative flex flex-col justify-center gap-1.5 opacity-0 rounded-2xl p-4 sm:p-5 group cursor-default"
          >
            {/* Ambient specular highlight edge */}
            <div className="specular-line absolute inset-x-5 top-0 h-[1px] bg-gradient-to-r from-transparent via-lilac/40 to-transparent pointer-events-none transition-all duration-300" />

            <strong className="stat-value font-display text-[clamp(1.7rem,3.4vw,2.8rem)] font-bold leading-none tabular-nums text-signal drop-shadow-[0_2px_12px_rgba(255,201,60,0.25)] transition-all duration-300">
              {format(s.value, s)}
            </strong>
            <span className="stat-label text-[0.78rem] sm:text-[0.88rem] text-paper/75 leading-snug font-medium transition-colors duration-300">
              {s.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
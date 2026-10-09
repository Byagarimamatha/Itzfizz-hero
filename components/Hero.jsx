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
      const stats = q(".stats")[0];
      const chars = q(".char");
      const statItems = q(".stat");

      // Cached measurements, updated on refresh only (no layout reads per scroll event)
      let carWidth = 0;
      let startX = 0; // where the car waits at scroll progress 0
      let centers = [];
      const lit = chars.map(() => false);

      const measure = () => {
        carWidth = carIntro.offsetWidth;
        centers = chars.map((c) => {
          const r = c.getBoundingClientRect();
          return r.left + r.width / 2;
        });
        // Park the car so its front stops just before the first letter: nothing is lit at the start
        startX = Math.min(centers[0] - carWidth * 0.98 - 6, window.innerWidth * 0.06);
      };

      // Resting position at the end of the scroll: car fully visible at the right
      const endX = () => window.innerWidth - carWidth - window.innerWidth * 0.04;

      // Wheels roll with the car: angle = distance travelled / wheel radius.
      // The wheel radius is 22 units in a 400-unit-wide SVG, so it scales with the car width.
      const rollWheels = () => {
        const x = gsap.getProperty(carIntro, "x") + gsap.getProperty(car, "x");
        const radius = 22 * (carWidth / 400);
        const deg = (x / radius) * (180 / Math.PI);
        wheels.forEach((w) => { w.style.transform = `rotate(${deg}deg)`; });
      };

      // Light each letter once the car's front passes its centre
      const lightLetters = () => {
        const front = gsap.getProperty(carIntro, "x") + gsap.getProperty(car, "x") + carWidth * 0.98;
        for (let i = 0; i < chars.length; i++) {
          const on = front > centers[i];
          if (on !== lit[i]) {
            lit[i] = on;
            chars[i].classList.toggle("lit", on);
          }
        }
      };

      const onCarMove = () => {
        rollWheels();
        lightLetters();
      };

      const countUp = (item, i) => {
        const el = item.querySelector(".stat-value");
        const s = STATS[i];
        const state = { v: 0 };
        return gsap.to(state, {
          v: s.value,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => { el.textContent = format(state.v, s); },
        });
      };

      const mm = gsap.matchMedia();

      // ---- Full motion ----
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        measure();

        // 1) Load animation: letters rise in, car drives on, stats arrive one by one
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from(chars, { yPercent: 60, opacity: 0, duration: 1, stagger: 0.045 })
          .from(
            carIntro,
            { x: () => -(startX + carWidth + 40), duration: 1.4, ease: "power2.out", onUpdate: onCarMove },
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
            onUpdate: onCarMove,
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "+=250%",
              pin: true,
              scrub: 1.2, // smoothing/interpolation so motion eases
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: () => { measure(); onCarMove(); },
            },
          })
          .fromTo(car, { x: () => startX }, { x: endX, duration: 0.85 }, 0)
          .to(dashes, { x: -900, duration: 0.85 }, 0)
          .to(headline, { y: -30, duration: 0.85 }, 0)
          .to(stats, { y: -40, duration: 0.85 }, 0)
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
      className="relative flex h-svh min-h-[560px] flex-col justify-between overflow-hidden bg-ink pb-[6vh] pt-[10vh] md:pt-[12vh]"
    >
      <h1
        id="hero-title"
        aria-label="Welcome ITZFIZZ"
        className="headline flex flex-col items-center gap-y-1 px-[5vw] text-center font-display text-[11.5vw] font-bold leading-[1.1] tracking-[0.14em] will-change-transform md:flex-row md:flex-wrap md:justify-center md:gap-x-[0.9em] md:text-[clamp(1.6rem,5.4vw,6rem)]"
      >
        {WORDS.map((word) => (
          <span key={word} aria-hidden="true" className="inline-block -mr-[0.14em]">
            {[...word].map((letter, i) => (
              <span key={i} className="char">{letter}</span>
            ))}
          </span>
        ))}
      </h1>

      <div className="relative h-[24vh] min-h-[150px] md:h-[28vh]" aria-hidden="true">
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

      <ul className="stats mx-auto grid w-full max-w-[1160px] grid-cols-2 gap-x-6 gap-y-6 px-[5vw] will-change-transform md:grid-cols-4 md:gap-x-10 md:gap-y-8">
        {STATS.map((s) => (
          <li key={s.label} className="flex flex-col gap-2 opacity-0 stat">
            <strong className="stat-value font-display text-[clamp(1.8rem,4vw,3.2rem)] font-medium leading-none tabular-nums text-signal">
              {format(s.value, s)}
            </strong>
            <span className="max-w-[22ch] text-[0.85rem] text-paper/70 md:text-[0.95rem]">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
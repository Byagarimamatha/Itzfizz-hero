// Premium mid-engine GT coupe, side view, facing right. Inline SVG (no image files).
// Keeps the 400 x 130 viewBox, wheel centres (96, 306) and 22-unit wheel radius, so the
// scroll maths in Hero.jsx (wheel rolling, headlight position) works unchanged.
// Only the tyre + spokes rotate; the brake disc and red caliper stay still behind them.

const TYRE =
  "M-22 0 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0 Z M-15.5 0 a15.5 15.5 0 1 0 31 0 a15.5 15.5 0 1 0 -31 0 Z";

// 5 spokes, 72 degrees apart
const SPOKES = [0, 72, 144, 216, 288].map((deg) => {
  const r = (deg - 90) * (Math.PI / 180);
  return `M0 0 L${(14.2 * Math.cos(r)).toFixed(2)} ${(14.2 * Math.sin(r)).toFixed(2)}`;
}).join(" ");

function Wheel({ cx, cy }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {/* static: brake disc + red caliper */}
      <circle r="15" fill="#2c2c44" />
      <circle r="11.5" fill="#4a4a66" />
      <path d="M5 -14 A14.8 14.8 0 0 1 14 -5 L9.5 -2.5 A10.6 10.6 0 0 0 3.4 -9.4 Z" fill="#ff3b4a" />

      {/* rotating: tyre ring, rim edge, spokes, gold hub */}
      <g className="wheel" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d={TYRE} fill="#14122e" fillRule="evenodd" />
        <circle cx="0" cy="-19" r="1.5" fill="#ffc93c" />
        <circle r="15.5" fill="none" stroke="#d9d9e8" strokeWidth="2.2" />
        <path d={SPOKES} stroke="#c9c9d8" strokeWidth="4.2" strokeLinecap="round" />
        <circle r="5.5" fill="#ffc93c" />
        <circle r="2" fill="#12102b" />
      </g>
    </g>
  );
}

export default function Car() {
  return (
    <svg viewBox="0 0 400 130" xmlns="http://www.w3.org/2000/svg" focusable="false" className="block w-full h-auto overflow-visible">
      <defs>
        <linearGradient id="beam" gradientUnits="userSpaceOnUse" x1="384" y1="0" x2="940" y2="0">
          <stop offset="0" stopColor="#fff3c4" stopOpacity="0.6" />
          <stop offset="1" stopColor="#fff3c4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff6b7a" />
          <stop offset="0.35" stopColor="#e0182f" />
          <stop offset="0.75" stopColor="#a50c22" />
          <stop offset="1" stopColor="#5e0616" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b3768" />
          <stop offset="1" stopColor="#0d0b22" />
        </linearGradient>
      </defs>

      {/* headlight beam */}
      <polygon points="384,82 384,90 940,176 940,6" fill="url(#beam)" />

      {/* soft ground shadow */}
      <ellipse cx="200" cy="127" rx="190" ry="4.5" fill="#000" opacity="0.35" />

      {/* rear wing */}
      <path d="M6 70 L40 66 L40 70 L8 76 Z" fill="#1a1635" />
      <path d="M24 70 L26 80" stroke="#1a1635" strokeWidth="3" />

      {/* body: low nose, raked screen, cab-forward cabin, high rear deck */}
      <path
        d="M12 100 L12 80 C12 72 20 68 34 66 L74 62 C96 60 116 56 134 50 C152 42 170 37 196 36 L206 36 C226 38 244 52 262 62 L340 74 C370 78 390 82 392 92 L392 100 Z"
        fill="url(#paint)"
      />
      {/* shoulder highlight */}
      <path d="M30 68 C120 62 200 62 336 77" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.4" fill="none" strokeLinecap="round" />

      {/* side glass + reflection */}
      <path d="M140 58 C154 46 174 41 196 41 L206 41 C224 43 238 53 252 60 Z" fill="url(#glass)" />
      <path d="M170 55 L186 43 L194 43 L178 55 Z" fill="#fff" opacity="0.16" />

      {/* mid-engine air intake */}
      <path d="M96 74 C116 70 140 72 156 78 L150 88 C130 84 110 84 96 86 Z" fill="#0d0b22" />
      <path d="M96 74 C116 70 140 72 156 78" stroke="#ffc93c" strokeWidth="1.2" fill="none" />

      {/* door cut + mirror */}
      <path d="M158 62 C161 76 161 90 154 98 M236 62 L232 98" stroke="#7d0a1c" strokeWidth="1.4" fill="none" />
      <ellipse cx="240" cy="58" rx="7" ry="3.2" fill="#a50c22" stroke="#7d0a1c" strokeWidth="1" />

      {/* side skirt with gold accent, front splitter */}
      <path d="M40 100 L368 100 L368 104 L40 104 Z" fill="#14102e" />
      <path d="M44 99.4 H364" stroke="#ffc93c" strokeWidth="1.2" />
      <path d="M330 102 L394 100 L394 104 L336 105 Z" fill="#14102e" />

      {/* LED headlight + tail light bar + exhaust */}
      <path d="M352 78 L384 83 L382 87 L350 82 Z" fill="#fff8dc" />
      <path d="M12 78 L30 74 L30 78 L12 82 Z" fill="#ff3b4a" />
      <circle cx="14" cy="95" r="3" fill="#2c2c44" stroke="#d9d9e8" strokeWidth="1" />

      {/* wheel arches */}
      <circle cx="96" cy="106" r="27" fill="#12102b" />
      <circle cx="306" cy="106" r="27" fill="#12102b" />

      {/* wheels */}
      <Wheel cx={96} cy={106} />
      <Wheel cx={306} cy={106} />
    </svg>
  );
}

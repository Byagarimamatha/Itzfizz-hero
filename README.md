# Welcome ITZFIZZ — Scroll-Driven Hero Section Animation

> A high-performance, scroll-driven hero section animation built with **Next.js 14**, **Tailwind CSS**, and **GSAP ScrollTrigger**, featuring a custom vector mid-engine GT sports car with physics-based wheel rotation and headlight letter illumination.

---

## 🌟 Assignment Implementation & Features

This project implements the hero section animation assignment inspired by the reference prompt, focusing on fluid motion quality, mathematical precision, and modern frontend best practices.

### 🎯 Requirements Fulfilled:

1. **Hero Section Layout (First Screen / Above the Fold):**
   - Letter-spaced headline: `W E L C O M E   I T Z F I Z Z` in bold grotesk typography (`Unbounded`).
   - Impact metrics and statistics displayed prominently below the road:
     - **72%** faster first response to customer requests
     - **38%** fewer support calls after launch
     - **3.4×** more repeat visits within 30 days
     - **94%** of customers would recommend us
   - Custom road track with animated repeating lane dashes (`repeating-linear-gradient`).

2. **Initial Load Animation:**
   - **Headline:** Letters rise smoothly from below with a staggered reveal (`power3.out`).
   - **Car Entrance:** Vector supercar accelerates onto the track into starting position.
   - **Statistics:** Metrics animate into view one by one with subtle delays and real-time numeric counter count-up (`power2.out`).

3. **Scroll-Based Animation (Core Feature):**
   - The hero section is pinned (`pin: true`) across a scrubbed scroll timeline (`scrub: 1.2` for fluid momentum).
   - Motion is strictly tied to scroll progress (not time-based autoplay).
   - **Physics-Based Wheel Rotation:** Wheels rotate proportional to linear travel distance:
     $$\theta = \frac{\Delta x}{r} \times \frac{180}{\pi}$$
     Only tyres and spokes rotate, while calipers and brake discs remain stationary.
   - **Headlight Letter Illumination:** As the car's headlights pass the center of each letter, the letter activates with a radiant golden glow (`0 0 32px rgba(255, 201, 60, 0.55)`).
   - Full reverse scrubbing supported when scrolling backward.

4. **Motion & Performance Guidelines:**
   - Exclusively GPU-accelerated transforms (`translate3d`, `rotate`).
   - Cached element centers and road dimensions on initialization and resize events—zero DOM layout reflows during the scroll loop.
   - Full accessibility support for `prefers-reduced-motion: reduce`.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router, Static Export `output: "export"`)
- **Animation Engine:** GSAP 3 (GreenSock) + ScrollTrigger Plugin
- **Styling:** Tailwind CSS (Custom Color Tokens & Typography)
- **Vector Artwork:** Inline SVG Mid-Engine Supercar with Dynamic Spoke Geometry

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Static Export
```bash
npm run build
```
Generates the static export in the `out/` directory ready for deployment.

---

## 📦 GitHub Pages Deployment

A GitHub Actions workflow is included at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
1. Push to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your repo on GitHub: Go to **Settings** → **Pages** → select **GitHub Actions** as the build source.
3. The site will deploy to: `https://<your-username>.github.io/<your-repo-name>/`

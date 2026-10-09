# ITZFIZZ — Scroll-Driven Hero Section Animation

> Recreated and elevated hero section scroll animation inspired by the [reference demo](https://paraschaturvedi.github.io/car-scroll-animation), built with **Next.js 14**, **Tailwind CSS**, and **GSAP ScrollTrigger**.

---

## 🌟 Assignment Overview & Objectives

This project recreates the interactive scroll-driven hero section inspired by the reference demo, focusing on motion quality, smoothness, interaction logic, and modern frontend best practices.

### 🎯 Key Requirements Met:
1. **Hero Section Layout (Above the Fold):**
   - Letter-spaced headline: `W E L C O M E   I T Z F I Z Z`.
   - Four distinct impact metric cards (58%, 27%, 23%, 40%) with short descriptions matching the reference color scheme (Lime, Charcoal, Sky Blue, Orange).
   - Horizontal asphalt track (`#1e1e1e`) on a clean grey canvas (`#d1d1d1`).
   - Authentic top-down McLaren sports car driving along the track.

2. **Initial Load Animation (Requirement 2):**
   - Staggered entrance for the headline letters (`fade + upward glide`).
   - Car glides into the starting line on page mount.
   - Impact metrics animate in one by one with a subtle delay (`back.out` easing) and animated numerical count-up (`0% → Target%`).

3. **Scroll-Based Animation (Requirement 3):**
   - Section is pinned using GSAP `ScrollTrigger` with `scrub: 1.2` for fluid easing and momentum.
   - Car position is strictly tied to scroll progress (not time-based autoplay).
   - Dynamic neon green trail (`#45db7d`) paints the road behind the car in real-time.
   - Letters illuminate to solid bold black (`#0a0a0c`) as the car passes their X coordinates.
   - Backward scrolling smoothly reverses the car, trail, and letters.

4. **Performance & Motion Guidelines (Requirement 4):**
   - GPU-accelerated transforms (`translate3d`, `scaleX`) avoiding costly DOM layout reflows during scroll.
   - Bounding boxes and letter centers cached on initialize & resize events.
   - Supports `prefers-reduced-motion` media queries.

5. **Bonus Features:**
   - **Dual Animation Modes:**
     - **Hybrid Mode (Default):** Initial load stagger intro + interactive pulse/milestone highlights on scroll.
     - **Scroll Reveal Mode:** Cards fade in sequentially only when the car reaches their trigger thresholds (matching the reference demo behavior).
   - **Procedural Web Audio Engine:** Realistic sports car revving synthesized with Web Audio API (default muted, toggleable in navbar).
   - **Top Scroll Progress Line:** Visual feedback of the drive's completion percentage.
   - **Replay Control:** Easily replay the entrance animation at any time.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router, Static Export `output: "export"`)
- **Animation Engine:** GSAP 3 (GreenSock) + ScrollTrigger Plugin
- **Styling:** Tailwind CSS (Custom Color Tokens & Responsive Typography)
- **Audio:** Web Audio API (Synthesized engine pitch modulation)
- **Deployment:** GitHub Pages / Vercel

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
Generates a static export in the `out/` folder ready for GitHub Pages or any static host.

---

## 📦 GitHub Pages Deployment

This repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys to GitHub Pages upon pushing to the `main` branch.

### Deployment Steps:
1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. In your GitHub repository, go to **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. The workflow will automatically run, build, and deploy the live site to:
   `https://<your-username>.github.io/<your-repo-name>/`

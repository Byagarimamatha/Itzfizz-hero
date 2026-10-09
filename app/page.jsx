"use client";

import { useState } from "react";
import Hero from "../components/Hero";
import TechDetails from "../components/TechDetails";

export default function Home() {
  const [replayCount, setReplayCount] = useState(0);

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setReplayCount((prev) => prev + 1);
    }, 350);
  };

  return (
    <main className="bg-ink min-h-screen">
      <Hero replayCount={replayCount} onReplay={handleReplay} />
      <TechDetails onReplay={handleReplay} />
    </main>
  );
}
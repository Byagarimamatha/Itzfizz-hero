"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TechDetails from "../components/TechDetails";

export default function Home() {
  const [mode, setMode] = useState("hybrid");
  const [isMuted, setIsMuted] = useState(true);
  const [replayKey, setReplayKey] = useState(0);

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setReplayKey((prev) => prev + 1);
    }, 300);
  };

  return (
    <main className="relative min-h-screen bg-[#d1d1d1]">
      <Navbar
        mode={mode}
        setMode={setMode}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onReplay={handleReplay}
      />
      <Hero
        mode={mode}
        isMuted={isMuted}
        replayKey={replayKey}
      />
      <TechDetails
        mode={mode}
        setMode={setMode}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onReplay={handleReplay}
      />
    </main>
  );
}
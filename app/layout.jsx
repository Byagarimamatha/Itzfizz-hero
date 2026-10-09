import { Unbounded, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Unbounded({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "WELCOME ITZFIZZ — Scroll-Driven Hero Animation",
  description: "High-performance scroll-driven hero section animation built with GSAP ScrollTrigger, Next.js, and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-[#d1d1d1] text-zinc-900 min-h-screen antialiased selection:bg-[#def54f] selection:text-black">
        {children}
      </body>
    </html>
  );
}
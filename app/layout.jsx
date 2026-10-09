import { Unbounded, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Unbounded({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-display" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body" });

export const metadata = {
  title: "Welcome ITZFIZZ",
  description: "A scroll-driven hero section built with Next.js, Tailwind CSS and GSAP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-ink text-paper antialiased min-h-screen">{children}</body>
    </html>
  );
}
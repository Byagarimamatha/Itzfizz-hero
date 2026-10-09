import "./globals.css";

export const metadata = {
  title: "Welcome ITZFIZZ",
  description: "A scroll-driven hero section built with Next.js, Tailwind CSS and GSAP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-ink text-paper antialiased min-h-screen">{children}</body>
    </html>
  );
}
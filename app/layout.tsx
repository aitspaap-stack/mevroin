import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mevreon | Biological Intelligence",
  description: "Bridging the gap between organic complexity and digital precision.",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Mevreon',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover', // Support for notched devices
  themeColor: '#020617', // Dark background color for browser chrome
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (sessionStorage.getItem('mevreon_splash_seen')) {
                document.documentElement.classList.add('splash-seen');
              }
            `,
          }}
        />
        <style dangerouslySetInnerHTML={{ __html: `.content-reveal { opacity: 0; } .splash-seen .content-reveal { opacity: 1 !important; animation: none !important; }` }} />
        <SplashScreen />
        <script
          dangerouslySetInnerHTML={{
            __html: `
               if ('scrollRestoration' in history) {
                 history.scrollRestoration = 'manual';
               }
               window.scrollTo(0, 0);
             `,
          }}
        />
        <div className="content-reveal">
          {children}
        </div>
      </body>
    </html>
  );
}

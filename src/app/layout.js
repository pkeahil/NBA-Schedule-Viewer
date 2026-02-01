import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NBA National TV Schedule Viewer | Filter Games by TV Provider",
  description: "Find NBA games on your TV provider. Filter by ESPN, TNT, ABC, NBC, Prime Video and more. View today's games and upcoming national TV schedule.",
  keywords: "NBA schedule, NBA TV, ESPN, TNT, ABC, NBC, Prime Video, basketball games, national TV games",
  authors: [{ name: "NBA Schedule Viewer" }],
  creator: "NBA Schedule Viewer",
  publisher: "NBA Schedule Viewer",
  robots: "index, follow",
  openGraph: {
    title: "NBA National TV Schedule Viewer",
    description: "Find NBA games on your TV provider. Filter by ESPN, TNT, ABC, NBC, Prime Video and more.",
    url: "https://nbaschd.vercel.app",
    siteName: "NBA Schedule Viewer",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: '/basketball.svg',
    shortcut: '/basketball.svg',
    apple: '/basketball.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import { SessionProvider } from "next-auth/react";
import { Providers } from "./context/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Uno",
  description: "A multiplayer online uno game",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body
        className={`unselectable ${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        
          <Providers>
            {children}
          </Providers>
        
      </body>
    </html>
  );
}

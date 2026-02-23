"use client";

import { Playfair_Display, Inter, Noto_Nastaliq_Urdu, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import NewsletterPopup from "@/components/NewsletterPopup";
import { usePathname } from "next/navigation";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const urdu = Noto_Nastaliq_Urdu({
  variable: "--font-urdu",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <title>LMR ATELIER | Luxury Pakistani Couture</title>
        <meta name="description" content="Handcrafted Luxury Karhai - A heritage of artisanal excellence." />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} ${urdu.variable} ${bodoni.variable} antialiased ${!isAdminRoute ? 'pt-[120px]' : ''}`}
        suppressHydrationWarning={true}
      >
        {!isAdminRoute && <Navbar />}
        <main>
          {children}
        </main>
        {!isAdminRoute && (
          <>
            <NewsletterPopup />
            <FloatingWhatsApp />
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}

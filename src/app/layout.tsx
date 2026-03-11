import type { Metadata } from "next";
import { Cinzel_Decorative, Cinzel, Rajdhani, Lato } from "next/font/google";
import TranslationWrapper from "@/components/layout/TranslationWrapper";
import "./globals.css";

const cinzel = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const cinzelAlt = Cinzel({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-cinzel-alt",
});

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
});

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "A.R.I.V.U — S.H.I.E.L.D",
  description: "Artificial Rural Intelligence for Village Upliftment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${cinzel.variable} ${cinzelAlt.variable} ${rajdhani.variable} ${lato.variable} antialiased bg-bio-black text-bio-cream font-lato selection:bg-bio-green selection:text-bio-black min-h-screen relative overflow-x-hidden`}
      >
        <TranslationWrapper>
            {children}
        </TranslationWrapper>
      </body>
    </html>
  );
}

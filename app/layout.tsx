import type { Metadata } from "next";
import { Great_Vibes, Caveat } from "next/font/google";
import "./globals.css";

const script = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-script", display: "swap" });
const hand = Caveat({ weight: ["500", "600"], subsets: ["latin"], variable: "--font-hand", display: "swap" });

export const metadata: Metadata = {
  title: "Ana & André — 14 maio 2027",
  description: "Convite de casamento de Ana e André, em Castro Verde.",
  openGraph: {
    title: "Ana & André — 14 maio 2027",
    description: "Marca este dia no teu calendário — Castro Verde.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt" className={`${script.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  );
}

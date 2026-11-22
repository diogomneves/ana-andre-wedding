import type { Metadata, Viewport } from "next";
import { Parisienne, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const script = Parisienne({ weight: "400", subsets: ["latin"], variable: "--font-script", display: "swap" });
const hand = Cormorant_Garamond({ weight: ["500", "600", "700"], style: "italic", subsets: ["latin"], variable: "--font-hand", display: "swap" });

export const metadata: Metadata = {
  title: "Ana & André — 14 maio 2027",
  description: "Convite de casamento de Ana e André, em Castro Verde.",
  openGraph: {
    title: "Ana & André — 14 maio 2027",
    description: "Marca este dia no teu calendário — Castro Verde.",
  },
};

export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#f1eee9",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt" className={`${script.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  );
}

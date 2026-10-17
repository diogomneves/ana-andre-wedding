import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}

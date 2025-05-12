import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const Comfortaa = localFont({
  src: "../assets/fonts/Comfortaa-Regular.ttf",
  variable: "--font-comfortaa",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TaskWise",
  description: "task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${Comfortaa.variable} antialiased`}>{children}</body>
    </html>
  );
}

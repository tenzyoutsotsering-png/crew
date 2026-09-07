import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CREW | Your people. Your place. Your thing.",
  description: "The social operating system for communities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

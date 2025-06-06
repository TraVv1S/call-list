import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Call List App",
  description:
    "Sort calls by date and duration, filter by type, listen to call recordings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="max-w-[1440px] mx-auto px-8 py-20">{children}</main>
      </body>
    </html>
  );
}

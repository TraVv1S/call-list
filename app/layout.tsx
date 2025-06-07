import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CallList App",
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
        <main className="container">{children}</main>
      </body>
    </html>
  );
}

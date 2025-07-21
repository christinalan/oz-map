import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ultimate Oz Universe — The Oz Map",
  description: "The most accurate map of Oz ever. Discover the Lost Lands and beyond.",
  icons: [
    { rel: 'icon', url: '/OZ-FAVICON-JUNE-2025-80x80.png', type: 'image/png', sizes: '80x80' },
    { rel: 'icon', url: '/OZ-FAVICON-JUNE-2025-272x272.png', type: 'image/png', sizes: '272x272' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

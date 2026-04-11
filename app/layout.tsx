import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TinyStarAI — Star-Studded Music Videos for Kids",
  description: "Transform any photo into a magical personalized music video starring your child. AI-powered music and video generation in minutes.",
  keywords: "kids music video, personalized song, AI music, custom music video, child gift",
  openGraph: {
    title: "TinyStarAI — Star-Studded Music Videos for Kids",
    description: "Upload a photo, enter their name, and receive a magical music video they'll treasure forever.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></link>" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codebuff App",
  description: "Next.js frontend with Nest.js backend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

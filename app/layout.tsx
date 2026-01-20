import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather Pro - Real-time Weather Forecasts",
  description: "Get real-time weather data and 5-day forecasts for any location worldwide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

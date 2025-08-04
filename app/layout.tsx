import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MovieBase",
  description: "Put some SEO here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className="bg-no-repeat bg-linear-to-br from-blue-300 to-fuchsia-300 dark:from-blue-950 dark:to-fuchsia-950 dark:text-white">
      <ThemeProvider>
        <body className={`${geistSans.variable} antialiased min-h-screen`}>
          <Navbar />
          <div className="max-w-[1400px] w-full p-4 mx-auto">{children}</div>
        </body>
      </ThemeProvider>
    </html>
  );
}

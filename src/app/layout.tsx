import type { Metadata } from "next";
import { Cairo, Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { TrafficTracker } from '@/components/TrafficTracker';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "عشيرة جوالة هندسة عين شمس",
  description: "الموقع الرسمي لعشيرة جوالة كلية الهندسة جامعة عين شمس",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={cn("h-full", "antialiased", cairo.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-cairo text-right">
        {children}
        <TrafficTracker />
        <Toaster position="bottom-right" richColors dir="rtl" />
      </body>
    </html>
  );
}

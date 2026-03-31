import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Velqora | Luxury Live Performance Marketplace",
  description: "Book premium singers, bands, and DJs for your exclusive events. Velqora is the elite marketplace for world-class entertainment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans bg-charcoal text-white`}
      >
        <AuthProvider>
          {children}
          <Toaster position="top-center" richColors theme="dark" />
        </AuthProvider>
      </body>
    </html>
  );
}

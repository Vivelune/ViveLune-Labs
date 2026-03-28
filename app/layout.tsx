import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const manrope = localFont({
  src: [
    {
      path: "./fonts/manrope/Manrope-VariableFont_wght.ttf",
      weight: "200 800", // Manrope supports this range
      style: "normal",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vivelune Academia | Knowledge Hub",
  description: "AI-powered education platform designed to deliver personalized, interactive, and scalable learning experiences across multiple subjects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}

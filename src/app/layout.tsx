import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amine Bouanani — Data Science, AI & Business Intelligence Engineer",
  description:
    "Data Science graduate with expertise in AI, machine learning, and business intelligence. Specializing in Python, R, SQL, Tableau, Power BI, and automation. Turning data into intelligence and intelligence into impact.",
  keywords: "Data Science, AI, Machine Learning, Business Intelligence, Python, R, SQL, Tableau, Power BI, Morocco",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL("https://amine-bouanani.vercel.app"),
  openGraph: {
    title: "Amine Bouanani — Data Science, AI & Business Intelligence Engineer",
    description:
      "Data Science graduate with expertise in AI, machine learning, and business intelligence. Specializing in Python, R, SQL, Tableau, Power BI, and automation.",
    url: "https://amine-bouanani.vercel.app",
    siteName: "Amine Bouanani Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amine Bouanani — Data Science, AI & Business Intelligence Engineer",
    description:
      "Data Science graduate with expertise in AI, machine learning, and business intelligence. Specializing in Python, R, SQL, Tableau, Power BI, and automation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>        
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Inter_Tight, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cutstar — AI-Powered Short-Form Video Edit Engine",
  description:
    "Send us your songs and footage. Cutstar's AI delivers a full batch of beat-synced, viral-optimized edits across multiple styles, ready to post. Months of content, delivered within a day.",
  keywords: [
    "AI video editing",
    "music video editor",
    "TikTok content",
    "short-form video",
    "beat-synced edits",
    "viral video content",
    "AI content creation",
    "music label tools",
  ],
  authors: [{ name: "Cutstar" }],
  openGraph: {
    title: "Cutstar — AI-Powered Short-Form Video Edit Engine",
    description:
      "Months of content, delivered within a day. Our AI delivers beat-synced, viral-optimized edits across multiple styles.",
    siteName: "Cutstar",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cutstar — AI-Powered Short-Form Video Edit Engine",
    description:
      "Months of content, delivered within a day. Our AI delivers beat-synced, viral-optimized edits across multiple styles.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${barlowCondensed.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-text" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

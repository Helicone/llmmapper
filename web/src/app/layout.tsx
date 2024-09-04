import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LLM Mapper | OpenAI to Anthropic API Bridge",
  description:
    "Seamlessly use Anthropic's Claude models with your existing OpenAI API integration. No code changes required - just update your base URL and start leveraging Claude's capabilities instantly.",
  keywords:
    "LLM, AI, OpenAI, Anthropic, Claude, API integration, machine learning",
  openGraph: {
    title: "LLM Mapper | OpenAI to Anthropic API Bridge",
    description: "Seamlessly integrate OpenAI and Anthropic's Claude models",
    type: "website",
    url: "https://llmmapper.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "LLM Mapper | OpenAI to Anthropic API Bridge",
    description:
      "Seamlessly use Anthropic's Claude models with your existing OpenAI API integration",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

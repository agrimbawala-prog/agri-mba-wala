import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://agrimbawala.example"),
  title: {
    default: "AGRI MBA WALA | Practical knowledge for stronger farms",
    template: "%s | AGRI MBA WALA",
  },
  description:
    "AGRI MBA WALA brings farm knowledge, local opportunity, and reliable support closer to the people who need them.",
  applicationName: "AGRI MBA WALA",
  authors: [{ name: "AGRI MBA WALA" }],
  keywords: [
    "agriculture",
    "farming",
    "rural services",
    "farm knowledge",
    "AGRI MBA WALA",
  ],
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "AGRI MBA WALA",
    title: "AGRI MBA WALA | Practical knowledge for stronger farms",
    description:
      "Practical farm knowledge, local opportunity, and reliable support in one welcoming place.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AGRI MBA WALA | Practical knowledge for stronger farms",
    description:
      "Practical farm knowledge, local opportunity, and reliable support in one welcoming place.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

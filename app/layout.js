import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NetworkBackground from "./components/NetworkBackground";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});
const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Christian Rodrigues – IT Support Specialist",
  description:
    "IT Support Specialist in the San Joaquin Valley. Tier I help desk, desktop support, networking, and the occasional ticketing app.",
  openGraph: {
    title: "Christian Rodrigues – IT Support Specialist",
    description:
      "Tier I support for 80+ users on Windows and macOS, plus the developer who builds the tools.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <NetworkBackground />
        {children}
      </body>
    </html>
  );
}

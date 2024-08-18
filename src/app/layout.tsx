import { BlitzProvider } from "./blitz-client";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import "./styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Eventio",
    default: "Eventio",
  },
  description: "Evention is a platform for managing events and attendees.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <BlitzProvider>
          <>{children}</>
        </BlitzProvider>
      </body>
    </html>
  );
}

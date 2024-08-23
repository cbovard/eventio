import { BlitzProvider } from "./blitz-client";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import "./styles/globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Eventio",
    default: "Eventio",
  },
  description: "Eventio is a platform for managing events and attendees.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* todo https://nextjs.org/docs/app/api-reference/functions/generate-viewport */}
        <ColorSchemeScript />
      </head>
      <body className={`${inter.className}`}>
        <MantineProvider defaultColorScheme="dark">
          <BlitzProvider>{children}</BlitzProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

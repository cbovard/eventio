import { BlitzProvider } from "./blitz-client";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import "./styles/globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { AppShell, AppShellHeader, AppShellMain, Text, AppShellFooter } from "@mantine/core";
import { Horizontal } from "mantine-layout-components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Eventio",
    default: "Eventio",
  },
  description: "Eventio is a platform for managing events and attendees.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const thisYear = new Date().getFullYear();

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${inter.className}`}>
        <MantineProvider defaultColorScheme="dark">
          <BlitzProvider>
            <AppShell header={{ height: 45 }} footer={{ height: 60 }} padding="md">
              <AppShellHeader>
                <Horizontal fullH p="xs">
                  <Text fw="bold">Eventio</Text>
                </Horizontal>
              </AppShellHeader>
              <AppShellMain>{children}</AppShellMain>
              <AppShellFooter>
                <Horizontal centerH fullH fullW p="xs">
                  <Text fz="xs" c="dimmed">
                    © copyright {thisYear} Eventio
                  </Text>
                </Horizontal>
              </AppShellFooter>
            </AppShell>
          </BlitzProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

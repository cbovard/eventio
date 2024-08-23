import { BlitzProvider } from "./blitz-client";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import Link from "next/link";
import "./styles/globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Text,
  AppShellFooter,
  Anchor,
  Stack,
  Flex,
  Box,
} from "@mantine/core";

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
                <Stack align="left" justify="center" style={{ height: "100%" }}>
                  <Anchor component={Link} href="/" underline="never" c="gray.3" fw="bold" p="xs">
                    Eventio
                  </Anchor>
                </Stack>
              </AppShellHeader>
              <AppShellMain>{children}</AppShellMain>
              <AppShellFooter>
                <Stack align="center" justify="center" style={{ height: "100%" }}>
                  <Text fz="xs" c="dimmed">
                    © copyright {thisYear} Eventio
                  </Text>
                </Stack>
              </AppShellFooter>
            </AppShell>
          </BlitzProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

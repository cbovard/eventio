import { AppShell, AppShellHeader, AppShellMain, AppShellFooter } from "@mantine/core";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomePage } from "@/components/HomePage";

export default async function Home() {
  return (
    <>
      <AppShell header={{ height: 55 }} footer={{ height: 60 }} padding="md">
        <AppShellHeader>
          <Header />
        </AppShellHeader>
        <AppShellMain>
          <HomePage />
        </AppShellMain>
        <AppShellFooter>
          <Footer />
        </AppShellFooter>
      </AppShell>
    </>
  );
}

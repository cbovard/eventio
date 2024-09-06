import { invoke } from "@/blitz-server";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellFooter,
  Title,
  Stack,
} from "@mantine/core";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
// TODO - clean this up below.
import getCurrentUser from "@/users/queries/getCurrentUser";
import { AuthenticationForm } from "./(auth)/components/MainAuthenticationForm/index";

export default async function Home() {
  const currentUser = await invoke(getCurrentUser, null);
  return (
    <>
      <AppShell header={{ height: 55 }} footer={{ height: 60 }} padding="md">
        <AppShellHeader>
          <Header />
        </AppShellHeader>
        <AppShellMain>
          <Stack align="stretch" justify="flex-start" gap="md">
            <Title>Home</Title>
            {!currentUser && (
              <Stack align="center" justify="center" style={{ height: "100%" }}>
                <AuthenticationForm />
              </Stack>
            )}
          </Stack>
        </AppShellMain>
        <AppShellFooter>
          <Footer />
        </AppShellFooter>
      </AppShell>
    </>
  );
}

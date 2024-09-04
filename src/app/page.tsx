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
import getCurrentUser from "@/users/queries/getCurrentUser";
import { AuthenticationForm } from "./(auth)/components/MainAuthenticationForm/index";
import { Footer } from "@/components/Footer";

export default async function Home() {
  // See todo example above for how to use useCurrentUser hook.
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
            {/* {currentUser && <UserInfo currentUser={currentUser} />} */}
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

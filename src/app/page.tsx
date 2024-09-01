import { invoke } from "@/blitz-server";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Text,
  AppShellFooter,
  Group,
  Anchor,
  Title,
  Stack,
} from "@mantine/core";
import { UserInfo } from "@/components/UserInfo";
import getCurrentUser from "@/users/queries/getCurrentUser";
import Link from "next/link";
import { LogoutButton } from "@/(auth)/components/LogoutButton";
// TODO - clean this up below.
import { AuthenticationForm } from "./(auth)/components/MainAuthenticationForm/index";
// import { CustomBurger } from "@/components/CustomBurger";

export default async function Home() {
  const currentUser = await invoke(getCurrentUser, null);
  const thisYear = new Date().getFullYear();

  return (
    <>
      <AppShell header={{ height: 55 }} footer={{ height: 60 }} padding="md">
        <AppShellHeader>
          <Group justify="space-between" gap="sm" h="55">
            <Anchor component={Link} href="/" underline="never" c="gray.3" fw="bold" p="xs">
              Eventio
            </Anchor>
            {currentUser && (
              <Group justify="flex-end" gap="md">
                <Text fz="sm" c="gray.3">
                  {currentUser.name}!
                </Text>
                <LogoutButton />
              </Group>
            )}
          </Group>
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
          <Stack align="center" justify="center" style={{ height: "100%" }}>
            <Text fz="xs" c="dimmed">
              © copyright {thisYear} Eventio
            </Text>
          </Stack>
        </AppShellFooter>
      </AppShell>
    </>
  );
}

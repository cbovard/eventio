import { invoke } from "@/blitz-server";
import getCurrentUser from "@/users/queries/getCurrentUser";
import { Title, Stack } from "@mantine/core";
import { UserInfo } from "@/components/UserInfo";
// TODO - clean this up below.
import { AuthenticationForm } from "./(auth)/components/MainAuthenticationForm/index";

export default async function Home() {
  const currentUser = await invoke(getCurrentUser, null);

  return (
    <>
      <Stack align="stretch" justify="flex-start" gap="md">
        <Title>Home</Title>
        {currentUser && <UserInfo currentUser={currentUser} />}
        {!currentUser && (
          <Stack align="center" justify="center" style={{ height: "100%" }}>
            <AuthenticationForm />
          </Stack>
        )}
      </Stack>
    </>
  );
}

import { invoke } from "@/blitz-server";
import getCurrentUser from "@/users/queries/getCurrentUser";
import { Vertical } from "mantine-layout-components";
import { Title } from "@mantine/core";
import { UserInfo } from "@/components/UserInfo";
// TODO - clean this up below.
import { AuthenticationForm } from "@/components/MainAuthenticationForm/index";

export default async function Home() {
  const currentUser = await invoke(getCurrentUser, null);

  return (
    <>
      <Vertical spacing="md">
        <Title>Home</Title>
        {currentUser && <UserInfo currentUser={currentUser} />}
        {!currentUser && (
          <Vertical center>
            <AuthenticationForm />
          </Vertical>
        )}
      </Vertical>
    </>
  );
}

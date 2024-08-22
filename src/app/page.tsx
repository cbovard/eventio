import { invoke } from "@/blitz-server";
import getCurrentUser from "@/users/queries/getCurrentUser";
import { UserInfo } from "@/components/UserInfo";
import { Vertical } from "mantine-layout-components";

export default async function Home() {
  const currentUser = await invoke(getCurrentUser, null);

  console.log("home", currentUser);

  return (
    <>
      <Vertical spacing="md">
        <h1>Home</h1>
        <p>Welcome to the Eventio platform.</p>
        <UserInfo currentUser={currentUser} />
      </Vertical>
    </>
  );
}

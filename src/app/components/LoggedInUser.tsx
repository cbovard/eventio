//"use client";
import { invoke } from "@/blitz-server";
import getCurrentUser from "@/users/queries/getCurrentUser";

//import { LogoutButton } from "@/(auth)/components/LogoutButton";

export default async function LoggedInUser() {
  const currentUser = await invoke(getCurrentUser, null);

  console.log(currentUser);
  //return currentUser ? <LogoutButton /> : null;

  return (
    <>
      <div>test</div>
      {/* <LogoutButton /> */}
    </>
  );
}

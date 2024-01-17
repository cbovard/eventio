import getCurrentUser from "./users/queries/getCurrentUser";
import { invoke } from "./blitz-server";
import { UserInfo } from "./components/UserInfo";

export default async function Home() {
  const currentUser = await invoke(getCurrentUser, null);

  return (
    <>
      <main>
        <UserInfo currentUser={currentUser} />
      </main>
    </>
  );
}

import { LogoutButton } from "../(auth)/components/LogoutButton";
import Link from "next/link";
import { Button } from "@mantine/core";

export const UserInfo = ({ currentUser }: { currentUser: any }) => {
  if (!currentUser) return null;
  return (
    <>
      <LogoutButton />
      <div>
        User id: <code>{currentUser.id}</code>
        <br />
        User role: <code>{currentUser.role}</code>
      </div>
    </>
  );
};

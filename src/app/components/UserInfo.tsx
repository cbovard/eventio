import { LogoutButton } from "../(auth)/components/LogoutButton";
import Link from "next/link";
import { Button } from "@mantine/core";

export const UserInfo = ({ currentUser }: { currentUser: any }) => {
  if (currentUser) {
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
  } else {
    return (
      <>
        <Button w="200" radius="md" component={Link} href="/signup">
          Sign Up
        </Button>
        <Button w="200" radius="md" component={Link} href="/login">
          Login
        </Button>
      </>
    );
  }
};

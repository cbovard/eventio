import { LogoutButton } from "../(auth)/components/LogoutButton";
import Link from "next/link";

export const UserInfo = ({ currentUser }) => {
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
        <Link href="/signup">
          <strong>Sign Up</strong>
        </Link>
        <Link href="/login">
          <strong>Login</strong>
        </Link>
      </>
    );
  }
};

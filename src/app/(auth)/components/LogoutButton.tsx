"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@blitzjs/rpc";
import logout from "../mutations/logout";
import { Button } from "@mantine/core";

export function LogoutButton() {
  const router = useRouter();
  const [logoutMutation] = useMutation(logout);
  return (
    <>
      <Button
        size="xs"
        variant="light"
        mr="xs"
        onClick={async () => {
          await logoutMutation();
          router.push("/");
        }}
      >
        Logout
      </Button>
    </>
  );
}

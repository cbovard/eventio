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
        style={{ width: "120px" }}
        mr="xs"
        onClick={async () => {
          await logoutMutation();
          router.refresh();
        }}
      >
        Logout
      </Button>
    </>
  );
}

"use client";
import { Stack, Text } from "@mantine/core";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

export const UserInfo = ({ currentUser }: { currentUser: User }) => {
  if (!currentUser) return null;

  return (
    <>
      <Stack align="stretch" justify="flex-start" gap="lg">
        <Text>
          User id: <code>{currentUser.id}</code>
        </Text>
        <Text>
          User role: <code>{currentUser.role}</code>
        </Text>
      </Stack>
    </>
  );
};

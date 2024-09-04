"use client";
import { Group, Anchor, Text } from "@mantine/core";
import Link from "next/link";
import { LogoutButton } from "@/(auth)/components/LogoutButton";
import { useCurrentUser } from "@/users/hooks/useCurrentUser";

export function Header() {
  const currentUser = useCurrentUser();

  return (
    <>
      <Group justify="space-between" gap="sm" h="55">
        <Anchor component={Link} href="/" underline="never" c="gray.3" fw="bold" p="xs">
          Eventio
        </Anchor>
        {currentUser && (
          <Group justify="flex-end" gap="md">
            <Text fz="sm" c="gray.3">
              {currentUser.name}!
            </Text>
            <LogoutButton />
          </Group>
        )}
      </Group>
    </>
  );
}

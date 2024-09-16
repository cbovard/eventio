"use client";
import { Stack, Title, Button } from "@mantine/core";
import { useCurrentUser } from "@/users/hooks/useCurrentUser";
import { AuthenticationForm } from "@/(auth)/components/MainAuthenticationForm/index";
import { useMutation } from "@blitzjs/rpc";
import adminOnlyMutation from "@/(auth)/mutations/adminOnlyMutation";

export function HomePage() {
  const currentUser = useCurrentUser();

  const [$adminOnlyMutation] = useMutation(adminOnlyMutation);

  console.log("homepage component");

  return (
    <Stack align="stretch" justify="flex-start" gap="md">
      <Title>Home</Title>
      {currentUser && (
        <Stack align="center" justify="center" style={{ height: "100%" }}>
          {currentUser.isAdmin && (
            <Button
              onClick={() => {
                // Don't forget to pass an empty object or zod errors.
                $adminOnlyMutation({});
              }}
              size="lg"
            >
              Admin Button
            </Button>
          )}
        </Stack>
      )}
      {!currentUser && (
        <Stack align="center" justify="center" style={{ height: "100%" }}>
          <AuthenticationForm />
        </Stack>
      )}
    </Stack>
  );
}

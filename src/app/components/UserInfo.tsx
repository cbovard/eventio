import { Stack, Text } from "@mantine/core";

export const UserInfo = ({ currentUser }: { currentUser: any }) => {
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

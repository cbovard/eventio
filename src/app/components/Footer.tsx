import { Text, Stack } from "@mantine/core";

export function Footer() {
  const thisYear = new Date().getFullYear();
  return (
    <>
      <Stack align="center" justify="center" style={{ height: "100%" }}>
        <Text fz="xs" c="dimmed">
          © copyright {thisYear} Eventio
        </Text>
      </Stack>
    </>
  );
}

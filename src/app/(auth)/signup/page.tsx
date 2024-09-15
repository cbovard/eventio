import { Title, Stack } from "@mantine/core";
import { AuthenticationForm } from "../components/MainAuthenticationForm/index";

export default function SignUpPage() {
  return (
    <>
      <Stack align="stretch" justify="flex-start" gap="md">
        <Title>Sign Up</Title>
        <Stack align="center" justify="center" style={{ height: "100%" }}>
          <AuthenticationForm />
        </Stack>
      </Stack>
    </>
  );
}

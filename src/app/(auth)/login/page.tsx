import { Title, Stack } from "@mantine/core";
import { AuthenticationForm } from "../components/MainAuthenticationForm/index";
// import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Stack align="stretch" justify="flex-start" gap="md">
        <Title>Login</Title>
        <Stack align="center" justify="center" style={{ height: "100%" }}>
          <AuthenticationForm />
        </Stack>
      </Stack>
    </>
  );
}

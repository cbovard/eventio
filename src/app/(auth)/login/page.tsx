import { LoginForm } from "../components/LoginForm";
import { Title, Stack } from "@mantine/core";
import { AuthenticationForm } from "../components/MainAuthenticationForm/index";

export default function LoginPage() {
  return <LoginForm />;
  // return (
  //   <>
  //     <Stack align="stretch" justify="flex-start" gap="md">
  //       <Title>Login</Title>
  //       <Stack align="center" justify="center" style={{ height: "100%" }}>
  //         <AuthenticationForm />
  //       </Stack>
  //     </Stack>
  //   </>
  // );
}

"use client";
import { AuthenticationError, PromiseReturnType } from "blitz";
import { FORM_ERROR } from "@/components/Form";
import login from "@/(auth)/mutations/login";
import signup from "@/(auth)/mutations/signup";
import { useMutation } from "@blitzjs/rpc";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";

import {
  Container,
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import { GoogleButton } from "./GoogleButton";
import { FacebookButton } from "./FacebookButton";

export function AuthenticationForm(props: PaperProps) {
  const [$login] = useMutation(login);
  const [$signup] = useMutation(signup);

  const router = useRouter();
  const next = useSearchParams()?.get("next");

  const [type, toggle] = useToggle(["login", "register"]);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => (val.length <= 6 ? "Password should include at least 6 characters" : null),
    },
  });

  const onLogin = async (values: typeof form.values) => {
    try {
      await $login(values);
      console.log("login router: ", router);
      router.refresh();
      console.log("login next: ", next);
      if (next) {
        router.push(next as Route);
      } else {
        router.push("/");
      }
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return { [FORM_ERROR]: "Sorry, those credentials are invalid" };
      } else {
        return {
          [FORM_ERROR]:
            "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
        };
      }
    }
  };

  const onSignup = async (values: typeof form.values) => {
    try {
      await $signup(values);
      router.refresh();
      router.push("/");
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // This error comes from Prisma
        return { email: "This email is already being used" };
      } else {
        return { [FORM_ERROR]: error.toString() };
      }
    }
  };

  const onSubmit = (values: typeof form.values) => {
    if (type === "login") {
      onLogin(values);
    } else {
      onSignup(values);
    }
  };

  return (
    <Container size="lg">
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Welcome to Eventio, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <FacebookButton radius="xl">Facebook</FacebookButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                {...form.getInputProps("name")}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              {...form.getInputProps("email")}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue("terms", event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

"use client";
import { AuthenticationError, PromiseReturnType } from "blitz";
import Link from "next/link";
import { FORM_ERROR } from "src/app/components/Form";
import login from "../mutations/login";
import { Login } from "../validations";
import { useMutation } from "@blitzjs/rpc";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import type { Route } from "next";

import { Button, Group, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login);
  const router = useRouter();
  const next = useSearchParams()?.get("next");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    console.log(values);
    try {
      await loginMutation(values);
      router.refresh();
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

  return (
    <>
      <Title>Login</Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder=""
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
      <Link href={"/forgot-password"}>Forgot your password?</Link>
      Or <Link href="/signup">Sign Up</Link>
    </>
  );
};

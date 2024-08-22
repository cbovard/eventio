"use client";
import { FORM_ERROR } from "src/app/components/Form";
import { ResetPassword } from "../validations";
import resetPassword from "../mutations/resetPassword";
import { useMutation } from "@blitzjs/rpc";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button, Group, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token")?.toString();
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (values) => {
    console.log;
    try {
      await resetPasswordMutation({ ...values, token });
    } catch (error: any) {
      if (error.name === "ResetPasswordError") {
        return {
          [FORM_ERROR]: error.message,
        };
      } else {
        return {
          [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
        };
      }
    }
  };

  return (
    <div>
      <Title>Set a New Password</Title>

      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href="/">homepage</Link>
          </p>
        </div>
      ) : (
        <form onSubmit={form.onSubmit(onSubmit)}>
          <PasswordInput
            withAsterisk
            label="New Password"
            placeholder=""
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          <PasswordInput
            withAsterisk
            label="Password Confirmation"
            placeholder=""
            key={form.key("password")}
            {...form.getInputProps("passwordConfirmation")}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Reset Password</Button>
          </Group>
        </form>
      )}
    </div>
  );
}

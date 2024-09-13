"use client";
import { FORM_ERROR } from "src/app/components/Form";
// import { ForgotPassword } from "../validations";
import forgotPassword from "../mutations/forgotPassword";
import { useMutation } from "@blitzjs/rpc";

import { Button, Group, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

export function ForgotPasswordForm() {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  let onSubmit = async (values: typeof form.values) => {
    console.log(values);
    try {
      await forgotPasswordMutation(values);
    } catch (error: any) {
      return {
        [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
      };
    }
  };

  return (
    <>
      <Title>Forgot your password?</Title>
      <>
        {isSuccess ? (
          <div>
            <h2>Request Submitted</h2>
            <p>
              If your email is in our system, you will receive instructions to reset your password
              shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit">Send Reset Password Instructions</Button>
            </Group>
          </form>
        )}
      </>
    </>
  );
}

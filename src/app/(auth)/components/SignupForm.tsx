"use client";
import { FORM_ERROR } from "src/app/components/Form";
import signup from "../mutations/signup";
import { Signup } from "../validations";
import { useMutation } from "@blitzjs/rpc";
import { useRouter } from "next/navigation";

import { useForm } from "@mantine/form";
import { Button, Group, PasswordInput, TextInput, Title } from "@mantine/core";

type SignupFormProps = {
  onSuccess?: () => void;
};

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup);
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  let onSubmit = async (values: any) => {
    try {
      await signupMutation(values);
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

  return (
    <div>
      <Title>Create an Account</Title>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />

        <TextInput
          withAsterisk
          label="Name"
          placeholder="Your name here..."
          key={form.key("name")}
          {...form.getInputProps("name")}
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
    </div>
  );
};

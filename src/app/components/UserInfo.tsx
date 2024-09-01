"use client";
import { Stack, Text, Button, List, Loader } from "@mantine/core";
import { useQuery } from "@blitzjs/rpc";
import getTodos from "@/todos/queries/getTodos";
import getTodo from "@/todo/queries/getTodo";
import { Suspense } from "react";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

export const UserInfo = ({ currentUser }: { currentUser: User }) => {
  const [singleTodo] = useQuery(getTodo, {});

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

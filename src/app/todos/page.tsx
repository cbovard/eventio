"use client";
import React from "react";
import { BlitzPage } from "@blitzjs/next";
import { Stack, Text, Button, List, Loader } from "@mantine/core";
import { useMutation, useQuery } from "@blitzjs/rpc";
import getTodos from "@/todos/queries/getTodos";
import getTodo from "@/todo/queries/getTodo";
import { Suspense } from "react";
import addTodo from "@/todos/mutations/addTodo";
import { notifications } from "@mantine/notifications";

const Todos = () => {
  const [todos] = useQuery(getTodos, {
    search: "blah",
  });

  const [$addTodo] = useMutation(addTodo, {
    onSuccess: (result) => {
      notifications.show({ title: "Mutation successful", message: result });
    },
  });

  return (
    <Stack gap="md">
      <Button
        onClick={async () => {
          const result = await $addTodo({
            todoTitle: "New Todo to create",
            id: "123",
          });
        }}
        w="150"
        size="md"
      >
        Create Todo
      </Button>
      <List>
        {todos.map((todo: { title: string; id: number }) => (
          <List.Item key={todo.id}>
            <Text>{todo.title}</Text>
          </List.Item>
        ))}
      </List>
    </Stack>
  );
};

export const TodosPage: BlitzPage = () => {
  return (
    <Stack h={300} align="stretch" justify="center" gap="md">
      <Suspense fallback={<Loader />}>
        <Todos />
      </Suspense>
    </Stack>
  );
};

export default TodosPage;

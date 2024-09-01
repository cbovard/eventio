"use client";
import React from "react";
import { BlitzPage } from "@blitzjs/next";
import { Stack, Text, Button, List, Loader, Input } from "@mantine/core";
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

  const [todoTitle, setTodoTitle] = React.useState("");

  const [$addTodo] = useMutation(addTodo, {
    onSuccess: (todo) => {
      notifications.show({ title: "Mutation successful", message: `Created todo: ${todo.title}` });
    },
  });

  return (
    <Stack gap="md">
      <Input
        value={todoTitle}
        onChange={(event) => setTodoTitle(event.currentTarget.value)}
        placeholder="Enter todo Title"
        w="200"
      />
      <Button
        onClick={async () => {
          await $addTodo({
            todoTitle: todoTitle,
          });
        }}
        w="150"
        size="md"
      >
        Create Todo
      </Button>
      <List>
        {todos.map((todo: { title: string; id: string }) => (
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

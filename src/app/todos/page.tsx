"use client";
import React from "react";
import { BlitzPage } from "@blitzjs/next";
import { Stack, Text, Button, List, Loader } from "@mantine/core";
import { useQuery } from "@blitzjs/rpc";
import getTodos from "@/todos/queries/getTodos";
import getTodo from "@/todo/queries/getTodo";
import { Suspense } from "react";

const Todos = () => {
  const [todos] = useQuery(getTodos, {
    search: "blah",
  });

  return (
    <List>
      {todos.map((todo: { title: string; id: number }) => (
        <List.Item key={todo.id}>
          <Text>{todo.title}</Text>
        </List.Item>
      ))}
    </List>
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

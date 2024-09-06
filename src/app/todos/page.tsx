"use client";
import React from "react";
import { BlitzPage } from "@blitzjs/next";
import { Group, Stack, Text, Button, List, Loader, Input, Checkbox } from "@mantine/core";
import { useMutation, useQuery } from "@blitzjs/rpc";

import getTodos from "@/todos/queries/getTodos";
// import getTodo from "@/todo/queries/getTodo";
import { Suspense } from "react";
import addTodo from "@/todos/mutations/addTodo";
import { notifications } from "@mantine/notifications";
import { useCurrentUser } from "@/users/hooks/useCurrentUser";
import toggleTodo from "@/todos/mutations/toggleTodo";
import { useClearQueryCache } from "@/utils/utils";

const Todo = ({ todo }: { todo: { title: string; id: string; done: boolean } }) => {
  // Use the custom hook to get the clear cache function.
  const clearQueryCache = useClearQueryCache();

  const [$toggleTodo] = useMutation(toggleTodo, {
    onSuccess: () => {
      const toggleTodoQueryKey = ["/api/rpc/getTodos", { json: {} }];

      // Call the function returned by the hook to invalidate the query
      clearQueryCache(toggleTodoQueryKey);
      // console.log("Todo Toggled");
    },
  });

  return (
    <Group gap="md">
      <Checkbox
        checked={todo.done}
        onClick={async () =>
          await $toggleTodo({
            id: todo.id,
          })
        }
        onChange={() => {}}
      />
      <Text>{todo.title}</Text>
    </Group>
  );
};

const Todos = () => {
  const user = useCurrentUser();
  const [todos] = useQuery(getTodos, {});
  const [todoTitle, setTodoTitle] = React.useState("");

  // Use the custom hook to get the clear cache function.
  const clearQueryCache = useClearQueryCache();

  const [$addTodo] = useMutation(addTodo, {
    onSuccess: (todo) => {
      notifications.show({
        title: "Mutation successful",
        message: `Created todo: ${todo.title}`,
      });

      const todosQueryKey = ["/api/rpc/getTodos", { json: {} }];

      // Call the function returned by the hook to invalidate the query
      clearQueryCache(todosQueryKey);
      // console.log("Todo added successfully, query cache cleared.");
    },
  });

  return (
    <Stack gap="md">
      {user && <Text>Welcome {user.name} here are your todos!</Text>}
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
        {todos.map((todo: { title: string; id: string; done: boolean }) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </List>
    </Stack>
  );
};

export const TodosPage: BlitzPage = () => {
  return (
    <Stack h={300} align="stretch" justify="center" gap="md" p="md">
      <Suspense fallback={<Loader />}>
        <Todos />
      </Suspense>
    </Stack>
  );
};

export default TodosPage;

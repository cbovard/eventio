"use client";
import React from "react";
import { BlitzPage } from "@blitzjs/next";
import { Group, Stack, Text, Button, List, Loader, Input, Checkbox } from "@mantine/core";
import { useMutation, useQuery, QueryClient } from "@blitzjs/rpc";

import { useQueryClient } from "@tanstack/react-query";

import getTodos from "@/todos/queries/getTodos";
// import getTodo from "@/todo/queries/getTodo";
import { Suspense } from "react";
import addTodo from "@/todos/mutations/addTodo";
import { notifications } from "@mantine/notifications";
import { useCurrentUser } from "@/users/hooks/useCurrentUser";
import toggleTodo from "@/todos/mutations/toggleTodo";

const Todo = ({ todo }: { todo: { title: string; id: string; done: boolean } }) => {
  const [$toggleTodo] = useMutation(toggleTodo);

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

  // const [$addTodo] = useMutation(addTodo, {});

  //const queryClient = useQueryClient();

  // THIS DOES NOT WORK

  // const [$addTodo] = useMutation(addTodo, {
  //   onSuccess: (todo) => {
  //     notifications.show({ title: "Mutation successful", message: `Created todo: ${todo.title}` });

  //     // need to manually invalidate queries now
  //     const queryClient = new QueryClient({
  //       defaultOptions: {
  //         queries: {
  //           retry: 2,
  //         },
  //       },
  //     });

  //     // console.log(queryClient);

  //     // /console.log(queryClient.getQueryCache());

  //     //await queryClient.invalidateQueries();
  //     queryClient.invalidateQueries({ queryKey: ["/api/rpc/getTodos", { json: {} }] });

  //     console.log("add to do mutation success aarrgg");
  //   },
  // });

  const queryClient = useQueryClient();

  const [$addTodo] = useMutation(addTodo, {
    onSuccess: (todo) => {
      notifications.show({
        title: "Mutation successful",
        message: `Created todo: ${todo.title}`,
      });

      const queries = queryClient.getQueryCache().getAll();

      queries.forEach((query) => {
        console.log(JSON.stringify(query.queryKey));
      });

      // Manually invalidate the correct query
      queryClient.invalidateQueries({ queryKey: ["/api/rpc/getTodos", { json: {} }] });

      console.log(queryClient.getQueryCache());

      console.log("add to do mutation success works");
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

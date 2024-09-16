"use client";
import React from "react";
import { Stack, Group, Text, Button, List, Input, Checkbox } from "@mantine/core";
import { useMutation, useQuery, invalidateQuery } from "@blitzjs/rpc";
import { notifications } from "@mantine/notifications";
import { useCurrentUser } from "@/users/hooks/useCurrentUser";
import getTodos from "@/todos/queries/getTodos";
import addTodo from "@/todos/mutations/addTodo";
import toggleTodo from "@/todos/mutations/toggleTodo";
import cleanCompleted from "@/todos/mutations/cleanCompleted";
import { PromiseReturnType } from "blitz";

// Blitz way to get the return type of a promise.
type TodoReturnedFromServer = PromiseReturnType<typeof getTodos>;
type SingleTodo = TodoReturnedFromServer[0];

const Todo = ({ todo }: { todo: SingleTodo }) => {
  // Old way before blizt way.
  //const Todo = ({ todo }: { todo: { title: string; id: string; done: boolean } }) => {
  // Use the custom hook to get the clear cache function.
  //const clearQueryCache = useClearQueryCache();

  const [$toggleTodo, { isLoading }] = useMutation(toggleTodo, {
    onSuccess: () => {
      //const toggleTodoQueryKey = ["/api/rpc/getTodos", { json: {} }];
      // Call the function returned by the hook to invalidate the query
      //clearQueryCache(toggleTodoQueryKey);

      invalidateQuery(getTodos);
      console.log("Todo Toggled");
    },
  });

  return (
    <Group gap="md">
      <Checkbox
        disabled={isLoading}
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

export function Todos() {
  const user = useCurrentUser();
  const [todos] = useQuery(getTodos, {});
  const [todoTitle, setTodoTitle] = React.useState("");

  // Use the custom hook to get the clear cache function.
  //const clearQueryCache = useClearQueryCache();

  const [$addTodo] = useMutation(addTodo, {
    onSuccess: (todo) => {
      notifications.show({
        title: "Mutation successful",
        message: `Created todo: ${todo.title}`,
      });

      //const todosQueryKey = ["/api/rpc/getTodos", { json: {} }];

      invalidateQuery(getTodos);

      // Call the function returned by the hook to invalidate the query
      //clearQueryCache(todosQueryKey);
      console.log("Todo added successfully, query cache cleared.");
    },
  });

  const [$cleanCompleted] = useMutation(cleanCompleted, {
    onSuccess: () => {
      notifications.show({
        title: "Mutation successful",
        message: `Cleaned completed todos`,
      });

      //const todosQueryKey = ["/api/rpc/getTodos", { json: {} }];

      invalidateQuery(getTodos);

      // Call the function returned by the hook to invalidate the query
      //clearQueryCache(todosQueryKey);
      console.log("Todos cleaned successfully, query cache cleared.");
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
      <Button
        onClick={async () => {
          // We need to pass the empty object {} as the input to the mutation.
          $cleanCompleted({});
        }}
        w="220"
        size="md"
      >
        Clean Completed
      </Button>
      <List>
        {todos.map((todo: { title: string; id: string; done: boolean }) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </List>
    </Stack>
  );
}

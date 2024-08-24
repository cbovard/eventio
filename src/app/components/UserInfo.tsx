"use client";
import { Stack, Text, Button, List, Loader } from "@mantine/core";
import { useQuery } from "@blitzjs/rpc";
import getTodos from "@/todos/queries/getTodos";
import getTodo from "@/todo/queries/getTodo";
import { Suspense } from "react";

const Todos = () => {
  const [todos] = useQuery(getTodos, {});

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

interface User {
  id: number;
  name: string | null;
  email: string;
  role: string;
}

export const UserInfo = ({ currentUser }: { currentUser: User }) => {
  const [singleTodo] = useQuery(getTodo, {});

  //console.log("todos", todos);
  console.log("single todo", singleTodo);

  // const fetchTodos = () =>
  //   fetch("/api/todos")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));

  if (!currentUser) return null;

  return (
    <>
      <Stack align="stretch" justify="flex-start" gap="lg">
        {/* <Button onClick={fetchTodos} size="md" style={{ width: "140px" }}>
          Fetch Todos
        </Button> */}
        <Suspense fallback={<Loader />}>
          <Todos />
        </Suspense>
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

import React from "react";
import { BlitzPage } from "@blitzjs/next";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellFooter,
  Title,
  Flex,
  Stack,
  Loader,
} from "@mantine/core";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Suspense } from "react";
import { Todos } from "@/components/Todos";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todos",
};

const TodosPage: BlitzPage = () => {
  return (
    <AppShell header={{ height: 55 }} footer={{ height: 60 }} padding="md">
      <AppShellHeader>
        <Header />
      </AppShellHeader>
      <AppShellMain>
        <Stack align="stretch" justify="flex-start" gap="md">
          <Title>Todos Page</Title>
          <Flex
            h="300"
            p="md"
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            <Todos />
            <Suspense fallback={<Loader />}>{/* <Todos /> */}</Suspense>
          </Flex>
        </Stack>
      </AppShellMain>
      <AppShellFooter>
        <Footer />
      </AppShellFooter>
    </AppShell>
  );
};

// todo - Research Blitz page
TodosPage.authenticate = true;

export default TodosPage;

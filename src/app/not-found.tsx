// https://nextjs.org/docs/app/api-reference/file-conventions/not-found
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
} from "@mantine/core";
import { Container, Text, Button, Group } from "@mantine/core";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import Link from "next/link";

import { Illustration } from "@/components/Illlustration";
import classes from "@/styles/NothingFoundBackground.module.css";

export const metadata: Metadata = {
  title: "404 - Not Found",
};

const NotFound: BlitzPage = () => {
  return (
    <AppShell header={{ height: 55 }} footer={{ height: 60 }} padding="md">
      <AppShellHeader>
        <Header />
      </AppShellHeader>
      <AppShellMain>
        <Container className={classes.root}>
          <div className={classes.inner}>
            <Illustration className={classes.image} />
            <div className={classes.content}>
              <Title className={classes.title}>Nothing to see here</Title>
              <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                Page you are trying to open does not exist. You may have mistyped the address, or
                the page has been moved to another URL. If you think this is an error contact
                support.
              </Text>
              <Group justify="center">
                <Button size="md" component={Link} href="/">
                  Take me back to home page
                </Button>
              </Group>
            </div>
          </div>
        </Container>
      </AppShellMain>
      <AppShellFooter>
        <Footer />
      </AppShellFooter>
    </AppShell>
  );
};

export default NotFound;

"use client";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";

export function CustomBurger() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <Burger size="lg" opened={opened} onClick={toggle} aria-label="Toggle navigation" />
    </>
  );
}

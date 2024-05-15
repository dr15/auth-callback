import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Button,
  Group,
  Title,
} from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();

  return (
    <AppShell header={{ height: 80 }} padding="md">
      <AppShellHeader>
        <Group h="100%" px="md" align="center" justify="space-between">
          <Title>Auth.js Callback</Title>
          {session?.data && (
            <Group>
              <Link href="/protected/one">One</Link>
              <Link href="/protected/two">Two</Link>
              <Link href="/protected/three">Three</Link>
              <Button onClick={() => signOut()}>Sign out</Button>
            </Group>
          )}
        </Group>
      </AppShellHeader>
      <AppShellMain bg="gray.0">{children}</AppShellMain>
    </AppShell>
  );
}

import "@mantine/core/styles.css";

import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <SessionProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </MantineProvider>
  );
}

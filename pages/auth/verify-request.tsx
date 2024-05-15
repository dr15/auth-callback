import { Card, Center } from "@mantine/core";
import { getRedirectForSignedInUser } from "@/server/get-redirect-for-signed-in-user";

import type { GetServerSideProps } from "next/types";

export default function VerifyRequest() {
  return (
    <Center h="100%" bg="gray.0">
      <Card w={480} shadow="sm" padding="lg" radius="md" withBorder>
        <div>Check your email</div>
        <div>
          <div>A sign in link has been sent to your email address.</div>
          <br />
          <div>You can safely close this window.</div>
        </div>
      </Card>
    </Center>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // If user is already logged in, redirect them from signin page to the page they were trying to access
  const redirect = await getRedirectForSignedInUser(context);
  if (redirect) return redirect;

  return {
    props: {},
  };
};

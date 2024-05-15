import { Button, Card, Center } from "@mantine/core";
import { useSearchParams } from "next/navigation";

import { getRedirectForSignedInUser } from "@/server/get-redirect-for-signed-in-user";

import type { GetServerSideProps } from "next/types";

const errorStrings: Record<string, string> = {
  Configuration:
    "There was an error while logging in. Please try again or contact support if the problem persists.",
  AccessDenied: "Unauthorized. Please contact support to gain access.",
  Verification:
    "There was an error while logging in. The link has expired or has already been used. Please try to sign in again.",
  Default:
    "There was an error while logging in. Please try again or contact support if the problem persists.",
};

export default function Error() {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  return (
    <Center h="100%" bg="gray.0">
      <Card w={480} shadow="sm" padding="lg" radius="md" withBorder>
        {error && <Card shadow="none">{errorStrings[error]}</Card>}
        <Button size="md" component="a" href="/auth/signin">
          Back to Sign in
        </Button>
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

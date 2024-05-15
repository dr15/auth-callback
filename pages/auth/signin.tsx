import { Button, Card, Center, Flex } from "@mantine/core";
import { getProviders, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import type { GetServerSideProps } from "next/types";
import type { ReactElement } from "react";
import { getRedirectForSignedInUser } from "@/server/get-redirect-for-signed-in-user";
import { SvgIconWrapper } from "@/components/SvgIconWrapper";

const googleLogo = SvgIconWrapper({
  path: "/google.svg",
  alt: "google logo",
});

const providerIdToLogo: { [key: string]: ReactElement } = {
  google: googleLogo,
};

const errorStrings: Record<string, string> = {
  OAuthSignin:
    "There was an error while logging in. Please try again or contact support if the problem persists.",
  OAuthCallback:
    "There was an error while logging in. Please try again or contact support if the problem persists.",
  OAuthCreateAccount:
    "There was an error while logging in. Please try again or contact support if the problem persists.",
  EmailCreateAccount:
    "There was an error while logging in. Please try again or contact support if the problem persists.",
  Callback:
    "There was an error while logging in. Please try again or contact support if the problem persists.",
  OAuthAccountNotLinked:
    "You might have previously signed in using a different provider. Please try again using a different provider or contact support if the problem persists.",
  EmailSignin:
    "There was an error while sending a verification e-mail. Please try again or contact support if the problem persists.",
  CredentialsSignin:
    "There was an error while logging in. Please try again or contact support if the problem persists.",
  SessionRequired:
    "The content of this page requires you to be signed in at all times. Please try to log in again or contact support if the problem persists",
  MissingCSRF:
    "There was an error while logging in. Please try again or contact support if the problem persists.",
  Default:
    "There was an error while logging in. Please try again or contact support if the problem persists.",
};

export type SignInEmailResult =
  | {
      errorKey: string;
    }
  | undefined;

export default function SignIn({
  providers,
}: {
  providers: {
    [providerName: string]: { name: string; id: string; type: string };
  };
}) {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");
  const callbackUrl = searchParams?.get("callbackUrl");

  return (
    <Center h="100%" bg="gray.0">
      {error && <Card shadow="none">{errorStrings[error]}</Card>}
      <Flex gap={12} direction="column">
        {Object.values(providers)
          .filter((provider) => ["oidc", "oauth"].includes(provider.type))
          .map((provider) => (
            <Button
              key={provider.name}
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: callbackUrl ?? "/",
                  redirect: true,
                })
              }
              variant="outline"
              size="md"
              w="100%"
              leftSection={providerIdToLogo[provider.id]}
            >
              Sign in with {provider.name}
            </Button>
          ))}
      </Flex>
    </Center>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // If user is already logged in, redirect them from signin page to the page they were trying to access
  const redirect = await getRedirectForSignedInUser(context);
  if (redirect) return redirect;

  // Return data for signin page
  const providers = await getProviders();

  return {
    props: { providers },
  };
};

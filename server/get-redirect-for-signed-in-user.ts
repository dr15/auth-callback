import type { GetServerSidePropsContext } from "next";
import { auth } from "@/server/auth";

export async function getRedirectForSignedInUser(
  context: GetServerSidePropsContext,
): Promise<
  | {
      redirect: {
        permanent: boolean;
        destination: string;
      };
      props: object;
    }
  | undefined
> {
  const session = await auth(context);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return undefined;
}

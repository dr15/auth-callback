import type { GetServerSidePropsContext } from "next";
import { auth } from "@/server/auth";

export async function protectedRoute(
  context: GetServerSidePropsContext,
): Promise<
  | { notFound: true }
  | { props: object; redirect?: { permanent: boolean; destination: string } }
> {
  const session = await auth(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/api/auth/signin",
      },
      props: {},
    };
  }

  return { props: { session } };
}

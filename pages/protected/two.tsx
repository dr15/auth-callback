import { GetServerSideProps } from "next/types";
import { protectedRoute } from "@/server/protected-route";
import { Center } from "@mantine/core";

export default function Two() {
  return <Center style={{ fontSize: "160px" }}>2</Center>;
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  protectedRoute(context);

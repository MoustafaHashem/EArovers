import { prisma } from "@/lib/prisma";
import RequestsClient from "./RequestsClient";

export default async function RequestsPage() {
  const requests = await prisma.joinRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <RequestsClient initialRequests={requests} />;
}

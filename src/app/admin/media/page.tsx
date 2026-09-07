import { prisma } from "@/lib/prisma";
import MediaClient from "./MediaClient";

export default async function MediaPage() {
  const mediaList = await prisma.media.findMany({
    orderBy: [
      { sortOrder: "asc" },
      { createdAt: "desc" }
    ],
  });

  return <MediaClient initialMedia={mediaList} />;
}

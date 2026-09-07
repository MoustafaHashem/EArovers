import { prisma } from "@/lib/prisma";
import ShieldsClient from "./ShieldsClient";

export default async function ShieldsPage() {
  const shields = await prisma.shield.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return <ShieldsClient initialShields={shields} />;
}

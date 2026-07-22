import { prisma } from "@/lib/prisma";

export async function getWeddingEvents(
  id: string
) {
  return prisma.event.findMany({
    where: {
      weddingId: id,
    },
    orderBy: {
      startTime: "asc",
    },
  });
}
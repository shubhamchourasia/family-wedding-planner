import { prisma } from "@/lib/prisma";

export async function getWeddingDocuments(
  id: string
) {
  return prisma.document.findMany({
    where: {
      weddingId: id,
    },
    orderBy: {
      uploadedAt: "desc",
    },
  });
}
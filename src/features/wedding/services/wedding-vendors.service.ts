import { prisma } from "@/lib/prisma";

export async function getWeddingVendors(
  id: string
) {
  return prisma.vendor.findMany({
    where: {
      weddingId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
import { prisma } from "@/lib/prisma";

export async function getWeddingBudget(
  id: string
) {
  return prisma.budgetItem.findMany({
    where: {
      weddingId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
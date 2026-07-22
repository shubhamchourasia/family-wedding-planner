import { prisma } from "@/lib/prisma";

export async function getWeddingOverview(
  id: string
) {
  return prisma.wedding.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      brideName: true,
      groomName: true,
      location: true,
      startDate: true,
      description: true,
      overallBudget: true,
    },
  });
}
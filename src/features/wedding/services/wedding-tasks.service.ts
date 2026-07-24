import { prisma } from "@/lib/prisma";

export async function getWeddingTasks(
  id: string
) {
  return prisma.taskList.findMany({
    where: {
      weddingId: id,
    },
    include: {
      tasks: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
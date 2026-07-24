import {
  prisma,
} from "@/lib/prisma";

export async function toggleTaskStatus(
  taskId: string
) {

  const task =
    await prisma.task.findUnique({
      where: {
        id: taskId,
      },
      select: {
        completed: true,
      },
    });

  if (!task) {
    throw new Error(
      "Task not found"
    );
  }

  return prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      completed: !task.completed,
    },
  });

}
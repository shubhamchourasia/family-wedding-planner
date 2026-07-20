import {
  prisma,
} from "@/lib/prisma";

import type {
  TaskCategory,
  TaskAddedBy,
} from "@prisma/client";

export async function createTaskList(
  weddingId: string,
  name: string
) {
  return prisma.taskList.create({
    data: {
      weddingId,
      name,
    },
  });
}

export async function updateTaskList(
  id: string,
  name: string
) {
  return prisma.taskList.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

export async function deleteTaskList(
  id: string
) {
  return prisma.taskList.delete({
    where: {
      id,
    },
  });
}

export async function getTaskListsByWedding(
  weddingId: string
) {
  return prisma.taskList.findMany({
    where: {
      weddingId,
    },

    include: {
      tasks: {
        select: {
          id: true,
          title: true,
          category: true,
          addedBy: true,
          dueDate: true,
          completed: true,
          remarks: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      },
    },

    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function createTask(
  taskListId: string,
  data: {
    title: string;
    category: TaskCategory;
    dueDate?: Date | null;
    remarks?: string | null;
    addedBy: TaskAddedBy;
  }
) {
  return prisma.task.create({
    data: {
      taskListId,
      title: data.title,
      category: data.category,
      dueDate: data.dueDate,
      remarks: data.remarks,
      addedBy: data.addedBy,
    },
  });
}

export async function updateTask(
  id: string,
  data: {
    title: string;
    category: TaskCategory;
    dueDate?: Date | null;
    remarks?: string | null;
    addedBy: TaskAddedBy;
  }
) {
  return prisma.task.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteTask(
  id: string
) {
  return prisma.task.delete({
    where: {
      id,
    },
  });
}
"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  TaskCategory,
  TaskAddedBy,
} from "@prisma/client";

import {
  createTask,
} from "../services/task.service";

export async function createTaskAction(
  weddingId: string,
  taskListId: string,
  values: {
    title: string;
    category: TaskCategory;
    dueDate?: Date | null;
    remarks?: string | null;
    addedBy: TaskAddedBy;
  }
) {
  try {
    await createTask(
      taskListId,
      values
    );

    revalidatePath(
      `/weddings/${weddingId}`
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Failed to create task.",
    };
  }
}
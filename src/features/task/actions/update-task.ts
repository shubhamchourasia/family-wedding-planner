"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  updateTask,
} from "../services/task.service";

export async function updateTaskAction(
  weddingId: string,
  id: string,
  values: {
    title: string;
    category: any;
    dueDate?: Date | null;
    remarks?: string | null;
    addedBy: any;
  }
) {
  try {
    await updateTask(
      id,
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
      error: "Failed to update task.",
    };
  }
}
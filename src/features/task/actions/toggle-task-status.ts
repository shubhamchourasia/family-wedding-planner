"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  toggleTaskStatus,
} from "../services/toggle-task-status.service";

export async function toggleTaskStatusAction(
  weddingId: string,
  taskId: string
) {

  try {

    await toggleTaskStatus(
      taskId
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
      error:
        "Failed to update task status.",
    };

  }

}
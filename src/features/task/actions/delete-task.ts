"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  deleteTask,
} from "../services/task.service";

export async function deleteTaskAction(
  weddingId: string,
  id: string
) {
  try {

    await deleteTask(
      id
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
      error: "Failed to delete task.",
    };

  }
}
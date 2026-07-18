"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  updateTaskList,
} from "../services/task.service";

export async function updateTaskListAction(
  weddingId: string,
  id: string,
  name: string
) {
  try {

    await updateTaskList(
      id,
      name
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
      error: "Failed to update task list.",
    };

  }
}
"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  deleteTaskList,
} from "../services/task.service";

export async function deleteTaskListAction(
  weddingId: string,
  id: string
) {
  try {

    await deleteTaskList(
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
      error: "Failed to delete task list.",
    };

  }
}
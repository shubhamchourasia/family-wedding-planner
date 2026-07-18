"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  createTaskList,
} from "../services/task.service";


export async function createTaskListAction(
  weddingId: string,
  name: string
) {
  try {

    await createTaskList(
      weddingId,
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
      error: "Failed to create task list.",
    };

  }
}
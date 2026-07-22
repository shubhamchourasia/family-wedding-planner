"use server";

import {
  getWeddingTasks,
} from "../services/wedding-tasks.service";


export async function getWeddingTasksAction(
  weddingId: string
) {

  try {

    const data =
      await getWeddingTasks(
        weddingId
      );

    return {
      success: true,
      data,
    };

  } catch (error) {

    console.error(
      "Fetch wedding tasks failed",
      error
    );

    return {
      success: false,
      error: "Unable to fetch wedding tasks",
    };

  }

}
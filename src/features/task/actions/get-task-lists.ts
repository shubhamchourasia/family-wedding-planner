"use server";

import {
  getTaskListsByWedding,
} from "../services/task.service";


export async function getTaskListsAction(
  weddingId: string
) {

  try {

    const taskLists =
      await getTaskListsByWedding(
        weddingId
      );


    return {
      success: true,
      data: taskLists,
    };


  } catch (error) {

    console.error(
      "Failed to fetch task lists",
      error
    );


    return {
      success: false,
      error: "Unable to fetch task lists.",
    };

  }

}
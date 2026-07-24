"use server";

import {
  getWeddingDocuments,
} from "../services/wedding-documents.service";


export async function getWeddingDocumentsAction(
  weddingId: string
) {

  try {

    const data =
      await getWeddingDocuments(
        weddingId
      );

    return {
      success: true,
      data,
    };

  } catch (error) {

    console.error(
      "Fetch wedding documents failed",
      error
    );

    return {
      success: false,
      error: "Unable to fetch wedding documents",
    };

  }

}
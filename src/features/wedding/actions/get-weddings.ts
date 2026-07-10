"use server";


import { getWeddings } from "../services/wedding.service";


// Temporary until Supabase Auth
async function getCurrentUserId() {
  return "development-user-id";
}



export async function getWeddingsAction() {

  try {

    const ownerId =
      await getCurrentUserId();



    const weddings =
      await getWeddings(ownerId);



    return {
      success: true,
      data: weddings,
    };


  } catch(error) {

    console.error(
      "Fetch weddings failed",
      error
    );


    return {
      success: false,
      error: "Unable to fetch weddings",
    };

  }

}
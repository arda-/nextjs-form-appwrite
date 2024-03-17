"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { fromErrorToFromState } from "./utils";
import type { FormState } from "./utils";

import { databases, DATABASE_ID, COLLECTION_IDS } from "./lib/appwrite";
import { ID, Models } from "appwrite";

type Message = {
  text: string;
};

let messages = [];

export const getMessages = async (): Promise<Models.Document[]> => {
  try {
    const dbResponse = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_IDS.MESSAGES,
      []
    );
    // console.log(
    //   "fetched view settings",
    //   JSON.stringify(dbResponse.documents, null, 2)
    // );
    return dbResponse.documents;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const createMessageSchema = z.object({
  text: z.string().min(1).max(200),
});

export const createMessage = async (
  formState: FormState,
  formData: FormData
) => {
  try {
    const data = createMessageSchema.parse({
      text: formData.get("text"),
    });

    const newDoc = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_IDS.MESSAGES,
      ID.unique(),
      data
    );

    // throw new Error('Database error'); for error simulation
  } catch (error) {
    return fromErrorToFromState(error);
  }

  revalidatePath("/");

  return toFormState("SUCCESS", "Message created");
};

export const toFormState = (
  status: FormState["status"],
  message: string
): FormState => {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  };
};

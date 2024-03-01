"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { fromErrorToFromState } from "./utils";
import type { FormState } from "./utils";

type Message = {
  id: string;
  text: string;
};

/*export type FormState = {
    message: string;
  };*/


let messages: Message[] = [
  {
    id: crypto.randomUUID(),
    text: "First Message",
  },
  {
    id: crypto.randomUUID(),
    text: "Second Message",
  },
  {
    id: crypto.randomUUID(),
    text: "Third Message",
  },
];

export const getMessages = async (): Promise<Message[]> => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  return Promise.resolve(messages);
};

const createMessageSchema = z.object({
    text: z.string().min(1).max(191),
    title: z.string().min(1).max(191),
});

export const createMessage = async (formState: FormState, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 350));

  try {
    const data = createMessageSchema.parse({
        text: formData.get("text"),
        title: formData.get("title"),
      });
    
      messages.push({
        id: crypto.randomUUID(),
        ...data,
      });
      // throw new Error('Database error'); for error simulation
  } catch (error) {
    return fromErrorToFromState(error);
  }

  revalidatePath("/");

  return toFormState('SUCCESS', 'Message created');
};

export const toFormState = (
    status: FormState['status'],
    message: string
  ): FormState => {
    return {
      status,
      message,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  };

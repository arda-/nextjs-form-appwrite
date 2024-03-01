import { ZodError } from "zod";

export type FormState = {
  message: string;
};

export const fromErrorToFromState = (error: unknown) => {
  // if validatoin error with Zod, return first error message
  if (error instanceof ZodError) {
    return {
      message: error.errors[0].message,
    };
    /**
     * if another error instance, return error message. (Database)
     */
  } else if (error instanceof Error) {
    return {
      message: error.message,
    };
  } else {
    return {
      message: "An unknown error occurred",
    };
  }
};

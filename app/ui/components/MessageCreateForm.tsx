"use client";

import { createMessage } from "@/app/actions";
import { useFormStatus, useFormState } from "react-dom";

type SubmitButtonProps = {
  label: string;
  loading: React.ReactNode;
};

const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className="border-2">
      {pending ? loading : label}
    </button>
  );
};

function MessageCreateForm() {
  const [formState, action] = useFormState(createMessage, {
    message: '',
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <label htmlFor="title">Title</label>
      <input id="title" name="title" className="border-2" />
      
      <label htmlFor="text">Text</label>
      <textarea id="text" name="text" className="border-2" />

      <SubmitButton label="Create" loading="Creating ..." />
    </form>
  );
}

export { MessageCreateForm };

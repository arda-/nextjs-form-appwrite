"use client";

import { createMessage } from "@/app/actions";
import { useFormStatus, useFormState } from "react-dom";
import { EMPTY_FORM_STATE } from "@/app/utils";
import { FieldError } from "./FieldError";
import { useToastMessage } from "@/app/ui/hooks/useToastMessage";
import { useFormReset } from "@/app/ui/hooks/useFormReset";

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
  const [formState, action] = useFormState(createMessage, EMPTY_FORM_STATE);

  const noScriptFallback = useToastMessage(formState);
  const formRef = useFormReset(formState);

  return (
    <form action={action} ref={formRef} className="flex flex-col gap-y-2">
      <label htmlFor="text">Text</label>
      <textarea id="text" name="text" className="border-2" />
      <FieldError formState={formState} name="text" />

      <SubmitButton label="Create" loading="Creating ..." />

      {noScriptFallback}
    </form>
  );
}

export { MessageCreateForm };

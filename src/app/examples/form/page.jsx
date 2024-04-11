"use client";

import { useFormStatus, useFormState } from "react-dom";
import { formAction } from "./actions";

export default function Page() {
  const { pending } = useFormStatus();
  const [state, action] = useFormState(formAction, null);

  console.log(state);

  return (
    <form action={action}>
      <input type="text" name="name" />
      <button disabled={pending}>{pending ? "Submitting..." : "Submit"}</button>
      {state}
    </form>
  );
}

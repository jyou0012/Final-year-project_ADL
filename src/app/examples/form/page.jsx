"use client";

import { useFormStatus, useFormState } from "react-dom";
import { formAction } from "./actions";

export default function Page() {
  const { pending } = useFormStatus();

  return (
    <form action={formAction}>
      <input type="text" name="start" />
      <button disabled={pending}>{pending ? "Submitting..." : "Submit"}</button>
    </form>
  );
}

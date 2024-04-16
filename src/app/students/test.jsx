"use client";

import React, { useState, useEffect } from 'react';
import { useFormStatus, useFormState } from "react-dom";
import { formAction } from "./actions";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';



export default function Page() {
  const { pending } = useFormStatus();
  const [state, action] = useFormState(formAction, null);
  const [alertType, setAlertType] = useState(null);  // 新状态用于控制弹窗类型

  useEffect(() => {
    if (state === "form request received") {
      setAlertType('success');
    } else if (state === 0) {
      setAlertType('error');
    }else if (state === 1) {
      setAlertType('error');
    }else if (state === 2) {
      setAlertType('error');
    }
  }, [state]);

  return (
    <form action={action}>
     
     {alertType === 'success' && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            This is a success Alert with an encouraging title.
          </Alert>
        </Stack>
      )}
      {alertType === 'error' && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error Alert with a scary title.
        </Alert>
      )}

      <input type="text" name="name" />
      <button disabled={pending}>{pending ? "Submitting..." : "Submit"}</button>
     
    </form>
  );
}

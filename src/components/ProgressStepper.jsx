import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

export default function ProgressStepper({
  draftUpdatedTime,
  finalUpdatedTime,
}) {
  return (
    <Stepper alternativeLabel>
      <Step active={draftUpdatedTime ? true : false}>
        <StepLabel>
          {draftUpdatedTime
            ? "Draft Saved (" +
              dayjs(new Date(draftUpdatedTime).toISOString()).format(
                "DD/MM/YYYY",
              ) +
              ")"
            : "Draft Unsaved"}
        </StepLabel>
      </Step>
      <Step active={finalUpdatedTime ? true : false}>
        <StepLabel>
          {finalUpdatedTime
            ? "Final Submitted (" +
              dayjs(new Date(finalUpdatedTime).toISOString()).format(
                "DD/MM/YYYY",
              ) +
              ")"
            : "Final Unsubmitted"}
        </StepLabel>
      </Step>
    </Stepper>
  );
}

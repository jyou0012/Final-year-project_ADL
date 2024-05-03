import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

export default function ProgressStepper({
  draftUpdatedTime,
  finalUpdatedTime,
}) {
  return (
    <Box my="2%" width="40%" px="30%">
      <Stepper alternativeLabel>
        <Step active={draftUpdatedTime ? true : false}>
          <StepLabel>
            {draftUpdatedTime
              ? "Draft Saved (" +
                new Date(draftUpdatedTime).toLocaleDateString() +
                ")"
              : "Draft Unsaved"}
          </StepLabel>
        </Step>
        <Step active={finalUpdatedTime ? true : false}>
          <StepLabel>
            {finalUpdatedTime
              ? "Final Submitted (" +
                new Date(finalUpdatedTime).toLocaleDateString() +
                ")"
              : "Final Unsubmitted"}
          </StepLabel>
        </Step>
      </Stepper>
    </Box>
  );
}

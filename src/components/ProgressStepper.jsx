import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

export default function ProgressStepper() {
  return (
    <Box my="2%" width="40%" px="30%">
      <Stepper activeStep={1} alternativeLabel>
        <Step>
          <StepLabel>Save Draft (03-04-2024)</StepLabel>
        </Step>
        <Step active={false}>
          <StepLabel>Submit Timesheet</StepLabel>
        </Step>
      </Stepper>
    </Box>
  );
}

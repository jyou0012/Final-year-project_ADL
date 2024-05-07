import Box from "@mui/material/Box";
import WeekOverviewTable from "../../components/WeekOverviewTable";
import CsvUploadButton from '../../components/CsvUploadButton'; // Ensure the path is correct

export default function ConditionView() {
  return (
    <Box sx={{ p: 2 }}>
      <CsvUploadButton />
      <WeekOverviewTable />
      
    </Box>
  );
}


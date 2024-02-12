import { NFTItem } from "@/types";
import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Image from "next/image";

export const AnalyticsCard = ({
  name,
  number,
  over,
}: {
  number: number;
  over?: number;
  name: string;
}) => {
  return (
    <Paper>
      <Typography>{name}</Typography>

      <Box>
        <Typography>{number}</Typography>
        <Typography>{over}</Typography>
      </Box>
    </Paper>
  );
};

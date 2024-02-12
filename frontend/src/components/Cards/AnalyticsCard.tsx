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
    <Paper
      sx={{
        p: "1rem",
        borderRadius: "0.5rem",
      }}
    >
      <Typography color="text.secondary" variant="body2">
        {name}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          mt: "0.2rem",
          gap: "8px",
        }}
      >
        <Typography variant="h3" color="text.primary">
          {number}
        </Typography>
        <Typography variant="body1" sx={{ position: "relative", top: "-4px" }}>
          {over ? `/ ${over}` : ""}
        </Typography>
      </Box>
    </Paper>
  );
};

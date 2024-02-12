import { AnalyticsCard } from "@/components/Cards/AnalyticsCard";
import { Grid } from "@mui/material";

export const TopSummary = () => {
  return (
    <Grid container maxWidth="lg" sx={{ margin: "auto" }} spacing={2}>
      <Grid item xs={4}>
        <AnalyticsCard name="Your Score" number={2} over={10} />
      </Grid>
      <Grid item xs={4}>
        <AnalyticsCard name="Total NFT you owned" number={2} />
      </Grid>
      <Grid item xs={4}>
        <AnalyticsCard name="Total NFT Minted" number={2} />
      </Grid>
    </Grid>
  );
};

export default TopSummary;

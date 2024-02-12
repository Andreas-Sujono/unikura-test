import { AnalyticsCard } from "@/components/Cards/AnalyticsCard";
import { Grid } from "@mui/material";

export const TopSummary = () => {
  return (
    <Grid>
      <Grid item>
        <AnalyticsCard name="Your Score" number={2} over={10} />
      </Grid>
      <Grid item>
        <AnalyticsCard name="You have" number={2} />
      </Grid>
      <Grid item>
        <AnalyticsCard name="Total NFT Minted" number={2} />
      </Grid>
    </Grid>
  );
};

export default TopSummary;

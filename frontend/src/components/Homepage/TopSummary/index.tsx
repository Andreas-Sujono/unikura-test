"use client";
import { useGetTopSummaryData } from "@/api/nft";
import { AnalyticsCard } from "@/components/Cards/AnalyticsCard";
import { Grid } from "@mui/material";

export const TopSummary = () => {
  const data = useGetTopSummaryData();
  return (
    <Grid container maxWidth="lg" sx={{ margin: "auto", gap: "1rem" }}>
      <Grid item xs={12} md={4}>
        <AnalyticsCard
          name="Your Score"
          number={data.userScore}
          over={data.totalScore}
        />
      </Grid>
      <Grid item xs={12} md={3.7}>
        <AnalyticsCard name="Total NFT you owned" number={data.ownNft} />
      </Grid>
      <Grid item xs={12} md={3.6}>
        <AnalyticsCard name="Total NFT Minted" number={data.totalNft} />
      </Grid>
    </Grid>
  );
};

export default TopSummary;

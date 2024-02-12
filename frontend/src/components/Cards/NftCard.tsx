import { NFTItem } from "@/types";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Image from "next/image";

export const NFTCard = ({ nft }: { nft: NFTItem }) => {
  return (
    <Paper
      sx={{
        background: "#49495e4a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: "1rem",
        borderRadius: "1rem",
      }}
    >
      <Image src={nft.imageURL} alt={nft.name} width={200} height={200} />
      <Typography>{nft.name} </Typography>
    </Paper>
  );
};

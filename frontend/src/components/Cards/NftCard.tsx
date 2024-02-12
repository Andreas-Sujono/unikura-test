import { NFTItem } from "@/types";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Image from "next/image";

export const NFTCard = ({ nft }: { nft: NFTItem }) => {
  return (
    <Paper>
      <Image src={nft.imageURL} alt={nft.name} width={200} height={200} />
      <Typography>{nft.name}</Typography>
    </Paper>
  );
};

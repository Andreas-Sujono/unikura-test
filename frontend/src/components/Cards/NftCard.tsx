import { NFTItem } from "@/types";
import { Typography, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Image from "next/image";

export const NFTCard = ({ nft }: { nft: NFTItem }) => {
  return (
    <Paper
      sx={{
        background: "#49495e4a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "1rem",
        minWidth: "200px",
        position: "relative",
      }}
    >
      <Image
        src={nft.imageURL}
        alt={nft.name}
        width={200}
        height={300}
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          width: "100%",
          padding: "1rem",
          boxSizing: "border-box",
          position: "absolute",
          bottom: "0",
          left: "0",
          background: "linear-gradient(177deg, transparent 0%, #000000e4 100%)",
          paddingTop: "5rem",
        }}
      >
        <Typography>{nft.name}</Typography>

        <div>
          <Typography display="inline" variant="body2" color="text.secondary">
            Score: &nbsp;
          </Typography>
          <Typography display="inline" variant="body2" color="text.secondary">
            {nft.attributes.find((item) => item.traitType === "Score")?.value}
          </Typography>
        </div>
      </Box>
    </Paper>
  );
};

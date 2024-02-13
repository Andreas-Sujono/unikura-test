import { useGetAllMintedNFT, useMintNFT } from "@/api/nft";
import { blockchains } from "@/constants";
import { useWallet } from "@/hooks/useWallet";
import { getBlockchainMetadata } from "@/utils";
import Swal from "sweetalert2";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useState } from "react";

export default function MintPage() {
  const [selectedChainId, setSelectedChainId] = useState(97);
  const { walletAddress, chainId, connect, setChain } = useWallet();

  const { mutateAsync: mintNft } = useMintNFT();
  const { refetch: refetchAllMintedNFT } = useGetAllMintedNFT();

  let buttonAction = "Mint";
  if (!walletAddress) {
    buttonAction = "Connect your wallet";
  } else if (chainId?.toString() !== selectedChainId.toString()) {
    const selectedChain = getBlockchainMetadata(selectedChainId);
    buttonAction = `Change chain to ${selectedChain?.label}`;
  }

  const onClick = async () => {
    if (!walletAddress) {
      connect();
      return;
    }

    if (chainId?.toString() !== selectedChainId.toString()) {
      setChain(selectedChainId);
      return;
    }

    try {
      Swal.fire({
        title: "Sign Transaction",
        text: "Please sign transaction with your wallet",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await mintNft({
        onPending: () => {
          Swal.fire({
            title: "Transaction is sent",
            text: "Please wait for the transaction to be confirmed!",
            didOpen: () => {
              Swal.showLoading();
            },
          });
        },
      });
      refetchAllMintedNFT();

      Swal.fire({
        title: "NFT is minted",
        text: "NFT is successfully minted",
        icon: "success",
      });
    } catch (err) {
      console.log("err: ", err);
      const isRejected = String(err).includes("user rejected action");
      Swal.fire({
        title: isRejected ? "Cancelled" : "Mint Error",
        text: isRejected
          ? "The transaction has been cancelled"
          : "Something went wrong, please try again!",
        icon: "error",
      });
    }
  };

  return (
    <Box>
      <Box
        sx={(theme) => ({
          background: theme.palette.background.paper,
          minHeight: "150px",
          display: "flex",
          alignItems: "center",
          p: "2rem",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          boxSizing: "border-box",
        })}
      >
        <Typography
          variant="h5"
          fontWeight={600}
          maxWidth="lg"
          sx={{ margin: "auto" }}
        >
          Mint NFT For Free
        </Typography>
      </Box>

      <Box maxWidth="lg" sx={{ margin: "auto", mt: "2rem" }}>
        <TextField
          required
          label="Wallet Address"
          value={walletAddress || "Connect your wallet"}
          disabled
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <FormControl
          fullWidth
          sx={{
            mt: "1rem",
          }}
        >
          <InputLabel id="select-chain">Chain</InputLabel>
          <Select
            labelId="select-chain"
            value={selectedChainId}
            label="Select Chain"
            onChange={(e) => setSelectedChainId(Number(e.target.value))}
          >
            {blockchains.map((item) => (
              <MenuItem value={item.chainId} key={item.chainId}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          sx={{ mt: "2rem" }}
          variant="contained"
          size="medium"
          onClick={onClick}
        >
          {buttonAction}
        </Button>
      </Box>
    </Box>
  );
}

import { useWallet } from "@/hooks/useWallet";
import { Box, Button } from "@mui/material";

export const Wallet = () => {
  const { walletAddress, connect } = useWallet();

  if (!walletAddress) {
    return (
      <Button
        color="primary"
        variant="contained"
        onClick={() => connect()}
        sx={(theme) => ({
          borderRadius: "0.5rem",
        })}
      >
        Connect wallet
      </Button>
    );
  }
  return (
    <Box
      sx={{
        p: "0.5rem 1rem",
      }}
    >
      {walletAddress}
    </Box>
  );
};

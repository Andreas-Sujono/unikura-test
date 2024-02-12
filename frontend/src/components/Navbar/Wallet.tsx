import { useWallet } from "@/hooks/useWallet";
import { Button } from "@mui/material";

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
    <Button
      color="secondary"
      variant="contained"
      sx={{ borderRadius: "0.5rem" }}
    >
      Connect wallet
    </Button>
  );
};

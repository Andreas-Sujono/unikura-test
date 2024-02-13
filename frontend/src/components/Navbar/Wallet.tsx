import { useWallet } from "@/hooks/useWallet";
import { Box, Button } from "@mui/material";
import WalletIcon from "@mui/icons-material/Wallet";
import LogoutIcon from "@mui/icons-material/Logout";

export const Wallet = () => {
  const { walletAddress, connect, disconnect } = useWallet();

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
        display: "flex",
        alignItems: "center",
        gap: "8px",
        border: `1px solid #4f4d4d`,
        borderRadius: "0.5rem",
      }}
    >
      <WalletIcon />
      {walletAddress.slice(0, 6) + "..." + walletAddress.slice(-6)}
      <LogoutIcon sx={{ cursor: "pointer" }} onClick={disconnect} />
    </Box>
  );
};

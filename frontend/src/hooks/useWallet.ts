import { getBlockchainMetadata, toChainIdHex } from "@/utils";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { ethers } from "ethers";

export const useWallet = () => {
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const [
    __,
    setChain, // function to call to initiate user to switch chains in their wallet
  ] = useSetChain();

  const chainId = wallet?.chains?.[0]?.id || null;
  const provider = wallet?.provider
    ? new ethers.BrowserProvider(wallet?.provider)
    : null;
  return {
    walletAddress: wallet?.accounts?.[0]?.address || "",
    chainId,
    provider,
    disconnect: () => wallet && disconnect(wallet),
    chainMetadata: getBlockchainMetadata(chainId),
    setChain: (chainId: string | number) =>
      setChain({
        chainId: toChainIdHex(chainId),
      }),
    connect,
  };
};

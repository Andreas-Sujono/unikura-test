import { blockchains } from "@/constants";
import { ethers } from "ethers";

export const getBlockchainMetadata = (chainId: number | string | null) => {
  return blockchains.find(
    (item) => item.id === chainId || item.chainIdHex === chainId
  );
};

export const toChainIdHex = (chainId: number | string | null): string => {
  if (!chainId) return "";
  if ((chainId as string).startsWith("0x")) return chainId as string;

  return String(parseInt(String(chainId)));
};

export const getDefaultProvider = (chainId: number | string) => {
  const chainMetadata = getBlockchainMetadata(chainId);
  const provider = new ethers.JsonRpcProvider(chainMetadata?.rpcUrl);
  return provider;
};

export const toIpfsUrl = (id: string) => {
  return `https://ipfs.io/ipfs/${id}`;
};

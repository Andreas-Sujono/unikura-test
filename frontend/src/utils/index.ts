import { blockchains } from "@/constants";
import { ethers } from "ethers";

export const getBlockchainMetadata = (chainId: number | string | null) => {
  return blockchains.find(
    (item) => item.id === chainId || item.chainIdHex === chainId
  );
};

export const toChainIdHex = (chainId: number | string | null): string => {
  if (!chainId) return "";
  if (String(chainId as string)?.startsWith("0x")) return chainId as string;

  return "0x" + Number(chainId).toString(16);
};

export const toChainIdNumber = (chainId: number | string | null): number => {
  if (!chainId) return 0;
  if (String(chainId as string)?.startsWith("0x"))
    return parseInt(chainId as string);

  return Number(chainId);
};

export const getDefaultProvider = (chainId: number | string) => {
  const chainMetadata = getBlockchainMetadata(chainId);
  const provider = new ethers.JsonRpcProvider(chainMetadata?.rpcUrl);
  return provider;
};

export const toIpfsUrl = (id: string) => {
  return `https://ipfs.io/ipfs/${id}`;
};

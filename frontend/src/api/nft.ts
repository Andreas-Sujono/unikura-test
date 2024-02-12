import { NFTItem } from "@/types";
import { BlockchainMetadata } from "./../constants/contracts";
import { blockchains, xShoeNFTAbi } from "@/constants";
import { getDefaultProvider, toIpfsUrl } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import axios from "axios";
import { useWallet } from "@/hooks/useWallet";

export enum QUERY_KEY {
  "ALL_MINTED_NFT" = "ALL_MINTED_NFT",
}

const getNFTData = async (
  chainMetadata: BlockchainMetadata
): Promise<NFTItem[]> => {
  try {
    const provider = getDefaultProvider(chainMetadata.chainId);
    const NFTContract = new ethers.Contract(
      chainMetadata.addresses.xShoeNFT,
      xShoeNFTAbi,
      provider
    );

    const allTokenIds = ["1"]; // await NFTContract.allTokenIds();
    const baseURI = await NFTContract.tokenURI(); //assume all token has same URI metadata

    if (!baseURI || !allTokenIds?.length) return [];

    const nftMetadata = await axios.get(baseURI);

    if (!nftMetadata.data) return [];

    return allTokenIds.map((item: string) => ({
      tokenId: item,
      name: nftMetadata.data.name,
      tokenURI: baseURI,
      description: nftMetadata.data.name,
      imageURL: toIpfsUrl(nftMetadata.data.imageId),
      attributes: nftMetadata.data.attributes.map(
        (item2: { trait_type: string; value: string }) => ({
          traitType: item2.trait_type,
          value: item2.value,
        })
      ),
      chainMetadata,
    }));
  } catch (err) {
    console.log("err: ", err);
    return [];
  }
};

export const useGetAllMintedNFT = () => {
  return useQuery({
    queryKey: [QUERY_KEY.ALL_MINTED_NFT],
    queryFn: async () => {
      const promises: Promise<NFTItem[]>[] = [];

      blockchains.forEach((chainMetadata) => {
        promises.push(getNFTData(chainMetadata));
      });

      const res = await Promise.all(promises);
      const blockchainRes = {} as Record<number, NFTItem[]>;
      blockchains.forEach((item, idx) => {
        blockchainRes[item.chainId] = res[idx];
      });

      return blockchainRes;
    },
    enabled: true,
    staleTime: 50000,
    retry: 1,
  });
};

export const useMintNFT = () => {
  const { walletAddress, provider, chainMetadata } = useWallet();
  return useMutation({
    mutationFn: async ({ onPending }: { onPending?: () => void }) => {
      if (!walletAddress || !provider || !chainMetadata) return;

      const NFTContract = new ethers.Contract(
        chainMetadata.addresses.xShoeNFT,
        xShoeNFTAbi,
        provider
      );

      const tx: ethers.TransactionResponse = await NFTContract.mint(
        walletAddress
      );
      if (onPending) onPending();

      try {
        await tx.wait();
        return {
          status: "SUCCESS",
          txHash: tx.hash,
        };
      } catch (err) {
        return {
          status: "FAILED",
          txHash: tx.hash,
        };
      }
    },
  });
};

import { NFTItem } from "@/types";
import { BlockchainMetadata } from "./../constants/contracts";
import { blockchains, collectionNftAbi } from "@/constants";
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
      chainMetadata.addresses.collectionNft,
      collectionNftAbi,
      provider
    );

    const allTokenIds: string[] = (await NFTContract.allTokenIds()).map(
      (item: string) => item.toString()
    );
    const tokenUris = await Promise.all(
      allTokenIds.map((tokenId) => NFTContract.tokenURI(tokenId))
    );

    if (!tokenUris.length || !allTokenIds?.length) return [];

    const nftMetadatas = await Promise.all(
      tokenUris.map((tokenUri) => axios.get(tokenUri))
    );

    const nftOwners = await Promise.all(
      allTokenIds.map((tokenId) => NFTContract.ownerOf(tokenId))
    );

    if (!nftMetadatas.length) return [];

    return allTokenIds.map((item: string, idx) => ({
      tokenId: item,
      name: nftMetadatas[idx].data.name,
      tokenURI: tokenUris[idx],
      description: nftMetadatas[idx].data.description,
      imageURL: toIpfsUrl(nftMetadatas[idx].data.imageId),
      attributes: nftMetadatas[idx].data.attributes.map(
        (item2: { trait_type: string; value: string }) => ({
          traitType: item2.trait_type,
          value: item2.value,
        })
      ),
      chainMetadata,
      owner: nftOwners[idx],
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
    staleTime: 60000,
    retry: 1,
  });
};

export const useMintNFT = () => {
  const { walletAddress, provider, chainMetadata } = useWallet();
  return useMutation({
    mutationFn: async ({ onPending }: { onPending?: () => void }) => {
      if (!walletAddress || !provider || !chainMetadata) return;

      const NFTContract = new ethers.Contract(
        chainMetadata.addresses.collectionNft,
        collectionNftAbi,
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

export const useGetTopSummaryData = () => {
  const { walletAddress } = useWallet();
  const { data: nftMap } = useGetAllMintedNFT();
  const allNftItems = ([] as NFTItem[]).concat(...Object.values(nftMap || {}));

  const totalScore = allNftItems.reduce(
    (acc, item) =>
      acc +
      Number(
        item.attributes.find((item2) => item2.traitType === "Score")?.value || 0
      ),
    0
  );
  const userScore = allNftItems.reduce(
    (acc, item) =>
      acc +
      (item.owner?.toLowerCase() === walletAddress.toLowerCase()
        ? Number(
            item.attributes.find((item2) => item2.traitType === "Score")
              ?.value || 0
          )
        : 0),
    0
  );

  const totalNft = allNftItems.length;
  const ownNft = allNftItems.reduce(
    (acc, item) =>
      acc + (item.owner?.toLowerCase() === walletAddress.toLowerCase() ? 1 : 0),
    0
  );

  return {
    totalScore,
    userScore,
    totalNft,
    ownNft,
  };
};

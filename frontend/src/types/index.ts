import { BlockchainMetadata } from "@/constants";

export interface NFTItem {
  tokenId: string;
  name: string;
  tokenURI: string;
  description: string;
  imageURL: string;
  attributes: {
    traitType: string;
    value: string;
  };
  chainMetadata: BlockchainMetadata;
}

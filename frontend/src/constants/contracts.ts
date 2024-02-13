export const contractAddreses = {
  137: {
    collectionNft: "0x9842c4C9cdD292D550C93Bb49065Fee28aB8fd12",
  },
  97: {
    collectionNft: "0x0D820b8fb28774bA41eE3aF23D26C455BC0dE38F",
  },
};

export const blockchains = [
  {
    id: 80001,
    chainId: 80001,
    chainIdHex: "0x13881",
    nativeToken: "MATIC",
    label: "Mumbai",
    addresses: contractAddreses[137],
    logoUrl:
      "https://altcoinsbox.com/wp-content/uploads/2023/03/matic-logo.webp",
    rpcUrl: "https://polygon-mumbai-bor.publicnode.com",
  },
  {
    id: 97,
    chainId: 97,
    chainIdHex: "0x61",
    nativeToken: "BNB",
    label: "Bsc Testnet",
    addresses: contractAddreses[97],
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/BNB%2C_native_cryptocurrency_for_the_Binance_Smart_Chain.svg/1024px-BNB%2C_native_cryptocurrency_for_the_Binance_Smart_Chain.svg.png",
    rpcUrl: "https://bsc-testnet.publicnode.com",
  },
];
export type BlockchainMetadata = (typeof blockchains)[0];

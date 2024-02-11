import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    // BSC Testnet
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545", // BSC Testnet endpoint
      accounts: {
        mnemonic: process.env.MNEMONIC || "", // Your BSC Testnet mnemonic
      },
    },
    // Mumbai Testnet
    mumbaiTestnet: {
      url: "https://matic-mumbai.chainstacklabs.com", // Mumbai Testnet endpoint
      accounts: {
        mnemonic: process.env.MNEMONIC || "", // Your Mumbai Testnet mnemonic
      },
    },
  },
};

export default config;

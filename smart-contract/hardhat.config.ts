import { HardhatUserConfig } from "hardhat/config";
import { config as dotEnvConfig } from "dotenv";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-toolbox";

dotEnvConfig();

const deployerKey = process.env.DEPLOYER_KEY || "";
const accounts = deployerKey ? [deployerKey] : [];

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    // BSC Testnet
    bscTestnet: {
      url: "https://bsc-testnet.publicnode.com", // BSC Testnet endpoint
      accounts,
    },
    // Mumbai Testnet
    mumbai: {
      url: "https://polygon-mumbai-bor.publicnode.com", // Mumbai Testnet endpoint
      accounts,
    },
  },
};

export default config;

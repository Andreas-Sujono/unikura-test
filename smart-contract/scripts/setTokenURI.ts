import { ethers } from "hardhat";

const contractAddress = "0x0D820b8fb28774bA41eE3aF23D26C455BC0dE38F";
const tokenId = "2";
const newTokenURI =
  "https://amber-particular-cuckoo-729.mypinata.cloud/ipfs/QmdWWA7FTgdwsvjXUnL9BPSFK2AeRH3s2kM7SRqwcgDbTE";

async function main() {
  const [deployer] = await ethers.getSigners();

  const xCollection = await ethers.getContractAt(
    "XCollection",
    contractAddress
  );

  const tx = await xCollection.setTokenURI(tokenId, newTokenURI);
  const receipt = await tx.wait();
  console.log(`Token id is changed`, receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

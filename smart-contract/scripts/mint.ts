import { ethers } from "hardhat";

const contractAddress = "0x0D820b8fb28774bA41eE3aF23D26C455BC0dE38F";

async function main() {
  const [deployer] = await ethers.getSigners();

  const xCollection = await ethers.getContractAt(
    "XCollection",
    contractAddress
  );

  console.log("minting NFT to", deployer.address + "...");
  const tx = await xCollection.mint(deployer.address);
  const receipt = await tx.wait();
  console.log(`XCollection is minted`, receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

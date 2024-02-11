import { ethers } from "hardhat";

const contractAddress = "0xFf35064cC088E9c22AEbf321EC4631664979a131";

async function main() {
  const [deployer] = await ethers.getSigners();

  const xShoeNFT = await ethers.getContractAt("XShoeNFT", contractAddress);

  console.log("minting NFT to", deployer.address + "...");
  const tx = await xShoeNFT.mint(deployer.address);
  const receipt = await tx.wait();
  console.log(`XShoeNFT is minted`, receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { ethers } from "hardhat";

async function main() {
  const NFTName = "XShoeNFT";
  const NFTSymbol = "XSHOE";
  const NFTBaseURI =
    "https://amber-particular-cuckoo-729.mypinata.cloud/ipfs/QmZAvpoMFiQypHkb7f7LY5SXodaYFd8SKDTJUjhi4YXPtS";

  const [deployer] = await ethers.getSigners();

  console.log("deployer: ", await deployer.address);
  const xShoeNFT = await ethers.deployContract(
    "XShoeNFT",
    [NFTName, NFTSymbol, NFTBaseURI],
    deployer
  );

  await xShoeNFT.waitForDeployment();

  console.log(`XShoeNFT deployed to ${xShoeNFT.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

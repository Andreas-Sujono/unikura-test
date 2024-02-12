import { ethers } from "hardhat";

async function main() {
  const NFTName = "XCollection";
  const NFTSymbol = "XCOL";
  const NFTBaseURI =
    "https://amber-particular-cuckoo-729.mypinata.cloud/ipfs/QmZAvpoMFiQypHkb7f7LY5SXodaYFd8SKDTJUjhi4YXPtS";

  const [deployer] = await ethers.getSigners();

  console.log("deployer: ", await deployer.address);
  const xCollection = await ethers.deployContract(
    "XCollection",
    [NFTName, NFTSymbol, NFTBaseURI],
    deployer
  );

  await xCollection.waitForDeployment();

  console.log(`XCollection deployed to ${xCollection.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

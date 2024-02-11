import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";

describe("XShoeNFT", function () {
  const NFTName = "XShoeNFT";
  const NFTSymbol = "XSHOE";
  const NFTBaseURI =
    "https://amber-particular-cuckoo-729.mypinata.cloud/ipfs/QmZAvpoMFiQypHkb7f7LY5SXodaYFd8SKDTJUjhi4YXPtS";

  async function deployNFTFixture() {
    const [owner, addr1] = await ethers.getSigners();

    const XShoeNFT = await ethers.getContractFactory("XShoeNFT");
    const xShoeNFT = await XShoeNFT.deploy(NFTName, NFTSymbol, NFTBaseURI);

    return { xShoeNFT, owner, addr1 };
  }

  it("Should set the correct NFT base information", async function () {
    const { xShoeNFT } = await loadFixture(deployNFTFixture);

    expect(await xShoeNFT.symbol()).to.equal(NFTSymbol);
    expect(await xShoeNFT.name()).to.equal(NFTName);
    expect(await xShoeNFT["tokenURI()"]()).to.equal(NFTBaseURI);
  });

  it("Should mint a token", async function () {
    const { xShoeNFT, addr1 } = await loadFixture(deployNFTFixture);

    await xShoeNFT.connect(addr1).mint(addr1.address);
    expect(await xShoeNFT.ownerOf(1)).to.equal(addr1.address);
  });

  it("Should emit TokenMinted event when minting a token", async function () {
    const { xShoeNFT, addr1 } = await loadFixture(deployNFTFixture);

    await expect(xShoeNFT.connect(addr1).mint(addr1.address))
      .to.emit(xShoeNFT, "TokenMinted")
      .withArgs(addr1.address, 1);
  });

  it("Should emit TokenURIChanged event when updating token URI", async function () {
    const { xShoeNFT, owner } = await loadFixture(deployNFTFixture);

    const newTokenURI = "https://newMetadata.com/";
    await expect(xShoeNFT.connect(owner).setTokenURI(newTokenURI))
      .to.emit(xShoeNFT, "TokenURIChanged")
      .withArgs(newTokenURI);

    expect(await xShoeNFT["tokenURI()"]()).to.equal(newTokenURI);
  });
});

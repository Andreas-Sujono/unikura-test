import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";

describe("XCollection", function () {
  const NFTName = "XCollection";
  const NFTSymbol = "XCOL";
  const NFTdefaultURI =
    "https://amber-particular-cuckoo-729.mypinata.cloud/ipfs/QmZAvpoMFiQypHkb7f7LY5SXodaYFd8SKDTJUjhi4YXPtS";

  async function deployNFTFixture() {
    const [owner, addr1] = await ethers.getSigners();

    const XCollection = await ethers.getContractFactory("XCollection");
    const xCollection = await XCollection.deploy(
      NFTName,
      NFTSymbol,
      NFTdefaultURI
    );

    return { xCollection, owner, addr1 };
  }

  it("Should set the correct NFT base information", async function () {
    const { xCollection } = await loadFixture(deployNFTFixture);

    expect(await xCollection.symbol()).to.equal(NFTSymbol);
    expect(await xCollection.name()).to.equal(NFTName);
  });

  it("Should mint a token", async function () {
    const { xCollection, addr1 } = await loadFixture(deployNFTFixture);

    await xCollection.connect(addr1).mint(addr1.address);
    expect(await xCollection.ownerOf(1)).to.equal(addr1.address);
    expect(await xCollection.tokenURI(1)).to.equal(NFTdefaultURI);
  });

  it("Should record all minted tokenIds", async function () {
    const { xCollection, addr1 } = await loadFixture(deployNFTFixture);

    await xCollection.connect(addr1).mint(addr1.address);
    await xCollection.connect(addr1).mint(addr1.address);
    await xCollection.connect(addr1).mint(addr1.address);
    await xCollection.connect(addr1).mint(addr1.address);

    const allTokenIds = (await xCollection.allTokenIds())
      .map((item) => item.toString())
      .toString();
    expect(allTokenIds).to.equal("1,2,3,4");
  });

  it("Should emit TokenMinted event when minting a token", async function () {
    const { xCollection, addr1 } = await loadFixture(deployNFTFixture);

    await expect(xCollection.connect(addr1).mint(addr1.address))
      .to.emit(xCollection, "TokenMinted")
      .withArgs(addr1.address, 1);
  });

  it("Should set token URI correctly", async function () {
    const { xCollection, owner, addr1 } = await loadFixture(deployNFTFixture);
    const newTokenURI = "https://newMetadata.com/";

    await xCollection.connect(addr1).mint(addr1.address);
    await xCollection.connect(owner).setTokenURI(1, newTokenURI);

    expect(await xCollection.tokenURI(1)).to.equal(newTokenURI);

    const newTokenURI2 = "https://newMetadata2.com/";

    expect(xCollection.setTokenURI(1, newTokenURI2)).to.be.revertedWith(
      "Token URI has been initialized"
    );
  });

  it("Should emit TokenURIChanged event when updating default token URI", async function () {
    const { xCollection, owner, addr1 } = await loadFixture(deployNFTFixture);

    await xCollection.connect(addr1).mint(addr1.address);
    expect(await xCollection.ownerOf(1)).to.equal(addr1.address);
    expect(await xCollection.tokenURI(1)).to.equal(NFTdefaultURI);

    const newTokenURI = "https://newMetadata.com/";
    await expect(xCollection.connect(owner).setDefaultTokenURI(newTokenURI))
      .to.emit(xCollection, "DefaultTokenURIChanged")
      .withArgs(newTokenURI);

    expect(await xCollection.tokenURI(1)).to.equal(newTokenURI);
  });
});

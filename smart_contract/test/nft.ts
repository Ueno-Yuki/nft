import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Nft contract", function() {

  it ("Deployment nft", async function() {
    const [owner] = await ethers.getSigners();
    const Nft = await ethers.getContractFactory("MYNFT");
    const hardhatNft = await Nft.deploy(owner);
    // await hardhatNft.deployed();
    const ownerBalance = await hardhatNft.balanceOf(owner.address);

    expect(await hardhatNft.totalSupply()).to.equal(ownerBalance);
  });
});
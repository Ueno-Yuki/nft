import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("nft", function() {
  async function deployContract() {
    const [deployer, owner] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("nft");
    const initAmount : number = 10000 * 10000;
    const contract = await Contract.deploy(owner.address, initAmount);
    await contract.deployed();
    return { contract, deployer, owner, initAmount };
  };
  describe("deploy", function () {
    it("owner", async function() {
      const { contract, deployer, owner, initAmount } = await loadFixture(deployContract);
      expect(await contract.owner()).to.equal(owner.address);
    });
    it("name", async function() {
      const { contract, deployer, owner, initAmount } = await loadFixture(deployContract);
      expect(await contract.name()).to.equal("nft");
    });
    it("symbol", async function() {
      const { contract, deployer, owner, initAmount } = await loadFixture(deployContract);
      expect(await contract.symbol()).to.equal("MTK");
    });
    it("initAmount", async function() {
      const { contract, deployer, owner, initAmount } = await loadFixture(deployContract);
      expect(await contract.totalSupply()).to.equal(initAmount);
      expect(await contract.balanceOf(owner.address)).to.equal(initAmount);
      expect(await contract.balanceOf(deployer.address)).to.equal(0);
    });
  });
  describe("onlyOwner", function () {
    it("mint <owner>", async function () {
        const { contract, deployer, owner, initAmount } = await loadFixture(deployContract);
        const totalSupply = await contract.totalSupply();
        const balanceOf = await contract.balanceOf(owner.address);
        const mintAmount = 100;
        await contract.connect(owner).mint(mintAmount);
        expect(await contract.totalSupply()).to.equal(totalSupply.add(mintAmount));
        expect(await contract.balanceOf(owner.address)).to.equal(balanceOf.add(mintAmount));
    });
    it("mint <not owner>", async function () {
        const { contract, deployer, owner, initAmount } = await loadFixture(deployContract);
        const mintAmount = 100;
        await expect(contract.connect(deployer).mint(mintAmount)).to.rejected;
    });
    it("burn <owner>", async function () {
        const { contract, deployer, owner, initAmount } = await loadFixture(deployContract);
        const totalSupply = await contract.totalSupply();
        const balanceOf = await contract.balanceOf(owner.address);
        const burnAmount = 100;
        await contract.connect(owner).burn(burnAmount);
        expect(await contract.totalSupply()).to.equal(totalSupply.sub(burnAmount));
        expect(await contract.balanceOf(owner.address)).to.equal(balanceOf.sub(burnAmount));
    });
    it("burn <not owner>", async function () {
        const { contract, deployer, owner, initAmount } = await loadFixture(deployContract);
        const burnAmount = 100;
        await expect(contract.connect(deployer).burn(burnAmount)).to.rejected;
    });
  });
  describe("deploy fail", function () {
      it("deploy zero address", async function () {
          const Contract = await ethers.getContractFactory("TokenSample");
          const initAmount = 1000 * 1000;
          const zeroAddress = "0x0000000000000000000000000000000000000000";
          await expect(Contract.deploy(zeroAddress, initAmount)).to.rejected;
      });
  });
})
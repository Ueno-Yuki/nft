import { ethers } from "hardhat";

const main = async() => {
  const baseTokenURI = "";
  const [deployer] = await ethers.getSigners();
  const contractFactory = await ethers.getContractFactory("MYNFT");
  const contract = await contractFactory.deploy();
  const accountBalance = await contract.balanceOf(deployer.address);
  const ethEcho = await contract.waitForDeployment();
  
  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());
  const deployedContractAddress = await ethEcho.getAddress();
  console.log("Contract deployed to: ", deployedContractAddress);
  console.log("Contract deployed by: ", deployer.address);

};

const runMain = async() => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

runMain();
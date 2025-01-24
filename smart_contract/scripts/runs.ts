import { ethers } from "hardhat";

const main = async() => {
  const echoContractFactory = await ethers.getContractFactory('EhtEcho');
  const echoContract = await echoContractFactory.deploy();
  const EhtEcho = await echoContract.waitForDeployment();
  const deployedContractAddress = await echoContract.getAddress();
  console.log("Contract added to:", deployedContractAddress);
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
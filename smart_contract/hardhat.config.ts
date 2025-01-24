import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const accounts = async(args: string, hre: HardhatRuntimeEnvironment) => {
  const accounts = await hre.ethers.getSigners();
  for ( const account of accounts ) {
    console.log(account.address);
  }
};

task("accounts", "Prints the list of accounts", accounts);

module.exports = {
  solidity: "0.8.20",
}

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    localhost: { allowUnlimitedContractSize: true },
    hardhat: { allowUnlimitedContractSize: true },
  },
};

export default config;

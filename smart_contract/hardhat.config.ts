import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@nomicfoundation/hardhat-ethers";
import "@typechain/hardhat";
import '@openzeppelin/hardhat-upgrades';
import '@nomicfoundation/hardhat-verify';
// import * as dotenv from 'dotenv';

const accounts = async(args: string, hre: HardhatRuntimeEnvironment) => {
  const accounts = await hre.ethers.getSigners();
  for ( const account of accounts ) {
    console.log(account.address);
  }
};

task("accounts", "Prints the list of accounts", accounts);

module.exports = {
  solidity: "0.8.28",
}

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    basesepolia: {
      url: "https://base-sepolia.blockpi.network/v1/rpc/public",
      accounts: [process.env.DEPLOYER_PRIVATE_KEY ?? ""],
    },
    localhost: { allowUnlimitedContractSize: true },
  },
  etherscan: {
    apiKey: {
      basesepolia: "87U2D2H9S1DJYJPSKT7JUSBT2CQ9VRT65M"
    },
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        },
      },
    ]
  }
};

export default config;

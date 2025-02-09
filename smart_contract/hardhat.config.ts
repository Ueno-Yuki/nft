import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "@nomicfoundation/hardhat-ethers";
import "@typechain/hardhat";
import '@openzeppelin/hardhat-upgrades';
import '@nomicfoundation/hardhat-verify';
import * as dotenv from 'dotenv';

dotenv.config();
const accounts = async(args: string, hre: HardhatRuntimeEnvironment) => {
  const accounts = await hre.ethers.getSigners();
  for ( const account of accounts ) {
    console.log(account.address);
  }
};

task("accounts", "Prints the list of accounts", accounts);

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    basesepolia: {
      url: "https://sepolia.base.org",
      accounts: [process.env.DEPLOYER_PRIVATE_KEY ?? ""],
      timeout: 100000
    },
    localhost: { allowUnlimitedContractSize: true },
  },
  etherscan: {
    apiKey: {
      basesepolia: "87U2D2H9S1DJYJPSKT7JUSBT2CQ9VRT65M"
    },
    customChains: [
      {
        network: "basesepolia",
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

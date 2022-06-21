const { task } = require("hardhat/config");

// Tasks in Hardhat are asynchronous JavaScript functions that get access to the Hardhat Runtime Environment
task("block-number", "print the current block number").setAction(
  async (taskArgs, hre) => {
    // hre is Hardhat Runtime Environment
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log({ blockNumber });
  }
);

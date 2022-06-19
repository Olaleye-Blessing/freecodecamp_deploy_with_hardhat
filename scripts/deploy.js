const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying contract....");
  const simpleStorage = await SimpleStorageFactory.deploy();

  await simpleStorage.deployed();
  console.log(`Deployed to Contract Address: ${simpleStorage.address}`);

  // only verify if contract is deployed to mainnet or testnet
  console.log("Network config");
  console.log(network.config);

  // rinkeby chainId is 4
  if (network.config.chainId === 4 && process.env.EHERSCAN_API_KEY) {
    // wait for some blocks before you verify
    await simpleStorage.deployTransaction.wait(2);
    await verify(simpleStorage.address, []);
  }

  // interact with deployed contract
  console.log("interracting with deployed contract");
  let currentValue = await simpleStorage.retrieve();
  console.log({ currentValue });

  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);

  currentValue = await simpleStorage.retrieve();
  console.log({ currentValue });
}

// auto verify contract on etherscan
async function verify(contractAddress, arg) {
  // arg is not needed here because our contractor has no constructor
  console.log("verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: arg,
    });
    console.log("verification completed");
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified"))
      console.log("already verified");
    else console.log(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

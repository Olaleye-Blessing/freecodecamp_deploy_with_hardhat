require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: "./.env" });
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const EHERSCAN_API_KEY = process.env.EHERSCAN_API_KEY;
const COIN_MARKET_CAP_API_KEY = process.env.COIN_MARKET_CAP_API_KEY;

module.exports = {
  // hardhat has its default network, rpc url and private key
  // be more explicit
  defaultNetwork: "hardhat",
  // specify other networks
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY], // you can specify multiple private key
      chainId: 4,
    },
    localhost: {
      url: `http://127.0.0.1:8545/`,
      // hardhat gives us accounts by default
      chainId: 31337,
    },
  },
  solidity: "0.8.8",
  etherscan: {
    apiKey: EHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COIN_MARKET_CAP_API_KEY,
  },
};

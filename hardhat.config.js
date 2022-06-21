require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: "./.env" });
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const EHERSCAN_API_KEY = process.env.EHERSCAN_API_KEY;

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
  },
  solidity: "0.8.8",
  etherscan: {
    apiKey: EHERSCAN_API_KEY,
  },
};

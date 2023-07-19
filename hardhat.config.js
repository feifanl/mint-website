require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
    solidity: "0.8.1",
    networks: {
        cantoTestNet: {
            chainId: 7701, 
            url: process.env.REACT_APP_RPC_URL, 
            accounts: [process.env.REACT_APP_PRIVATE_KEY] 
        },
    },
    etherscan: {
        apiKey: process.env.REACT_APP_ETHERSCAN_KEY,
    },
};
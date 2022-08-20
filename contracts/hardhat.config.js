require('@nomicfoundation/hardhat-toolbox');
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config({ path: '../.env' });

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
    defaultNetwork: 'hardhat',
    networks: {
        hardhat: {
            forking: {
                url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
            },
            //   // chainId: 1337,
            //   accounts: {
            //     // mnemonic: 'qoisdapp',
            //   },
            // mining: {
            //   auto: false,
            //   interval: 13000,
            // },
            // throwOnTransactionFailures: true,
            // allowUnlimitedContractSize: true,
            // loggingEnabled: true,
            // throwOnCallFailures: true,
            // },
            // rinkeby: {
            //   url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_RINKEBY_ID}`,
            //   accounts: [`${process.env.ACCOUNT_PRIVATE_KEY}`],
        },
    },
    solidity: {
        version: '0.8.13',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    paths: {
        sources: './contracts',
        tests: './test',
        cache: './cache',
        artifacts: './artifacts',
    },
    gasReporter: {
        enabled: true,
        currency: 'USD',
        maxMethodDiff: 20,
        // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        token: 'ETH',
        gasPriceApi: 'https://api.etherscan.io/api?module=proxy&action=eth_gasPrice',
        // token: 'MATIC',
        // gasPriceApi: 'https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice',
        // token: 'BNB',
        // gasPriceApi: 'https://api.bscscan.com/api?module=proxy&action=eth_gasPrice',
        // gasPrice: 21,
    },
    mocha: {
        timeout: 200000,
    },
};

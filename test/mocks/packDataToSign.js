const { ethers } = require('ethers');
const { signer, provider } = require('../../server/ethersProvider');
const { ERC20_TOKEN_ADDRESS } = require('../../utils/constant');
const { parseUnits, formatUnits } = ethers.utils;

const customerAddressToCustomerTokenAddress = {
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8': '0x7542002642420d2eea9164caa79a536dee18ae7f',
};

const tokenPrice = {
  SAND: 2.1262470976845336,
  SHIB: 0.0000152412344123,
  ELON: 0.0000004991232343,
};

// FINAL -> string tokenAmount, string tokenQuote, string addressToDonate
const packDataToSign = async (tokenAmount, tokenQuote, addressToDonate, customerTokenAddress) => {
  // return new Promise(async (resolve, reject) => {
    if (addressToDonate === ethers.constants.AddressZero) {
      // reject('Address to donate is zero address');
      throw new Error('Address to donate is zero address');
    }
    const tokenAmountBN = parseUnits(tokenAmount);

    //TODO* FROM DB
    const tokenAddress = ERC20_TOKEN_ADDRESS[tokenQuote];
    // const tokenCustomerAddress = customerAddressToCustomerTokenAddress[addressToDonate];
    //TODO* FROM DB
    const tokenCustomerAddress = customerTokenAddress;
    //TODO* FROM DB AND COINMARKETCAP
    const price = tokenPrice[tokenQuote];
    // console.log(price);
    const priceBN = parseUnits(Number.parseFloat(price).toFixed(18));
    // const priceBN = parseUnits(price.toString(10));

    const amountToMint = priceBN.mul(parseUnits(tokenAmount, 'ether')).div('1000000000000000000');
    if (amountToMint.lt(parseUnits('0.1'))) {
      // reject('Donate worth too little');
      throw new Error('Donate worth too little');
    }
    const tokenToCustomer = tokenAmountBN.mul('9700').div('10000');
    const fee = tokenAmountBN.sub(tokenToCustomer);

    const block = await provider.getBlock();
    const timestamp = block.timestamp;
    // const timestamp = Math.floor(Date.now() / 1000);

    // donatedTokenAmount - amountToMint - AmountToCustomer - amountToAdmin - tokenDonateAddress - customerTokenAddress
    const hashData = ethers.utils.solidityKeccak256(
      ['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'address', 'address'],
      [tokenAmountBN, amountToMint, tokenToCustomer, fee, timestamp, tokenAddress, tokenCustomerAddress],
    );

    const hashDataBinary = ethers.utils.arrayify(hashData);
    const signature = await signer.signMessage(hashDataBinary);

    return {
      signature,
      signatureData: {
        tokenAmountBN,
        amountToMint,
        tokenToCustomer,
        fee,
        timestamp,
        tokenAddress,
        tokenCustomerAddress,
      },
    }
    // resolve({
    //   signature,
    //   signatureData: {
    //     tokenAmountBN,
    //     amountToMint,
    //     tokenToCustomer,
    //     fee,
    //     timestamp,
    //     tokenAddress,
    //     tokenCustomerAddress,
    //   },
    // });
  // });
};

module.exports = { packDataToSign };

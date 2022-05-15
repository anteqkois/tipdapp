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
  if (addressToDonate === ethers.constants.AddressZero) {
    throw new Error('Address to donate is zero address');
  }
  const tokenAmountBN = parseUnits(tokenAmount);

  //TODO* FROM DB, if not in DB throw error
  const tokenAddress = ERC20_TOKEN_ADDRESS[tokenQuote];
  // const tokenCustomerAddress = customerAddressToCustomerTokenAddress[addressToDonate];
  
  //TODO* FROM DB, if not in DB throw error
  const tokenCustomerAddress = customerTokenAddress;

  //TODO* FROM DB OR COINMARKETCAP
  const price = tokenPrice[tokenQuote];
  const priceBN = parseUnits(Number.parseFloat(price).toFixed(18));

  const amountToMint = priceBN.mul(parseUnits(tokenAmount, 'ether')).div('1000000000000000000');
  if (amountToMint.lt(parseUnits('0.1'))) {
    throw new Error('Donate worth too little');
  }

  const fee = tokenAmountBN.mul('0300').div('10000');
  const tokenToCustomer = tokenAmountBN.sub(fee);

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
  };
};

module.exports = { packDataToSign };

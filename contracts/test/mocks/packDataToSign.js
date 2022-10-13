const { ethers } = require('ethers');
const { signerAdmin, provider } = require('../../utils/ethersProvider');
const { ERC20_TOKEN_ADDRESS } = require('../../utils/constant');
const { parseUnits, formatUnits } = ethers.utils;

const userAddressToUserTokenAddress = {
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8': '0x7542002642420d2eea9164caa79a536dee18ae7f',
};

const tokenPrice = {
  SAND: 2.1262470976845336,
  SHIB: 0.0000152412344123,
  ELON: 0.0000004991232343,
};
//TOD create config file !
// FINAL -> string tokenAmount, string tokenQuote, string addressToDonate
const packDataToSign = async (tokenAmount, tokenQuote, addressToDonate, userTokenAddress) => {
  if (addressToDonate === ethers.constants.AddressZero) {
    throw new Error('Address to donate is zero address');
  }
  const tokenAmountBN = parseUnits(tokenAmount);

  //TODO* get erc20 token address (donated token) FROM DB, if not in DB throw error
  const tokenAddress = ERC20_TOKEN_ADDRESS[tokenQuote];
  // const userTokenAddress = userAddressToUserTokenAddress[addressToDonate];

  //TODO* get userToken address FROM DB using strimer address (tokenAddress = users[address]), if not in DB throw error
  // const userTokenAddress = userTokenAddress;

  //TODO* FROM DB OR COINMARKETCAP
  const price = tokenPrice[tokenQuote];
  const priceBN = parseUnits(Number.parseFloat(price).toFixed(18));

  const amountToMint = priceBN.mul(parseUnits(tokenAmount, 'ether')).div('1000000000000000000');
  if (amountToMint.lt(parseUnits('0.1'))) {
    throw new Error('Donate worth too little');
  }

  const fee = tokenAmountBN.mul('0300').div('10000');
  const tokenToUser = tokenAmountBN.sub(fee);

  const block = await provider.getBlock();
  const timestamp = block.timestamp;
  // const timestamp = Math.floor(Date.now() / 1000);

  // donatedTokenAmount - amountToMint - AmountToUser - amountToAdmin - tokenDonateAddress - userTokenAddress
  const hashData = ethers.utils.solidityKeccak256(
    ['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'address', 'address'],
    [tokenAmountBN, amountToMint, tokenToUser, fee, timestamp, tokenAddress, userTokenAddress],
  );

  const hashDataBinary = ethers.utils.arrayify(hashData);
  const signature = await signerAdmin.signMessage(hashDataBinary);

  return {
    signature,
    signatureData: {
      tokenAmountBN,
      amountToMint,
      tokenToUser,
      fee,
      timestamp,
      tokenAddress,
      userTokenAddress,
    },
  };
};

module.exports = { packDataToSign };

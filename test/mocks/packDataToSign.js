const { ethers } = require('ethers');
const { signer, provider } = require('../../server/ethersProvider');
const { ERC20_TOKEN_ADDRESS } = require('../../utils/constant');
const { parseUnits, formatUnits } = ethers.utils;

const customerAddressToCustomerTokenAddress = {
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8': '0x7542002642420d2eea9164caa79a536dee18ae7f',
};

//string string string
const packDataToSign = async (tokenAmount, tokenQuote, addressToDonate, customerTokenAddress) => {
  const tokenAmountBN = parseUnits(tokenAmount);
  const tokenAddress = ERC20_TOKEN_ADDRESS[tokenQuote];
  // const tokenCustomerAddress = customerAddressToCustomerTokenAddress[addressToDonate];
  const tokenCustomerAddress = customerTokenAddress;
  const price = 2.1262470976845336;
  const priceBN = parseUnits(price.toString());
 
  const amountToMint = priceBN.mul(tokenAmount);
  const tokenToCustomer = tokenAmountBN.mul('9700').div('10000');
  const fee = tokenAmountBN.sub(tokenToCustomer);

  const block = await provider.getBlock();
  const timestamp = block.timestamp;
  console.log(block.number);
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

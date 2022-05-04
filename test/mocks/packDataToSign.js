const { ethers } = require('ethers');
const { signer, provider } = require('../../server/ethersProvider');
const { ERC20_TOKEN_ADDRESS } = require('../../utils/constant');
const { parseUnits, formatUnits } = ethers.utils;

const customerAddressToCustomerTokenAddress = {
 '0x7542002642420d2eea9164caa79a536dee18ae7f':'0x7542002642420d2eea9164caa79a536dee18ae7f'
}

//string string string
const packDataToSign = async (tokenAmount, tokenQuote, addressToDonate) => {
  const tokenAmountBN = parseUnits(tokenAmount);
  const tokenAddress = ERC20_TOKEN_ADDRESS[tokenQuote];
  const tokenCustomerAddress = '0x7542002642420d2eea9164caa79a536dee18ae7f';
  const price = 2.1262470976845336;
  const priceBN = parseUnits(price.toString());

  const amountToMint = priceBN.mul(tokenAmount);
  const tokenToCustomer = tokenAmountBN.mul('9700').div('10000');
  const fee = tokenAmountBN.sub(withFee);

  const block = await provider.getBlock();
  const timestamp = block.timestamp;
  // const timestamp = Math.floor(Date.now() / 1000);

  // donatedTokenAmount - amountToMint - AmountToCustomer - amountToAdmin - tokenDpnateAddress - customerTokenAddress
  const hashData = ethers.utils.solidityKeccak256(
    ['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'address', 'address'],
    [tokenAmountBN, amountToMint, tokenToCustomer, fee, timestamp, tokenAddress, tokenCustomerAddress],
  );

  const hashDataBinary = ethers.utils.arrayify(hashData);
  const signature = await asigner.signMessage(hashDataBinary);

  return {
    signature,
    signatureData: {
      tokenAmountBN,
      amountToMint,
    },
  };
};

module.exports = { packDataToSign };

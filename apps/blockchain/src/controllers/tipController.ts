import { createApiError, HttpStatusCode, TipApi, tipApi } from '@tipdapp/api';
import { handledTokens } from '@tipdapp/constants';
import { Address } from '@tipdapp/types';
import { calculateFee } from '../calculateFee';
import { ethers } from '../lib/ethersProvider';
import { tokenService } from '../services/tokenService';

const signerAdmin = new ethers.Wallet(
  process.env.SIGNER_WALLET_PRIVATE_KEY,
  ethers.getDefaultProvider()
);

const signature = async (
  req: TipApi.Signature.Req,
  res: TipApi.Signature.Res
) => {
  const { body } = tipApi.signature.parse({ ...req });

  if (body.userAddress === ethers.constants.AddressZero) {
    createApiError(
      'Address to tip can not be address zero.',
      HttpStatusCode.UnprocessableEntity
    );
  }

  const tokenAmountBigNumber = ethers.utils.parseEther(body.tokenAmount);

  // TODO get erc20 token address (tipd token) from rigidly typed constants, when dapp grow up store in Redis, if not in DB throw error
  // const tokenAddress = ERC20_TOKEN_ADDRESSES[body.tokenQuote];
  const tokenAddress = handledTokens.find(
    (token) => token.coinGeckoId === body.tokenId
  )?.address;

  if (!tokenAddress)
    createApiError(
      'Token not handled by dapp.',
      HttpStatusCode.UpgradeRequired
    );

  // const userToken = await apiClient.user.findUserToken(
  //   { address: body.userAddress },
  //   process.env.URL_DATABASE
  // );

  // TODO at the beginning get from coinmarketcap, when dapp grow up store price in Redis
  // const price = ERC20_TOKEN_PRICE[tokenQuote];
  const token = await tokenService.getToken(body.tokenId);

  if (!token) {
    createApiError(
      'Token not handled by dapp.',
      HttpStatusCode.UpgradeRequired
    );
  }

  const priceBigNumber = ethers.utils.parseEther(
    token!.current_price.toString()
  );

  const amountToMint = priceBigNumber
    .mul(tokenAmountBigNumber)
    .div(ethers.constants.WeiPerEther);

  if (amountToMint.lt(ethers.utils.parseEther('0.1'))) {
    createApiError('Tip worth too little.', HttpStatusCode.UpgradeRequired);
  }

  // TODO get fee from settings ?
  const fee = calculateFee(tokenAmountBigNumber);
  const tokenToUser = tokenAmountBigNumber.sub(fee);

  const provider = ethers.getDefaultProvider();
  const block = await provider.getBlockNumber();
  const { timestamp } = await provider.getBlock(block);
  // const timestamp = Math.floor(Date.now() / 1000);

  const hashData = ethers.utils.solidityKeccak256(
    [
      'uint256',
      'uint256',
      'uint256',
      'uint256',
      'uint256',
      'address',
      'address',
    ],
    [
      tokenAmountBigNumber,
      amountToMint,
      tokenToUser,
      fee,
      timestamp,
      tokenAddress,
      body.userAddress,
    ]
  );

  const hashDataBinary = ethers.utils.arrayify(hashData);
  const tipSignature = await signerAdmin.signMessage(hashDataBinary);

  return res.status(HttpStatusCode.Ok).json({
    signature: tipSignature,
    signatureData: {
      tokenAmount: tokenAmountBigNumber.toString(),
      amountToMint: amountToMint.toString(),
      tokenToUser: tokenToUser.toString(),
      fee: fee.toString(),
      timestamp,
      tokenAddress: tokenAddress as Address,
      userAddress: body.userAddress as Address,
    },
  });
};

export const tipController = {
  signature,
};

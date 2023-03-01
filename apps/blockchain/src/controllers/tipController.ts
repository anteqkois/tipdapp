import { createApiError, HttpStatusCode, TipApi, tipApi } from '@tipdapp/api';
import { handledTokens } from '@tipdapp/constants';
import { Address } from '@tipdapp/types';
import { calculateFee } from '../calculateFee';
import { ethers, provider } from '../lib/ethersProvider';
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

  const coinGeckoId = handledTokens.find(
    (token) => token.address === body.tokenAddress
  )?.coinGeckoId;

  if (!coinGeckoId)
    return createApiError(
      'Token not handled by dapp.',
      HttpStatusCode.UpgradeRequired
    );

  const token = await tokenService.getToken(coinGeckoId);

  if (!token) {
    return createApiError(
      'Token not handled by dapp.',
      HttpStatusCode.UpgradeRequired
    );
  }

  const priceBigNumber = ethers.utils.parseEther(
    token.current_price.toString()
  );

  const amountToMint = priceBigNumber
    .mul(tokenAmountBigNumber)
    .div(ethers.constants.WeiPerEther);

  if (amountToMint.lt(ethers.utils.parseEther('0.1'))) {
    createApiError('Tip worth too little.', HttpStatusCode.UpgradeRequired);
  }

  const fee = calculateFee(tokenAmountBigNumber);
  const tokenToUser = tokenAmountBigNumber.sub(fee);

  const block = await provider.getBlockNumber();
  const { timestamp } = await provider.getBlock(block);

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
      body.tokenAddress,
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
      tokenAddress: body.userAddress as Address,
      userAddress: body.userAddress as Address,
    },
  });
};

export const tipController = {
  signature,
};

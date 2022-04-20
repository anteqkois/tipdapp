import prismaClient from '@/prismaClient';
import { serialize } from 'cookie';
import { ethers } from 'ethers';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  //TODO chaeck if user are already login/auth
  try {
    const { walletAddress, nonce, signature } = req.body;

    const signerAddress = ethers.utils.verifyMessage(nonce, signature);
    if (signerAddress !== walletAddress) {
      throw new ApiError(305, 'Wrong signature, address are not equeal');
    }

    const user = await prismaClient.user.findFirst({
      where: {
        walletAddress: signerAddress,
      },
    });
    console.log(user);

    if (user) {
      if (nonce !== user.nonce) {
        throw new ApiError(305, 'Wrong signature, nonce are not equeal');
      }
      // expiresIn: 3600 = 1 houer
      const accessToken = jwt.sign(
        {
          role: 'authencicated',
          // exp: Date.now() / 1000 + 60 * 60,
          user_metadata: { walletAddress: walletAddress, id: user.id },
        },
        process.env.JWT_TOKEN_SECRET,
        {
          expiresIn: 3600,
        },
      );

      res.setHeader('Set-Cookie', serialize('JWT', accessToken, { path: '/', httpOnly: true, maxAge: 3600 * 24 }));

      await prismaClient.user.update({
        where: { walletAddress },
        data: { nonce: '' },
      });

      res.status(200).json({ message: 'You are authorizated' });
    } else {
      throw new ApiError(401, 'Account not registered. Sign in first');
    }
  } catch (error) {
    console.log(error);
  }
}

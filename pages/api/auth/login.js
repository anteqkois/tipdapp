import uid from 'helpers/generateId';
import prismaClient from '@/prismaClient';
import { ApiError } from 'next/dist/server/api-utils';

export default async function handler(req, res) {
  try {
    const { walletAddress } = req.body;

    // check in db if wallet have account
    const user = await prismaClient.user.findFirst({
      where: {
        walletAddress,
      },
    });

    if (user) {
      const nonce = uid();
      res.status(200).json({ nonce: nonce, user: user });
    } else {
      // ApiError
      throw new ApiError(305, 'Account not registered. Sign in first');
    }
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
}

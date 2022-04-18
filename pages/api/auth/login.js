import { randomUUID } from 'crypto';
import prismaClient from '@/prismaClient';
import { ApiError } from 'next/dist/server/api-utils';

export default async function handler(req, res) {
  try {
    const { walletAddress } = req.body;

    const user = await prismaClient.user.findFirst({
      where: {
        walletAddress,
      },
    });

    if (user) {
      const nonce = randomUUID();
      await prismaClient.user.update({
        where: { walletAddress },
        data: { nonce },
      });
      res.status(200).json({ nonce, user });
    } else {
      throw new ApiError(305, 'Account not registered. Sign in first');
    }
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
}

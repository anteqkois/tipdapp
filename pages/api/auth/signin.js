import { randomUUID } from 'crypto';
import prismaClient from '@/prismaClient';
import { ApiError } from 'next/dist/server/api-utils';

export default async function handler(req, res) {
  try {
    const { walletAddress, email, firstName, lastName } = req.body;

    const user = await prismaClient.user.findFirst({
      where: {
        walletAddress,
      },
    });

    if (!user) {
      const nonce = randomUUID();
      const newUser = await prismaClient.user.create({ data: { walletAddress, email, firstName, lastName, nonce } });
      res.status(200).json({ nonce: nonce, user: newUser });
    } else {
      throw new ApiError(305, 'Account is already register. Login to acccount.');
    }
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 400).send({ error: error.message });
  }
}

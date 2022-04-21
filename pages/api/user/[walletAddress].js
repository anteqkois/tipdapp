import prismaClient from '@/prismaClient';
import { requireAuthApi } from 'lib/requireAuthAPI';
import { ApiError } from 'next/dist/server/api-utils';

const handler= async(req, res)=> {
  try {
    // const { walletAddress } = req.body;
    // const { JWT } = req.cookies;
    // const { bod } = req;

    // const { user } = req;
    // const { walletAddress } = req;

    console.log(req.user);
    // console.log(user);
    // console.log(walletAddress);

    res.status(200).send({ name: 'john' });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 400).send({ error: error.message });
  }
}

export default requireAuthApi
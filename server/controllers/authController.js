const { randomUUID } = require('crypto') ;
const prismaClient = require( '../../prisma/client');
const { ethers } = require('ethers') ;
const jwt = require('jsonwebtoken') ;
const { ApiError } = require('../middlewares/error') ;

const authorization = async (req, res) => {
  //TODO chaeck if user are already login/auth
  let walletAddress, nonce, user;
  try {
    const { signature } = req.body;
    walletAddress = req.body.walletAddress;
    nonce = req.body.nonce;

    const signerAddress = ethers.utils.verifyMessage(nonce, signature);
    if (signerAddress !== walletAddress) {
      throw new ApiError(305, 'Wrong signature, address are not equeal');
    }

    user = await prismaClient.user.findFirst({
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

      // res.setHeader('Set-Cookie', serialize('JWT', accessToken, { path: '/', httpOnly: true, maxAge: 3600 * 24 }));
      res.cookie('JWT', accessToken, {
        maxAge: 3600 * 24,
        httpOnly: true,
      });

      res.status(200).json({ message: 'You are authorizated' });
    } else {
      //TODO create ApiError
      // throw new ApiError(401, 'Account not registered. Sign in first');
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (user) {
      await prismaClient.user.update({
        where: { walletAddress },
        data: { nonce: '' },
      });
    }
  }
};

const login = async (req, res) => {
  try {
    const { walletAddress } = req.body;

    const user = await prismaClient.user.findFirst({
      where: {
        walletAddress,
      },
    });

    const nonce = randomUUID();
    if (user) {
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
};

const logout = async (req, res) => {
  try {
    if (req.cookies.JWT) {
      res.cookie('JWT', accessToken, {
        maxAge: 0,
        httpOnly: true,
      });
      res.status(200).send({ message: 'You are succesfully logout.' });
    } else {
      res.status(422).send({ error: 'You have not logged in yet.' });
    }
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
};

const signin = async (req, res) => {
 try {
   const { walletAddress, email, firstName, lastName, nick } = req.body;

   const user = await prismaClient.user.findFirst({
     where: {
       walletAddress,
     },
   });

   if (!user) {
     const nonce = randomUUID();
     const newUser = await prismaClient.user.create({ data: { walletAddress, email, firstName, lastName, nonce, nick } });
     res.status(200).json({ nonce: nonce, user: newUser });
   } else {
     throw new ApiError(305, 'Account is already register. Login to acccount.');
   }
 } catch (error) {
   res.status(error.statusCode || 400).send({ error: error.message });
 }
};

module.exports = { authorization, login, logout, signin };
module.exports = { authorization, login, logout, signin };

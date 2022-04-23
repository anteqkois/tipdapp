const { randomUUID } = require('crypto');
const { prismaClient } = require('../../prisma/client');
const { ethers } = require('ethers');
const jwt = require('jsonwebtoken');
const { createApiError } = require('../middlewares/error');

const authorization = async (req, res) => {

  if (req.cookies.JWT) {
    const user = jwt.verify(req.cookies.JWT, process.env.JWT_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.cookie('JWT', '', {
          maxAge: 0,
          httpOnly: true,
        });
      } else {
        createApiError('You have already authorized.');
      }
    });
  }

  const { signature, walletAddress, nonce } = req.body;
  if (!signature || !walletAddress || !nonce) createApiError('Missing data in request.');

  const signerAddress = ethers.utils.verifyMessage(nonce, signature);

  if (signerAddress !== walletAddress) {
    createApiError('Wrong signature, addresses are not equeal.');
  }

  user = await prismaClient.user.findFirst({
    where: {
      walletAddress: signerAddress,
    },
  });

  if (user) {
    if (nonce !== user.nonce) {
      createApiError('Wrong signature, nonces are not equeal.');
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

    res.cookie('JWT', accessToken, {
      maxAge: 3600 * 24,
      httpOnly: true,
    });

    res.status(200).json({ message: 'You are authorizated' });
  } else {
    createApiError('Account not registered. Sign in first.');
  }

  await prismaClient.user.update({
    where: { walletAddress },
    data: { nonce: '' },
  });
};

const login = async (req, res) => {
  const { walletAddress } = req.body;
  if (!walletAddress) createApiError('Missing wallet address.');

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
    createApiError('Account not registered. Sign in first.', 400);
  }
};

const logout = async (req, res) => {
  if (req.cookies.JWT) {
    res.cookie('JWT', '', {
      maxAge: 0,
      httpOnly: true,
    });
    res.status(200).send({ message: 'You are succesfully logout.' });
  } else {
    createApiError('You have not logged in yet.', 422);
  }
};

const signin = async (req, res) => {
  const { walletAddress, email, firstName, lastName, nick } = req.body;
  if (!walletAddress || !email || !firstName || !lastName || !nick) createApiError('Missing data to create accout.');

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
    // next(createApiError('Account is already register. Login to acccount.', 305));
    createApiError('Account is already register.');
  }
};

module.exports = { authorization, login, logout, signin };

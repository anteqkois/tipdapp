const { randomUUID } = require('crypto');
const { prismaClient } = require('../../prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client').Prisma;
const { ethers } = require('ethers');
const jwt = require('jsonwebtoken');
const { createApiError, createValidationError, ValidationError } = require('../middlewares/error');
const { capitalizeFirstLetter } = require('../utils/capitalizeFirstLetter');

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

    //TODO add refresh token
    const accessToken = jwt.sign(
      {
        role: 'authencicated',
        user_metadata: { walletAddress: walletAddress, id: user.id },
      },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: 3600,
      },
    );

    res.cookie('JWT', accessToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json({ message: 'You are authorizated', user: { ...user, nonce: '' } });
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
    try {
      const newUser = await prismaClient.user.create({ data: { walletAddress, email, firstName, lastName, nonce, nick } });
      res.status(200).json({ nonce: nonce, user: newUser });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const errors = [];

          const validationError = new ValidationError(
            error.meta.target[0],
            `${capitalizeFirstLetter(error.meta.target[0])} used.`,
            `${capitalizeFirstLetter(error.meta.target[0])} already used by someone.`,
            `${error.meta.target}.unique`,
          );

          errors.push(validationError);

          createValidationError(errors, 403);
        }
      } else {
      }
      createApiError('Something went wrong, you. Account not created.');
    }
  } else {
    // next(createApiError('Account is already register. Login to acccount.', 305));
    createApiError('Account is already register.', 403);
  }
};

module.exports = { authorization, login, logout, signin };

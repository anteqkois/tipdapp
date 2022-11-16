import jwt from 'jsonwebtoken';
import { generateNonce, SiweMessage } from 'siwe';
import { createValidationError, createValidationErrors, isOperational, ValidationError } from '../middlewares/error.js';
import { User } from '../services/userService.js';
import { signUpValidation } from '../validation/signUpValidaion.old.js';
//     //TODO add refresh token

const validateSiweMessage = async (message, signature) => {
  const siwe = new SiweMessage(message || {});

  //TODO! Check if domain checking works
  const { data, success } = await siwe.verify({ signature, domain: process.env.DOMAIN });

  return success
    ? data
    : createValidationError("Siwe Message didn't pass validation.", 'Siwe Validation', 'siwe', 'siwe.invalid');
};

const createAuthToken = (userSessionData) => {
  const accessToken = jwt.sign(
    {
      role: 'user',
      metadata: { address: userSessionData.address, nick: userSessionData.nick },
    },
    process.env.JWT_TOKEN_SECRET,
    {
      // 1 hour = 3600s
      expiresIn: 3600,
    },
  );
  return accessToken;
};

const createNonce = (req, res) => {
  //TODO! Save nonce in db or in redis cache
  res.status(200).json({ nonce: generateNonce() });
};

const signUp = async (req, res) => {
  const { message, signature, formData } = req.body;

  try {
    const siweMessage = await validateSiweMessage(message, signature);

    //Validate schema
    signUpValidation.parse(formData);

    //Validate unique
    const userExist = await User.checkIfExist(
      { address: siweMessage.address },
      { email: formData.email },
      { nick: formData.nick },
    );

    //throw error if exist
    if (userExist) {
      const errors = [];
      if (userExist.address === siweMessage.address) {
        const validationError = new ValidationError(
          'address',
          `Already registered.`,
          `The wallet has already been registered. Go to login page or disconnect wallet from DAPP and then change wallet.`,
          `address.unique`,
        );
        errors.push(validationError);
      }
      if (userExist.email === formData.email) {
        const validationError = new ValidationError('email', `Email used.`, `Email already used by someone.`, `email.unique`);
        errors.push(validationError);
      }
      if (userExist.nick === formData.nick) {
        const validationError = new ValidationError('nick', `Nick used.`, `Nick already used by someone.`, `nick.unique`);
        errors.push(validationError);
      }
      createValidationErrors(errors);
    }

    const userSessionData = await User.create({ ...formData, address: siweMessage.address });
    console.log(userSessionData);

    const authToken = createAuthToken(userSessionData);

    res.cookie('authToken', authToken, {
      secure: true,
      // 1h
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json({ message: 'The account has been successfully created.', user: userSessionData });
  } catch (error) {
    isOperational(error, "Something went wrong, account didn't created.");
  }
};

const verifyMessageAndLogin = async (req, res) => {
  const { message, signature } = req.body;
  try {
    const siweMessage = await validateSiweMessage(message, signature);

    const userSessionData = await User.find(siweMessage);

    if (userSessionData) {
      //TODO add refresh token
      const authToken = createAuthToken(userSessionData);

      res.cookie('authToken', authToken, {
        secure: true,
        // 1h
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(200).json({ message: 'You are authorizated', user: userSessionData });
    } else {
      createValidationError('Account not registered. Sign in first.', 'No user found', 'user', 'user');
    }
  } catch (err) {
    isOperational(errors, "Something went wrong, you didn't login.");
  }
};

const logout = async (req, res) => {
  res.cookie('authToken', '', {
    maxAge: 0,
    expries: Date.now(),
    httpOnly: true,
  });
  res.cookie('authStatus', '', {
    // 1h
    maxAge: 60 * 60 * 1000,
  });
  res.status(200).send({ message: 'You are succesfully logout.' });
};

const validate = async (req, res) => {
  const { email, nick } = req.body;

  try {
    //Validate schema
    signUpValidation.parse(req.body);

    //Validate unique
    const user = await User.checkIfExist({ email, nick });

    if (user) {
      const errors = [];
      if (user.email === email) {
        const validationError = new ValidationError('email', `Email used.`, `Email already used by someone.`, `email.unique`);
        errors.push(validationError);
      }
      if (user.nick === nick) {
        const validationError = new ValidationError('nick', `Nick used.`, `Nick already used by someone.`, `nick.unique`);
        errors.push(validationError);
      }
      createValidationErrors(errors);
    }
  } catch (errors) {
    isOperational(errors, "Something went wrong, data didn't pass validation.");
  }

  res.status(200).json({ message: 'Validation passed' });
};

export { validate, createNonce, verifyMessageAndLogin, logout, signUp };

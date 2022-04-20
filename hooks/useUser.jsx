import React, { useState } from 'react';
import axios from 'axios';
import useEthers from './useEthers';
import toast from 'react-hot-toast';

const useUser = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { signer, connectWallet } = useEthers();

  const login = async () => {
    try {
      if (!signer) {
        const { signer: newSigner } = await connectWallet();
        signer = newSigner;
      }

      const address = await signer.getAddress();

      const { data } = await axios('/api/auth/login', {
        method: 'POST',
        data: {
          walletAddress: address,
        },
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async ({ firstName, lastName, email, nick }) => {
    try {
      if (!signer) {
        const { signer: newSigner } = await connectWallet();
        signer = newSigner;
      }

      const walletAddress = await signer.getAddress();

      const dataSignIn = await axios('/api/auth/signin', {
        method: 'POST',
        data: {
          walletAddress,
          firstName,
          lastName,
          email,
          nick,
        },
      });

      const signature = await signer.signMessage(dataSignIn.data.nonce);

      const dataAuth = await axios('/api/auth/authentication', {
        method: 'POST',
        data: {
          walletAddress,
          nonce: dataSignIn.data.nonce,
          signature,
        },
      });
      dataAuth.status = 200 && toast.success('You are succesfully sign in');
    } catch (error) {
      //TODO handle display api error 
      toast.error(error.message);
      // console.log(error);
    }
  };

  return { login, signIn };
};

export default useUser;

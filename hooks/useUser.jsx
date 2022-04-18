import React, { useState } from 'react';
import axios from 'axios';
import useEthers from './useEthers';

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

  const signIn = async () => {
    try {
      if (!signer) {
        const { signer: newSigner } = await connectWallet();
        signer = newSigner;
      }

      const walletAddress = await signer.getAddress();

      const signInData = {
        walletAddress,
        email: 'jannowaq@gmail.com',
        firstName: 'Jan',
        lastName: 'Nowak',
      };

      const { data } = await axios('/api/auth/signin', {
        method: 'POST',
        data: {
          ...signInData,
        },
      });

      console.log(data)

      const signature = await signer.signMessage(data.nonce);
      await axios('/api/auth/verification', {
        method: 'POST',
        data: {
          walletAddress,
          nonce: data.nonce,
          signature,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { login, signIn };
};

export default useUser;

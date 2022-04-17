import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import useEthers from './useEthers';

const useUser = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { signer, connectWallet } = useEthers();

  // useEffect(async () => {
  //   if (isConnected) {
  //     // console.log(signer);
  //     const address = signer.getAddress();

  //     await axios('/api/auth/login', {
  //       method: 'POST',
  //       data: {
  //         walletAddress: address,
  //       },
  //     });
  //   }
  // }, [isConnected]);

  const login = async () => {
    try {
      if (!signer) {
        const { signer: newSigner } = await connectWallet();
        signer = newSigner;
      }

      const address = await signer.getAddress();

      // console.log(address);
      const { data } = await axios('/api/auth/login', {
        method: 'POST',
        data: {
          walletAddress: address,
        },
      });

      console.log(data);
    } catch (error) {
      console.log(error);
      // console.log(error.error);
    }
  };

  const signIn = async () => {};

  return { login, signIn };
};

export default useUser;

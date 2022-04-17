import React, { useState, useContext } from 'react';
import { ethers } from 'ethers';
// import { rinkeby } from '../constants/chains';
// import useAlert from './useAlert';
// import Button from './../components/utils/Button';

export const EthersContext = React.createContext();

export const EthersProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  // const [accounts, setAccounts] = useState(null);
  const [signer, setSigner] = useState(null);
  // const [AlertWrongNetwork, setAlertWrongNetwork] = useAlert();

  const handleChangeNetwork = async () => {
    // try {
    //   await window.ethereum.request({
    //     method: 'wallet_switchEthereumChain',
    //     params: [{ chainId: `0x${Number(4).toString(16)}` }],
    //   });
    // } catch (switchError) {
    //   // This error code indicates that the chain has not been added to MetaMask.
    //   if (switchError.code === 4902) {
    //     try {
    //       await window.ethereum.request({
    //         method: 'wallet_addEthereumChain',
    //         params: [
    //           {
    //             ...rinkeby,
    //           },
    //         ],
    //       });
    //     } catch (addError) {
    //       // handle "add" error
    //     }
    //   }
    //   // handle other "switch" errors
    // }
  };

  //TODO Add alert if user doens't open extension to login
  const handleConnectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error('No crypto wallet found. Please install it.');

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      setSigner(signer);

      //TODO in future use rinkeby network (4)
      // const networkId = await web3.eth.net.getId();
      // console.log(networkId);

      // //use local Ganache
      // networkId !== 5777 && setAlertWrongNetwork(true);

      // setAccounts(await web3.eth.getAccounts());
      return { signer, provider };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EthersContext.Provider
      value={{
        provider,
        signer,
        // switchNetwork: handleChangeNetwork,
        connectWallet: handleConnectWallet,
      }}
    >
      {children}
      {/* <AlertWrongNetwork>
        You use wrong network. Switch to Rinkeby network !
        <Button type="minimalist" onClick={handleChangeNetwork}>
          Switch to Rinkeby network
        </Button>
      </AlertWrongNetwork> */}
    </EthersContext.Provider>
  );
};

const useEthers = () => useContext(EthersContext);

export default useEthers;

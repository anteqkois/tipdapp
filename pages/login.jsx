import axios from 'axios';
import React from 'react';
import useEthers from '../hooks/useEthers';
import useUser from '../hooks/useUser';

const login = () => {
  // const {} = useUserWallet();
  const { connectWallet } = useEthers();
  const { login, signIn, logout } = useUser();

  const getUserdata = async () => {

    const data = await axios('/api/user/123123') 
  };

  return (
    <>
      {/* <button onClick={connectWallet}>Connect wallet</button> */}
      <button onClick={login}>Login</button>
      <br />
      <button onClick={signIn}>signin</button>
      <br />
      <button onClick={logout}>logout</button>
      <br />
      <button onClick={getUserdata}>getUserdata</button>
      {/* <button onClick={handlePostRequest}>handlePostRequest</button> */}
    </>
  );
};

export default login;

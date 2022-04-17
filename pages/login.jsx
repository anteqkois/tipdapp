import React from 'react';
import useEthers from '../hooks/useEthers';
import useUser from '../hooks/useUser';

const login = () => {
  // const {} = useUserWallet();
  const { connectWallet } = useEthers();
  const { login } = useUser();

  return (
    <>
      {/* <button onClick={connectWallet}>Connect wallet</button> */}
      <button onClick={login}>Login</button>
      {/* <button onClick={handlePostRequest}>handlePostRequest</button> */}
    </>
  );
};

export default login;

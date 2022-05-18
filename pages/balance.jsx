import { useEtherBalance, useEthers } from '@usedapp/core';
import React from 'react';

const balance = () => {
  const { account, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);
  
  return (
    <div>
      {account && <button onClick={() => deactivate()}>Disconnect</button>}
      {etherBalance && (
        <div className="balance">
          <br />
          Balance:
          <p className="bold">{formatEther(etherBalance)}</p>
        </div>
      )}
    </div>
  );
};

export default balance;

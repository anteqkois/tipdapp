// import { useEtherBalance, useEthers } from '@usedapp/core';
import useUser from '@/hooks/useUser';
import React from 'react';
import { useBalance } from 'wagmi';

const balance = () => {
  // const { account, deactivate } = useEthers();
  // const etherBalance = useEtherBalance(account);
  const { user } = useUser();

  // const { data, isLoading }, balance = useBalance({
  const  balance = useBalance({
    addressOrName: user.address,
    formatUnits: 'ether',
  });

  console.log(balance)

  return (
    <div>
      {/* {account && <button onClick={() => deactivate()}>Disconnect</button>} */}
      {/* {data && (
        <div className="balance">
          <br />
          Balance:
          <p className="bold">{data}</p>
        </div>
      )} */}
      {/* │ Run the following to update │ │ npm i --save-dev prisma@latest │ │ npm i @prisma/client@latest */}
    </div>
  );
};

export default balance;

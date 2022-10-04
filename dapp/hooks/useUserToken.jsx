import { useContractRead } from 'wagmi';
import { useUser } from '.';
import UserToken from '../artifacts/localhost/UserToken.json';

export const useUserToken = () => {
  const {
    user: { token },
  } = useUser();

  //useMemo
  const contractInstance = {
    addressOrName: token.address,
    contractInterface: UserToken.abi,
  };

  // READ
  const totalSupply = useContractRead({
    ...contractInstance,
    functionName: 'totalSupply',
  });
  const decimals = useContractRead({
    ...contractInstance,
    functionName: 'decimals',
  });
  const balanceOf = useContractRead({
    ...contractInstance,
    functionName: 'balanceOf',
    args: [''],
  });

  // WRITE

  return { totalSupply, decimals, balanceOf };
};

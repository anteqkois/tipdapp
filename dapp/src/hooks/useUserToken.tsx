import { useContractRead } from 'wagmi';
import UserToken from '../artifacts/localhost/UserToken.json';

export const useUserToken = (address: string) => {
  // const {
  //   user: { token },
  // } = useUser();
  // address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';


  //useMemo
  const contractInstance = {
    addressOrName: address,
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

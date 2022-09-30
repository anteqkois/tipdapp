import { ethereum } from '@/utils/constants';
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { useUser } from '.';
// import QoistipSign from '../../artifacts/hardhat/QoistipSign.json';
import QoistipSign from '../artifacts/localhost/QoistipSign.json';
const contractInstance = {
  addressOrName: QoistipSign.address,
  contractInterface: QoistipSign.abi,
};

export const useQoistipSign = () => {
  const {
    user: { walletAddress },
  } = useUser();

  // READ
  // tokenUser
  const tokenUser = useContractRead({
    ...contractInstance,
    functionName: 'tokenUser',
    args: walletAddress,
  });

  // WRITE
  // registerUser
  console.log(!Boolean(tokenUser?.data !== ethereum.zeroAddress));
  const { config, error } = usePrepareContractWrite({
    ...contractInstance,
    functionName: 'registerUser',
    args: ['', ''],
    enabled: !Boolean(tokenUser?.data !== ethereum.zeroAddress),
    onSuccess: (data) => {
      console.log('success', data);
    },
  });
  const registerUser = useContractWrite(config);

  return { registerUser, tokenUser };
};

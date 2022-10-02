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
  const userToken = useContractRead({
    ...contractInstance,
    functionName: 'userToken',
    args: walletAddress,
  });

  // WRITE
  // registerUser
  const { config, error } = usePrepareContractWrite({
    ...contractInstance,
    functionName: 'registerUser',
    args: ['', ''],
    enabled: !Boolean(userToken?.data !== ethereum.zeroAddress),
    onSuccess: (data) => {
      //give toast info
      console.log('success', data);
    },
  });
  const registerUser = useContractWrite(config);

  return { registerUser, tokenUser: userToken };
};

import toast from 'react-hot-toast';
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
    // enabled: !Boolean(userToken?.data !== ethereum.zeroAddress),
    enabled: false,
  });
  const registerUser = useContractWrite({
    ...config,
    onSuccess: (data) => {
      toast.success('Your token was succesfully create !');
      console.log('success', data);
    },
    onError: (error) => {
      toast.error('Something went wrong, we can not create your token.');
      console.log(error);
      console.log(error.message);
      console.log(JSON.parse(error.message));
    },
  });

  return { registerUser, tokenUser: userToken };
};

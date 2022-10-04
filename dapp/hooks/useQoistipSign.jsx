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
  // console.log(Boolean(userToken?.data !== ethereum.zeroAddress));

  // WRITE
  // registerUser
  const { config, error } = usePrepareContractWrite({
    ...contractInstance,
    functionName: 'registerUser',
    args: ['', ''],
    enabled: userToken?.data === ethereum.zeroAddress,
    // enabled: true,
  });

  const registerUser = useContractWrite({
    ...config,
    onSuccess: (data) => {
      toast.success('Your token was succesfully create !');
      console.log('success', data);
    },
    onError: (error) => {
      toast.error('Something went wrong, we can not create your token.');
      // console.log(error.error);
      // console.log(error.message);
      // console.log(error);
      // console.log(JSON.parse(error.message));
    },
  });
  console.log(registerUser.error);

  return { registerUser, userToken };
};

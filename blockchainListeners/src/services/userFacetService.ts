// const getUserTokenData = async ({ userToken, userAddress, txHash }) => {
//   const UserToken = new ethers.Contract(userToken, UserTokenJSON.abi, provider);
//   const symbol = await UserToken.symbol();
//   const name = await UserToken.name();
//   const { chainId } = await provider.getNetwork();

//   const data = {
//     address: userToken,
//     symbol,
//     name,
//     chainId,
//     txHash,
//     userAddress,
//   };

//   return data;
// };

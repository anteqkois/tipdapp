export const abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"address","name":"userTokenAddress","type":"address"}],"name":"NewUser","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"donator","type":"address"},{"indexed":true,"internalType":"address","name":"addressToTip","type":"address"},{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"Tip","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"},{"internalType":"address","name":"_tokenAddress","type":"address"}],"name":"balanceERC20","outputs":[{"internalType":"uint256","name":"_balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"balanceETH","outputs":[{"internalType":"uint256","name":"_balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_tokenSymbol","type":"string"},{"internalType":"string","name":"_tokenName","type":"string"}],"name":"registerUser","outputs":[{"internalType":"address","name":"_tokenAddress","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"_signature","type":"bytes"},{"internalType":"uint256","name":"_tokenAmount","type":"uint256"},{"internalType":"uint256","name":"_mintTokenAmount","type":"uint256"},{"internalType":"uint256","name":"_toUser","type":"uint256"},{"internalType":"uint256","name":"_fee","type":"uint256"},{"internalType":"uint256","name":"_timestampOffChain","type":"uint256"},{"internalType":"address","name":"_addressToTip","type":"address"},{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"address","name":"_userTokenAddress","type":"address"}],"name":"tipERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addressToTip","type":"address"}],"name":"tipETH","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"}],"name":"userToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"}],"name":"withdrawERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawETH","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_tokenAddress","type":"address[]"}],"name":"withdrawManyERC20","outputs":[],"stateMutability":"nonpayable","type":"function"}] as const;
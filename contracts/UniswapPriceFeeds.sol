pragma solidity ^0.8.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract UniswapPriceFeeds {

   // calculate price based on pair reserves
   function getTokenPrice(address pairAddress, uint amount) public view returns(uint)
   {
    IUniswapV2Pair pair = IUniswapV2Pair(pairAddress);
    // IERC20 token1 = IERC20(pair.token1());
    (uint Res0, uint Res1,) = pair.getReserves();

    // decimals
    uint res0 = Res0*(10**18);
    return((amount*res0)/Res1); // return amount of token0 needed to buy token1
   }
    
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract QoistipPriceAggregator {
    mapping(address => uint256)  private tokenPrice;

    constructor() {
        //set ELON price
        tokenPrice[0x761D38e5ddf6ccf6Cf7c55759d5210750B5D60F3] = 108;
    }

    function latestRoundData(address _addressToken)
        external
        view
        returns (
            int256 answer
        )
    {
     // return price in 8 digit after coma. Example SAND = 3,3$ ==> return 330000000
     answer = int(tokenPrice[_addressToken]);
    }
}

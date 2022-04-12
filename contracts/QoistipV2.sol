//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Qoistip.sol";

contract QoistipV2 is Qoistip {
    function _getPrice(address _tokenAddress)
        internal
        view
        virtual
        override
        returns (uint256)
    {
       
    }

    function version() external pure override returns (uint8) {
        return 2;
    }
}

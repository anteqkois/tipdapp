//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface TokenPrice {
    function getTokenPrice(address pairAddress, uint256 amount)
        external
        view
        returns (uint256);
}

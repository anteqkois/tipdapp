// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";

contract UserFacet {
    event Withdraw(address indexed user, address tokenAddress, uint256 tokenAmount);
    event NewUser(address indexed userAddress, address userToken);
}

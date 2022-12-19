// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";

contract TipFacet {
    event Donate(address indexed donator, address indexed addressToDonate, address tokenAddress, uint256 tokenAmount);
}

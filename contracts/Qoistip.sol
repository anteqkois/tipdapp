//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/** @title In the future, working name for now */
contract Qoistip is Ownable {
    using SafeMath for uint256;

    int8 margin;
    mapping(address => bool) suportedTokens;
    mapping(address => bool) customers;

    /** 
    @dev Mapp belowe store balance of customer to all suported tokens.
    customerAddress ==> suportedTokenAddress ==> balanceofTokensInThisContract
     */
    mapping(address => mapping(address => uint256)) customerToTokenAddressToBalance;

    constructor() {
        console.log("Deploying a Qoistip");
    }

    function handleDonate(uint256 _tokenAmount, address _tokenAddress)
        external
    {

    }
}

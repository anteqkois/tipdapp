//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/** @title In the future, working name for now */
contract Qoistip is Ownable {
    using SafeMath for uint256;

    /// 99=>1%,  0,1%=>999  0,03% => 997
    uint256 fee;
    mapping(address => bool) suportedTokens;
    mapping(address => bool) customers;

    /** 
    @dev Mapp belowe store balance of customer to all suported tokens.
    customerAddress ==> suportedTokenAddress ==> balanceofTokensInThisContract
     */
    mapping(address => mapping(address => uint256)) customerToTokenAddressToBalance;

    constructor(uint256 _fee) {
        fee = _fee;
    }

    function setFee(uint _fee) external onlyOwner{
        fee = _fee;
    }

    function calculateWithFee(uint256 _amount) public view returns (uint256) {
        return (_amount * fee) / 10000;
    }

    function handleDonate(uint256 _tokenAmount, address _tokenAddress)
        external
    {}

    function addCustomer(address _customer) external {}

    function addSuportedToken(address _token) external {}

    function suportedToken() external view returns (address[] memory) {}

    function isSuportedToken() public view returns (bool suported) {}
}

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/** @title In the future, working name for now */
contract Qoistip is Ownable {
    using SafeMath for uint256;

    /// 99=>1%,  0,1%=>999  0,03% => 997
    // address USDT = 0xdAC17F958D2ee523a2206206994597C13D831ec7;
    uint256 fee;
    mapping(address => bool) supportedTokens;
    mapping(address => mapping(address => uint256)) customerToTokenToBalance;

    event newSuportedToken(address newSuportedToken);

    constructor(uint256 _fee) {
        fee = _fee;
    }

    function setFee(uint256 _fee) external onlyOwner {
        require(_fee < 10000);
        fee = _fee;
    }

    function calculateWithFee(uint256 _amount) public view returns (uint256) {
        return (_amount * fee) / 10000;
    }

    function customerBalance(address _tokenAddress)
        external
        view
        returns (uint256 balance)
    {
        return customerToTokenToBalance[msg.sender][_tokenAddress];
    }

    function addSuportedToken(address _tokenAddress) external {
        require(supportedTokens[_tokenAddress] == false);
        supportedTokens[_tokenAddress] = true;
        emit newSuportedToken(_tokenAddress);
    }

    function supportedToken(address _tokenAddress)
        external
        view
        returns (bool)
    {
        return supportedTokens[_tokenAddress];
    }

    function handleDonate(
        address _tokenAddress,
        uint256 _tokenAmount,
        address _addressToTip
    ) external returns (bool success) {
        require(_addressToTip != address(0), "Can not send to 0 address");
        require(supportedTokens[_tokenAddress], "Not supported token");
        IERC20(_tokenAddress).transferFrom(
            msg.sender,
            address(this),
            _tokenAmount
        );
        uint256 withFee = calculateWithFee(_tokenAmount);
        customerToTokenToBalance[_addressToTip][_tokenAddress] = withFee;
        customerToTokenToBalance[owner()][_tokenAddress] =
            _tokenAmount -
            withFee;
        return true;
    }
}

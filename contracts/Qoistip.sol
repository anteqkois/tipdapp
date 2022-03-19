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
    mapping(address => mapping(address => uint256)) addressToTokenToBalance;
    mapping(address => uint256) BalanceETH;

    event NewSuportedToken(address newSuportedToken);
    event Donate(
        address donator,
        address addressToDonate,
        address tokenAddress,
        uint256 tokenAmount
    );
    event Withdraw(address customer, address tokenAddress, uint256 tokenAmount);

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

    function balanceOfERC20(address _customerAddress, address _tokenAddress)
        external
        view
        returns (uint256 balance)
    {
        return addressToTokenToBalance[_customerAddress][_tokenAddress];
    }

    function balanceOfETH(address _customerAddress)
        external
        view
        returns (uint256 balance)
    {
        return BalanceETH[_customerAddress];
    }

    function addSuportedToken(address _tokenAddress) external onlyOwner {
        require(supportedTokens[_tokenAddress] == false);
        supportedTokens[_tokenAddress] = true;
        emit NewSuportedToken(_tokenAddress);
    }

    function supportedToken(address _tokenAddress)
        external
        view
        returns (bool)
    {
        return supportedTokens[_tokenAddress];
    }

    function donateERC20(
        address _addressToDonate,
        address _tokenAddress,
        uint256 _tokenAmount
    ) external returns (bool success) {
        require(_addressToDonate != address(0), "Can not send to 0 address");
        require(supportedTokens[_tokenAddress], "Not supported token");
        require(_tokenAmount != 0, "Donate tokens amount can not be 0");
        IERC20(_tokenAddress).transferFrom(
            msg.sender,
            address(this),
            _tokenAmount
        );
        uint256 _withFee = calculateWithFee(_tokenAmount);
        addressToTokenToBalance[_addressToDonate][_tokenAddress] = _withFee;
        addressToTokenToBalance[address(this)][_tokenAddress] =
            _tokenAmount -
            _withFee;
        emit Donate(msg.sender, _addressToDonate, _tokenAddress, _tokenAmount);
        return true;
    }

    function donateETH(address _addressToDonate)
        external
        payable
        returns (bool success)
    {
        uint256 _value = msg.value;
        require(_addressToDonate != address(0), "Can not send to 0 address");
        require(_value != 0, "Donate tokens amount can not be 0");

        uint256 _withFee = calculateWithFee(_value);
        BalanceETH[_addressToDonate] = _withFee;
        BalanceETH[address(this)] = _value - _withFee;
        emit Donate(msg.sender, _addressToDonate, address(0), _value);
        return true;
    }

    function withdrawERC20(address _tokenAddress) public {
        uint256 _tokenBalance = addressToTokenToBalance[msg.sender][
            _tokenAddress
        ];
        require(_tokenBalance != 0, "You have 0 tokens on balance");
        addressToTokenToBalance[msg.sender][_tokenAddress] = 0;
        IERC20(_tokenAddress).transfer(msg.sender, _tokenBalance);
    }

    function withdrawManyERC20(address[] memory _tokenAddress) external {
        uint256 _iteration = _tokenAddress.length;
        for (uint256 _i = 0; _i < _iteration; _i++) {
            withdrawERC20(_tokenAddress[_i]);
        }
    }

    function withdrawETH() public {
        uint256 _ethBalance = BalanceETH[msg.sender];
        require(_ethBalance >= 0, "Your have not ETH on contract balance");
        BalanceETH[msg.sender] = 0;
        (bool sent, ) = address(msg.sender).call{value: _ethBalance}("");
        require(sent, "Failed to send Ether");
    }
}

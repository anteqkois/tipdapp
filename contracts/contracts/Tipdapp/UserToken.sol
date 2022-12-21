//SPDX-License-Identifier: MIT
// CHANGE LICENSE !
pragma solidity ^0.8.0;

import {IUserToken} from "./interfaces/IUserToken.sol";

contract UserToken is IUserToken {
    string private _name;
    string private _symbol;
    uint256 private _totalSupply;
    address private _owner;

    mapping(address => mapping(address => uint256)) private _allowance;
    mapping(address => uint256) private _balanceOf;

    modifier onlyOwner() {
        require(_owner == msg.sender, "Only owner");
        _;
    }

    constructor() {
        _owner = msg.sender;
    }

    function initialize(string memory symbol_, string memory name_) external virtual onlyOwner {
        _name = name_;
        _symbol = symbol_;
    }

    function name() external view virtual override returns (string memory) {
        return _name;
    }

    function symbol() external view virtual override returns (string memory) {
        return _symbol;
    }

    function decimals() external pure virtual override returns (uint8) {
        return 18;
    }

    function totalSupply() external view virtual override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view virtual override returns (uint256) {
        return _balanceOf[account];
    }

    function allowance(address tokenOwner, address spender) external view virtual override returns (uint256) {
        return _allowance[tokenOwner][spender];
    }

    function owner() external view virtual returns (address) {
        return _owner;
    }

    function changeOwner(address newOwner) external virtual onlyOwner returns (bool) {
        require(newOwner != address(0), "New owner is zero address");
        _owner = newOwner;
        return true;
    }

    function approve(address spender, uint256 amount) external virtual override returns (bool) {
        // require(spender != address(0), "Approve to zero address");
        _allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external override returns (bool) {
        uint256 allowed = _allowance[from][msg.sender];
        require(allowed >= amount, "Insufficient allowance");

        if (allowed != type(uint256).max) _allowance[from][msg.sender] = allowed - amount;

        _transfer(from, to, amount);
        // it neccesary to return bool ?
        return true;
    }

    function transfer(address to, uint256 amount) external override returns (bool) {
        _transfer(msg.sender, to, amount);
        // it neccesary to return bool ?
        return true;
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(to != address(0), "Transfer to zero address");
        require(to != address(this), "Transfer to this address");

        uint256 balance = _balanceOf[from];
        require(balance >= amount, "Amount exceeds balance");

        unchecked {
            _balanceOf[from] -= amount;
            _balanceOf[to] += amount;
        }
        emit Transfer(from, to, amount);
    }

    // change onlyOwner to owners
    function mint(address account, uint256 amount) external onlyOwner {
        // nie będzie możliwości by wywołąć tą funkcję do mintowani do adresu 0
        // require(account != address(0), "Mint to zero address");

        unchecked {
            _balanceOf[account] += amount;
            _totalSupply += amount;
        }
        emit Transfer(address(0), account, amount);
    }

    // anyone can burn ?
    function burn(uint256 amount) external {
        uint256 accountBalance = _balanceOf[msg.sender];
        require(accountBalance >= amount, "Burn amount exceeds balance");
        unchecked {
            _balanceOf[msg.sender] = accountBalance - amount;
            _totalSupply -= amount;
        }

        emit Transfer(msg.sender, address(0), amount);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ICustomerToken.sol";

contract CustomerToken is Ownable, ICustomerToken {
    string private _name;
    string private _symbol;
    uint256 private _totalSupply;

    mapping(address => mapping(address => uint256)) private _allowance;
    mapping(address => uint256) private _balanceOf;

    constructor(string memory symbol_, string memory name_)
    {
        _name = name_;
        _symbol = symbol_;
        // _mint(msg.sender, 1_000 * 10**18);
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

    function balanceOf(address account)
        external
        view
        virtual
        override
        returns (uint256)
    {
        return _balanceOf[account];
    }

    function allowance(address owner, address spender)
        external
        view
        virtual
        override
        returns (uint256)
    {
        return _allowance[owner][spender];
    }

    function approve(address spender, uint256 amount)
        external
        virtual
        override
        returns (bool)
    {
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external override returns (bool) {
        // require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");
        // TODO underflow work ? require(_balanceOf[from] >= amount, "ERC20: transfer amount exceeds balance");

        uint256 allowed = _allowance[from][msg.sender];
        require(allowed >= amount, "ERC20: insufficient allowance");

        if (allowed != type(uint256).max)
            _allowance[from][msg.sender] = allowed - amount;

        unchecked {
            // TODO check if underflow works require(_balanceOf[from] >= amount)
            _balanceOf[from] -= amount;
            _balanceOf[to] += amount;
        }

        emit Transfer(from, to, amount);

        return true;
    }

    function transfer(address to, uint256 amount)
        external
        override
        returns (bool)
    {
        require(to != address(0), "ERC20: transfer to the zero address");

        // TODO underflow work ? require(_balanceOf[msg.sender] >= amount, "ERC20: transfer amount exceeds balance");
        _balanceOf[msg.sender] -= amount;

        unchecked {
            _balanceOf[to] += amount;
        }

        emit Transfer(msg.sender, to, amount);

        return true;
    }

    // change onlyOwner to owners
    function mint(address account, uint256 amount) external onlyOwner {
        // nie będzie możliwości by wywołąć tą funkcję do mintowani do adresu 0
        // require(account != address(0), "ERC20: mint to the zero address");

        unchecked {
            _balanceOf[account] += amount;
            _totalSupply += amount;
        }
        emit Transfer(address(0), account, amount);
    }

    function burn(address account, uint256 amount) external {
        require(account != address(0), "ERC20: burn from the zero address");

        uint256 accountBalance = _balanceOf[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balanceOf[account] = accountBalance - amount;
            _totalSupply -= amount;
        }

        emit Transfer(account, address(0), amount);
    }
}

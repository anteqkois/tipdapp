// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token2 is ERC20 {
    uint8 public _decimals = 18;

    constructor() ERC20("Token2", "TK2") {
        /// Mint 1mln Token2
        _mint(msg.sender, 1_000_000 * 10**18);
    }
}

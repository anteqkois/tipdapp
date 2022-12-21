// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";

interface IUserToken is IERC20 {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);

    // function maxSupply() external view returns (uint256);
    function initialize(string memory symbol_, string memory name_) external;

    function owner() external view returns (address);

    function changeOwner(address newOwner) external returns (bool);

    function mint(address account, uint256 amount) external;

    function burn(uint256 amount) external;
}

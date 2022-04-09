//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Qoistip.sol";

contract QoistipV2 is Qoistip {
    function version() external override pure returns (uint8) {
        return 2;
    }
}

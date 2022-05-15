//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./QoistipSign.sol";

contract QoistipSignV2 is QoistipSign {
    uint private number;

    function setNumber(uint _number) external virtual {
        number = _number;
    }

    function getNumber() external view virtual returns(uint){
        return number;
    }

    function version() external pure virtual override returns (uint8) {
        return 2;
    }
}
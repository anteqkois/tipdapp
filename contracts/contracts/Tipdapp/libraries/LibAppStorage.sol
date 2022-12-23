// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "./LibDiamond.sol";

struct AppStorage {
    //  uint256 internal _minValue;
    // 0100=>1%  0010=>0,1%  0001=>0,01%  0300=>3%  0030=>0,3%
    uint256 tipFee;
    bool paused;
    //Use mapping to handle many address to handle many tip in time
    address signerAdmin;
    mapping(address => uint256) balanceETH;
    mapping(address => mapping(address => uint256)) addressToTokenToBalance;
    mapping(address => address) tokenToUser;
    address userTokenImplementation;
}

library LibAppStorage {
    function appStorage() internal pure returns (AppStorage storage s) {
        assembly {
            s.slot := 0
        }
    }
}

contract Modifier {
    AppStorage internal s;

    modifier onlyOwner() {
        LibDiamond.enforceIsContractOwner();
        _;
    }

    modifier notPaused() {
        require(!s.paused, "Smart Contract paused");
        _;
    }
}

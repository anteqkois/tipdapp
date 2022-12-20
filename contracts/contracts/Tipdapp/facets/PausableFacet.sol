// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibAppStorage, AppStorage, Modifier} from "../libraries/LibAppStorage.sol";

contract PausableFacet is Modifier {
    function paused() external view virtual returns (bool) {
        return s.paused;
    }

    function pause() external virtual onlyOwner {
        s.paused = true;
    }
    function unPause() external virtual onlyOwner {
        s.paused = false;
    }
}

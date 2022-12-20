// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibAppStorage, AppStorage, Modifier} from "../libraries/LibAppStorage.sol";

contract AdministrationFacet is Modifier {
    function paused() external view returns (bool) {
        return s.paused;
    }

    function pause() external onlyOwner {
        s.paused = true;
    }

    function unPause() external onlyOwner {
        s.paused = false;
    }

    function signerAdmin() external view returns (address) {
        return s.signerAdmin;
    }

    function changeSignerAdmin(address _newSignerAdmin) external onlyOwner {
        s.signerAdmin = _newSignerAdmin;
    }

    function donateFee() external view returns (uint256) {
        return s.donateFee;
    }

    function setFee(uint256 _newFee) external onlyOwner {
        // Fee must be below 15%
        require(_newFee < 1500);
        s.donateFee = _newFee;
    }
}

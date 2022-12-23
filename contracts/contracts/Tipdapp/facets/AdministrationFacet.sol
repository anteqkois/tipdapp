// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibAppStorage, AppStorage, Modifier} from "../libraries/LibAppStorage.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";

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

    function tipFee() external view returns (uint256) {
        return s.tipFee;
    }

    function setFee(uint256 _newFee) external onlyOwner {
        // Fee must be below 15%
        require(_newFee < 1500);
        s.tipFee = _newFee;
    }

    function userTokenImplmentation() external view returns (address) {
        return s.userTokenImplementation;
    }

    function setUserTokenImplmentation(address _newImplementation) external onlyOwner {
        s.userTokenImplementation = _newImplementation;
    }

    // function setMinValue(uint256 newMinValue) external virtual onlyOwner {
    //     _minValue = newMinValue;
    // }

    function withdrawERC20Admin(address _tokenAddress) public onlyOwner {
        uint256 tokenBalance = s.addressToTokenToBalance[address(this)][_tokenAddress];
        delete s.addressToTokenToBalance[address(this)][_tokenAddress];
        bool success = IERC20(_tokenAddress).transfer(msg.sender, tokenBalance);
        require(success, "Withdraw ERC20 not success");
    }

    function withdrawManyERC20Admin(address[] calldata _tokenAddress) external onlyOwner {
        uint256 iteration = _tokenAddress.length;
        for (uint256 i; i != iteration; ) {
            withdrawERC20Admin(_tokenAddress[i]);
            unchecked {
                i++;
            }
        }
    }

    function withdrawETHAdmin() external payable onlyOwner {
        uint256 ethBalance = s.balanceETH[address(this)];
        delete s.balanceETH[address(this)];
        (bool sent, ) = address(msg.sender).call{value: ethBalance}("");
        require(sent, "Failed to withdraw Ether");
    }
}

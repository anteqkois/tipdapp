// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import {LibAppStorage, AppStorage, Modifier} from "../libraries/LibAppStorage.sol";
import {UserToken} from "../UserToken.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import "hardhat/console.sol";

contract UserFacet is Modifier {
    event Tip(address indexed donator, address indexed addressToTip, address tokenAddress, uint256 tokenAmount);
    event Withdraw(address indexed user, address tokenAddress, uint256 tokenAmount);
    event NewUser(address indexed userAddress, address userTokenAddress);

    function userToken(address _userAddress) external view returns (address) {
        return s.tokenToUser[_userAddress];
    }

    function balanceERC20(address _userAddress, address _tokenAddress) external view returns (uint256 _balance) {
        return s.addressToTokenToBalance[_userAddress][_tokenAddress];
    }

    function balanceETH(address userAddress) external view returns (uint256 _balance) {
        return s.balanceETH[userAddress];
    }

    /// @notice Register user and create your token - `tokenSymbol` - `tokenName`
    /// @dev Create user in global map and create their loyal token
    /// @param _tokenSymbol The symbol of user token
    /// @param _tokenName The name of user token
    function registerUser(string memory _tokenSymbol, string memory _tokenName) external notPaused returns (address _tokenAddress) {
        require(s.tokenToUser[msg.sender] == address(0), "Address registered");

        //TODO check if it possible to change UserToken implementation when SC was deployed
        // address newToken = address(new UserToken(_tokenSymbol, _tokenName));
        // address newToken = createClone(s.userTokenImplementation);
        // console.log("IN DIAMOND Diamond", address(this));
        // console.log("IN DIAMOND msg.sender", msg.sender);
        address newToken = Clones.clone(s.userTokenImplementation);
        UserToken(newToken).initialize(_tokenSymbol, _tokenName);

        s.tokenToUser[msg.sender] = newToken;
        emit NewUser(msg.sender, newToken);
        return newToken;
    }

    function tipERC20(
        bytes calldata _signature,
        uint256 _tokenAmount,
        uint256 _mintTokenAmount,
        uint256 _toUser,
        uint256 _fee,
        uint256 _timestampOffChain,
        address _addressToTip,
        address _tokenAddress,
        address _userTokenAddress
    ) external virtual notPaused {
        // tip worth check on backend
        //connect msg with onChain data with tx

        //TODO changeable time expired ?
        require(_timestampOffChain + 90 seconds > block.timestamp, "Signature time expired");

        //Verify signature
        require(_signature.length == 65, "Wrong signature length");

        bytes32 r_;
        bytes32 s_;
        uint8 v_;

        assembly {
            // signature.offset = 0x144, location code hardset
            r_ := calldataload(0x144)
            s_ := calldataload(0x164)
            v_ := byte(0, calldataload(0x184))
        }

        require(
            ecrecover(
                keccak256(
                    abi.encodePacked(
                        "\x19Ethereum Signed Message:\n32",
                        keccak256(
                            abi.encodePacked(_tokenAmount, _mintTokenAmount, _toUser, _fee, _timestampOffChain, _tokenAddress, _userTokenAddress)
                        )
                    )
                ),
                v_,
                r_,
                s_
            ) == s.signerAdmin,
            "Wrong signature"
        );

        bool success = IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _tokenAmount);
        require(success, "Failed to tip ERC20 token");
        // console.log(_toUser);
        // console.log(_fee);

        unchecked {
            s.addressToTokenToBalance[_addressToTip][_tokenAddress] += _toUser;
            s.addressToTokenToBalance[address(this)][_tokenAddress] += _fee;
        }

        UserToken(_userTokenAddress).mint(msg.sender, _mintTokenAmount);

        //TODO REMOVE ?
        emit Tip(msg.sender, _addressToTip, _tokenAddress, _tokenAmount);
    }

    function tipETH(address _addressToTip) external payable notPaused {
        (, int256 price, , , ) = LibDiamond.ethUsdOracle.latestRoundData();
        uint256 tokenToMint = (uint(price) * msg.value) / 1e8;

        address userTokenAddress = s.tokenToUser[_addressToTip];
        require(userTokenAddress != address(0), "No registered account");

        //set to hard number?
        // require(tokenToMint >= _minValue, "Tip worth too little");

        uint256 fee = (msg.value * s.tipFee) / 10000;

        unchecked {
            // MAX_UINT256 115792089237316195423570985008687907853269984665640564039457584007913129639935
            s.balanceETH[address(this)] += fee;
            s.balanceETH[_addressToTip] += msg.value - fee;
        }

        UserToken(userTokenAddress).mint(msg.sender, tokenToMint);

        emit Tip(msg.sender, _addressToTip, address(0), msg.value);
    }

    function withdrawERC20(address _tokenAddress) public {
        uint256 tokenBalance = s.addressToTokenToBalance[msg.sender][_tokenAddress];
        require(tokenBalance != 0, "You have 0 tokens on balance");
        delete s.addressToTokenToBalance[msg.sender][_tokenAddress];
        bool success = IERC20(_tokenAddress).transfer(msg.sender, tokenBalance);
        require(success, "Failed to withdraw ERC20 token");
        emit Withdraw(msg.sender, _tokenAddress, tokenBalance);
    }

    function withdrawManyERC20(address[] calldata _tokenAddress) external {
        uint256 iteration = _tokenAddress.length;
        for (uint256 i; i != iteration; ) {
            withdrawERC20(_tokenAddress[i]);
            unchecked {
                i++;
            }
        }
    }

    function withdrawETH() external payable {
        uint256 ethBalance = s.balanceETH[msg.sender];
        require(ethBalance != 0, "You have 0 ETH on balance");
        delete s.balanceETH[msg.sender];
        (bool sent, ) = address(msg.sender).call{value: ethBalance}("");
        require(sent, "Failed to withdraw Ether");
        emit Withdraw(msg.sender, address(0), ethBalance);
    }
}

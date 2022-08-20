//SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

// import "./UserToken.sol";
import "./QoistipSignV2.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract QoistipSignV3 is QoistipSignV2 {
    function donateERC20(
        bytes calldata signature,
        uint256 tokenAmount,
        uint256 mintTokenAmount,
        uint256 toUser,
        uint256 fee,
        uint256 timestampOffChain,
        address addressToDonate,
        address tokenAddress,
        address tokenUserAddress
    ) external virtual override {
        require(
            timestampOffChain + 90 seconds > block.timestamp,
            "Signature time expired"
        );

        require(signature.length == 65, "Wrong signature length");

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            // signature.offset = 0x144, location code hardset
            r := calldataload(0x144)
            s := calldataload(0x164)
            v := byte(0, calldataload(0x184))
        }

        require(
            ecrecover(
                keccak256(
                    abi.encodePacked(
                        "\x19Ethereum Signed Message:\n32",
                        keccak256(
                            abi.encodePacked(
                                tokenAmount,
                                mintTokenAmount,
                                toUser,
                                fee,
                                timestampOffChain,
                                tokenAddress,
                                tokenUserAddress
                            )
                        )
                    )
                ),
                v,
                r,
                s
            ) == _signerAdmin,
            "Wrong signature"
        );

        IERC20(tokenAddress).transferFrom(
            msg.sender,
            address(this),
            tokenAmount
        );

        unchecked {
            _addressToTokenToBalance[addressToDonate][
                tokenAddress
            ] += toUser;
            _addressToTokenToBalance[address(this)][tokenAddress] += fee;
        }

        UserToken(tokenUserAddress).mint(msg.sender, mintTokenAmount);
    }

    function donateETH(address addressToDonate)
        external
        payable
        virtual
        override
    {
        (, int256 price, , , ) = ethUsdOracle.latestRoundData();
        //mul by 10**10 becouse price is return in 8 digit
        // Delete multiple ? Wheather this multiplation is necessary, maybe difference is to small ?
        uint256 tokenToMint = (uint(price) * 10**10 * msg.value) / 1e18;

        //set to hard number?
        require(tokenToMint >= _minValue, "Donate worth too little");

        uint256 fee = (msg.value * _donateFee) / 10000;
        _balanceETH[address(this)] += fee;
        _balanceETH[addressToDonate] += msg.value - fee;

        UserToken(_tokenUser[addressToDonate]).mint(
            msg.sender,
            tokenToMint
        );

        // send value ? can i get it from transation ?
        emit Donate(msg.sender, addressToDonate, address(0), msg.value);
    }

    function changeTokenOwner(address userAddress, address newOwner)
        external
        onlyOwner
    {
        bool success = UserToken(_tokenUser[userAddress])
            .changeOwner(newOwner);
        require(success, "Owner not change");
    }

    function balanseOfSmartContractERC20(address tokenAddress)
        external
        view
        returns (uint256)
    {
        return IERC20(tokenAddress).balanceOf(address(this));
    }

    function version() external pure virtual override returns (uint8) {
        return 3;
    }
}

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AggregatorV3Interface.sol";
import "./QoistipPriceAggregator.sol";
// import "hardhat/console.sol";

contract StoreOracle {
    mapping(address => bytes32) public addressToPriceOracle;
    mapping(address => uint256) addressToPriceOracle2;

    // function pack(int16 a, int16 b) public pure returns (bytes32) {
    //     return (bytes32(bytes2(a)) >> 16) | bytes2(b);
    // }

    // function unpack(bytes32 x) public pure returns (int16, int16) {
    //     return (int16(bytes2(x << 16)), int16(bytes2(x)));
    // }
    // //"@openzeppelin/*=../node_modules/@openzeppelin/*",

    modifier checkGas() {
        uint256 startGas = gasleft();
        _;
        // console.log(startGas - gasleft());
    }

    function setPriceOracle(
        address _tokenAddress,
        address _oracleAddress,
        bool _inUSD,
        bool _chailinkOracle
    ) external {
        bytes32 priceOracleData = bytes20(_oracleAddress);
        if (_inUSD) priceOracleData |= (bytes32(uint256(1)) << 96);
        if (_chailinkOracle) priceOracleData |= (bytes32(uint256(1)) << 95);
        addressToPriceOracle[_tokenAddress] = priceOracleData;
    }

    function getPriceOracle(address _tokenAddress)
        external
        view
        returns (
            address oracleAddress,
            bool inUSD,
            bool chailinkOracle
        )
    {
        bytes32 data = addressToPriceOracle[_tokenAddress];
        oracleAddress = address(bytes20(data));
        inUSD = (data & (bytes32(uint256(1)) << 96)) != 0 ? true : false;
        chailinkOracle = (data & (bytes32(uint256(1)) << 95)) != 0
            ? true
            : false;
    }

    function setPriceOracle2(
        address _tokenAddress,
        address _oracleAddress,
        bool _inUSD,
        bool _chailinkOracle
    ) external {
        uint256 priceOracleData = uint160(_oracleAddress);
        if (_inUSD) priceOracleData |= (uint256(1) << 161);
        if (_chailinkOracle) priceOracleData |= (uint256(1) << 162);
        addressToPriceOracle2[_tokenAddress] = priceOracleData;
        // console.log(priceOracleData);
    }

    function getPriceOracle2(address _tokenAddress)
        external
        view
        returns (
            address oracleAddress,
            bool inUSD,
            bool chailinkOracle
        )
    {
        uint256 data = addressToPriceOracle2[_tokenAddress];
        oracleAddress = address(uint160(data));
        inUSD = (data & (uint256(1) << 161)) != 0 ? true : false;
        chailinkOracle = (data & (uint256(1) << 162)) != 0 ? true : false;
        // chailinkOracle = (data & bytes32(uint256(1)) << 94) != 0 ? true : false;
    }

    uint256 _packedBools;

    function setBoolean(uint256 _boolNumber, bool _value) public {
        // console.log(_packedBools);
        if (_value) _packedBools |= (uint256(1) << _boolNumber);
        else _packedBools &= ~(uint256(1) << _boolNumber);
    }

    function getBoolean(uint256 _boolNumber) public view returns (bool) {
        // console.log(_packedBools);
        uint256 flag = (_packedBools >> _boolNumber) & uint256(1);
        return (flag == 1 ? true : false);
    }
}

// function setPriceOracle(
//         address _tokenAddress,
//         address _oracleAddress,
//         bool _inUSD,
//         bool _chailinkOracle
//     ) external {
//         bytes memory priceOracleData = abi.encode(_oracleAddress, _inUSD, _chailinkOracle);
//         addressToPriceOracle[_tokenAddress] = priceOracleData;
//     }

//     function getPriceOracle(address _tokenAddress)
//         external
//         view
//         returns (
//             address oracleAddress,
//             bool inUSD,
//             bool chailinkOracle
//         )
//     {
//         (oracleAddress, inUSD, chailinkOracle) = abi.decode(addressToPriceOracle[_tokenAddress], (address, bool, bool));
//     }

// uint256 priceOracleData = uint256(uint160(address(_oracleAddress)));
//         console.log(priceOracleData);
//         if (_inUSD) priceOracleData | (uint256(1) << 160);
//         else priceOracleData & ~(uint256(1) << 160);
//         if (_chailinkOracle) priceOracleData | (uint256(1) << 161);
//         else priceOracleData & ~(uint256(1) << 161);
//         addressToPriceOracle[_tokenAddress] = priceOracleData;

// uint256 priceOracleData = addressToPriceOracle[_tokenAddress];
//         oracleAddress = address(uint160(uint256(priceOracleData)));
//         if (uint8(priceOracleData >> 160) == 1) {
//             inUSD = true;
//         } else {
//             inUSD = false;
//         }
//         if (uint8(priceOracleData >> 161) == 1) {
//             chailinkOracle = true;
//         } else {
//             chailinkOracle = false;
//         }

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Qoistip.sol";

contract QoistipV2 is Qoistip {
    // function setPriceOracle(
    //     address _tokenAddress,
    //     address _oracleAddress,
    //     bool _inUSD,
    //     bool _isChailink
    // ) external onlyOwner {
    //     bytes32 priceOracleData = bytes20(_oracleAddress);
    //     if (_inUSD) priceOracleData |= (bytes32(uint256(1)) << 95);
    //     if (_isChailink) priceOracleData |= (bytes32(uint256(1)) << 94);
    //     oracleData[_tokenAddress] = priceOracleData;
    // }

    // function priceOracle(address _tokenAddress)
    //     external
    //     view
    //     returns (
    //         address oracleAddress,
    //         bool inUSD,
    //         bool isChailink
    //     )
    // {
    //     bytes32 data = oracleData[_tokenAddress];
    //     oracleAddress = address(bytes20(data));
    //     inUSD = (data & (bytes32(uint256(1)) << 95)) != 0 ? true : false;
    //     isChailink = (data & (bytes32(uint256(1)) << 94)) != 0 ? true : false;
    // }

    // function _getPrice(address _tokenAddress)
    //     internal
    //     view
    //     virtual
    //     returns (uint256)
    // {
    //     //    bytes32 data = oracleData[_tokenAddress];
    //     //     oracleAddress = address(bytes20(data));
    //     //     inUSD = (data & bytes32(uint256(1)) << 95) != 0 ? true : false;
    //     //     isChailink = (data & bytes32(uint256(1)) << 94) != 0 ? true : false;

    //     bytes32 oracle = oracleData[_tokenAddress];

    //     //    require(oracleAddress != address(0), "Not supported token");
    //     // isChailink
    //     if ((oracle & (bytes32(uint256(1)) << 94)) != 0 ? true : false) {
    //         (, int256 price, , , ) = AggregatorV3Interface(
    //             address(bytes20(oracle))
    //         ).latestRoundData();
    //         // in USD
    //         if (oracle & (bytes32(uint256(1)) << 95) != 0 ? true : false) {
    //             return uint256(price * 10**10);
    //         } else {
    //             (, int256 priceEth, , , ) = usdcEthOracle.latestRoundData();
    //             return uint256((price * 10**18) / priceEth);
    //         }
    //     } else {
    //         return
    //             uint256(qoistipPriceAggregator.latestRoundData(_tokenAddress));
    //     }
    //     // (address oracleAddress, bool inUSD, bool isChailink) = abi.decode(
    //     //     priceOracleData[_tokenAddress],
    //     //     (address, bool, bool)
    //     // );
    //     // require(oracleAddress != address(0), "Not supported token");
    //     // if (isChailink) {
    //     //     (, int256 price, , , ) = AggregatorV3Interface(oracleAddress)
    //     //         .latestRoundData();
    //     //     if (inUSD) {
    //     //         return uint256(price * 10**10);
    //     //     } else {
    //     //         (, int256 priceEth, , , ) = usdcEthOracle.latestRoundData();
    //     //         return uint256((price * 10**18) / priceEth);
    //     //     }
    //     // } else {
    //     //     return
    //     //         uint256(qoistipPriceAggregator.latestRoundData(_tokenAddress));
    //     // }
    // }

    function version() external pure override returns (uint8) {
        return 2;
    }
}

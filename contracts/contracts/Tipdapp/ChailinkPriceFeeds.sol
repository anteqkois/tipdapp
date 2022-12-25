// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./interfaces/AggregatorV3Interface.sol";

contract ChailinkPriceFeeds {
    AggregatorV3Interface constant ethOracle = AggregatorV3Interface(0x986b5E1e1755e3C2440e960477f25201B0a8bbD4);

    function getLatestPrice(address _addressTokenFeeds) public view returns (uint256) {
        AggregatorV3Interface oracle = AggregatorV3Interface(_addressTokenFeeds);
        (, int256 price, , , ) = oracle.latestRoundData();
        return uint256(price * 10 ** 10);
    }
}

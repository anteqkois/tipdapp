// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import './AggregatorV3Interface.sol';
contract ChailinkPriceFeeds {
    // AggregatorV3Interface internal priceFeed;

    function getLatestPrice(address _addressTokenFeeds)
        public
        view
        returns (int256)
    {
        (, int256 price, , , ) = AggregatorV3Interface(_addressTokenFeeds)
            .latestRoundData();
        return price;
        // return price / 1e8;
    }
}
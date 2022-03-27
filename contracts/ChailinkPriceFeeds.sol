// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

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

interface AggregatorV3Interface {
    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
}

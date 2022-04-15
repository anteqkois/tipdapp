//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Qoistip.sol";

contract QoistipV2 is Qoistip {
    QoistipPriceAggregator private _qoistipPriceAggregator;

    function initialize(QoistipPriceAggregator qoistipPriceAggregator)
        public
        initializer
    {
        Qoistip.initialize();
        _qoistipPriceAggregator = qoistipPriceAggregator;
    }

    function setPriceOracle(
        address _tokenAddress,
        address _oracleAddress,
        bool _inUSD,
        bool _isChailink
    ) external virtual onlyOwner {
        bytes32 priceOracleData = bytes20(_oracleAddress);
        if (_inUSD) priceOracleData |= (bytes32(uint256(1)) << 95);
        if (_isChailink) priceOracleData |= (bytes32(uint256(1)) << 94);
        oracleData[_tokenAddress] = priceOracleData;
    }

    function _getPrice(address _tokenAddress)
        internal
        view
        virtual
        override
        returns (uint256)
    {
        bytes32 oracle = oracleData[_tokenAddress];

        require(address(bytes20(oracle)) != address(0), "Not supported token");
        // isChailink
        if ((oracle & (bytes32(uint256(1)) << 94)) != 0 ? true : false) {
            (, int256 price, , , ) = AggregatorV3Interface(
                address(bytes20(oracle))
            ).latestRoundData();
            // in USD
            if (oracle & (bytes32(uint256(1)) << 95) != 0 ? true : false) {
                return uint256(price * 10**10);
            } else {
                (, int256 priceEth, , , ) = usdcEthOracle.latestRoundData();
                return uint256((price * 10**18) / priceEth);
            }
        } else {
            return
                uint256(_qoistipPriceAggregator.latestRoundData(_tokenAddress));
        }
    }

    function version() external pure virtual override returns (uint8) {
        return 2;
    }
}

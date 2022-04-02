const { expect } = require('chai');
const { ethers } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;
const { CHAILINK_PRICE_ORACLE_ADDRESS_USD, CHAILINK_PRICE_ORACLE_ADDRESS_ETH } = require('../../constant');

describe('ChailinkPriceFeeds', function () {
  let chailinkPriceFeeds;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  before(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const ChailinkPriceFeeds = await ethers.getContractFactory('ChailinkPriceFeeds');
    chailinkPriceFeeds = await ChailinkPriceFeeds.deploy();
  });

  describe('Check if ChailinkPriceFeeds send response', () => {
    it('Get $ETH price', async () => {
      expect(await chailinkPriceFeeds.getLatestPrice(CHAILINK_PRICE_ORACLE_ADDRESS_USD.ETH));
      console.log(await chailinkPriceFeeds.getLatestPrice(CHAILINK_PRICE_ORACLE_ADDRESS_USD.ETH));
    });
    it('Get $SHIB price', async () => {
      expect(await chailinkPriceFeeds.getLatestPrice(CHAILINK_PRICE_ORACLE_ADDRESS_ETH.SHIB));
      console.log(
        await chailinkPriceFeeds.getDerivedPrice(
          CHAILINK_PRICE_ORACLE_ADDRESS_ETH.SHIB,
          CHAILINK_PRICE_ORACLE_ADDRESS_ETH.USDC,
          18,
        ),
      );
      // expect(
      //   await chailinkPriceFeeds.getDerivedPrice(
      //     CHAILINK_PRICE_ORACLE_ADDRESS_ETH.SHIB,
      //     CHAILINK_PRICE_ORACLE_ADDRESS_ETH.USDC,
      //     18,
      //   ),
      // );
      // console.log(
      //   await chailinkPriceFeeds.getDerivedPrice(
      //     CHAILINK_PRICE_ORACLE_ADDRESS_ETH.SHIB,
      //     CHAILINK_PRICE_ORACLE_ADDRESS_ETH.USDC,
      //     18,
      //   ),
      // );
    });
  });
});

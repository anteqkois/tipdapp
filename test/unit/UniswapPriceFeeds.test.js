const { expect } = require('chai');
const { ethers } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;
const { UNISWAP_PAIR_ADDRESS } = require('../../constant');

describe('UniswapPriceFeeds', function () {
  let uniswapPriceFeeds;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  before(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const UniswapPriceFeeds = await ethers.getContractFactory('UniswapPriceFeeds');
    uniswapPriceFeeds = await UniswapPriceFeeds.deploy();
  });

  describe('Check if UniswapPriceFeeds send response', () => {
    it('Get ETH price', async () => {
      expect(await uniswapPriceFeeds.getTokenPrice(UNISWAP_PAIR_ADDRESS.USDC_WETH, parseUnits('1')));
      console.log(await uniswapPriceFeeds.getTokenPrice(UNISWAP_PAIR_ADDRESS.USDC_WETH, parseUnits('1')));
      // console.log(await uniswapPriceFeeds.getLatestPrice(CHAILINK_PRICE_ORACLE_ADDRESS_USD.ETH));
    });
  });
});

const { expect } = require('chai');
const { ethers } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;
const { UniswapPairAddress } = require('../constant');

xdescribe('TokenPrice', function () {
  let tokenPrice;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  before(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const TokenPrice = await ethers.getContractFactory('TokenPrice');
    tokenPrice = await TokenPrice.deploy();

    // USDC/WETH 0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc
  });

  describe('How many USDC get from X WETH', () => {
    it('From 1 WETH', async function () {
      console.log(await tokenPrice.getTokenPrice(UniswapPairAddress.USDC_WETH, parseUnits('1')));
    });
  });
});

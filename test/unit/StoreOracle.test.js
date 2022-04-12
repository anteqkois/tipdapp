const { expect } = require('chai');
const { ethers } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;
const { CHAILINK_PRICE_ORACLE_ADDRESS_USD, ERC20_TOKEN_ADDRESS } = require('../../constant');
const sandABI = require('../../abi/SAND.json');

describe('StoreOracle', function () {
  let qoistipPriceAggregator;
  let storeOracle;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  before(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const QoistipPriceAggregator = await ethers.getContractFactory('QoistipPriceAggregator');
    qoistipPriceAggregator = await QoistipPriceAggregator.deploy();

    const StoreOracle = await ethers.getContractFactory('StoreOracle');
    storeOracle = await StoreOracle.deploy();
  });

  describe('Store oracle data', async () => {
    it('$SAND using bytes32', async function () {
      await storeOracle.setPriceOracle(ERC20_TOKEN_ADDRESS.SAND, CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND, false, true);
      const oracleData = await storeOracle.getPriceOracle(ERC20_TOKEN_ADDRESS.SAND);
      expect(oracleData.oracleAddress).to.be.equal(CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND); 
      expect(oracleData.inUSD).to.be.false; 
      expect(oracleData.chailinkOracle).to.be.true; 
      console.log(await storeOracle.getPriceOracle(ERC20_TOKEN_ADDRESS.SAND));
    });
    it('$SAND using uint256', async function () {
      await storeOracle.setPriceOracle2(ERC20_TOKEN_ADDRESS.SAND, CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND, false, true);
      const oracleData = await storeOracle.getPriceOracle2(ERC20_TOKEN_ADDRESS.SAND);
      expect(oracleData.oracleAddress).to.be.equal(CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND); 
      // expect(oracleData.inUSD).to.be.false; 
      // expect(oracleData.chailinkOracle).to.be.true; 
      console.log(await storeOracle.getPriceOracle2(ERC20_TOKEN_ADDRESS.SAND));
    });
  });
});

const { expect } = require('chai');
const { ethers } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;
const { CHAILINK_PRICE_ORACLE_ADDRESS_USD, CHAILINK_PRICE_ORACLE_ADDRESS_ETH, ERC20_TOKEN_ADDRESS } = require('../../utils/constant');
const sandABI = require('../../src/artifacts/SAND.json');
const { packToBytes32, unpackFromBytes32 } = require('../../utils/packOracleData');

xdescribe('StoreOracle', function () {
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
    });
    it('$SAND using uint256', async function () {
      await storeOracle.setPriceOracle2(ERC20_TOKEN_ADDRESS.SAND, CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND, false, true);
      const oracleData = await storeOracle.getPriceOracle2(ERC20_TOKEN_ADDRESS.SAND);
      expect(oracleData.oracleAddress).to.be.equal(CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND);
      expect(oracleData.inUSD).to.be.false;
      expect(oracleData.chailinkOracle).to.be.true;
      console.log(await storeOracle.getPriceOracle2(ERC20_TOKEN_ADDRESS.SAND));
    });
  });
  describe('Pack Oracle data off-chain', async () => {
    it('$SAND off-chain', async function () {
      const sandOracleData = packToBytes32(CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND, { inUSD: true, isChailink: false });
      const sandUnpackData = unpackFromBytes32(sandOracleData);
      expect(sandUnpackData.oracleAddress).to.be.equal(CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND);
      expect(sandUnpackData.inUSD).to.be.true;
      expect(sandUnpackData.isChailink).to.be.false;

      const shibOracleData = packToBytes32(CHAILINK_PRICE_ORACLE_ADDRESS_ETH.SHIB, { inUSD: false, isChailink: false });
      const shibUnpackData = unpackFromBytes32(shibOracleData);
      expect(shibUnpackData.oracleAddress).to.be.equal(CHAILINK_PRICE_ORACLE_ADDRESS_ETH.SHIB);
      expect(shibUnpackData.inUSD).to.be.false;
      expect(shibUnpackData.isChailink).to.be.false;
    });
  });
});

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
      // console.log(await storeOracle.getPriceOracle(ERC20_TOKEN_ADDRESS.SAND));
      console.log(await storeOracle.addressToPriceOracle(ERC20_TOKEN_ADDRESS.SAND));
    });
    it('$SAND using uint256', async function () {
      await storeOracle.setPriceOracle2(ERC20_TOKEN_ADDRESS.SAND, CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND, false, true);
      const oracleData = await storeOracle.getPriceOracle2(ERC20_TOKEN_ADDRESS.SAND);
      expect(oracleData.oracleAddress).to.be.equal(CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND); 
      // expect(oracleData.inUSD).to.be.false; 
      // expect(oracleData.chailinkOracle).to.be.true; 
      // console.log(await storeOracle.getPriceOracle2(ERC20_TOKEN_ADDRESS.SAND));
    });
  });
  describe('Pack Oracle data off-chain', async () => {
    it('$SAND off-chain', async function () {
      // Packed: 0x35e3f7e558c04ce7eee1629258ecbba03b36ec56400000000000000000000000
      const oracleData = {
        inUSD: true,
        isChailink: false,
      };

      let packedFlags = ethers.utils.hexlify(0);
      console.log(packedFlags);
      if (oracleData.inUSD) {
        packedFlags |= ethers.utils.hexlify(1) << 6;
      }
      if (oracleData.isChailink) {
        packedFlags |= ethers.utils.hexlify(1) << 5;
      }

      //0101011001000000
      //0101011010000000

      let packedData = ethers.utils.solidityPack(
        ['address', 'uint8', 'uint88'],
        [CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND, packedFlags, 0],
      );

      console.log(packedData);

      // await storeOracle.setPriceOracle(ERC20_TOKEN_ADDRESS.SAND, CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND, false, true);
      // const oracleData = await storeOracle.getPriceOracle(ERC20_TOKEN_ADDRESS.SAND);
      // expect(oracleData.oracleAddress).to.be.equal(CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND);
      // expect(oracleData.inUSD).to.be.false;
      // expect(oracleData.chailinkOracle).to.be.true;
      // console.log(await storeOracle.getPriceOracle(ERC20_TOKEN_ADDRESS.SAND));
    });
  });
});

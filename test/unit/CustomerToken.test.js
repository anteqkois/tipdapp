const { expect } = require('chai');
const { ethers } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;
// const {
// CHAILINK_PRICE_ORACLE_ADDRESS_USD,
// CHAILINK_PRICE_ORACLE_ADDRESS_ETH,
// ERC20_TOKEN_ADDRESS,
// } = require('../../utils/constant');
// const sandABI = require('../../artifacts/utils/SAND.json');
// const { packToBytes32, unpackFromBytes32 } = require('../../utils/packOracleData');

describe('CustomerToken', function () {
  let customerToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  before(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const CustomerToken = await ethers.getContractFactory('CustomerToken');
    customerToken = await CustomerToken.deploy('CT', 'CustomerToken');
  });

  describe('Check initial data/veriable', async () => {
    it('Symbol and name', async function () {
      expect(await customerToken.name()).to.be.equal('CustomerToken');
      expect(await customerToken.symbol()).to.be.equal('CT');
    });
    it('decimals', async function () {
      expect(await customerToken.decimals()).to.be.equal(18);
    });
    it('totalSupply', async function () {
      expect(await customerToken.totalSupply()).to.be.equal(0);
    });
  });
});

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

  describe('Mint', async () => {
    it('Owner can mint token to own', async function () {
      await customerToken.mint(owner.address, parseUnits('10000'));
      expect(await customerToken.balanceOf(owner.address)).to.be.equal(parseUnits('10000'));
    });
    it('Owner can mint token to other address', async function () {
      await customerToken.mint(addr1.address, parseUnits('1000'));
      expect(await customerToken.balanceOf(addr1.address)).to.be.equal(parseUnits('1000'));
    });
    it('Owner can not mint token to zero address', async function () {
      await expect(customerToken.mint(ethers.constants.AddressZero, parseUnits('100'))).to.be.revertedWith(
        'ERC20: mint to the zero address',
      );
    });
    it('No owner can not mint token', async function () {
      await expect(customerToken.connect(addr1).mint(addr1.address, parseUnits('100'))).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
  });

  describe('Transfer', async () => {
    it('Can transfer token', async function () {
      await customerToken.transfer(addr2.address, parseUnits('5000'));
      expect(await customerToken.balanceOf(owner.address)).to.be.equal(parseUnits('5000'));
      expect(await customerToken.balanceOf(addr2.address)).to.be.equal(parseUnits('5000'));
    });
    it('Can not transfer token if have not', async function () {
      await expect(customerToken.transfer(addr2.address, parseUnits('5001'))).to.be.revertedWith(
        'ERC20: transfer amount exceeds balance',
      );
    });
    it('Can not transfer token to zero address', async function () {
      await expect(customerToken.transfer(ethers.constants.AddressZero, parseUnits('5001'))).to.be.revertedWith(
        'ERC20: transfer to the zero address',
      );
    });
  });
});

const { expect } = require('chai');
const { ethers } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;

describe('ANQToken', function () {
  let anqToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  before(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const ANQToken = await ethers.getContractFactory('ANQToken');
    anqToken = await ANQToken.deploy();
  });

  describe('Deployment', () => {
    it('ANQToken metaData', async function () {
      expect(await anqToken.name()).to.equal('ANQToken');
      expect(await anqToken.symbol()).to.equal('ANQ');
      expect(await anqToken.balanceOf(owner.address)).to.equal(parseUnits('1000000'));
      expect(await anqToken.totalSupply()).to.equal(await anqToken.balanceOf(owner.address));
    });
  });

  describe('Transation to success', () => {
    it('Send 50 tokens to another wallet by transfer funcion', async function () {
      await anqToken.transfer(addr1.address, parseUnits('50'));
      expect(await anqToken.balanceOf(addr1.address)).to.equal(parseUnits('50'));
    });
    it('Send 50 tokens to another wallet by transferFrom funcion', async function () {
      await anqToken.connect(addr1).approve(addr2.address, parseUnits('50'));
      await anqToken.connect(addr2).transferFrom(addr1.address, addr2.address, parseUnits('50'));

      expect(await anqToken.balanceOf(addr1.address)).to.equal(0);
      expect(await anqToken.balanceOf(addr2.address)).to.equal(parseUnits('50'));
    });
  });

  describe('Transation to fail', () => {
    it("If account doesn't have enought token", async function () {
      await expect(anqToken.connect(addr1).transfer(addr1.address, 1)).to.be.revertedWith(
        'ERC20: transfer amount exceeds balance',
      );
    });

    it("If account doesn't have enought token", async function () {
      await anqToken.connect(addr1).approve(addr2.address, parseUnits('50'));

      await expect(anqToken.connect(addr2).transferFrom(addr1.address, addr2.address, parseUnits('60'))).to.be.revertedWith(
        'ERC20: insufficient allowance',
      );
    });
  });
});

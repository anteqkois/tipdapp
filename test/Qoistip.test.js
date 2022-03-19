const { expect } = require('chai');
const { ethers } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;

describe('Qoistip', function () {
  let qoistip;
  let anqToken;
  let token2;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  before(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const Qoistip = await ethers.getContractFactory('Qoistip');
    qoistip = await Qoistip.deploy(9951);

    const ANQToken = await ethers.getContractFactory('ANQToken');
    anqToken = await ANQToken.deploy();
    const Token2 = await ethers.getContractFactory('Token2');
    token2 = await Token2.deploy();
  });

  describe('Math', () => {
    it('Calculate 0,49% fee with divisible number', async function () {
      expect(await qoistip.calculateWithFee(parseUnits('100'))).to.equal(parseUnits('99.51'));
    });
    it('Calculate 0,49% fee with indivisible number', async function () {
      expect(await qoistip.calculateWithFee(100)).to.equal(99);
      expect(await qoistip.calculateWithFee(781)).to.equal(777);
    });
    it('Calculate 3% fee with divisible number', async function () {
      await qoistip.setFee(9700);
      expect(await qoistip.calculateWithFee(100)).to.equal(97);
      expect(await qoistip.calculateWithFee(parseUnits('100'))).to.equal(parseUnits('97'));
      expect(await qoistip.calculateWithFee(parseUnits('781'))).to.equal(parseUnits('757.57'));
    });
    it('Calculate 3% fee with indivisible number', async function () {
      expect(await qoistip.calculateWithFee(781)).to.equal(757);
    });
  });
  describe('Add new supported Token', () => {
    it('Check if not suported', async function () {
      expect(await qoistip.supportedToken(anqToken.address)).to.equal(false);
    });
    it('Add token and check if is suported', async function () {
      await qoistip.addSuportedToken(anqToken.address);
      expect(await qoistip.supportedToken(anqToken.address)).to.equal(true);
    });
    it('Only owner can add new supported token', async function () {
      await expect(qoistip.connect(addr1).addSuportedToken(token2.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
      await qoistip.addSuportedToken(token2.address);
      expect(await qoistip.supportedToken(token2.address)).to.equal(true);
    });
  });
  describe('Donate ERC20', () => {
    it('Check balance before donate', async function () {
      expect(await qoistip.customerBalanceERC20(addr1.address, anqToken.address)).to.equal(0);
    });
    it('Send donate and check event', async function () {
      // TODO check logs/event
      // qoistip.on('NewDonate', (logs) => {
      // console.log(logs);
      // });

      await anqToken.approve(qoistip.address, parseUnits('781'));
      await qoistip.donateERC20(addr1.address, anqToken.address, parseUnits('781'));
    });
    it('Check balance after donate', async function () {
      expect(await qoistip.customerBalanceERC20(addr1.address, anqToken.address)).to.equal(parseUnits('757.57'));
      expect(await qoistip.customerBalanceERC20(qoistip.address, anqToken.address)).to.equal(
        parseUnits('781').sub(parseUnits('757.57')),
      );
    });
  });
  describe('Donate ETH', () => {
    it('Check balance before donate', async function () {
      // expect(await qoistip.customerBalanceETH(addr1.address, anqToken.address)).to.equal(0);
    });
    it('Send donateERC20 and check event', async function () {});
    it('Check balance after donate', async function () {});
  });
  describe('Withdraw by customer', () => {
    it('One ERC20 Token', async function () {
      expect(await qoistip.customerBalanceERC20(addr1.address, anqToken.address)).to.equal(parseUnits('757.57'));

      await qoistip.connect(addr1).withdrawERC20(anqToken.address);

      expect(await qoistip.customerBalanceERC20(addr1.address, anqToken.address)).to.equal(0);
      expect(await anqToken.balanceOf(addr1.address)).to.equal(parseUnits('757.57'));
    });
    it('Many ERC20 Token', async function () {
      await anqToken.approve(qoistip.address, parseUnits('781'));
      await qoistip.donateERC20(addr1.address, anqToken.address, parseUnits('781'));
      await token2.approve(qoistip.address, parseUnits('781'));
      await qoistip.donateERC20(addr1.address, token2.address, parseUnits('781'));

      expect(await qoistip.customerBalanceERC20(addr1.address, anqToken.address)).to.equal(parseUnits('757.57'));
      expect(await qoistip.customerBalanceERC20(addr1.address, token2.address)).to.equal(parseUnits('757.57'));

      await qoistip.connect(addr1).withdrawManyERC20([anqToken.address, token2.address]);

      expect(await qoistip.customerBalanceERC20(addr1.address, anqToken.address)).to.equal(0);
      expect(await anqToken.balanceOf(addr1.address)).to.equal(parseUnits('757.57').mul('2'));
      expect(await qoistip.customerBalanceERC20(addr1.address, token2.address)).to.equal(0);
      expect(await token2.balanceOf(addr1.address)).to.equal(parseUnits('757.57'));
    });
    it('ETH', async function () {
      // expect(await qoistip.customerBalanceERC20(addr1.address, anqToken.address)).to.equal(parseUnits('757.57'));
      // await qoistip.connect(addr1).withdrawERC20(anqToken.address);
      // expect(await qoistip.customerBalanceERC20(addr1.address, anqToken.address)).to.equal(0);
      // expect(await anqToken.balanceOf(addr1.address)).to.equal(parseUnits('757.57'));
    });
    it('Revert if zero balance', async function () {});
  });
});

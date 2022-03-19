const { expect } = require('chai');
const { ethers } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;

describe('Qoistip', function () {
  let qoistip;
  let anqToken;
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
  });
  describe('Donate', () => {
    it('Check balance before', async function () {
      expect(await qoistip.customerBalance(addr1.address, anqToken.address)).to.equal(0);
    });
    it('Send donate and check event', async function () {
      // TODO check logs/event
      // qoistip.on('NewDonate', (logs) => {
      // console.log(logs);
      // });

      await anqToken.approve(qoistip.address, parseUnits('781'));
      await qoistip.donate(addr1.address, anqToken.address, parseUnits('781'));
    });
    it('Check balance after', async function () {
      expect(await qoistip.customerBalance(addr1.address, anqToken.address)).to.equal(parseUnits('757.57'));
      expect(await qoistip.customerBalance(qoistip.address, anqToken.address)).to.equal(
        parseUnits('781').sub(parseUnits('757.57')),
      );
    });
  });
  describe('Withdraw by customer', () => {
    it('One Token', async function () {
      expect(await qoistip.customerBalance(addr1.address, anqToken.address)).to.equal(parseUnits('757.57'));

      await qoistip.connect(addr1).withdraw(anqToken.address);

      expect(await qoistip.customerBalance(addr1.address, anqToken.address)).to.equal(0);
      expect(await anqToken.balanceOf(addr1.address)).to.equal(parseUnits('757.57'));
    });
    it('Many Token', async function () {});
    it('Revert if zero balance', async function () {});
  });
});

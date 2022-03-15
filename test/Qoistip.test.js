const { expect } = require('chai');
const { ethers } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;

describe('Qoistip', function () {
  let qoistip;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  before(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const Qoistip = await ethers.getContractFactory('Qoistip');
    qoistip = await Qoistip.deploy(9951);
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
});

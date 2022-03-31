const { expect } = require('chai');
const { ethers, network } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;
const { CHAILINK_PRICE_ORACLE_ADDRESS_USD, ERC20_TOKEN_ADDRESS } = require('../../constant');
const CustomerToken = require('../../artifacts/contracts/CustomerToken.sol/CustomerToken.json');
const sandABI = require('../../abi/SAND.json');

describe('Qoistip', function () {
  let qoistip;
  let qoistipPriceAggregator;
  let customerToken1;
  let sand;
  let sandHodler;
  let owner;
  let customer1;
  let addr2;
  let addrs;

  before(async () => {
    [owner, customer1, addr2, ...addrs] = await ethers.getSigners();

    sand = new ethers.Contract(ERC20_TOKEN_ADDRESS.SAND, sandABI, ethers.provider);

    // Have SAND, USDT, USDC
    const accountToInpersonate = '0x109e588d17C1c1cff206aCB0b3FF0AAEffDe92bd';

    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [accountToInpersonate],
    });
    sandHodler = await ethers.getSigner(accountToInpersonate);

    const QoistipPriceAggregator = await ethers.getContractFactory('QoistipPriceAggregator');
    qoistipPriceAggregator = await QoistipPriceAggregator.deploy();

    const Qoistip = await ethers.getContractFactory('Qoistip');
    qoistip = await Qoistip.deploy(9700, qoistipPriceAggregator.address);

    //set Qoisdapp smart contract needed veriables
    await qoistip.setPriceOracle(ERC20_TOKEN_ADDRESS.SAND, CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND, true, true);
    const registerCustomerTransation = await qoistip
      .connect(customer1)
      .registerCustomer('CT1', 'CustomerToken1');

    registerCustomerTransation.wait();
    const customerToken1Address = await qoistip.tokenCustomer(customer1.address);
    customerToken1 = new ethers.Contract(customerToken1Address, CustomerToken.abi, ethers.provider);
  });

  describe('Donate ERC20', () => {
    it('Check $SAND balance before donate', async function () {
      expect(await qoistip.balanceOfERC20(customer1.address, sand.address)).to.equal(0);
    });
    it('Send donate in $SAND and check event', async function () {
      await sand.connect(sandHodler).approve(qoistip.address, parseUnits('781'));

      const donateTx = await qoistip.connect(sandHodler).donateERC20(customer1.address, sand.address, parseUnits('781'));
      //TODO i'ts doesnt work
      // expect(donateTx).to.changeTokenBalances(
      //   sand,
      //   [sandHodler, qoistip],
      //   [parseUnits('781'), parseUnits('781')],
      // );
      const rc = await donateTx.wait();
      expect(rc).to.emit(qoistip, 'Donate').withArgs(owner.address, customer1.address, sand.address, parseUnits('781'));
    });
    it('Check $SAND and $CT1 balance after donate', async function () {
      expect(await qoistip.balanceOfERC20(customer1.address, sand.address)).to.equal(parseUnits('757.57'));
      console.log(await qoistip.balanceOfERC20(customer1.address, sand.address));
      expect(await qoistip.balanceOfERC20(qoistip.address, sand.address)).to.equal(
        parseUnits('781').sub(parseUnits('757.57')),
      );

      expect(await sand.balanceOf(qoistip.address)).to.equal(parseUnits('781'));
      //TODO check donator balance of customer token, use Chailink sc agregator
      // expect(await customerToken1.balanceOf(sandHodler.address)).to.equal(parseUnits('781'));
    });
  });

  xdescribe('Donate ETH', () => {
    it('Check balance before donate', async function () {
      expect(await qoistip.balanceOfETH(customer1.address)).to.be.equal(0);
    });
    it('Send donate and check', async function () {
      const tx = await qoistip.donateETH(customer1.address, { value: parseUnits('1') });
      expect(tx).to.changeEtherBalance(owner.address, parseUnits('1'));
      expect(tx)
        .to.emit(qoistip, 'Donate')
        .withArgs(owner.address, customer1.address, '0x0000000000000000000000000000000000000000', parseUnits('1'));
    });
    it('Check balance after donate', async function () {
      expect(await qoistip.balanceOfETH(customer1.address)).to.be.equal(parseUnits('0.97'));
      expect(await qoistip.balanceOfETH(qoistip.address)).to.be.equal(parseUnits('0.03'));
    });
  });

  xdescribe('Withdraw ERC20', () => {
    //TODO check events
    it('One ERC20 Token', async function () {
      expect(await qoistip.balanceOfERC20(customer1.address, anqToken.address)).to.equal(parseUnits('757.57'));

      await qoistip.connect(customer1).withdrawERC20(anqToken.address);

      expect(await qoistip.balanceOfERC20(customer1.address, anqToken.address)).to.equal(0);
      expect(await anqToken.balanceOf(customer1.address)).to.equal(parseUnits('757.57'));
    });
    it('Many ERC20 Token', async function () {
      await anqToken.approve(qoistip.address, parseUnits('781'));
      await qoistip.donateERC20(customer1.address, anqToken.address, parseUnits('781'));
      await token2.approve(qoistip.address, parseUnits('781'));
      await qoistip.donateERC20(customer1.address, token2.address, parseUnits('781'));

      expect(await qoistip.balanceOfERC20(customer1.address, anqToken.address)).to.equal(parseUnits('757.57'));
      expect(await qoistip.balanceOfERC20(addr1.address, token2.address)).to.equal(parseUnits('757.57'));

      await qoistip.connect(addr1).withdrawManyERC20([anqToken.address, token2.address]);

      expect(await qoistip.balanceOfERC20(addr1.address, anqToken.address)).to.equal(0);
      expect(await anqToken.balanceOf(addr1.address)).to.equal(parseUnits('757.57').mul('2'));
      expect(await qoistip.balanceOfERC20(addr1.address, token2.address)).to.equal(0);
      expect(await token2.balanceOf(addr1.address)).to.equal(parseUnits('757.57'));
    });
    it('Revert if zero balance', async function () {
      await expect(qoistip.connect(addr1).withdrawERC20(anqToken.address)).to.be.revertedWith('You have 0 tokens on balance');
    });
  });

  xdescribe('Withdraw ETH', () => {
    it('One ERC20 Token', async function () {
      expect(await qoistip.balanceOfETH(addr1.address)).to.equal(parseUnits('0.97'));
      const tx = await qoistip.connect(addr1).withdrawETH();
      await tx.wait();
      expect(tx).to.changeEtherBalance(addr1.address, parseUnits('0.97'));
      expect(tx)
        .to.emit(qoistip, 'Donate')
        .withArgs(addr1.address, '0x0000000000000000000000000000000000000000', parseUnits('0.97'));

      expect(await qoistip.balanceOfETH(addr1.address)).to.equal(0);
    });
    it('Revert if zero balance', async function () {
      await expect(qoistip.connect(addr1).withdrawETH()).to.be.revertedWith('You have 0 ETH');
    });
  });
});

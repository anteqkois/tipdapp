const { expect } = require('chai');
const { ethers, network } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;
const { CHAILINK_PRICE_ORACLE_ADDRESS_USD, ERC20_TOKEN_ADDRESS, CHAILINK_PRICE_ORACLE_ADDRESS_ETH } = require('../../constant');
const CustomerToken = require('../../artifacts/contracts/CustomerToken.sol/CustomerToken.json');
const sandABI = require('../../abi/SAND.json');

describe('Qoistip', function () {
  let qoistip;
  let chailinkPriceFeeds;
  let qoistipPriceAggregator;
  let customerToken1;
  let sand;
  let sandHodler;
  let shib;
  let shibHodler;
  let owner;
  let customer1;
  let addr2;
  let addrs;

  before(async () => {
    [owner, customer1, addr2, ...addrs] = await ethers.getSigners();

    sand = new ethers.Contract(ERC20_TOKEN_ADDRESS.SAND, sandABI, ethers.provider);
    shib = new ethers.Contract(ERC20_TOKEN_ADDRESS.SHIB, sandABI, ethers.provider);

    // Have SAND, USDT, USDC
    const accountWithSAND = '0x109e588d17C1c1cff206aCB0b3FF0AAEffDe92bd';
    const accountWithSHIB = '0xd6Bc559a59B24A58A82F274555d152d67F15a7A6';

    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [accountWithSAND],
    });
    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [accountWithSHIB],
    });
    sandHodler = await ethers.getSigner(accountWithSAND);
    shibHodler = await ethers.getSigner(accountWithSHIB);

    const QoistipPriceAggregator = await ethers.getContractFactory('QoistipPriceAggregator');
    qoistipPriceAggregator = await QoistipPriceAggregator.deploy();

    const Qoistip = await ethers.getContractFactory('Qoistip');
    qoistip = await Qoistip.deploy(9700, qoistipPriceAggregator.address);

    const ChailinkPriceFeeds = await ethers.getContractFactory('ChailinkPriceFeeds');
    chailinkPriceFeeds = await ChailinkPriceFeeds.deploy();

    //set Qoisdapp smart contract needed veriables
    await qoistip.setPriceOracle(ERC20_TOKEN_ADDRESS.SAND, CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND, true, true);
    await qoistip.setPriceOracle(ERC20_TOKEN_ADDRESS.SHIB, CHAILINK_PRICE_ORACLE_ADDRESS_ETH.SHIB, false, true);
    const registerCustomerTransation = await qoistip.connect(customer1).registerCustomer('CT1', 'CustomerToken1');

    registerCustomerTransation.wait();
    const customerToken1Address = await qoistip.tokenCustomer(customer1.address);
    customerToken1 = new ethers.Contract(customerToken1Address, CustomerToken.abi, ethers.provider);
  });

  describe('Donate ERC20', () => {
    it('Check $SAND balance before donate', async function () {
      expect(await qoistip.balanceOfERC20(customer1.address, sand.address)).to.equal(0);
    });
    it('Send donate in $SAND and check emited event', async function () {
      await sand.connect(sandHodler).approve(qoistip.address, parseUnits('100'));

      await expect(qoistip.connect(sandHodler).donateERC20(customer1.address, sand.address, parseUnits('100')))
        .to.emit(qoistip, 'Donate')
        .withArgs(sandHodler.address, customer1.address, sand.address, parseUnits('100'));
    });
    it('Check $SAND balance after donate', async function () {
      expect(await qoistip.balanceOfERC20(customer1.address, sand.address)).to.equal(parseUnits('97'));
      expect(await qoistip.balanceOfERC20(qoistip.address, sand.address)).to.equal(parseUnits('100').sub(parseUnits('97')));
      expect(await sand.balanceOf(qoistip.address)).to.equal(parseUnits('100'));
    });
    it('Check $CT1 balance after donate', async function () {
      const sandPrice = await chailinkPriceFeeds.getLatestPrice(CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND);
      const calculateExpectBalance = parseUnits('100').mul(sandPrice).div('1000000000000000000');
      expect(await customerToken1.balanceOf(sandHodler.address)).to.equal(calculateExpectBalance);
    });
    it('Check $SHIB balance before donate', async function () {
      expect(await qoistip.balanceOfERC20(customer1.address, shib.address)).to.equal(0);
    });
    it('Send donate in $SHIB and check changeTokenBalance function', async function () {
      await shib.connect(shibHodler).approve(qoistip.address, parseUnits('10000'));

      await expect(() =>
        qoistip.connect(shibHodler).donateERC20(customer1.address, shib.address, parseUnits('10000')),
      ).to.changeTokenBalances(shib, [shibHodler, qoistip], [parseUnits('-10000'), parseUnits('10000')]);
    });
    it('Check $SHIB balance after donate', async function () {
      expect(await qoistip.balanceOfERC20(customer1.address, shib.address)).to.equal(parseUnits('9700'));
      expect(await qoistip.balanceOfERC20(qoistip.address, shib.address)).to.equal(parseUnits('10000').sub(parseUnits('9700')));
      expect(await shib.balanceOf(qoistip.address)).to.equal(parseUnits('10000'));
    });
    it('Check $CT1 balance after donate', async function () {
      const shibPrice = await chailinkPriceFeeds.getDerivedPrice(
        CHAILINK_PRICE_ORACLE_ADDRESS_ETH.SHIB,
        CHAILINK_PRICE_ORACLE_ADDRESS_ETH.USDC,
        18,
      );
      const calculateExpectBalance = parseUnits('10000').mul(shibPrice).div('1000000000000000000');
      expect(await customerToken1.balanceOf(shibHodler.address)).to.equal(calculateExpectBalance);
    });
    it('Can not send donate if worth is to small', async function () {
      await sand.connect(sandHodler).approve(qoistip.address, parseUnits('0.0001'));

      await expect(
        qoistip.connect(shibHodler).donateERC20(customer1.address, shib.address, parseUnits('0.026')),
      ).to.be.revertedWith('Donate worth < min value $');
    });
  });

  describe('Donate ETH', () => {
    it('Check $ETH balance in smart contract before donate', async function () {
      expect(await qoistip.balanceOfETH(customer1.address)).to.be.equal(0);
    });
    it('Send donate in $ETH and if balances were changed', async function () {
      //TODO checking doesn't work
      await expect(() => qoistip.donateETH(customer1.address, { value: parseUnits('1') })).to.changeEtherBalances(
        [owner, qoistip],
        [parseUnits('-1'), parseUnits('1')],
      );
    });
    it('Check $ETH balance after donate', async function () {
      expect(await qoistip.balanceOfETH(customer1.address)).to.be.equal(parseUnits('0.97'));
      expect(await qoistip.balanceOfETH(qoistip.address)).to.be.equal(parseUnits('0.03'));
    });
    it('Check $CT1 balance after donate', async function () {
      const ethPrice = await chailinkPriceFeeds.getLatestPrice(CHAILINK_PRICE_ORACLE_ADDRESS_USD.ETH);
      const calculateExpectBalance = parseUnits('1').mul(ethPrice).div('1000000000000000000');
      expect(await customerToken1.balanceOf(owner.address)).to.equal(calculateExpectBalance);
    });
  });

  describe('Withdraw ERC20', () => {
    it('One ERC20 Token', async function () {
      const sandBalance = await qoistip.balanceOfERC20(customer1.address, sand.address);
      expect(sandBalance).to.equal(parseUnits('97'));

      await expect(qoistip.connect(customer1).withdrawERC20(sand.address))
        .to.emit(qoistip, 'Withdraw')
        .withArgs(customer1.address, sand.address, sandBalance);

      expect(await qoistip.balanceOfERC20(customer1.address, sand.address)).to.equal(0);
      expect(await sand.balanceOf(customer1.address)).to.equal(parseUnits('97'));
    });
    it('Many ERC20 Token', async function () {
      await sand.connect(sandHodler).approve(qoistip.address, parseUnits('100'));
      await qoistip.connect(sandHodler).donateERC20(customer1.address, sand.address, parseUnits('100'));
      // await token2.approve(qoistip.address, parseUnits('781'));
      // await qoistip.donateERC20(customer1.address, token2.address, parseUnits('781'));

      expect(await qoistip.balanceOfERC20(customer1.address, sand.address)).to.equal(parseUnits('97'));
      expect(await qoistip.balanceOfERC20(customer1.address, shib.address)).to.equal(parseUnits('9700'));

      //TODO check many events
      // await qoistip.connect(customer1).withdrawManyERC20([sand.address, shib.address]);
      await expect(qoistip.connect(customer1).withdrawManyERC20([sand.address, shib.address]))
        .to.emit(qoistip, 'Withdraw')
        .withArgs(customer1.address, sand.address, parseUnits('97'))
        .and.emit(qoistip, 'Withdraw')
        .withArgs(customer1.address, shib.address, parseUnits('9700'));


      expect(await qoistip.balanceOfERC20(customer1.address, sand.address)).to.equal(0);
      expect(await sand.balanceOf(customer1.address)).to.equal(parseUnits('97').mul('2'));
      expect(await qoistip.balanceOfERC20(customer1.address, shib.address)).to.equal(0);
      expect(await shib.balanceOf(customer1.address)).to.equal(parseUnits('9700'));
    });
    it('Revert if zero balance', async function () {
      await expect(qoistip.connect(customer1).withdrawERC20(sand.address)).to.be.revertedWith('You have 0 tokens on balance');
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

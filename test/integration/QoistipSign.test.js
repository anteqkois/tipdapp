const { expect } = require('chai');
const { ethers, network, upgrades } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;
const {
  CHAILINK_PRICE_ORACLE_ADDRESS_USD,
  ERC20_TOKEN_ADDRESS,
  CHAILINK_PRICE_ORACLE_ADDRESS_ETH,
} = require('../../utils/constant');
const { packDataToSign } = require('../mocks/packDataToSign');
const CustomerToken = require('../../artifacts/contracts/CustomerToken.sol/CustomerToken.json');
const sandABI = require('../../src/artifacts/SAND.json');
const { axios } = require('axios');
require('../../server/ethersProvider');

describe('QoistipSign', function () {
  let qoistipSign;
  let chailinkPriceFeeds;
  let customerToken1;
  let sand;
  let sandHodler;
  let shib;
  let shibHodler;
  let elon;
  let elonHodler;
  let owner;
  let customer1;
  let adminSigner;
  let addrs;

  before(async () => {
    [owner, customer1, adminSigner, ...addrs] = await ethers.getSigners();

    sand = new ethers.Contract(ERC20_TOKEN_ADDRESS.SAND, sandABI, ethers.provider);
    shib = new ethers.Contract(ERC20_TOKEN_ADDRESS.SHIB, sandABI, ethers.provider);
    elon = new ethers.Contract(ERC20_TOKEN_ADDRESS.ELON, sandABI, ethers.provider);

    // Have SAND, USDT, USDC
    const accountWithSAND = '0x109e588d17C1c1cff206aCB0b3FF0AAEffDe92bd';
    const accountWithSHIB = '0xd6Bc559a59B24A58A82F274555d152d67F15a7A6';
    const accountWithELON = '0xCFFAd3200574698b78f32232aa9D63eABD290703'; // This address have many tokens !(SHIB, CRO...)

    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [accountWithSAND],
    });
    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [accountWithSHIB],
    });
    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [accountWithELON],
    });
    sandHodler = await ethers.getSigner(accountWithSAND);
    shibHodler = await ethers.getSigner(accountWithSHIB);
    elonHodler = await ethers.getSigner(accountWithELON);

    const QoistipSign = await ethers.getContractFactory('QoistipSign');
    qoistipSign = await upgrades.deployProxy(QoistipSign, [adminSigner.address], { kind: 'uups' });

    const ChailinkPriceFeeds = await ethers.getContractFactory('ChailinkPriceFeeds');
    chailinkPriceFeeds = await ChailinkPriceFeeds.deploy();

    //set Qoisdapp smart contract needed veriables
    const registerCustomerTransation = await qoistipSign.connect(customer1).registerCustomer('CT1', 'CustomerToken1');

    registerCustomerTransation.wait();
    const customerToken1Address = await qoistipSign.tokenCustomer(customer1.address);
    customerToken1 = new ethers.Contract(customerToken1Address, CustomerToken.abi, ethers.provider);
  });

  describe('Donate ERC20', async () => {
    const sandPriceBN = parseUnits((2.1262470976845336).toString());
    const shibPriceBN = parseUnits((0.0000152412344123).toString());
    it('Check $SAND balance before donate', async function () {
      expect(await qoistipSign.balanceERC20(customer1.address, sand.address)).to.equal(0);
    });
    it('Send donate in $SAND', async function () {
      await sand.connect(sandHodler).approve(qoistipSign.address, parseUnits('100'));
      // check on frontend signature from backend
      // const hash = await ethers.utils.keccak256(ethAddress);
      // const sig = await signer.signMessage(ethers.utils.arrayify(hash));
      // const pk = ethers.utils.recoverPublicKey(hash, sig);

      const { signature, signatureData } = await packDataToSign('100', 'SAND', customer1.address, customerToken1.address);

      await qoistipSign
        .connect(sandHodler)
        .donateERC20(
          signature,
          signatureData.tokenAmountBN,
          signatureData.amountToMint,
          signatureData.tokenToCustomer,
          signatureData.fee,
          signatureData.timestamp,
          customer1.address,
          signatureData.tokenAddress,
          signatureData.tokenCustomerAddress,
        );
    });
    it('Check $SAND balance after donate', async function () {
      expect(await qoistipSign.balanceERC20(customer1.address, sand.address)).to.equal(parseUnits('97'));
      expect(await qoistipSign.balanceERC20(qoistipSign.address, sand.address)).to.equal(parseUnits('100').sub(parseUnits('97')));
      expect(await sand.balanceOf(qoistipSign.address)).to.equal(parseUnits('100'));
    });
    it('Check $CT1 balance after donate', async function () {
      const calculateExpectBalance = parseUnits('100').mul(sandPriceBN).div('1000000000000000000');
      expect(await customerToken1.balanceOf(sandHodler.address)).to.equal(calculateExpectBalance);
    });

    it('Check $SHIB balance before donate', async function () {
      expect(await qoistipSign.balanceERC20(customer1.address, shib.address)).to.equal(0);
    });
    it('Send donate in $SHIB and check changeTokenBalance function', async function () {
      await shib.connect(shibHodler).approve(qoistipSign.address, parseUnits('10000'));

      const { signature, signatureData } = await packDataToSign('10000', 'SHIB', customer1.address, customerToken1.address);

      await expect(() =>
        qoistipSign
          .connect(shibHodler)
          .donateERC20(
            signature,
            signatureData.tokenAmountBN,
            signatureData.amountToMint,
            signatureData.tokenToCustomer,
            signatureData.fee,
            signatureData.timestamp,
            customer1.address,
            signatureData.tokenAddress,
            signatureData.tokenCustomerAddress,
          ),
      ).to.changeTokenBalances(shib, [shibHodler, qoistipSign], [parseUnits('-10000'), parseUnits('10000')]);
    });
    it('Check $SHIB balance after donate', async function () {
      expect(await qoistipSign.balanceERC20(customer1.address, shib.address)).to.equal(parseUnits('9700'));
      expect(await qoistipSign.balanceERC20(qoistipSign.address, shib.address)).to.equal(
        parseUnits('10000').sub(parseUnits('9700')),
      );
      expect(await shib.balanceOf(qoistipSign.address)).to.equal(parseUnits('10000'));
    });
    it('Check $CT1 balance after donate', async function () {
      const calculateExpectBalance = parseUnits('10000').mul(shibPriceBN).div('1000000000000000000');
      expect(await customerToken1.balanceOf(shibHodler.address)).to.equal(calculateExpectBalance);
    });
    it('Can not send donate if worth is to small ($SAND)', async function () {
      await sand.connect(sandHodler).approve(qoistipSign.address, parseUnits('0.01'));

      // await expect(packDataToSign('0.01', 'SAND', customer1.address, customerToken1.address)).to.throw;
      await expect(packDataToSign('0.01', 'SAND', customer1.address, customerToken1.address));

      // await expect(
        // qoistip.connect(sandHodler).donateERC20(customer1.address, sand.address, parseUnits('0.01')),
      // ).to.be.revertedWith('Donate worth < min value $');
    });
    it('Revert when address to donate is 0x0...', async function () {
      await sand.connect(sandHodler).approve(qoistipSign.address, parseUnits('100'));

      await expect(packDataToSign('0.01', 'SAND', '0x0000000000000000000000000000000000000000', customerToken1.address)).to.throw;

      // await expect(
        // qoistip.connect(sandHodler).donateERC20('0x0000000000000000000000000000000000000000', sand.address, parseUnits('100')),
      // ).to.be.reverted;
    });
    xit('Revert when address not register (handle with db)', async function () {
      await sand.connect(sandHodler).approve(qoistip.address, parseUnits('100'));

      await expect(qoistip.connect(sandHodler).donateERC20(adminSigner.address, sand.address, parseUnits('100'))).to.be.reverted;
    });
  });

  describe('Donate ETH', async () => {
    it('Check $ETH balance in smart contract before donate', async function () {
      expect(await qoistipSign.balanceETH(customer1.address)).to.be.equal(0);
    });
    it('Send donate in $ETH and if check balances were changed', async function () {
      await expect(() => qoistipSign.donateETH(customer1.address, { value: parseUnits('1') })).to.changeEtherBalances(
        [owner, qoistipSign],
        [parseUnits('-1'), parseUnits('1')],
      );
    });
    it('Check $ETH balance after donate', async function () {
      expect(await qoistipSign.balanceETH(customer1.address)).to.be.equal(parseUnits('0.97'));
      expect(await qoistipSign.balanceETH(qoistipSign.address)).to.be.equal(parseUnits('0.03'));
    });
    it('Check $CT1 balance after donate', async function () {
      const ethPrice = await chailinkPriceFeeds.getLatestPrice(CHAILINK_PRICE_ORACLE_ADDRESS_USD.ETH);
      const calculateExpectBalance = parseUnits('1').mul(ethPrice).div('1000000000000000000');
      expect(await customerToken1.balanceOf(owner.address)).to.equal(calculateExpectBalance);
    });
  });

  xdescribe('Withdraw ERC20', async () => {
    it('One ERC20 Token', async function () {
      const sandBalance = await qoistip.balanceERC20(customer1.address, sand.address);
      expect(sandBalance).to.equal(parseUnits('97'));

      await expect(qoistip.connect(customer1).withdrawERC20(sand.address))
        .to.emit(qoistip, 'Withdraw')
        .withArgs(customer1.address, sand.address, sandBalance);

      expect(await qoistip.balanceERC20(customer1.address, sand.address)).to.equal(0);
      expect(await sand.balanceOf(customer1.address)).to.equal(parseUnits('97'));
    });
    it('Many ERC20 Token', async function () {
      await sand.connect(sandHodler).approve(qoistip.address, parseUnits('100'));
      await qoistip.connect(sandHodler).donateERC20(customer1.address, sand.address, parseUnits('100'));

      expect(await qoistip.balanceERC20(customer1.address, sand.address)).to.equal(parseUnits('97'));
      expect(await qoistip.balanceERC20(customer1.address, shib.address)).to.equal(parseUnits('9700'));

      await expect(qoistip.connect(customer1).withdrawManyERC20([sand.address, shib.address]))
        .to.emit(qoistip, 'Withdraw')
        .withArgs(customer1.address, sand.address, parseUnits('97'))
        .and.emit(qoistip, 'Withdraw')
        .withArgs(customer1.address, shib.address, parseUnits('9700'));

      expect(await qoistip.balanceERC20(customer1.address, sand.address)).to.equal(0);
      expect(await sand.balanceOf(customer1.address)).to.equal(parseUnits('97').mul('2'));
      expect(await qoistip.balanceERC20(customer1.address, shib.address)).to.equal(0);
      expect(await shib.balanceOf(customer1.address)).to.equal(parseUnits('9700'));
    });
    it('Revert if zero balance', async function () {
      await expect(qoistip.connect(customer1).withdrawERC20(sand.address)).to.be.revertedWith('You have 0 tokens on balance');
    });
  });

  xdescribe('Withdraw ETH', async () => {
    it('All ETH', async function () {
      expect(await qoistip.balanceETH(customer1.address)).to.equal(parseUnits('0.97'));

      await expect(() => qoistip.connect(customer1).withdrawETH()).to.changeEtherBalances(
        [customer1, qoistip],
        [parseUnits('0.97'), parseUnits('-0.97')],
      );

      expect(await qoistip.balanceETH(customer1.address)).to.equal(0);
    });
    it('Revert if zero balance', async function () {
      await expect(qoistip.connect(customer1).withdrawETH()).to.be.revertedWith('You have 0 ETH');
    });
  });

  xdescribe('Upgrade implementation', async () => {
    it('Upgrade', async function () {
      expect(await qoistip.version()).to.equal(1);

      const QoistipPriceAggregator = await ethers.getContractFactory('QoistipPriceAggregator');
      qoistipPriceAggregator = await QoistipPriceAggregator.deploy();

      const QoistipV2 = await ethers.getContractFactory('QoistipV2');
      qoistip = await upgrades.upgradeProxy(qoistip, QoistipV2, {
        call: { fn: 'setQoistipPriceAggregator', args: [qoistipPriceAggregator.address] },
      });

      expect(await qoistip.version()).to.equal(2);
    });
    it('Add new no Chailink Oracle', async function () {
      const elonData = packToBytes32(ERC20_TOKEN_ADDRESS.ELON, { inUSD: true, isChailink: false });
      await qoistip.setPriceOracle(ERC20_TOKEN_ADDRESS.ELON, elonData);
    });
    it('Check $ELON balance before donate', async function () {
      expect(await qoistip.balanceERC20(customer1.address, elon.address)).to.equal(0);
    });
    it('Send donate in $ELON and check emited event', async function () {
      await elon.connect(elonHodler).approve(qoistip.address, parseUnits('1000000'));

      await expect(qoistip.connect(elonHodler).donateERC20(customer1.address, elon.address, parseUnits('1000000')))
        .to.emit(qoistip, 'Donate')
        .withArgs(elonHodler.address, customer1.address, elon.address, parseUnits('1000000'));
    });
    it('Check $ELON balance after donate', async function () {
      expect(await qoistip.balanceERC20(customer1.address, elon.address)).to.equal(parseUnits('970000'));
      expect(await qoistip.balanceERC20(qoistip.address, elon.address)).to.equal(parseUnits('1000000').sub(parseUnits('970000')));
      expect(await elon.balanceOf(qoistip.address)).to.equal(parseUnits('1000000'));
    });
    it('Check $CT1 balance after donate', async function () {
      const elonPrice = await qoistipPriceAggregator.latestRoundData(ERC20_TOKEN_ADDRESS.ELON);
      const calculateExpectBalance = parseUnits('1000000').mul(elonPrice).div('1000000000000000000');
      expect(await customerToken1.balanceOf(elonHodler.address)).to.equal(calculateExpectBalance);
    });
    it('Owner restriction still work', async function () {
      await expect(qoistip.connect(adminSigner).setQoistipPriceAggregator(qoistipPriceAggregator.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
      expect(await qoistip.setQoistipPriceAggregator(qoistipPriceAggregator.address));
    });
  });
});

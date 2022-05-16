const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
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
    const accountWithSAND = '0x5a52E96BAcdaBb82fd05763E25335261B270Efcb';
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

  // describe('Check fee', async () => {
  //   it('Check $SAND balance before donate', async function () {
  //     expect(await qoistipSign.balanceERC20(customer1.address, sand.address)).to.equal(0);
  //   });
  // });

  describe('Donate ERC20', async () => {
    const sandPriceBN = parseUnits(Number.parseFloat(2.1262470976845336).toFixed(18));
    const shibPriceBN = parseUnits(Number.parseFloat(0.0000152412344123).toFixed(18));
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

      await expect(packDataToSign('0.01', 'SAND', customer1.address, customerToken1.address)).to.eventually.be.rejectedWith(
        Error,
      );
    });
    it('Revert when smart contract locked', async function () {
      await sand.connect(sandHodler).approve(qoistipSign.address, parseUnits('100'));

      expect(await qoistipSign.paused()).to.be.false;
      await expect(qoistipSign.connect(shibHodler).pause()).to.be.revertedWith('Only owner');
      await qoistipSign.pause();
      expect(await qoistipSign.paused()).to.be.true;

      const { signature, signatureData } = await packDataToSign('100', 'SAND', customer1.address, customerToken1.address);

      await expect(
        qoistipSign
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
          ),
      ).to.be.revertedWith('Smart Contract paused');

      await qoistipSign.unPause();

      qoistipSign
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
    it('Revert when address to donate is 0x0...', async function () {
      await sand.connect(sandHodler).approve(qoistipSign.address, parseUnits('100'));

      await expect(
        packDataToSign('1', 'SAND', ethers.constants.AddressZero, customerToken1.address),
      ).to.eventually.be.rejectedWith(Error);
    });
    xit('Revert when address not register (handle with db)', async function () {
      await sand.connect(sandHodler).approve(qoistipSign.address, parseUnits('100'));

      await expect(qoistipSign.connect(sandHodler).donateERC20(adminSigner.address, sand.address, parseUnits('100'))).to.be
        .reverted;
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

  describe('Withdraw ERC20', async () => {
    it('One ERC20 Token', async function () {
      const sandBalance = await qoistipSign.balanceERC20(customer1.address, sand.address);
      expect(sandBalance).to.equal(parseUnits('194'));

      await expect(qoistipSign.connect(customer1).withdrawERC20(sand.address))
        .to.emit(qoistipSign, 'Withdraw')
        .withArgs(customer1.address, sand.address, sandBalance);

      expect(await qoistipSign.balanceERC20(customer1.address, sand.address)).to.equal(0);
      expect(await sand.balanceOf(customer1.address)).to.equal(parseUnits('194'));
    });
    it('Many ERC20 Token', async function () {
      await sand.connect(sandHodler).approve(qoistipSign.address, parseUnits('100'));

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

      expect(await qoistipSign.balanceERC20(customer1.address, sand.address)).to.equal(parseUnits('97'));
      expect(await qoistipSign.balanceERC20(customer1.address, shib.address)).to.equal(parseUnits('9700'));

      await expect(qoistipSign.connect(customer1).withdrawManyERC20([sand.address, shib.address]))
        .to.emit(qoistipSign, 'Withdraw')
        .withArgs(customer1.address, sand.address, parseUnits('97'))
        .and.emit(qoistipSign, 'Withdraw')
        .withArgs(customer1.address, shib.address, parseUnits('9700'));

      expect(await qoistipSign.balanceERC20(customer1.address, sand.address)).to.equal(0);
      expect(await sand.balanceOf(customer1.address)).to.equal(parseUnits('97').mul('3'));
      expect(await qoistipSign.balanceERC20(customer1.address, shib.address)).to.equal(0);
      expect(await shib.balanceOf(customer1.address)).to.equal(parseUnits('9700'));
    });
    it('Revert if zero balance', async function () {
      await expect(qoistipSign.connect(customer1).withdrawERC20(sand.address)).to.be.revertedWith('You have 0 tokens on balance');
    });
  });

  describe('Withdraw ETH', async () => {
    it('All ETH', async function () {
      expect(await qoistipSign.balanceETH(customer1.address)).to.equal(parseUnits('0.97'));

      await expect(() => qoistipSign.connect(customer1).withdrawETH()).to.changeEtherBalances(
        [customer1, qoistipSign],
        [parseUnits('0.97'), parseUnits('-0.97')],
      );

      expect(await qoistipSign.balanceETH(customer1.address)).to.equal(0);
    });
    it('Revert if zero balance', async function () {
      await expect(qoistipSign.connect(customer1).withdrawETH()).to.be.revertedWith('You have 0 ETH');
    });
  });

  describe('Upgrade implementation', async () => {
    it('Upgrade', async function () {
      expect(await qoistipSign.version()).to.equal(1);

      const QoistipSignV2 = await ethers.getContractFactory('QoistipSignV2');
      qoistipSign = await upgrades.upgradeProxy(qoistipSign, QoistipSignV2, {
        call: { fn: 'setNumber', args: [10] },
      });

      expect(await qoistipSign.version()).to.equal(2);
      expect(await qoistipSign.getNumber()).to.equal(10);
    });
    it('Check $ELON balance before donate', async function () {
      expect(await qoistipSign.balanceERC20(customer1.address, elon.address)).to.equal(0);
    });
    it('Send donate in $ELON and check emited event', async function () {
      await elon.connect(elonHodler).approve(qoistipSign.address, parseUnits('1000000'));

      const { signature, signatureData } = await packDataToSign('1000000', 'ELON', customer1.address, customerToken1.address);

      await qoistipSign
        .connect(elonHodler)
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
    it('Check $ELON balance after donate', async function () {
      expect(await qoistipSign.balanceERC20(customer1.address, elon.address)).to.equal(parseUnits('970000'));
      expect(await qoistipSign.balanceERC20(qoistipSign.address, elon.address)).to.equal(
        parseUnits('1000000').sub(parseUnits('970000')),
      );
      expect(await elon.balanceOf(qoistipSign.address)).to.equal(parseUnits('1000000'));
    });
    it('Check $CT1 balance after donate', async function () {
      const elonPriceBN = parseUnits(Number.parseFloat(0.0000004991232343).toFixed(18));
      const calculateExpectBalance = parseUnits('1000000').mul(elonPriceBN).div('1000000000000000000');
      expect(await customerToken1.balanceOf(elonHodler.address)).to.equal(calculateExpectBalance);
    });
    it('Owner restriction still work', async function () {
      await expect(qoistipSign.connect(adminSigner).setMinValue(10000)).to.be.revertedWith('Only owner');
      expect(await qoistipSign.connect(owner).setMinValue(10000));
    });
  });
});

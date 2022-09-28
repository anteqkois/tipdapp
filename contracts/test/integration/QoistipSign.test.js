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
const UserToken = require('../../artifacts/contracts/UserToken/UserToken.sol/UserToken.json');
// const sandABI = require('../../../src/artifacts/SAND.json');
const erc20 = require('../../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json');
const { axios } = require('axios');
const { USER_ADDRESS } = require('../mocks/address');

describe('QoistipSign', function () {
  let qoistipSign;
  let chailinkPriceFeeds;
  let userToken1;
  let sand;
  let sandHodler;
  let shib;
  let shibHodler;
  let elon;
  let elonHodler;
  let owner;
  let user1;
  let adminSigner;
  let addrs;

  before(async () => {
    [owner, user1, adminSigner, ...addrs] = await ethers.getSigners();

    sand = new ethers.Contract(ERC20_TOKEN_ADDRESS.SAND, erc20.abi, ethers.provider);
    shib = new ethers.Contract(ERC20_TOKEN_ADDRESS.SHIB, erc20.abi, ethers.provider);
    elon = new ethers.Contract(ERC20_TOKEN_ADDRESS.ELON, erc20.abi, ethers.provider);

    // Have SAND, USDT, USDC
    const accountWithSAND = USER_ADDRESS.SAND_HOLDER;
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
    const registerUserTransation = await qoistipSign.connect(user1).registerUser('UT1', 'UserToken1');

    registerUserTransation.wait();
    const userToken1Address = await qoistipSign.tokenUser(user1.address);
    userToken1 = new ethers.Contract(userToken1Address, UserToken.abi, owner);
  });

  // describe('Check fee', async () => {
  //   it('Check $SAND balance before donate', async function () {
  //     expect(await qoistipSign.balanceERC20(user1.address, sand.address)).to.equal(0);
  //   });
  // });

  describe('Donate ERC20', async () => {
    const sandPriceBN = parseUnits(Number.parseFloat(2.1262470976845336).toFixed(18));
    const shibPriceBN = parseUnits(Number.parseFloat(0.0000152412344123).toFixed(18));
    it('Check $SAND balance before donate', async function () {
      expect(await qoistipSign.balanceERC20(user1.address, sand.address)).to.equal(0);
    });
    it('Send donate in $SAND', async function () {
      await sand.connect(sandHodler).approve(qoistipSign.address, parseUnits('100'));
      // check on frontend signature from backend
      // const hash = await ethers.utils.keccak256(ethAddress);
      // const sig = await signer.signMessage(ethers.utils.arrayify(hash));
      // const pk = ethers.utils.recoverPublicKey(hash, sig);

      const { signature, signatureData } = await packDataToSign('100', 'SAND', user1.address, userToken1.address);

      await qoistipSign
        .connect(sandHodler)
        .donateERC20(
          signature,
          signatureData.tokenAmountBN,
          signatureData.amountToMint,
          signatureData.tokenToUser,
          signatureData.fee,
          signatureData.timestamp,
          user1.address,
          signatureData.tokenAddress,
          signatureData.tokenUserAddress,
        );
    });
    it('Check $SAND balance after donate', async function () {
      expect(await qoistipSign.balanceERC20(user1.address, sand.address)).to.equal(parseUnits('97'));
      expect(await qoistipSign.balanceERC20(qoistipSign.address, sand.address)).to.equal(parseUnits('100').sub(parseUnits('97')));
      expect(await sand.balanceOf(qoistipSign.address)).to.equal(parseUnits('100'));
    });
    it('Check $UT1 balance after donate', async function () {
      const calculateExpectBalance = parseUnits('100').mul(sandPriceBN).div('1000000000000000000');
      expect(await userToken1.balanceOf(sandHodler.address)).to.equal(calculateExpectBalance);
    });
    it('Check $SHIB balance before donate', async function () {
      expect(await qoistipSign.balanceERC20(user1.address, shib.address)).to.equal(0);
    });
    it('Send donate in $SHIB and check changeTokenBalance function', async function () {
      await shib.connect(shibHodler).approve(qoistipSign.address, parseUnits('10000'));

      const { signature, signatureData } = await packDataToSign('10000', 'SHIB', user1.address, userToken1.address);

      await expect(() =>
        qoistipSign
          .connect(shibHodler)
          .donateERC20(
            signature,
            signatureData.tokenAmountBN,
            signatureData.amountToMint,
            signatureData.tokenToUser,
            signatureData.fee,
            signatureData.timestamp,
            user1.address,
            signatureData.tokenAddress,
            signatureData.tokenUserAddress,
          ),
      ).to.changeTokenBalances(shib, [shibHodler, qoistipSign], [parseUnits('-10000'), parseUnits('10000')]);
    });
    it('Check $SHIB balance after donate', async function () {
      expect(await qoistipSign.balanceERC20(user1.address, shib.address)).to.equal(parseUnits('9700'));
      expect(await qoistipSign.balanceERC20(qoistipSign.address, shib.address)).to.equal(
        parseUnits('10000').sub(parseUnits('9700')),
      );
      expect(await shib.balanceOf(qoistipSign.address)).to.equal(parseUnits('10000'));
    });
    it('Check $UT1 balance after donate', async function () {
      const calculateExpectBalance = parseUnits('10000').mul(shibPriceBN).div('1000000000000000000');
      expect(await userToken1.balanceOf(shibHodler.address)).to.equal(calculateExpectBalance);
    });
    it('Can not send donate if worth is to small ($SAND)', async function () {
      await sand.connect(sandHodler).approve(qoistipSign.address, parseUnits('0.01'));

      await expect(packDataToSign('0.01', 'SAND', user1.address, userToken1.address)).to.eventually.be.rejectedWith(
        Error,
      );
    });
    it('Revert when smart contract locked', async function () {
      await sand.connect(sandHodler).approve(qoistipSign.address, parseUnits('100'));

      expect(await qoistipSign.paused()).to.be.false;
      await expect(qoistipSign.connect(shibHodler).pause()).to.be.revertedWith('Only owner');
      await qoistipSign.pause();
      expect(await qoistipSign.paused()).to.be.true;

      const { signature, signatureData } = await packDataToSign('100', 'SAND', user1.address, userToken1.address);

      await expect(
        qoistipSign
          .connect(sandHodler)
          .donateERC20(
            signature,
            signatureData.tokenAmountBN,
            signatureData.amountToMint,
            signatureData.tokenToUser,
            signatureData.fee,
            signatureData.timestamp,
            user1.address,
            signatureData.tokenAddress,
            signatureData.tokenUserAddress,
          ),
      ).to.be.revertedWith('Smart Contract paused');

      await qoistipSign.unPause();

      qoistipSign
        .connect(sandHodler)
        .donateERC20(
          signature,
          signatureData.tokenAmountBN,
          signatureData.amountToMint,
          signatureData.tokenToUser,
          signatureData.fee,
          signatureData.timestamp,
          user1.address,
          signatureData.tokenAddress,
          signatureData.tokenUserAddress,
        );
    });
    it('Revert when address to donate is 0x0...', async function () {
      await sand.connect(sandHodler).approve(qoistipSign.address, parseUnits('100'));

      await expect(
        packDataToSign('1', 'SAND', ethers.constants.AddressZero, userToken1.address),
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
      expect(await qoistipSign.balanceETH(user1.address)).to.be.equal(0);
    });
    it('Send donate in $ETH and if check balances were changed', async function () {
      await expect(() => qoistipSign.donateETH(user1.address, { value: parseUnits('1') })).to.changeEtherBalances(
        [owner, qoistipSign],
        [parseUnits('-1'), parseUnits('1')],
      );
    });
    it('Check $ETH balance after donate', async function () {
      expect(await qoistipSign.balanceETH(user1.address)).to.be.equal(parseUnits('0.97'));
      expect(await qoistipSign.balanceETH(qoistipSign.address)).to.be.equal(parseUnits('0.03'));
    });
    it('Check $UT1 balance after donate', async function () {
      const ethPrice = await chailinkPriceFeeds.getLatestPrice(CHAILINK_PRICE_ORACLE_ADDRESS_USD.ETH);
      const calculateExpectBalance = parseUnits('1').mul(ethPrice).div('1000000000000000000');
      expect(await userToken1.balanceOf(owner.address)).to.equal(calculateExpectBalance);
    });
  });

  describe('Withdraw ERC20', async () => {
    it('One ERC20 Token', async function () {
      const sandBalance = await qoistipSign.balanceERC20(user1.address, sand.address);
      expect(sandBalance).to.equal(parseUnits('194'));

      await expect(qoistipSign.connect(user1).withdrawERC20(sand.address))
        .to.emit(qoistipSign, 'Withdraw')
        .withArgs(user1.address, sand.address, sandBalance);

      expect(await qoistipSign.balanceERC20(user1.address, sand.address)).to.equal(0);
      expect(await sand.balanceOf(user1.address)).to.equal(parseUnits('194'));
    });
    it('Many ERC20 Token', async function () {
      await sand.connect(sandHodler).approve(qoistipSign.address, parseUnits('100'));

      const { signature, signatureData } = await packDataToSign('100', 'SAND', user1.address, userToken1.address);

      await qoistipSign
        .connect(sandHodler)
        .donateERC20(
          signature,
          signatureData.tokenAmountBN,
          signatureData.amountToMint,
          signatureData.tokenToUser,
          signatureData.fee,
          signatureData.timestamp,
          user1.address,
          signatureData.tokenAddress,
          signatureData.tokenUserAddress,
        );

      expect(await qoistipSign.balanceERC20(user1.address, sand.address)).to.equal(parseUnits('97'));
      expect(await qoistipSign.balanceERC20(user1.address, shib.address)).to.equal(parseUnits('9700'));

      await expect(qoistipSign.connect(user1).withdrawManyERC20([sand.address, shib.address]))
        .to.emit(qoistipSign, 'Withdraw')
        .withArgs(user1.address, sand.address, parseUnits('97'))
        .and.emit(qoistipSign, 'Withdraw')
        .withArgs(user1.address, shib.address, parseUnits('9700'));

      expect(await qoistipSign.balanceERC20(user1.address, sand.address)).to.equal(0);
      expect(await sand.balanceOf(user1.address)).to.equal(parseUnits('97').mul('3'));
      expect(await qoistipSign.balanceERC20(user1.address, shib.address)).to.equal(0);
      expect(await shib.balanceOf(user1.address)).to.equal(parseUnits('9700'));
    });
    it('Revert if zero balance', async function () {
      await expect(qoistipSign.connect(user1).withdrawERC20(sand.address)).to.be.revertedWith('You have 0 tokens on balance');
    });
  });

  describe('Withdraw ETH', async () => {
    it('All ETH', async function () {
      expect(await qoistipSign.balanceETH(user1.address)).to.equal(parseUnits('0.97'));

      await expect(() => qoistipSign.connect(user1).withdrawETH()).to.changeEtherBalances(
        [user1, qoistipSign],
        [parseUnits('0.97'), parseUnits('-0.97')],
      );

      expect(await qoistipSign.balanceETH(user1.address)).to.equal(0);
    });
    it('Revert if zero balance', async function () {
      await expect(qoistipSign.connect(user1).withdrawETH()).to.be.revertedWith('You have 0 ETH on balance');
    });
  });

  describe('Withdraw Admin', async () => {
    it('Others can not withdraw fees', async () => {
      await expect(qoistipSign.connect(user1).withdrawERC20Admin(sand.address)).to.be.revertedWith('Only owner');
      await expect(qoistipSign.connect(user1).withdrawManyERC20Admin([sand.address, shib.address])).to.be.revertedWith(
        'Only owner',
      );
    });

    it('One ERC20 Token', async function () {
      const sandBalance = await qoistipSign.balanceERC20(qoistipSign.address, sand.address);
      expect(sandBalance).to.equal(parseUnits('9'));

      await qoistipSign.withdrawERC20Admin(sand.address);

      expect(await qoistipSign.balanceERC20(qoistipSign.address, sand.address)).to.equal(0);
      expect(await sand.balanceOf(owner.address)).to.equal(parseUnits('9'));
    });
    it('Many ERC20 Token', async function () {
      expect(await qoistipSign.balanceERC20(qoistipSign.address, shib.address)).to.equal(parseUnits('300'));

      await qoistipSign.withdrawManyERC20Admin([shib.address]);

      expect(await qoistipSign.balanceERC20(qoistipSign.address, shib.address)).to.equal(0);
      expect(await shib.balanceOf(owner.address)).to.equal(parseUnits('300'));
    });
    it('All ETH', async function () {
      expect(await qoistipSign.balanceETH(qoistipSign.address)).to.equal(parseUnits('0.03'));

      await expect(() => qoistipSign.withdrawETHAdmin()).to.changeEtherBalances(
        [qoistipSign, owner],
        [parseUnits('-0.03'), parseUnits('0.03')],
      );

      expect(await qoistipSign.balanceETH(qoistipSign.address)).to.equal(0);
    });
  });

  describe('Upgrade implementation to V2', async () => {
    it('Upgrade', async function () {
      const QoistipSignV2 = await ethers.getContractFactory('QoistipSignV2');
      qoistipSign = await upgrades.upgradeProxy(qoistipSign, QoistipSignV2, {
        call: { fn: 'setNumber', args: [10] },
      });

      expect(await qoistipSign.version()).to.equal(2);
      expect(await qoistipSign.getNumber()).to.equal(10);
    });
    it('Check $ELON balance before donate', async function () {
      expect(await qoistipSign.balanceERC20(user1.address, elon.address)).to.equal(0);
    });
    it('Send donate in $ELON and check emited event', async function () {
      await elon.connect(elonHodler).approve(qoistipSign.address, parseUnits('1000000'));

      const { signature, signatureData } = await packDataToSign('1000000', 'ELON', user1.address, userToken1.address);

      await qoistipSign
        .connect(elonHodler)
        .donateERC20(
          signature,
          signatureData.tokenAmountBN,
          signatureData.amountToMint,
          signatureData.tokenToUser,
          signatureData.fee,
          signatureData.timestamp,
          user1.address,
          signatureData.tokenAddress,
          signatureData.tokenUserAddress,
        );
    });
    it('Check $ELON balance after donate', async function () {
      expect(await qoistipSign.balanceERC20(user1.address, elon.address)).to.equal(parseUnits('970000'));
      expect(await qoistipSign.balanceERC20(qoistipSign.address, elon.address)).to.equal(
        parseUnits('1000000').sub(parseUnits('970000')),
      );
      expect(await elon.balanceOf(qoistipSign.address)).to.equal(parseUnits('1000000'));
    });
    it('Check $UT1 balance after donate', async function () {
      const elonPriceBN = parseUnits(Number.parseFloat(0.0000004991232343).toFixed(18));
      const calculateExpectBalance = parseUnits('1000000').mul(elonPriceBN).div('1000000000000000000');
      expect(await userToken1.balanceOf(elonHodler.address)).to.equal(calculateExpectBalance);
    });
    it('Owner restriction still work', async function () {
      await expect(qoistipSign.connect(adminSigner).setMinValue(10000)).to.be.revertedWith('Only owner');
      expect(await qoistipSign.connect(owner).setMinValue(10000));
    });
  });
  describe('Upgrade implementation to V3', async () => {
    it('Upgrade', async function () {
      expect(await qoistipSign.version()).to.equal(2);

      const QoistipSignV3 = await ethers.getContractFactory('QoistipSignV3');
      qoistipSign = await upgrades.upgradeProxy(qoistipSign, QoistipSignV3);

      expect(await qoistipSign.version()).to.equal(3);
    });
    it('Check $ELON balance before donate', async function () {
      expect(await qoistipSign.balanceERC20(user1.address, elon.address)).to.equal(parseUnits('970000'));
    });
    it('Send donate in $ELON and check emited event', async function () {
      await elon.connect(elonHodler).approve(qoistipSign.address, parseUnits('1000000'));

      expect(await qoistipSign.paused()).to.be.false;
      await qoistipSign.pause();
      expect(await qoistipSign.paused()).to.be.true;

      const { signature, signatureData } = await packDataToSign('1000000', 'ELON', user1.address, userToken1.address);

      await qoistipSign
        .connect(elonHodler)
        .donateERC20(
          signature,
          signatureData.tokenAmountBN,
          signatureData.amountToMint,
          signatureData.tokenToUser,
          signatureData.fee,
          signatureData.timestamp,
          user1.address,
          signatureData.tokenAddress,
          signatureData.tokenUserAddress,
        );
    });
    it('Check $ELON balance after donate', async function () {
      expect(await qoistipSign.balanceERC20(user1.address, elon.address)).to.equal(parseUnits('970000').mul('2'));
      expect(await qoistipSign.balanceERC20(qoistipSign.address, elon.address)).to.equal(
        parseUnits('1000000').sub(parseUnits('970000')).mul('2'),
      );
      expect(await elon.balanceOf(qoistipSign.address)).to.equal(parseUnits('1000000').mul('2'));
    });
    it('Check $UT1 balance after donate', async function () {
      const elonPriceBN = parseUnits(Number.parseFloat(0.0000004991232343).toFixed(18));
      const calculateExpectBalance = parseUnits('1000000').mul(elonPriceBN).div('1000000000000000000').mul('2');
      expect(await userToken1.balanceOf(elonHodler.address)).to.equal(calculateExpectBalance);
    });
    it('Owner restriction still work', async function () {
      await expect(qoistipSign.connect(adminSigner).setMinValue(10000)).to.be.revertedWith('Only owner');
      expect(await qoistipSign.connect(owner).setMinValue(10000));
    });
  });

  describe('Change UserToken owner', async () => {
    it('Anybody can not change owner of user token', async () => {
      expect(await userToken1.owner()).to.be.equal(qoistipSign.address);
      await expect(userToken1.changeOwner(user1.address)).to.be.revertedWith('Only owner');
    });
    it('Qoistip smart contract can change owner of user token', async () => {
      await qoistipSign.changeTokenOwner(user1.address, user1.address);
      expect(await userToken1.owner()).to.be.equal(user1.address);

      await expect(qoistipSign.changeTokenOwner(user1.address, user1.address)).to.be.revertedWith('Only owner');
    });
    it('QCan use another IERC20 interface', async () => {
      // console.log(await qoistipSign.balanseOfSmartContractERC20(sand.address));
      expect(await qoistipSign.balanseOfSmartContractERC20(sand.address));
    });
  });
});

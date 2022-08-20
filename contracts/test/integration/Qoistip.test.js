const { expect } = require('chai');
const { ethers, network, upgrades } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;
const {
    CHAILINK_PRICE_ORACLE_ADDRESS_USD,
    ERC20_TOKEN_ADDRESS,
    CHAILINK_PRICE_ORACLE_ADDRESS_ETH,
} = require('../../utils/constant');
const { packToBytes32, unpackFromBytes32 } = require('../../utils/packOracleData');
const UserToken = require('../../artifacts/contracts/UserToken/UserToken.sol/UserToken.json');
// const sandABI = require('../../src/artifacts/SAND.json');
const erc20 = require('../../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json');

xdescribe('Qoistip', function () {
  let qoistip;
  let chailinkPriceFeeds;
  let qoistipPriceAggregator;
  let userToken1;
  let sand;
  let sandHodler;
  let shib;
  let shibHodler;
  let elon;
  let elonHodler;
  let owner;
  let user1;
  let addr2;
  let addrs;

  before(async () => {
    [owner, user1, addr2, ...addrs] = await ethers.getSigners();

    sand = new ethers.Contract(ERC20_TOKEN_ADDRESS.SAND, erc20.abi, ethers.provider);
    shib = new ethers.Contract(ERC20_TOKEN_ADDRESS.SHIB, erc20.abi, ethers.provider);
    elon = new ethers.Contract(ERC20_TOKEN_ADDRESS.ELON, erc20.abi, ethers.provider);

    // Have SAND, USDT, USDC
    const accountWithSAND = '0x2eE555C9006A9DC4674f01E0d4Dfc58e013708f0';
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

    const Qoistip = await ethers.getContractFactory('Qoistip');
    qoistip = await upgrades.deployProxy(Qoistip, [], { kind: 'uups' });
    // qoistip = await Qoistip.deploy(qoistipPriceAggregator.address);

    const ChailinkPriceFeeds = await ethers.getContractFactory('ChailinkPriceFeeds');
    chailinkPriceFeeds = await ChailinkPriceFeeds.deploy();

    //set Qoisdapp smart contract needed veriables
    const sandData = packToBytes32(CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND, { inUSD: true, isChailink: true });
    await qoistip.setPriceOracle(ERC20_TOKEN_ADDRESS.SAND, sandData);

    const shibData = packToBytes32(CHAILINK_PRICE_ORACLE_ADDRESS_ETH.SHIB, { inUSD: false, isChailink: true });
    await qoistip.setPriceOracle(ERC20_TOKEN_ADDRESS.SHIB, shibData);

    const registerUserTransation = await qoistip.connect(user1).registerUser('UT1', 'UserToken1');

    registerUserTransation.wait();
    const UserToken1Address = await qoistip.tokenUser(user1.address);
    userToken1 = new ethers.Contract(UserToken1Address, UserToken.abi, ethers.provider);
  });

  describe('Donate ERC20', async () => {
    it('Check $SAND balance before donate', async function () {
      expect(await qoistip.balanceERC20(user1.address, sand.address)).to.equal(0);
    });
    it('Send donate in $SAND and check emited event', async function () {
      await sand.connect(sandHodler).approve(qoistip.address, parseUnits('100'));

      await expect(qoistip.connect(sandHodler).donateERC20(user1.address, sand.address, parseUnits('100')))
        .to.emit(qoistip, 'Donate')
        .withArgs(sandHodler.address, user1.address, sand.address, parseUnits('100'));
    });
    it('Check $SAND balance after donate', async function () {
      expect(await qoistip.balanceERC20(user1.address, sand.address)).to.equal(parseUnits('97'));
      expect(await qoistip.balanceERC20(qoistip.address, sand.address)).to.equal(parseUnits('100').sub(parseUnits('97')));
      expect(await sand.balanceOf(qoistip.address)).to.equal(parseUnits('100'));
    });
    it('Check $UT1 balance after donate', async function () {
      const sandPrice = await chailinkPriceFeeds.getLatestPrice(CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND);
      const calculateExpectBalance = parseUnits('100').mul(sandPrice).div('1000000000000000000');
      expect(await userToken1.balanceOf(sandHodler.address)).to.equal(calculateExpectBalance);
    });
    it('Check $SHIB balance before donate', async function () {
      expect(await qoistip.balanceERC20(user1.address, shib.address)).to.equal(0);
    });
    it('Send donate in $SHIB and check changeTokenBalance function', async function () {
      await shib.connect(shibHodler).approve(qoistip.address, parseUnits('10000'));

      await expect(() =>
        qoistip.connect(shibHodler).donateERC20(user1.address, shib.address, parseUnits('10000')),
      ).to.changeTokenBalances(shib, [shibHodler, qoistip], [parseUnits('-10000'), parseUnits('10000')]);
    });
    it('Check $SHIB balance after donate', async function () {
      expect(await qoistip.balanceERC20(user1.address, shib.address)).to.equal(parseUnits('9700'));
      expect(await qoistip.balanceERC20(qoistip.address, shib.address)).to.equal(parseUnits('10000').sub(parseUnits('9700')));
      expect(await shib.balanceOf(qoistip.address)).to.equal(parseUnits('10000'));
    });
    it('Check $CT1 balance after donate', async function () {
      const shibPrice = await chailinkPriceFeeds.getDerivedPrice(
        CHAILINK_PRICE_ORACLE_ADDRESS_ETH.SHIB,
        CHAILINK_PRICE_ORACLE_ADDRESS_ETH.USDC,
        18,
      );
      const calculateExpectBalance = parseUnits('10000').mul(shibPrice).div('1000000000000000000');
      expect(await userToken1.balanceOf(shibHodler.address)).to.equal(calculateExpectBalance);
    });
    it('Can not send donate if worth is to small ($SAND)', async function () {
      await sand.connect(sandHodler).approve(qoistip.address, parseUnits('0.01'));

      await expect(
        qoistip.connect(sandHodler).donateERC20(user1.address, sand.address, parseUnits('0.01')),
      ).to.be.revertedWith('Donate worth < min value $');
    });
    it('Revert when address to donate is 0x0...', async function () {
      await sand.connect(sandHodler).approve(qoistip.address, parseUnits('100'));

      await expect(
        qoistip.connect(sandHodler).donateERC20('0x0000000000000000000000000000000000000000', sand.address, parseUnits('100')),
      ).to.be.reverted;
    });
    it('Revert when address not register', async function () {
      await sand.connect(sandHodler).approve(qoistip.address, parseUnits('100'));

      await expect(qoistip.connect(sandHodler).donateERC20(addr2.address, sand.address, parseUnits('100'))).to.be.reverted;
    });
  });

  describe('Donate ETH', async () => {
    it('Check $ETH balance in smart contract before donate', async function () {
      expect(await qoistip.balanceETH(user1.address)).to.be.equal(0);
    });
    it('Send donate in $ETH and if check balances were changed', async function () {
      await expect(() => qoistip.donateETH(user1.address, { value: parseUnits('1') })).to.changeEtherBalances(
        [owner, qoistip],
        [parseUnits('-1'), parseUnits('1')],
      );
    });
    it('Check $ETH balance after donate', async function () {
      expect(await qoistip.balanceETH(user1.address)).to.be.equal(parseUnits('0.97'));
      expect(await qoistip.balanceETH(qoistip.address)).to.be.equal(parseUnits('0.03'));
    });
    it('Check $CT1 balance after donate', async function () {
      const ethPrice = await chailinkPriceFeeds.getLatestPrice(CHAILINK_PRICE_ORACLE_ADDRESS_USD.ETH);
      const calculateExpectBalance = parseUnits('1').mul(ethPrice).div('1000000000000000000');
      expect(await userToken1.balanceOf(owner.address)).to.equal(calculateExpectBalance);
    });
  });

  describe('Withdraw ERC20', async () => {
    it('One ERC20 Token', async function () {
      const sandBalance = await qoistip.balanceERC20(user1.address, sand.address);
      expect(sandBalance).to.equal(parseUnits('97'));

      await expect(qoistip.connect(user1).withdrawERC20(sand.address))
        .to.emit(qoistip, 'Withdraw')
        .withArgs(user1.address, sand.address, sandBalance);

      expect(await qoistip.balanceERC20(user1.address, sand.address)).to.equal(0);
      expect(await sand.balanceOf(user1.address)).to.equal(parseUnits('97'));
    });
    it('Many ERC20 Token', async function () {
      await sand.connect(sandHodler).approve(qoistip.address, parseUnits('100'));
      await qoistip.connect(sandHodler).donateERC20(user1.address, sand.address, parseUnits('100'));

      expect(await qoistip.balanceERC20(user1.address, sand.address)).to.equal(parseUnits('97'));
      expect(await qoistip.balanceERC20(user1.address, shib.address)).to.equal(parseUnits('9700'));

      await expect(qoistip.connect(user1).withdrawManyERC20([sand.address, shib.address]))
        .to.emit(qoistip, 'Withdraw')
        .withArgs(user1.address, sand.address, parseUnits('97'))
        .and.emit(qoistip, 'Withdraw')
        .withArgs(user1.address, shib.address, parseUnits('9700'));

      expect(await qoistip.balanceERC20(user1.address, sand.address)).to.equal(0);
      expect(await sand.balanceOf(user1.address)).to.equal(parseUnits('97').mul('2'));
      expect(await qoistip.balanceERC20(user1.address, shib.address)).to.equal(0);
      expect(await shib.balanceOf(user1.address)).to.equal(parseUnits('9700'));
    });
    it('Revert if zero balance', async function () {
      await expect(qoistip.connect(user1).withdrawERC20(sand.address)).to.be.revertedWith('You have 0 tokens on balance');
    });
  });

  describe('Withdraw ETH', async () => {
    it('All ETH', async function () {
      expect(await qoistip.balanceETH(user1.address)).to.equal(parseUnits('0.97'));

      await expect(() => qoistip.connect(user1).withdrawETH()).to.changeEtherBalances(
        [user1, qoistip],
        [parseUnits('0.97'), parseUnits('-0.97')],
      );

      expect(await qoistip.balanceETH(user1.address)).to.equal(0);
    });
    it('Revert if zero balance', async function () {
      await expect(qoistip.connect(user1).withdrawETH()).to.be.revertedWith('You have 0 ETH');
    });
  });

  describe('Upgrade implementation', async () => {
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
      expect(await qoistip.balanceERC20(user1.address, elon.address)).to.equal(0);
    });
    it('Send donate in $ELON and check emited event', async function () {
      await elon.connect(elonHodler).approve(qoistip.address, parseUnits('1000000'));

      await expect(qoistip.connect(elonHodler).donateERC20(user1.address, elon.address, parseUnits('1000000')))
        .to.emit(qoistip, 'Donate')
        .withArgs(elonHodler.address, user1.address, elon.address, parseUnits('1000000'));
    });
    it('Check $ELON balance after donate', async function () {
      expect(await qoistip.balanceERC20(user1.address, elon.address)).to.equal(parseUnits('970000'));
      expect(await qoistip.balanceERC20(qoistip.address, elon.address)).to.equal(
        parseUnits('1000000').sub(parseUnits('970000')),
      );
      expect(await elon.balanceOf(qoistip.address)).to.equal(parseUnits('1000000'));
    });
    it('Check $CT1 balance after donate', async function () {
      const elonPrice = await qoistipPriceAggregator.latestRoundData(ERC20_TOKEN_ADDRESS.ELON);
      const calculateExpectBalance = parseUnits('1000000').mul(elonPrice).div('1000000000000000000');
      expect(await userToken1.balanceOf(elonHodler.address)).to.equal(calculateExpectBalance);
    });
    it('Owner restriction still work', async function () {
      await expect(qoistip.connect(addr2).setQoistipPriceAggregator(qoistipPriceAggregator.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
      expect(await qoistip.setQoistipPriceAggregator(qoistipPriceAggregator.address));
    });
  });
});

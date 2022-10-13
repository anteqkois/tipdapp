const { expect } = require('chai');
const { ethers } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;
const { CHAILINK_PRICE_ORACLE_ADDRESS_USD, ERC20_TOKEN_ADDRESS } = require('../../utils/constant');
const UserToken = require('../../artifacts/contracts/UserToken/UserToken.sol/UserToken.json');
// const sandABI = require('../../src/artifacts/SAND.json');
// const erc20 = require('../../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json');

xdescribe('Qoistip', function () {
  let qoistip;
  let qoistipPriceAggregator;
  let userToken1;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  before(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const QoistipPriceAggregator = await ethers.getContractFactory('QoistipPriceAggregator');
    qoistipPriceAggregator = await QoistipPriceAggregator.deploy();

    const Qoistip = await ethers.getContractFactory('Qoistip');
    qoistip = await upgrades.deployProxy(Qoistip, [qoistipPriceAggregator.address], { kind: 'uups' });
  });

  describe('Set new price token oracle', () => {
    it('Check if not suported, no price oracle', async function () {
      const priceOracleData = await qoistip.priceOracle(ERC20_TOKEN_ADDRESS.SAND);
      expect(priceOracleData.oracleAddress).to.equal('0x0000000000000000000000000000000000000000');
      expect(priceOracleData.inUSD).to.be.false;
    });
    it('Add price token pracle and check if data on-chain are right', async function () {
      await qoistip.setPriceOracle(ERC20_TOKEN_ADDRESS.SAND, CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND, true);

      const priceOracleData = await qoistip.priceOracle(ERC20_TOKEN_ADDRESS.SAND);
      expect(priceOracleData.oracleAddress).to.equal(CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND);
      expect(priceOracleData.inUSD).to.be.true;
    });
    it('Only owner can set price token oracle', async function () {
      await expect(
        qoistip.connect(addr1).setPriceOracle(ERC20_TOKEN_ADDRESS.ENJ, CHAILINK_PRICE_ORACLE_ADDRESS_USD.ENJ, true),
      ).to.be.revertedWith('Ownable: caller is not the owner');

      await qoistip.setPriceOracle(ERC20_TOKEN_ADDRESS.ENJ, CHAILINK_PRICE_ORACLE_ADDRESS_USD.ENJ, true);

      const priceOracleData = await qoistip.priceOracle(ERC20_TOKEN_ADDRESS.ENJ);
      expect(priceOracleData.oracleAddress).to.equal(CHAILINK_PRICE_ORACLE_ADDRESS_USD.ENJ);
      expect(priceOracleData.inUSD).to.be.true;
    });
    it('Disabled ptice token oracle', async function () {
      await qoistip.setPriceOracle(ERC20_TOKEN_ADDRESS.ENJ, '0x0000000000000000000000000000000000000000', false);

      const priceOracleData = await qoistip.priceOracle(ERC20_TOKEN_ADDRESS.ENJ);
      expect(priceOracleData.oracleAddress).to.equal('0x0000000000000000000000000000000000000000');
      expect(priceOracleData.inUSD).to.be.false;
    });
  });

  describe('New user', async () => {
    it('Register new user and emit event NewUser', async () => {
      const registerUserTransation = await qoistip.connect(addr1).registerUser('UT1', 'UserToken1');

      registerUserTransation.wait();
      const userToken1Address = await qoistip.userToken(addr1.address);

      await expect(registerUserTransation).to.emit(qoistip, 'NewUser').withArgs(addr1.address, userToken1Address);
      expect(userToken1Address).to.not.equal('0x0000000000000000000000000000000000000000');

      userToken1 = new ethers.Contract(userToken1Address, UserToken.abi, ethers.provider);
      expect(await userToken1.name()).to.equal('UserToken1');
      expect(await userToken1.symbol()).to.equal('UT1');
      expect(await userToken1.totalSupply()).to.equal(0);
      expect(await userToken1.owner()).to.equal(qoistip.address);
    });
    it('Can not register again when account was registered', async () => {
      await expect(qoistip.connect(addr1).registerUser('UT1', 'UserToken1')).to.be.revertedWith(
        'This address has been already registered',
      );
    });
  });
});

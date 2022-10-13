const { expect } = require('chai');
const { ethers } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;
const { CHAILINK_PRICE_ORACLE_ADDRESS_USD, ERC20_TOKEN_ADDRESS } = require('../../utils/constant');
const UserToken = require('../../artifacts/contracts/UserToken/UserToken.sol/UserToken.json');
// const sandABI = require('../../src/artifacts/SAND.json');
// const erc20 = require('../../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json');

describe('QoistipSign', function () {
  let qoistipSign;
  //   let chailinkPriceFeeds;
  let userToken1;
  let owner;
  let adminSigner;
  let user1;

  before(async () => {
    [owner, user1, adminSigner, ...addrs] = await ethers.getSigners();

    const QoistipSign = await ethers.getContractFactory('QoistipSign');
    qoistipSign = await upgrades.deployProxy(QoistipSign, [adminSigner.address], { kind: 'uups' });

    //    const ChailinkPriceFeeds = await ethers.getContractFactory('ChailinkPriceFeeds');
    //    chailinkPriceFeeds = await ChailinkPriceFeeds.deploy();
  });

  describe('New user', async () => {
    it('Register new user and emit event NewUser', async () => {
      const registerUserTransation = await qoistipSign.connect(user1).registerUser('UT1', 'UserToken1');

      registerUserTransation.wait();
      const userToken1Address = await qoistipSign.userToken(user1.address);

      await expect(registerUserTransation).to.emit(qoistipSign, 'NewUser').withArgs(user1.address, userToken1Address);
      expect(userToken1Address).to.not.equal('0x0000000000000000000000000000000000000000');

      userToken1 = new ethers.Contract(userToken1Address, UserToken.abi, ethers.provider);
      expect(await userToken1.name()).to.equal('UserToken1');
      expect(await userToken1.symbol()).to.equal('UT1');
      expect(await userToken1.totalSupply()).to.equal(0);
      expect(await userToken1.owner()).to.equal(qoistipSign.address);
    });
    it('Can not register again when account was registered', async () => {
      await expect(qoistipSign.connect(user1).registerUser('UT1', 'UserToken1')).to.be.revertedWith('Address registered');
    });
  });
});

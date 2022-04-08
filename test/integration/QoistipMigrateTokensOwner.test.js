const { expect } = require('chai');
const { ethers, network } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;
const { CHAILINK_PRICE_ORACLE_ADDRESS_USD, ERC20_TOKEN_ADDRESS, CHAILINK_PRICE_ORACLE_ADDRESS_ETH } = require('../../constant');
const CustomerToken = require('../../artifacts/contracts/CustomerToken.sol/CustomerToken.json');
const sandABI = require('../../abi/SAND.json');

xdescribe('Qoistip', function () {
  let qoistip;
  let chailinkPriceFeeds;
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
    const accountWithSAND = '0x109e588d17C1c1cff206aCB0b3FF0AAEffDe92bd';

    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [accountWithSAND],
    });

    sandHodler = await ethers.getSigner(accountWithSAND);

    const QoistipPriceAggregator = await ethers.getContractFactory('QoistipPriceAggregator');
    qoistipPriceAggregator = await QoistipPriceAggregator.deploy();

    const Qoistip = await ethers.getContractFactory('Qoistip');
    qoistip = await Qoistip.deploy(9700, qoistipPriceAggregator.address);

    const ChailinkPriceFeeds = await ethers.getContractFactory('ChailinkPriceFeeds');
    chailinkPriceFeeds = await ChailinkPriceFeeds.deploy();

    //set Qoisdapp smart contract needed veriables
    await qoistip.setPriceOracle(ERC20_TOKEN_ADDRESS.SAND, CHAILINK_PRICE_ORACLE_ADDRESS_USD.SAND, true, true);
    const registerCustomerTransation = await qoistip.connect(customer1).registerCustomer('CT1', 'CustomerToken1');

    registerCustomerTransation.wait();
    const customerToken1Address = await qoistip.tokenCustomer(customer1.address);
    customerToken1 = new ethers.Contract(customerToken1Address, CustomerToken.abi, ethers.provider);

    await sand.connect(sandHodler).approve(qoistip.address, parseUnits('100'));
    await qoistip.connect(sandHodler).donateERC20(customer1.address, sand.address, parseUnits('100'));
  });

  xdescribe('Migrate ', async() => {
    const QoistipV2 = await ethers.getContractFactory('QoistipV2');
    qoistipV2 = await QoistipV2.deploy(qoistipPriceAggregator.address);
  });
});

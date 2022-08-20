const { expect } = require('chai');
const { ethers } = require('hardhat');
const { parseUnits, formatUnits } = ethers.utils;
// const {
// CHAILINK_PRICE_ORACLE_ADDRESS_USD,
// CHAILINK_PRICE_ORACLE_ADDRESS_ETH,
// ERC20_TOKEN_ADDRESS,
// } = require('../../utils/constant');
// const sandABI = require('../../artifacts/utils/SAND.json');
// const { packToBytes32, unpackFromBytes32 } = require('../../utils/packOracleData');

describe('UserTokenSafeGas', function () {
    let userTokenSafeGas;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    before(async () => {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        const UserTokenSafeGas = await ethers.getContractFactory('UserTokenSafeGas');
        userTokenSafeGas = await UserTokenSafeGas.deploy('UT', 'UserTokenSafeGas');
    });

    describe('Check initial data/veriable', async () => {
        it('Symbol and name', async function () {
            expect(await userTokenSafeGas.name()).to.be.equal('UserTokenSafeGas');
            expect(await userTokenSafeGas.symbol()).to.be.equal('UT');
        });
        it('decimals', async function () {
            expect(await userTokenSafeGas.decimals()).to.be.equal(18);
        });
        it('totalSupply', async function () {
            expect(await userTokenSafeGas.totalSupply()).to.be.equal(0);
        });
    });

    describe('Mint', async () => {
        it('Owner can mint token to own', async function () {
            await userTokenSafeGas.mint(owner.address, parseUnits('10000'));
            expect(await userTokenSafeGas.balanceOf(owner.address)).to.be.equal(parseUnits('10000'));
        });
        it('Change total supply 1', async function () {
            expect(await userTokenSafeGas.totalSupply()).to.be.equal(parseUnits('10000'));
        });
        it('Owner can mint token to other address and emit Transfer events', async function () {
            expect(await userTokenSafeGas.mint(addr1.address, parseUnits('1000')))
                .to.emit(userTokenSafeGas, 'Transfer')
                .withArgs(ethers.constants.AddressZero, addr1.address, parseUnits('1000'));

            expect(await userTokenSafeGas.balanceOf(addr1.address)).to.be.equal(parseUnits('1000'));
        });
        it('Change total supply 1', async function () {
            expect(await userTokenSafeGas.totalSupply()).to.be.equal(parseUnits('11000'));
        });
        it('No owner can not mint token', async function () {
            await expect(userTokenSafeGas.connect(addr1).mint(addr1.address, parseUnits('100'))).to.be.revertedWith(
                'Only owner',
            );
        });
    });

    describe('Transfer', async () => {
        it('Can transfer token and emit event', async function () {
            await expect(userTokenSafeGas.transfer(addr2.address, parseUnits('1000')))
                .to.emit(userTokenSafeGas, 'Transfer')
                .withArgs(owner.address, addr2.address, parseUnits('1000'));

            expect(await userTokenSafeGas.balanceOf(owner.address)).to.be.equal(parseUnits('9000'));
            expect(await userTokenSafeGas.balanceOf(addr2.address)).to.be.equal(parseUnits('1000'));
        });
        it('Can not transfer token if have not', async function () {
            await expect(userTokenSafeGas.transfer(addr2.address, parseUnits('9001'))).to.be.reverted;
        });
    });

    describe('Approve', async () => {
        it('Aprove to other', async function () {
            await userTokenSafeGas.approve(addr2.address, parseUnits('1000'));
            expect(await userTokenSafeGas.allowance(owner.address, addr2.address)).to.be.equal(parseUnits('1000'));
            expect(await userTokenSafeGas.allowance(owner.address, addr1.address)).to.be.equal(0);
        });
        it('Change allowance', async function () {
            await userTokenSafeGas.approve(addr2.address, parseUnits('2000'));
            expect(await userTokenSafeGas.allowance(owner.address, addr2.address)).to.be.equal(parseUnits('2000'));
        });
        it('Reset allowance', async function () {
            await userTokenSafeGas.approve(addr2.address, 0);
            expect(await userTokenSafeGas.allowance(owner.address, addr2.address)).to.be.equal(0);
        });
    });

    describe('TransferFrom', async () => {
        it('Can not transfer if allowance to small', async function () {
            await userTokenSafeGas.approve(addr2.address, parseUnits('999'));

            await expect(userTokenSafeGas.connect(addr2).transferFrom(owner.address, addr1.address, parseUnits('1000'))).to.be
                .reverted;
        });
        it('Can transfer token and emit event', async function () {
            await userTokenSafeGas.approve(addr2.address, parseUnits('1000'));

            expect(await userTokenSafeGas.balanceOf(owner.address)).to.be.equal(parseUnits('9000'));
            expect(await userTokenSafeGas.balanceOf(addr1.address)).to.be.equal(parseUnits('1000'));

            await expect(userTokenSafeGas.connect(addr2).transferFrom(owner.address, addr1.address, parseUnits('1000')))
                .to.emit(userTokenSafeGas, 'Transfer')
                .withArgs(owner.address, addr1.address, parseUnits('1000'));

            expect(await userTokenSafeGas.balanceOf(owner.address)).to.be.equal(parseUnits('8000'));
            expect(await userTokenSafeGas.balanceOf(addr1.address)).to.be.equal(parseUnits('2000'));
        });
        it('Can not transfer if allowance reset', async function () {
            expect(await userTokenSafeGas.allowance(owner.address, addr2.address)).to.be.equal(0);

            await expect(userTokenSafeGas.connect(addr2).transferFrom(owner.address, addr1.address, parseUnits('500'))).to.be
                .reverted;
        });
    });

    // check if can burn from other smart contract
    describe('Burn', async () => {
        it('User can burn token and it emit event', async function () {
            await expect(userTokenSafeGas.connect(addr1).burn(parseUnits('1000')))
                .to.emit(userTokenSafeGas, 'Transfer')
                .withArgs(addr1.address, ethers.constants.AddressZero, parseUnits('1000'));
        });
        it('Change total supply and addressbalance', async function () {
            expect(await userTokenSafeGas.balanceOf(addr1.address)).to.be.equal(parseUnits('1000'));
            expect(await userTokenSafeGas.totalSupply()).to.be.equal(parseUnits('10000'));
        });
        it('Can not burn token if have not enought', async function () {
            expect(await userTokenSafeGas.balanceOf(addr1.address)).to.be.equal(parseUnits('1000'));
            await expect(userTokenSafeGas.connect(addr1).burn(parseUnits('1001'))).to.be.reverted;
        });
    });
});

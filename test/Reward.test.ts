/* eslint-disable mocha/no-setup-in-describe */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import '../helpers/hardhat-imports';
import './helpers/chai-imports';

import { Contract } from '@ethersproject/contracts';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Reward__factory, Reward, Dimo__factory, Dimo, SanctionsList, SanctionsList__factory, DIMORegistry } from 'generated/contract-types';
import hre from 'hardhat';
import { getHardhatSigners, THardhatAccounts } from 'tasks/functions/accounts';

import { Eip712Checker, Getter, Root, Vehicle } from '../contracts/mocks/typechain';

import { initialize } from './helpers/initialize';
import { createSnapshot, revertToSnapshot } from './helpers/snapshot';
import { generateWalletArray, generateRandomWalletArray } from './helpers/wallets';

const { upgrades, ethers } = hre;

const largeApprovalAmount = ethers.utils.parseEther('99999999999999999999');

const exampleFundingAmount = ethers.utils.parseEther('100000'); // 100,000
const fiftyDimo = ethers.utils.parseEther('50');

const threeDays = 3 * 24 * 60 * 60;
const sevenDays = 7 * 24 * 60 * 60;
const oneYear = 365 * 24 * 60 * 60;

const initialWeeklyLimit = ethers.BigNumber.from(`1105000000000000000000000`);
const zero = ethers.BigNumber.from(`0`);
const minimumTimeForRewards = ethers.BigNumber.from(`518400`);

// eslint-disable-next-line @typescript-eslint/no-loss-of-precision
const vehicleNodeId = `78769077365972393602509315957597115752211619595073297143997102312514467340003`;

const generateValueArray = (numberOfItems: number): string[] => {
  const array = [];
  for (let i = 0; i < numberOfItems; i++) {
    const fixedRewardValue = ethers.utils.parseEther('1').toString();
    array.push(fixedRewardValue);
  }
  return array;
};

describe('Reward', function () {
  let Reward: Reward;
  let DimoTokenContract: Dimo;
  let snapshot: string;
  let DIMORegistryContract: DIMORegistry;
  let SanctionsContract: SanctionsList;

  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  let vehicleIdArray: string[] = [];
  let userArray: string[] = [];
  let valueArray: string[] = [];

  let badUserArray: string[] = [];
  let badLengthVehicleIdArray: string[] = [];
  let badLengthVehicleIdArrayNonExistentId: string[] = [];

  // registry types
  let eip712CheckerInstance: Eip712Checker;
  let getterInstance: Getter;
  let rootInstance: Root;
  let vehicleInstance: Vehicle;

  const DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';

  const ORACLE_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('ORACLE_ROLE'));

  before(async () => {
    const signers: THardhatAccounts = await getHardhatSigners(hre);

    ({ deployer, user1, user2 } = signers);

    userArray = [deployer.address, user1.address, user2.address];
    vehicleIdArray = ['2', '2', '2'];
    valueArray = [ethers.utils.parseEther('100').toString(), ethers.utils.parseEther('100').toString(), ethers.utils.parseEther('100').toString()];
    badLengthVehicleIdArray = ['2', '2'];
    badLengthVehicleIdArrayNonExistentId = ['4', '2', '7'];
    badUserArray = [user1.address, user2.address];

    const DimoTokenFactory = new Dimo__factory(deployer);
    DimoTokenContract = await DimoTokenFactory.deploy(deployer.address);

    const SanctionsListFactory = new SanctionsList__factory(deployer);
    SanctionsContract = await SanctionsListFactory.deploy();

    [DIMORegistryContract, eip712CheckerInstance, getterInstance, rootInstance, vehicleInstance] = await initialize(
      deployer,
      [`DIMO web3 identity`, `DIMO`, `https://dimo.zone/`],
      'Eip712Checker',
      'Getter',
      'Root',
      'Vehicle'
    );

    const RewardFactory = new Reward__factory(deployer);
    Reward = await upgrades.deployProxy(RewardFactory, [DimoTokenContract.address, DIMORegistryContract.address, vehicleNodeId, SanctionsContract.address], {
      initializer: 'initialize',
    });

    await Reward.deployed();

    await eip712CheckerInstance.initialize('DIMO', '1');

    // Set root node type
    await rootInstance.connect(deployer).setRootNodeType(ethers.utils.toUtf8Bytes('Root'));
    // Set vehicle node type
    await vehicleInstance.connect(deployer).setVehicleNodeType(ethers.utils.toUtf8Bytes('Vehicle'));

    // Whitelist Root attributes
    await rootInstance.connect(deployer).addRootAttribute(`mockRootAttribute1`);
    await rootInstance.connect(deployer).addRootAttribute(`mockRootAttribute2`);

    // Whitelist Vehicle attributes
    await vehicleInstance.connect(deployer).addVehicleAttribute(`mockVehicleAttribute1`);
    await vehicleInstance.connect(deployer).addVehicleAttribute(`mockVehicleAttribute2`);
  });

  beforeEach(async () => {
    snapshot = await createSnapshot();
  });

  afterEach(async () => {
    await revertToSnapshot(snapshot);
  });

  describe('initialize()', function () {
    it('Should show the deployer has default admin role', async () => {
      expect(await Reward.hasRole(DEFAULT_ADMIN_ROLE, deployer.address)).to.be.true;
    });

    it('Should show the deployer has the oracle role', async () => {
      expect(await Reward.hasRole(ORACLE_ROLE, deployer.address)).to.be.true;
    });

    it('Should show the user1 does not have default admin role', async () => {
      expect(await Reward.hasRole(DEFAULT_ADMIN_ROLE, user2.address)).to.be.false;
    });

    it('Should check for the state variables upon initialization', async () => {
      await Reward.updateWeek(true);

      const varInitialWeeklyLimit = await Reward.initialWeeklyLimit();
      const varDimoTotalSentOutByContract = await Reward.dimoTotalSentOutByContract();
      const varMaxAmountDistributed = await Reward.maxAmountDistributed();
      const varRewardsGenesisTime = await Reward.rewardsGenesisTime();
      const varVehicleIdLastRewardTime = await Reward.vehicleIdLastRewardTime(0);
      const varMinimumTimeForRewards = await Reward.minimumTimeForRewards();
      const varCurrentWeek = await Reward.currentWeek();
      const varCurrentWeekLimit = await Reward.currentWeekLimit();
      const varCurrentWeekSpent = await Reward.currentWeekSpent();
      const varVehicleNodeType = await Reward.vehicleNodeType();

      expect(varInitialWeeklyLimit).to.be.equal(initialWeeklyLimit);
      expect(varDimoTotalSentOutByContract).to.be.equal(zero);
      // first 7 digits since time won't be exact
      expect(varRewardsGenesisTime.toString().substring(0, 7)).to.be.equal(Date.now().toString().substring(0, 7));
      expect(varMaxAmountDistributed).to.be.equal(zero);
      expect(varVehicleIdLastRewardTime).to.be.equal(zero);
      expect(varMinimumTimeForRewards).to.be.equal(minimumTimeForRewards);
      expect(varCurrentWeek).to.be.equal(zero);
      expect(varCurrentWeekLimit).to.be.equal(initialWeeklyLimit);
      expect(varCurrentWeekSpent).to.be.equal(zero);
      expect(varVehicleNodeType).to.be.equal(vehicleNodeId);
    });

    it('Should correctly grant role', async () => {
      await Reward.grantRole(DEFAULT_ADMIN_ROLE, user2.address);

      expect(await Reward.hasRole(DEFAULT_ADMIN_ROLE, user2.address)).to.be.true;
    });
  });

  describe('batchTransfer()', function () {
    context('airdrop deploy tests', () => {
      it('Should revert due to caller not having the owner role', async () => {
        await expect(Reward.connect(user2).batchTransfer([user2.address], ['10000000000000000'], [user2.address])).to.be.revertedWith(
          `AccessControl: account ${user2.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
        );
      });

      it('Should revert due to bad array length', async () => {
        await expect(Reward.batchTransfer(userArray, valueArray, badLengthVehicleIdArray)).to.be.revertedWith(`'InvalidArrayLength()`);
      });

      it('Should revert due to bad user array length', async () => {
        await expect(Reward.batchTransfer(badUserArray, valueArray, vehicleIdArray)).to.be.revertedWith(`'InvalidArrayLength()`);
      });

      it('Should revert due to insufficient dimo balance', async () => {
        await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

        await DimoTokenContract.transfer(Reward.address, fiftyDimo);

        await rootInstance.mintRoot(deployer.address, ['mockRootAttribute1', 'mockRootAttribute2'], ['mockRootInfo1', 'mockRootInfo2']);
        await vehicleInstance.mintVehicle(1, deployer.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);

        await Reward.updateWeek(true);

        await expect(Reward.batchTransfer(userArray, valueArray, vehicleIdArray)).to.be.revertedWith(`ERC20: transfer amount exceeds balance`);
      });

      it('Should fail without updateWeek() called first', async () => {
        await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

        await DimoTokenContract.transfer(Reward.address, exampleFundingAmount);

        await rootInstance.mintRoot(deployer.address, ['mockRootAttribute1', 'mockRootAttribute2'], ['mockRootInfo1', 'mockRootInfo2']);
        await vehicleInstance.mintVehicle(1, deployer.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);

        await expect(Reward.batchTransfer(userArray, valueArray, vehicleIdArray)).to.be.revertedWith(`WeeklyLimitExceeded()`);
      });

      it('Should successfully transfer to eligible users', async () => {
        await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

        await DimoTokenContract.transfer(Reward.address, exampleFundingAmount);

        await rootInstance.mintRoot(deployer.address, ['mockRootAttribute1', 'mockRootAttribute2'], ['mockRootInfo1', 'mockRootInfo2']);
        await vehicleInstance.mintVehicle(1, deployer.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);

        const initialDeployerBalance = await DimoTokenContract.balanceOf(userArray[0]);

        await Reward.updateWeek(true);
        await Reward.batchTransfer(userArray, valueArray, vehicleIdArray);

        const deployerBalance = await DimoTokenContract.balanceOf(userArray[0]);
        expect(deployerBalance).to.not.equal(initialDeployerBalance);
      });

      it('Should transfer correctly to a user with multiple eligible vehicles', async () => {
        await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

        await DimoTokenContract.transfer(Reward.address, exampleFundingAmount);

        await rootInstance.mintRoot(deployer.address, ['mockRootAttribute1', 'mockRootAttribute2'], ['mockRootInfo1', 'mockRootInfo2']);
        await vehicleInstance.mintVehicle(1, user1.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);
        await vehicleInstance.mintVehicle(1, user2.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);
        await vehicleInstance.mintVehicle(1, user1.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);

        const initialCurrentWeekSpent = await Reward.currentWeekSpent();
        const initialDimoTotalSentOutByContract = await Reward.dimoTotalSentOutByContract();
        const firstVehicleIdLastRewardTime = await Reward.vehicleIdLastRewardTime(2);
        const secondVehicleIdLastRewardTime = await Reward.vehicleIdLastRewardTime(3);

        await Reward.updateWeek(true);

        await Reward.batchTransfer(
          [user1.address, user2.address, user1.address],
          [ethers.utils.parseEther('100'), ethers.utils.parseEther('200'), ethers.utils.parseEther('300')],
          [2, 3, 4]
        );

        expect(firstVehicleIdLastRewardTime).to.be.equal(zero);
        expect(secondVehicleIdLastRewardTime).to.be.equal(zero);
        expect(initialCurrentWeekSpent).to.be.equal(zero);

        const postCurrentWeekSpent = await Reward.currentWeekSpent();

        const updatedFirstVehicleIdLastRewardTime = await Reward.vehicleIdLastRewardTime(2);
        const updatedSecondVehicleIdLastRewardTime = await Reward.vehicleIdLastRewardTime(3);

        expect(firstVehicleIdLastRewardTime).to.not.be.equal(updatedFirstVehicleIdLastRewardTime);

        expect(secondVehicleIdLastRewardTime).to.not.be.equal(updatedSecondVehicleIdLastRewardTime);

        expect(initialCurrentWeekSpent).to.not.be.equal(postCurrentWeekSpent);

        const postDimoTotalSentOutByContract = await Reward.dimoTotalSentOutByContract();
        expect(initialDimoTotalSentOutByContract).to.not.be.equal(postDimoTotalSentOutByContract);

        const user1Balance = await DimoTokenContract.balanceOf(user1.address);
        const user2Balance = await DimoTokenContract.balanceOf(user2.address);

        expect(user1Balance).to.be.equal(ethers.utils.parseEther('400'));
        expect(user2Balance).to.be.equal(ethers.utils.parseEther('200'));
      });

      it('Should only skip the blacklisted user', async () => {
        await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

        await DimoTokenContract.transfer(Reward.address, exampleFundingAmount);

        await rootInstance.mintRoot(deployer.address, ['mockRootAttribute1', 'mockRootAttribute2'], ['mockRootInfo1', 'mockRootInfo2']);
        await vehicleInstance.mintVehicle(1, deployer.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);
        await vehicleInstance.mintVehicle(1, user1.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);

        const initialDeployerBalance = await DimoTokenContract.balanceOf(userArray[0]);
        const secondUserInitialBalance = await DimoTokenContract.balanceOf(userArray[1]);

        // blacklist the first user
        await SanctionsContract.addToSanctionsList([deployer.address]);

        await Reward.updateWeek(true);
        await Reward.batchTransfer(userArray, valueArray, vehicleIdArray);

        const deployerBalance = await DimoTokenContract.balanceOf(userArray[0]);

        const secondUserBalanceAfterAirdrop = await DimoTokenContract.balanceOf(userArray[0]);

        expect(deployerBalance).to.equal(initialDeployerBalance);
        expect(secondUserInitialBalance).to.not.equal(secondUserBalanceAfterAirdrop);
      });

      it('Should track the users who didnt qualify', async () => {
        await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

        await DimoTokenContract.transfer(Reward.address, exampleFundingAmount);

        await rootInstance.mintRoot(deployer.address, ['mockRootAttribute1', 'mockRootAttribute2'], ['mockRootInfo1', 'mockRootInfo2']);
        await vehicleInstance.mintVehicle(1, deployer.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);
        await vehicleInstance.mintVehicle(1, user1.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);

        // blacklist the first user
        await SanctionsContract.addToSanctionsList([deployer.address]);

        const initialCurrentWeekSpent = await Reward.currentWeekSpent();

        const firstVehicleIdLastRewardTime = await Reward.vehicleIdLastRewardTime(2);
        const secondVehicleIdLastRewardTime = await Reward.vehicleIdLastRewardTime(3);

        expect(firstVehicleIdLastRewardTime).to.be.equal(zero);
        expect(secondVehicleIdLastRewardTime).to.be.equal(zero);

        await Reward.updateWeek(true);

        await Reward.batchTransfer(userArray, valueArray, ['2', '3', '3']);

        const postCurrentWeekSpent = await Reward.currentWeekSpent();
        expect(initialCurrentWeekSpent).to.not.be.equal(postCurrentWeekSpent);

        const updatedSecondVehicleIdLastRewardTime = await Reward.vehicleIdLastRewardTime(3);

        // first user was blacklisted and receives nothing
        expect(firstVehicleIdLastRewardTime).to.be.equal(zero);
        // second vehicle received a reward
        expect(secondVehicleIdLastRewardTime).to.not.be.equal(updatedSecondVehicleIdLastRewardTime);
      });

      it('Should track minimumRequiredTimeHasPassed', async () => {
        await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

        await DimoTokenContract.transfer(Reward.address, exampleFundingAmount);

        await rootInstance.mintRoot(deployer.address, ['mockRootAttribute1', 'mockRootAttribute2'], ['mockRootInfo1', 'mockRootInfo2']);
        await vehicleInstance.mintVehicle(1, deployer.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);
        await vehicleInstance.mintVehicle(1, user1.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);

        const firstVehicleIdLastRewardTime = await Reward.vehicleIdLastRewardTime(2);
        const secondVehicleIdLastRewardTime = await Reward.vehicleIdLastRewardTime(3);

        expect(firstVehicleIdLastRewardTime).to.be.equal(zero);
        expect(secondVehicleIdLastRewardTime).to.be.equal(zero);

        // sets the vehicleLastRewardTimes
        await Reward.updateWeek(true);
        await Reward.batchTransfer(userArray, valueArray, ['2', '3', '3']);

        // fast forward 3 days
        const now = await ethers.provider.getBlock('latest');
        const threeDaysLater = now.timestamp + threeDays;
        await ethers.provider.send('evm_setNextBlockTimestamp', [threeDaysLater]);
        await ethers.provider.send('evm_mine', []);

        // minimumRequiredTimeHasPassed returns false, so the DidntQualify event is emitted
        await expect(Reward.batchTransfer(userArray, valueArray, ['3', '3', '3'])).to.emit(Reward, `DidntQualify`);
      });

      it('Should find where vehicleOwner == users[i] is false', async () => {
        await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

        await DimoTokenContract.transfer(Reward.address, exampleFundingAmount);

        await rootInstance.mintRoot(deployer.address, ['mockRootAttribute1', 'mockRootAttribute2'], ['mockRootInfo1', 'mockRootInfo2']);
        await vehicleInstance.mintVehicle(1, deployer.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);
        await vehicleInstance.mintVehicle(1, user1.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);
        await vehicleInstance.mintVehicle(1, user2.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);

        const firstVehicleIdLastRewardTime = await Reward.vehicleIdLastRewardTime(2);
        const secondVehicleIdLastRewardTime = await Reward.vehicleIdLastRewardTime(3);

        expect(firstVehicleIdLastRewardTime).to.be.equal(zero);
        expect(secondVehicleIdLastRewardTime).to.be.equal(zero);

        await Reward.updateWeek(true);

        // vehicleOwner == users[i] returns false, so the DidntQualify event is emitted
        await expect(Reward.batchTransfer(userArray, valueArray, ['4', '2', '3'])).to.emit(Reward, `DidntQualify`);
      });

      it('Should emit the DidntQualify Event', async () => {
        await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

        await DimoTokenContract.transfer(Reward.address, exampleFundingAmount);

        await rootInstance.mintRoot(deployer.address, ['mockRootAttribute1', 'mockRootAttribute2'], ['mockRootInfo1', 'mockRootInfo2']);
        await vehicleInstance.mintVehicle(1, deployer.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);
        await vehicleInstance.mintVehicle(1, user1.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);

        // blacklist the first user
        await SanctionsContract.addToSanctionsList([deployer.address]);

        await expect(Reward.batchTransfer(userArray, valueArray, vehicleIdArray)).to.emit(Reward, `DidntQualify`);
      });

      it('Should fail to transfer to users due to bad vehicle Id array', async () => {
        await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

        await DimoTokenContract.transfer(Reward.address, exampleFundingAmount);

        await rootInstance.mintRoot(deployer.address, ['mockRootAttribute1', 'mockRootAttribute2'], ['mockRootInfo1', 'mockRootInfo2']);
        await vehicleInstance.mintVehicle(1, deployer.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);

        await Reward.updateWeek(true);
        await expect(Reward.batchTransfer(userArray, valueArray, badLengthVehicleIdArrayNonExistentId)).to.be.revertedWith(`EnumerableMap: nonexistent key`);
      });

      it('Should successfully transfer to 100 users', async () => {
        await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

        await DimoTokenContract.transfer(Reward.address, exampleFundingAmount);

        const largeUserArray = generateWalletArray(100);
        const valueArray = generateValueArray(100);

        await rootInstance.mintRoot(deployer.address, ['mockRootAttribute1', 'mockRootAttribute2'], ['mockRootInfo1', 'mockRootInfo2']);

        let vehicleIdIncrement = 1;
        const vehicleIdArray = [];
        for (const eachUserAddress of largeUserArray) {
          await vehicleInstance.mintVehicle(1, eachUserAddress, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);
          vehicleIdIncrement += 1;
          vehicleIdArray.push(vehicleIdIncrement.toString());
        }

        await Reward.updateWeek(true);
        await expect(Reward.batchTransfer(largeUserArray, valueArray, vehicleIdArray)).to.emit(Reward, `TokensTransferred`);
      });

      it('Should successfully transfer to 310 users', async () => {
        await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

        await DimoTokenContract.transfer(Reward.address, exampleFundingAmount);

        const largeUserArray = generateWalletArray(310);
        const valueArray = generateValueArray(310);

        await rootInstance.mintRoot(deployer.address, ['mockRootAttribute1', 'mockRootAttribute2'], ['mockRootInfo1', 'mockRootInfo2']);

        let vehicleIdIncrement = 1;
        const vehicleIdArray = [];
        for (const eachUserAddress of largeUserArray) {
          await vehicleInstance.mintVehicle(1, eachUserAddress, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);
          vehicleIdIncrement += 1;
          vehicleIdArray.push(vehicleIdIncrement.toString());
        }

        await Reward.updateWeek(true);
        await expect(Reward.batchTransfer(largeUserArray, valueArray, vehicleIdArray)).to.emit(Reward, `TokensTransferred`);
      });

      it('Should fail to transfer when token is paused', async () => {
        await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

        await DimoTokenContract.transfer(Reward.address, exampleFundingAmount);

        await rootInstance.mintRoot(deployer.address, ['mockRootAttribute1', 'mockRootAttribute2'], ['mockRootInfo1', 'mockRootInfo2']);
        await vehicleInstance.mintVehicle(1, deployer.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);

        await Reward.updateWeek(true);

        await DimoTokenContract.pause();
        await expect(Reward.batchTransfer([deployer.address], [ethers.utils.parseEther('5')], [2])).to.be.revertedWith(
          `ERC20Pausable: token transfer while paused`
        );
      });

      it('Should fail to transfer to 500 users due to gas limits', async () => {
        await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

        await DimoTokenContract.transfer(Reward.address, exampleFundingAmount);

        const largeUserArray = generateWalletArray(500);
        const valueArray = generateValueArray(500);

        await rootInstance.mintRoot(deployer.address, ['mockRootAttribute1', 'mockRootAttribute2'], ['mockRootInfo1', 'mockRootInfo2']);

        let vehicleIdIncrement = 1;
        const vehicleIdArray = [];
        for (const eachUserAddress of largeUserArray) {
          await vehicleInstance.mintVehicle(1, eachUserAddress, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);
          vehicleIdIncrement += 1;
          vehicleIdArray.push(vehicleIdIncrement.toString());
        }

        await Reward.updateWeek(true);
        // await expect(Reward.batchTransfer(largeUserArray, valueArray, vehicleIdArray)).to.be.revertedWith(
        //   `contract call run out of gas and made the transaction revert`
        // );
        await expect(Reward.batchTransfer(largeUserArray, valueArray, vehicleIdArray)).to.be.revertedWith(
          `Transaction reverted and Hardhat couldn't infer the reason.`
        );
      });

      it('Should fail to transfer to 1000 users due to gas limits', async () => {
        await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

        await DimoTokenContract.transfer(Reward.address, exampleFundingAmount);

        const largeUserArray = generateWalletArray(1000);
        const valueArray = generateValueArray(1000);

        await rootInstance.mintRoot(deployer.address, ['mockRootAttribute1', 'mockRootAttribute2'], ['mockRootInfo1', 'mockRootInfo2']);

        let vehicleIdIncrement = 1;
        const vehicleIdArray = [];
        for (const eachUserAddress of largeUserArray) {
          await vehicleInstance.mintVehicle(1, eachUserAddress, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);
          vehicleIdIncrement += 1;
          vehicleIdArray.push(vehicleIdIncrement.toString());
        }

        await Reward.updateWeek(true);
        // await expect(Reward.batchTransfer(largeUserArray, valueArray, vehicleIdArray)).to.be.revertedWith(
        //   `contract call run out of gas and made the transaction revert`
        // );
        await expect(Reward.batchTransfer(largeUserArray, valueArray, vehicleIdArray)).to.be.revertedWith(
          `Transaction reverted and Hardhat couldn't infer the reason.`
        );
      });

      it('Should mint vehicle NFT and transfer to NFT holders', async () => {
        await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

        await DimoTokenContract.transfer(Reward.address, exampleFundingAmount);

        await rootInstance.mintRoot(deployer.address, ['mockRootAttribute1', 'mockRootAttribute2'], ['mockRootInfo1', 'mockRootInfo2']);
        await vehicleInstance.mintVehicle(1, deployer.address, ['mockVehicleAttribute1', 'mockVehicleAttribute2'], ['mockVehicleInfo1', 'mockVehicleInfo2']);

        // check node is a vehicle node

        const vehicleNodeType = ethers.utils.toUtf8Bytes('Vehicle');
        const vehicleNodeTypeId = ethers.utils.keccak256(vehicleNodeType);

        const vehicleIdString = ethers.BigNumber.from(vehicleNodeTypeId);

        const nodeType: any = await getterInstance.getNodeType(2);
        expect(nodeType).to.be.equal(vehicleNodeTypeId);

        // // check NFT balance of the address
        // const tokensHeld = await DIMORegistryContract.balanceOf(deployer.address);

        await Reward.updateWeek(true);
        await expect(Reward.batchTransfer([deployer.address], [ethers.utils.parseEther('5')], [2])).to.emit(Reward, `TokensTransferred`);
      });
    });
  });

  describe('updateWeek()', function () {
    it('Should initialize the week and spending limit correctly', async () => {
      const uninitalizedCurrentWeekLimit = await Reward.currentWeekLimit();
      await Reward.updateWeek(true);
      const initializedCurrentWeekLimit = await Reward.currentWeekLimit();
      expect(uninitalizedCurrentWeekLimit).to.equal(0);

      expect(uninitalizedCurrentWeekLimit).to.not.equal(initializedCurrentWeekLimit);

      expect(initializedCurrentWeekLimit).to.equal(initialWeeklyLimit);
    });

    it('Should revert due to caller not being the owner', async () => {
      await expect(Reward.connect(user2).updateWeek(true)).to.be.revertedWith(
        `AccessControl: account ${user2.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
      );
    });

    it('Should deduct 15% after the first year', async () => {
      await Reward.updateWeek(true);

      const weekZero = await Reward.currentWeek();

      const now = await ethers.provider.getBlock('latest');

      const oneYearLater = now.timestamp + oneYear;
      await ethers.provider.send('evm_setNextBlockTimestamp', [oneYearLater]);
      await ethers.provider.send('evm_mine', []);

      await Reward.updateWeek(true);

      const currentWeek = await Reward.currentWeek();

      const weeklySpendingLimit = await Reward.currentWeekLimit();

      const firstDeduction = initialWeeklyLimit.mul(85).div(100);

      expect(weekZero).to.not.equal(currentWeek);
      expect(firstDeduction).to.equal(weeklySpendingLimit);
      expect(weeklySpendingLimit).to.not.equal(initialWeeklyLimit);
    });
  });

  describe('calculateWeeklyLimit()', function () {
    it('Should return the max amount to send weekly for the first  week', async () => {
      const maxReward = await Reward.calculateWeeklyLimit();

      expect(maxReward).to.equal(initialWeeklyLimit);
    });
    it('Should return the max amount to send weekly for the second year', async () => {
      const now = await ethers.provider.getBlock('latest');

      const oneYearLater = now.timestamp + oneYear;
      await ethers.provider.send('evm_setNextBlockTimestamp', [oneYearLater]);
      await ethers.provider.send('evm_mine', []);

      const maxReward = await Reward.calculateWeeklyLimit();
      const diminishedReward = initialWeeklyLimit.mul(85).div(100);
      expect(maxReward).to.equal(diminishedReward);
    });
    it('Should return the max amount to send weekly for the 3rd year', async () => {
      const now = await ethers.provider.getBlock('latest');

      const twoYearsLater = now.timestamp + oneYear + oneYear;
      await ethers.provider.send('evm_setNextBlockTimestamp', [twoYearsLater]);
      await ethers.provider.send('evm_mine', []);

      const maxReward = await Reward.calculateWeeklyLimit();
      let diminishedReward = initialWeeklyLimit.mul(85).div(100);
      diminishedReward = diminishedReward.mul(85).div(100);

      expect(maxReward).to.equal(diminishedReward);
    });

    it('Should return the max amount to send weekly for the 4th year', async () => {
      const now = await ethers.provider.getBlock('latest');

      const threeYearsLater = now.timestamp + oneYear + oneYear + oneYear;
      await ethers.provider.send('evm_setNextBlockTimestamp', [threeYearsLater]);
      await ethers.provider.send('evm_mine', []);

      const maxReward = await Reward.calculateWeeklyLimit();
      let diminishedReward = initialWeeklyLimit.mul(85).div(100);
      diminishedReward = diminishedReward.mul(85).div(100);
      diminishedReward = diminishedReward.mul(85).div(100);

      expect(maxReward).to.equal(diminishedReward);
    });
  });

  describe('setMinimumTimeForRewards()', function () {
    it('Should revert due to not being admin role', async () => {
      await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

      await DimoTokenContract.transfer(Reward.address, exampleFundingAmount);

      await expect(Reward.connect(user2).setMinimumTimeForRewards('234234')).to.be.revertedWith(
        `AccessControl: account ${user2.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
      );
    });

    it('Should correctly change the minimum time', async () => {
      const initialMinimumTime = await Reward.minimumTimeForRewards();
      await Reward.setMinimumTimeForRewards('234234');
      const newWeeklyLimit = await Reward.minimumTimeForRewards();

      expect(newWeeklyLimit).to.not.equal(initialMinimumTime);
    });
  });

  describe('adminWithdraw()', function () {
    it('Should revert since there are no accidental funds in the contract', async () => {
      await expect(Reward.adminWithdraw(deployer.address, fiftyDimo)).to.be.revertedWith('ERC20: transfer amount exceeds balance');
    });

    it('Should refund accidental send from user', async () => {
      await DimoTokenContract.approve(Reward.address, largeApprovalAmount);

      await DimoTokenContract.transfer(Reward.address, exampleFundingAmount);

      await expect(Reward.adminWithdraw(deployer.address, exampleFundingAmount))
        .to.emit(Reward, 'AdminWithdrawal')
        .withArgs(deployer.address, exampleFundingAmount);
    });
  });
});

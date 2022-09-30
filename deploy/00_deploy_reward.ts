/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { DeployFunction } from 'hardhat-deploy/types';
import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

const func: DeployFunction = async (hre: THardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, ethers, upgrades } = hre;
  const { deployer } = await getNamedAccounts();

  // const DIMO_TOKEN = `0xE261D618a959aFfFd53168Cd07D12E37B26761db`; //mainnet
  const DIMO_TOKEN = `0x80Ee7ec4493A1d7975ab900F94dB25ba7C688201`; //testnet

  const DIMO_FOUNDATION = `0xCcFa7c808F5b77822e4935a7230F46681c99F4Bc`; // matic

  const SANCTIONS_CONTRACT = `0x40C57923924B5c5c5455c48D93317139ADDaC8fb`;

  const REGISTRY_CONTRACT = `0x2808D309b28840210DF1DC0A3105203d83cBD5c3`;
  const TESTNET_VEHICLE_NODE_TYPE = `78769077365972393602509315957597115752211619595073297143997102312514467340003`;

  const RewardFactory: any = await ethers.getContractFactory('Reward', deployer);

  const SanctionsListFactory: any = await ethers.getContractFactory('SanctionsList', deployer);

  const SanctionsList = await SanctionsListFactory.deploy();
  await SanctionsList.deployed();

  const rewardProxy: any = await upgrades.deployProxy(RewardFactory, [DIMO_TOKEN, REGISTRY_CONTRACT, TESTNET_VEHICLE_NODE_TYPE, SanctionsList.address], {
    initializer: 'initialize',
    kind: 'uups',
  });

  await rewardProxy.deployed();

  await rewardProxy.updateWeek(true);

  // const defaultAdminRoleBytes = `0x0000000000000000000000000000000000000000000000000000000000000000`;
  // // replace with Multisig address later
  // await (await rewardProxy.grantRole(defaultAdminRoleBytes, DIMO_FOUNDATION)).wait();

  // revoke deployer address in the future
  // `revokeRole()`
};
export default func;
func.tags = ['Reward'];

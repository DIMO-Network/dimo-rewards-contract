/* eslint-disable @typescript-eslint/no-unsafe-return */
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Wallet } from 'ethers';
import { ethers } from 'hardhat';

export function getSelectors(_interface: any): string[] {
  return Object.keys(_interface.functions).map((item) => _interface.getSighash(item));
}

async function initialize(deployer: Wallet | SignerWithAddress, constructorArgs: [string, string, string], ...contracts: string[]): Promise<any[]> {
  const instances: any[] = [];

  // Deploy DIMORegistry Implementation
  const DIMORegistry = await ethers.getContractFactory('DIMORegistry');
  const dimoRegistryImplementation = await DIMORegistry.connect(deployer).deploy(...constructorArgs);
  await dimoRegistryImplementation.deployed();

  const dimoRegistry = await ethers.getContractAt('DIMORegistry', dimoRegistryImplementation.address);

  instances.push(dimoRegistry);

  for (const contractName of contracts) {
    const ContractFactory = await ethers.getContractFactory(contractName);
    const contractImplementation = await ContractFactory.connect(deployer).deploy();
    await contractImplementation.deployed();

    const contractSelectors = getSelectors(ContractFactory.interface);

    await dimoRegistry.connect(deployer).addModule(contractImplementation.address, contractSelectors);

    instances.push(await ethers.getContractAt(contractName, dimoRegistry.address));
  }

  return instances;
}

export { initialize };

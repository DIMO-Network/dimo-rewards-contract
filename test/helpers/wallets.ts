/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/no-named-as-default */
import { Wallet } from 'ethers';

const mnemonic = `announce room limb pattern dry unit scale effort smooth jazz weasel alcohol`;

export const generateWalletArray = (arrayLength: number): string[] => {
  let derivationChild = 0;
  const array: string[] = [];

  for (let i = 0; i < arrayLength; i++) {
    const derivationPath = `m/44'/60'/0'/0/${derivationChild}`;

    const wallet = Wallet.fromMnemonic(mnemonic, derivationPath);
    derivationChild += 1;
    array.push(wallet.address);
  }

  return array;
};

export const generateRandomWalletArray = (arrayLength: number): string[] => {
  let derivationChild = 0;
  const array: string[] = [];

  for (let i = 0; i < arrayLength; i++) {
    const derivationPath = `m/44'/60'/0'/0/${derivationChild}`;

    const wallet = Wallet.createRandom();
    derivationChild += 1;
    array.push(wallet.address);
  }
  return array;
};

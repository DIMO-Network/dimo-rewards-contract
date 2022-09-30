//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

interface IDimo {
  function transfer(address to, uint256 amount) external returns (bool);

  function balanceOf(address account) external view returns (uint256);
}

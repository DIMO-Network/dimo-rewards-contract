//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

interface IDIMORegistry {
  function ownerOf(uint256 tokenId) external view returns (address);

  function balanceOf(address account) external view returns (uint256);

  function getNodeType(uint256 tokenId) external view returns (uint256 nodeType);
}

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract SanctionsList {
  mapping(address => bool) public _isSanctioned;

  function isSanctioned(address addr) external view returns (bool) {
    return _isSanctioned[addr];
  }

  function addToSanctionsList(address[] memory newSanctions) external {
    uint256 arrayLength = newSanctions.length;

    for (uint256 i = 0; i < arrayLength; i++) {
      _isSanctioned[newSanctions[i]] = true;
    }
  }
}

//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

import "./IDIMORegistry.sol";
import "./ISanctionsList.sol";
import "./IDimo.sol";

error InvalidArrayLength();
error TokenTransferFailed();
error WeeklyLimitExceeded();

contract Reward is Initializable, AccessControlUpgradeable, UUPSUpgradeable {
  /* ========== STATE VARIABLES ========== */

  uint256 public dimoTotalSentOutByContract;
  IDimo dimoToken;
  ISanctionsList sanctionsList;
  uint256 public rewardsGenesisTime;
  mapping(uint256 => uint256) public vehicleIdLastRewardTime;
  IDIMORegistry DIMO_REGISTRY_CONTRACT;
  uint256 public vehicleNodeType;
  uint256 public minimumTimeForRewards;
  uint256 public initialWeeklyLimit;
  uint256 public currentWeek;
  uint256 public currentWeekLimit;
  uint256 public currentWeekSpent;
  bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");

  /* ========== EVENTS ========== */

  event TokensTransferred(address indexed user, uint256 _amount, uint256 vehicleNodeId);

  event AdminWithdrawal(address indexed user, uint256 _amount);

  event DidntQualify(address indexed user, uint256 _amount, uint256 vehicleNodeId);

  /* ========== CONSTRUCTOR ========== */

  /** @dev replaces the constructor function due to upgradeable convention UUPS
   * @param tokenAddress The contract address for DIMO
   * @param registryContractAddress The contract address for the DIMO Registry
   * @param registryVehicleNodeType The node type in the registry contract for vehicles
   * @param sanctionsContractAddress The contract address for chainalysis sanctions oracle
   */
  function initialize(
    address tokenAddress,
    address registryContractAddress,
    uint256 registryVehicleNodeType,
    address sanctionsContractAddress
  ) external initializer {
    __AccessControl_init();
    __UUPSUpgradeable_init();

    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

    _setupRole(ORACLE_ROLE, msg.sender);

    require(registryContractAddress != address(0), "registryContractAddress is an invalid zero address");
    require(tokenAddress != address(0), "tokenAddress is an invalid zero address");
    require(sanctionsContractAddress != address(0), "sanctionsContractAddress is an invalid zero address");

    dimoToken = IDimo(tokenAddress);
    vehicleNodeType = registryVehicleNodeType;
    DIMO_REGISTRY_CONTRACT = IDIMORegistry(registryContractAddress);
    rewardsGenesisTime = block.timestamp;
    minimumTimeForRewards = 6 days;
    sanctionsList = ISanctionsList(sanctionsContractAddress);
    initialWeeklyLimit = 1_105_000 * 10**18; // 1,105,000 DIMO
  }

  /* ========== MUTATIVE FUNCTIONS ========== */

  /** @dev administrative function to manage weekly state. must be called prior to batchTransfer weekly.
   * @param forceUpdate boolean to force an update, ignoring the date check
   */
  function updateWeek(bool forceUpdate) external onlyRole(DEFAULT_ADMIN_ROLE) {
    uint256 _currentWeek = getNumberOfWeeksSinceGenesis();

    if (forceUpdate || _currentWeek > currentWeek) {
      currentWeek = _currentWeek;
      currentWeekLimit = limitForWeek(currentWeek);
      currentWeekSpent = 0;
    }
  }

  /* ========== RESTRICTED FUNCTIONS ========== */

  /** @dev Airdrop function to loop through array and send dimo tokens
   * @param users[] The array of addresses
   * @param values[] The array of values to airdrop each user
   * @param vehicleIds[] The ids of the vehicle NFT
   */
  function batchTransfer(
    address[] calldata users,
    uint256[] calldata values,
    uint256[] calldata vehicleIds
  ) external onlyRole(DEFAULT_ADMIN_ROLE) {
    uint256 arrayLength = users.length;

    // the array lengths should be the same
    if (arrayLength != values.length || arrayLength != vehicleIds.length) revert InvalidArrayLength();

    // prevent sending more than the total issuance for the week
    address vehicleOwner;
    for (uint256 i = 0; i < arrayLength; i++) {
      vehicleOwner = DIMO_REGISTRY_CONTRACT.ownerOf(vehicleIds[i]);

      // check to see user address is sanctioned or not
      if (
        vehicleOwner == users[i] &&
        minimumRequiredTimeHasPassed(vehicleIdLastRewardTime[vehicleIds[i]]) &&
        !sanctionsList.isSanctioned(vehicleOwner) &&
        vehicleNodeType == DIMO_REGISTRY_CONTRACT.getNodeType(vehicleIds[i])
      ) {
        if (!dimoToken.transfer(vehicleOwner, values[i])) revert TokenTransferFailed();

        dimoTotalSentOutByContract += values[i];
        currentWeekSpent += values[i];
        vehicleIdLastRewardTime[vehicleIds[i]] = block.timestamp;

        emit TokensTransferred(vehicleOwner, values[i], vehicleIds[i]);
      } else {
        // track users who didn't receive the drop
        emit DidntQualify(users[i], values[i], vehicleIds[i]);
      }
    }

    // prevent exceeding the planned issuance amount for the week
    if (currentWeekSpent > currentWeekLimit) revert WeeklyLimitExceeded();
  }

  /** @dev emergency function for when the user might send DIMO to the contract without interacting with the stake() function
   * @param user The address of the user
   * @param amount The amount of tokens to withdraw
   */
  function adminWithdraw(address user, uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
    if (!dimoToken.transfer(user, amount)) revert TokenTransferFailed();

    emit AdminWithdrawal(user, amount);
  }

  /** @dev emergency function in case the default 6 day minimum needs to be adjusted
   * @param newTimeInSeconds The new minimum requirement time before batchTransfer can be called again
   */
  function setMinimumTimeForRewards(uint256 newTimeInSeconds) external onlyRole(DEFAULT_ADMIN_ROLE) {
    minimumTimeForRewards = newTimeInSeconds;
  }

  /* ========== VIEWS ========== */

  /** @dev checks if the minimum amount of time before issuing rewards again has passed.
   * @param timestamp The time to check against
   * @return bool
   */
  function minimumRequiredTimeHasPassed(uint256 timestamp) private view returns (bool) {
    return (block.timestamp >= timestamp + minimumTimeForRewards);
  }

  /** @dev Gets the number of weeks passed since contract deployment and calculates the max amount of dimo to be distributed. This value is checked against to prevent accidentally exceeding the planned issuance rate.
   * @return maxRewards
   */
  function calculateWeeklyLimit() public view returns (uint256 maxRewards) {
    // divide by  weeks
    uint256 numberofWeeks = getNumberOfWeeksSinceGenesis();

    uint256 limitForTheWeek = limitForWeek(numberofWeeks);

    return limitForTheWeek;
  }

  /** @dev Internal function to calculate the max we can send for the week
   * @return uint256 weekly limit
   */
  function limitForWeek(uint256 numberOfWeeks) private view returns (uint256) {
    uint256 year = numberOfWeeks / 52;

    uint256 limit = initialWeeklyLimit;

    for (uint256 i = 0; i < year; i++) {
      limit = (85 * limit) / 100;
    }

    return limit;
  }

  /** @dev get the difference between two dates in days
   *  @return unixTimeDiff
   */
  function getNumberOfWeeksSinceGenesis() private view returns (uint256 unixTimeDiff) {
    unixTimeDiff = (block.timestamp - rewardsGenesisTime) / 7 days;
  }

  /**
   * @dev Function that should revert when `msg.sender` is not authorized to upgrade the contract. Called by
   * {upgradeTo} and {upgradeToAndCall}.
   *
   * Normally, this function will use an xref:access.adoc[access control] modifier such as {Ownable-onlyOwner}.
   *
   * ```solidity
   * function _authorizeUpgrade(address) internal override onlyOwner {}
   * ```
   */
  function _authorizeUpgrade(address newImplementation) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}
}
